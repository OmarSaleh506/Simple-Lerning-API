import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { addAuthorization } from '../../hooks/auth';
import { UserParams } from '../../TypeObject/TypeOpjectUser'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
    
server.route({
    method: 'DELETE',
    url: '/user/:user_id',
    schema: {
        summary: 'Deletes a user',
        tags: ['user'],
        params: UserParams,
    },
    handler: async (request, reply) => {
        const { user_id } = request.params as UserParams;
        if (!ObjectId.isValid(user_id)) {
            reply.badRequest('user_id should be an ObjectId!');
            return;
        }

        return prismaClient.user.delete({
            where: { user_id },
        });
    },
});
}
   