import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
import { Course } from '../../TypeObject/TypeObjectCours';
import { addAuthorization } from '../../hooks/auth';
import { Cours } from '@prisma/client';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'PUT',
		url: '/cours',
		schema: {
			summary: 'Creates new cours + all properties are required',
			tags: ['cours'],
			body: Course,
		},
		handler: async (request, reply) => {
			const cours = request.body as Cours;
			if (!ObjectId.isValid(cours.cours_id)) {
				reply.badRequest('cours_id should be an ObjectId!');
			} else {
				return await prismaClient.cours.upsert({
					where: { cours_id: cours.cours_id },
					create: cours,
					update: _.omit(cours, ['cours_id']),
				});
			}
		},
	});
}
