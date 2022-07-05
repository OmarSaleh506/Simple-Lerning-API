import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Projects } from '../../TypeObject/TypeObjectProject';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	server.route({
		method: 'GET',
		url: '/projects',
		schema: {
			summary: 'Gets all project ',
			tags: ['project'],

			response: {
				'2xx': Type.Array(Projects),
			},
		},
		handler: async (request, reply) => {
			const Project = await prismaClient.project.findMany();
			return Project;
		},
	});
}
