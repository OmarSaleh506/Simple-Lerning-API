import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
import { Users } from '../../TypeObject/TypeOpjectUser'
import { addAuthorization } from '../../hooks/auth';
import {  User } from '@prisma/client'
import _ from 'lodash';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
server.route({
    method: 'PUT',
    url: '/user',
    schema: {
        summary: 'Creates new user + all properties are required',
        tags: ['user'],
        body: Users,
    },
    handler: async (request, reply) => {
        const user = request.body as User;
        if (!ObjectId.isValid(user.user_id)) {
            reply.badRequest('user_id should be an ObjectId!');
        } else {
            return await prismaClient.user.upsert({
                where: { user_id: user.user_id },
                create: user,
                update: _.omit(user, ['user_id']),
            });
        }
    },
});
}