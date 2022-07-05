import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Type } from '@sinclair/typebox';
import { addAuthorization } from '../../hooks/auth';

export default async function (server: FastifyInstance) {
	addAuthorization(server);

	server.route({
		method: 'PUT',
		url: '/projects',
		schema: {
			summary: 'connect between project_id and user_id',
			tags: ['project'],
			body: Type.Object({
				project_id: Type.String(),
				user_id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const { project_id, user_id } = request.body as any;
			const connect = await prismaClient.project.update({
				where: {
					project_id: project_id,
				},
				data: {
					user: {
						connect: {
							user_id: user_id,
						},
					},
				},
			});
		},
	});
}
