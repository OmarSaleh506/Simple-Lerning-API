import { FastifyInstance } from 'fastify';
//import { addAuthorization } from '../../hooks/auth';
import { UserWithoutId } from '../../TypeObject/TypeOpjectUser';
import { prismaClient } from '../../prisma';
import bcrypt from 'bcrypt';

// import * as jwt from 'jsonwebtoken';

const saltRounds = 10;

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/SignUp',
		schema: {
			summary: 'user registration',
			tags: ['user'],
			body: UserWithoutId,
		},
		handler: async (request, reply) => {
			const user = request.body as UserWithoutId;
			const hashpassword = await bcrypt.hashSync(user.password, saltRounds);
			return await prismaClient.user.create({
				data: {
					...user,
					password: hashpassword,
				},
			});
		},
	});
}
