import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Tracks, GetTrackQuery } from '../../TypeObject/TypeObjectTrack';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { Track } from '@prisma/client';

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
	server.route({
		method: 'GET',
		url: '/track',
		schema: {
			summary: 'Gets  track by name',
			tags: ['track'],
			querystring: GetTrackQuery,
			response: {
				'2xx': Type.Array(Tracks),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetTrackQuery;

			const tracks = await prismaClient.track.findMany();
			if (!query.text) return tracks;

			const fuse = new Fuse(tracks, {
				includeScore: true,
				isCaseSensitive: false,
				keys: ['name'],
			});

			const result: Track[] = fuse.search(query.text).map((r) => r.item);
			return result;
		},
	});
}
