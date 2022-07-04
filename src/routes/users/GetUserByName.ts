import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { GetUserQuery, Users } from '../../TypeObject/TypeOpjectUser';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { User } from '@prisma/client';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/user',
		schema: {
			summary: 'Gets all user or search by name',
			tags: ['user'],
			querystring: GetUserQuery,
			response: {
				'2xx': Type.Array(Users),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetUserQuery;

			const users = await prismaClient.user.findMany();
			if (!query.text) return users;

			const fuse = new Fuse(users, {
				includeScore: true,
				isCaseSensitive: false,
				keys: ['name'],
			});

			console.log(JSON.stringify(fuse.search(query.text)));

			const result: User[] = fuse.search(query.text).map((r) => r.item);
			return result;
		},
	});
}
