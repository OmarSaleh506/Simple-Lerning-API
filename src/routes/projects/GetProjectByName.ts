import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Projects, GetProjectQuery } from '../../TypeObject/TypeObjectProject';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { Project } from '@prisma/client';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/project',
		schema: {
			summary: 'Gets  project by name',
			tags: ['project'],
			querystring: GetProjectQuery,
			response: {
				'2xx': Type.Array(Projects),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetProjectQuery;

			const projects = await prismaClient.project.findMany();
			if (!query.text) return projects;

			const fuse = new Fuse(projects, {
				includeScore: true,
				isCaseSensitive: false,
				keys: ['name'],
			});

			const result: Project[] = fuse.search(query.text).map((r) => r.item);
			return result;
		},
	});
}
