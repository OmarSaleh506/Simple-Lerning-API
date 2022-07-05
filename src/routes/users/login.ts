import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { prismaClient } from '../../prisma';
import bcrypt from 'bcrypt';

export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login  user ',
			tags: ['user'],
			body: Type.Object({
				email: Type.String(),
				password: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const { email, password } = request.body as any;
			const findUser = await prismaClient.user.findFirst({
				where: {
					email,
				},
			});
			if (!findUser) {
				return { mes: 'user not found' };
			}
			const correct = await bcrypt.compare(password, findUser?.password as string);
			if (!correct) {
				reply.unauthorized("mes: 'incorrect password'");
				return;
			}

			const token = server.jwt.sign({
				id: findUser.user_id,
				email: findUser.email,
				name: findUser.name,
			});
			return {
				id: findUser.user_id,
				token,
				type: 'SignIn',
				role: findUser.role,
			};
		},
	});
}
