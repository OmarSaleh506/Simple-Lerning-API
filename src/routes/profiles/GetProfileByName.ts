import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Profiles, GetProfileQuery } from '../../TypeObject/TypeObjectProfile';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { Profile } from '@prisma/client';

export default async function (server: FastifyInstance) {
	server.route({
		method: 'GET',
		url: '/profile',
		schema: {
			summary: 'Gets all profile or search by name',
			tags: ['profile'],
			querystring: GetProfileQuery,
			response: {
				'2xx': Type.Array(Profiles),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetProfileQuery;

			const profiles = await prismaClient.profile.findMany();
			if (!query.text) return profiles;

			const fuse = new Fuse(profiles, {
				includeScore: true,
				findAllMatches: true,
				threshold: 1,
				keys: ['name'],
			});

			console.log(JSON.stringify(fuse.search(query.text)));

			const result: Profile[] = fuse.search(query.text).map((r) => r.item);
			return result;
		},
	});
}
