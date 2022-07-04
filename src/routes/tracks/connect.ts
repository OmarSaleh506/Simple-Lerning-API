import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Type } from '@sinclair/typebox';

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/tracks',
		schema: {
			summary: 'connect between track_id and user_id',
			tags: ['track'],
			body: Type.Object({
				track_id: Type.String(),
				user_id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const { track_id, user_id } = request.body as any;
			const connect = await prismaClient.track.update({
				where: {
					track_id: track_id,
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
