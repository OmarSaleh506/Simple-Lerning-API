import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Profiles, ProfileParams } from '../../TypeObject/TypeObjectProfile';
import { ObjectId } from 'bson';
import { Type } from '@sinclair/typebox';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/profile/:profile_id',
		schema: {
			summary: 'Returns one profile or null',
			tags: ['profile'],
			params: ProfileParams,
			response: {
				'2xx': Type.Union([Profiles, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const { profile_id } = request.params as ProfileParams;
			if (!ObjectId.isValid(profile_id)) {
				reply.badRequest('profile_id should be an ObjectId!');
				return;
			}

			return prismaClient.profile.findFirst({
				where: { profile_id },
			});
		},
	});
}
