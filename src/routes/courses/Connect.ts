import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Type } from '@sinclair/typebox';

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/courses',
		schema: {
			summary: ' cours',
			tags: ['cours'],
			body: Type.Object({
				cours_id: Type.String(),
				user_id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const { cours_id, user_id } = request.body as any;
			const connect = await prismaClient.cours.update({
				where: {
					cours_id: cours_id,
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
