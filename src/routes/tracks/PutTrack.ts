import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
import { Tracks } from '../../TypeObject/TypeObjectTrack';
import { addAuthorization } from '../../hooks/auth';
import { Track } from '@prisma/client';
import _ from 'lodash';

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	server.route({
		method: 'PUT',
		url: '/track',
		schema: {
			summary: 'Creates new track + all properties are required',
			tags: ['track'],
			body: Tracks,
		},
		handler: async (request, reply) => {
			const track = request.body as Track;
			if (!ObjectId.isValid(track.track_id)) {
				reply.badRequest('track_id should be an ObjectId!');
			} else {
				return await prismaClient.track.upsert({
					where: { track_id: track.track_id },
					create: track,
					update: _.omit(track, ['track_id']),
				});
			}
		},
	});
}
