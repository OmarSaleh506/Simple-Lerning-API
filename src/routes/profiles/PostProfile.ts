import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { ProfileWithoutId } from '../../TypeObject/TypeObjectProfile'
import { prismaClient } from '../../prisma';


export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
		method: 'POST',
		url: '/profile',
		schema: {
			summary: 'Creates new profile',
			tags: ['profile'],
			body: ProfileWithoutId,
		},
		handler: async (request, reply) => {
			const profile = request.body as ProfileWithoutId;
			return await prismaClient.profile.create({
				data: profile,
			});
		},
	});
}
    