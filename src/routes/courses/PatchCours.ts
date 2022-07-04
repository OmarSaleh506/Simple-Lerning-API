import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { PartialCoursWithoutId, CoursParams } from '../../TypeObject/TypeObjectCours';
import { ObjectId } from 'bson';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'PATCH',
		url: '/cours/:cours_id',
		schema: {
			summary: 'Update a cours by id + you dont need to pass all properties',
			tags: ['cours'],
			body: PartialCoursWithoutId,
			params: CoursParams,
		},
		handler: async (request, reply) => {
			const { cours_id } = request.params as CoursParams;
			if (!ObjectId.isValid(cours_id)) {
				reply.badRequest('cours_id should be an ObjectId!');
				return;
			}

			const cours = request.body as PartialCoursWithoutId;

			return prismaClient.cours.update({
				where: { cours_id },
				data: cours,
			});
		},
	});
}
