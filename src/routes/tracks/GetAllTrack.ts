import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { Tracks } from '../../TypeObject/TypeObjectTrack';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/tracks',
		schema: {
			summary: 'Gets all Track ',
			tags: ['track'],

			response: {
				'2xx': Type.Array(Tracks),
			},
		},
		handler: async (request, reply) => {
			const Track = await prismaClient.track.findMany();
			return Track;
		},
	});
}
