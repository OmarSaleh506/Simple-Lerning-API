import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { CoursWithoutId } from '../../TypeObject/TypeObjectCours';
import { prismaClient } from '../../prisma';

export default async function (server: FastifyInstance) {
	addAuthorization(server);

	server.route({
		method: 'POST',
		url: '/cours',
		schema: {
			summary: 'Creates new cours',
			tags: ['cours'],
			body: CoursWithoutId,
		},
		handler: async (request, reply) => {
			const cours = request.body as CoursWithoutId;
			return await prismaClient.cours.create({
				data: cours,
			});
		},
	});
}
