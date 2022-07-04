import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { addAuthorization } from '../../hooks/auth';
import { CoursParams } from '../../TypeObject/TypeObjectCours';
import { ObjectId } from 'bson';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'DELETE',
		url: '/cours/:cours_id',
		schema: {
			summary: 'Deletes a cours',
			tags: ['cours'],
			params: CoursParams,
		},
		handler: async (request, reply) => {
			const { cours_id } = request.params as CoursParams;
			if (!ObjectId.isValid(cours_id)) {
				reply.badRequest('cours_id should be an ObjectId!');
				return;
			}

			return prismaClient.cours.delete({
				where: { cours_id },
			});
		},
	});
}
