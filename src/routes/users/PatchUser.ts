import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { PartialUserWithoutId,UserParams } from '../../TypeObject/TypeOpjectUser'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
        method: 'PATCH',
        url: '/user/:user_id',
        schema: {
            summary: 'Update a user by id + you dont need to pass all properties',
            tags: ['user'],
            body: PartialUserWithoutId,
            params: UserParams,
        },
        handler: async (request, reply) => {
            const { user_id } = request.params as UserParams;
            if (!ObjectId.isValid(user_id)) {
                reply.badRequest('user_id should be an ObjectId!');
                return;
            }
    
            const user = request.body as PartialUserWithoutId;
    
            return prismaClient.user.update({
                where: { user_id },
                data: user,
            });
        },
    });
}