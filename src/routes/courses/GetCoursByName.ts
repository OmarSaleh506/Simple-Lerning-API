import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Course, GetCoursQuery } from '../../TypeObject/TypeObjectCours';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { Cours } from '@prisma/client';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/course',
		schema: {
			summary: 'Gets  cours  by name',
			tags: ['cours'],
			querystring: GetCoursQuery,
			response: {
				'2xx': Type.Array(Course),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetCoursQuery;

			const Course = await prismaClient.cours.findMany();
			if (!query.text) return Course;
			if (query.text !== undefined) {
				return reply.send('course not found');
			}
			const fuse = new Fuse(Course, {
				includeScore: true,
				isCaseSensitive: false,
				keys: ['name'],
			});

			const result: Cours[] = fuse.search(query.text).map((r) => r.item);

			return result;
		},
	});
}
