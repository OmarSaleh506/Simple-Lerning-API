import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { addAuthorization } from '../../hooks/auth';
import { ProfileParams } from '../../TypeObject/TypeObjectProfile'
import { ObjectId } from 'bson';



export default async function(server: FastifyInstance){
    addAuthorization(server);
    server.route({
        method: 'DELETE',
        url: '/profile/:profile_id',
        schema: {
            summary: 'Deletes a profile',
            tags: ['profile'],
            params: ProfileParams,
        },
        handler: async (request, reply) => {
            const { profile_id } = request.params as ProfileParams;
            if (!ObjectId.isValid(profile_id)) {
                reply.badRequest('profile_id should be an ObjectId!');
                return;
            }
    
            return prismaClient.profile.delete({
                where: { profile_id },
            });
        },
    });
}
    