import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { ProjectWithoutId } from '../../TypeObject/TypeObjectProject';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'POST',
		url: '/project',
		schema: {
			summary: 'Creates new project',
			tags: ['project'],
			body: ProjectWithoutId,
		},
		handler: async (request, reply) => {
			const project = request.body as ProjectWithoutId;
			return await prismaClient.project.create({
				data: project,
			});
		},
	});
}
