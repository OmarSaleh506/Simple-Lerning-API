import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
import { Profiles } from '../../TypeObject/TypeObjectProfile';
import { addAuthorization } from '../../hooks/auth';
import { Profile } from '@prisma/client';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'PUT',
		url: '/profile',
		schema: {
			summary: 'Creates new profile + all properties are required',
			tags: ['profile'],
			body: Profiles,
		},
		handler: async (request, reply) => {
			const profile = request.body as Profile;
			if (!ObjectId.isValid(profile.profile_id)) {
				reply.badRequest('profile_id should be an ObjectId!');
			} else {
				return await prismaClient.profile.upsert({
					where: { profile_id: profile.profile_id },
					create: profile,
					update: _.omit(profile, ['profile_id']),
				});
			}
		},
	});
}
