import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Course } from '../../TypeObject/TypeObjectCours';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/courses',
		schema: {
			summary: 'Gets all cours ',
			tags: ['cours'],

			response: {
				'2xx': Type.Array(Course),
			},
		},
		handler: async (request, reply) => {
			const Course = await prismaClient.cours.findMany();
			return Course;
		},
	});
}
