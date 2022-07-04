import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { PartialProfileWithoutId, ProfileParams } from '../../TypeObject/TypeObjectProfile'
import { ObjectId } from 'bson';



export default async function(server: FastifyInstance){
    //addAuthorization(server);

server.route({
    method: 'PATCH',
    url: '/profile/:profile_id',
    schema: {
        summary: 'Update a profile by id + you dont need to pass all properties',
        tags: ['profile'],
        body: PartialProfileWithoutId,
        params: ProfileParams,
    },
    handler: async (request, reply) => {
        const { profile_id } = request.params as ProfileParams;
        if (!ObjectId.isValid(profile_id)) {
            reply.badRequest('profile_id should be an ObjectId!');
            return;
        }

        const profile = request.body as PartialProfileWithoutId;

        return prismaClient.profile.update({
            where: { profile_id },
            data: profile,
        });
    },
});
}
    