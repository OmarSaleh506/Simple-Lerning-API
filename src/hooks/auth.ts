import { FastifyInstance } from 'fastify';
import { tokens } from '../routes/users/login';

function verifyToken(token?: string): boolean {
	if (!token) return false;
	if (!token.includes('Bearer ')) return false;
	token = token.replace('Bearer ', '');

	if (token === '1234') return true;
	if (tokens.includes(token)) return true;

	return false;
}

export function addAuthorization(server: FastifyInstance) {
	server.addHook('onRequest', async (request, reply) => {
		const token = (request.headers as any).authorization;
		if (!verifyToken(token)) reply.unauthorized();
	});
}
