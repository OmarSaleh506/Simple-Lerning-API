import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { UserParams, Users } from '../../TypeObject/TypeOpjectUser';
import { ObjectId } from 'bson';
import { Type } from '@sinclair/typebox';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/user/:user_id',
		schema: {
			summary: 'Returns one user or null',
			tags: ['user'],
			params: UserParams,
			response: {
				'2xx': Type.Union([Users, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const { user_id } = request.params as UserParams;
			if (!ObjectId.isValid(user_id)) {
				reply.badRequest('user_id should be an ObjectId!');
				return;
			}

			return prismaClient.user.findFirst({
				where: { user_id },
			});
		},
	});
}
