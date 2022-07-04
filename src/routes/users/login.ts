import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { prismaClient } from '../../prisma';
import bcrypt from 'bcrypt';
import { ObjectId } from 'bson';

export const tokens: string[] = [];
export const tokenUsers: { [token: string]: string } = {};

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
				return { mes: 'incorrect password' };
			}
			const newToken = new ObjectId().toHexString();

			tokens.push(newToken);
			tokenUsers[newToken] = email;

			return newToken;
		},
	});
}
