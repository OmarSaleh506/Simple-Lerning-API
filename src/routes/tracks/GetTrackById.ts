import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Tracks, TrackParams } from '../../TypeObject/TypeObjectTrack'
import { ObjectId } from 'bson';
import { Type } from '@sinclair/typebox';


export default async function(server: FastifyInstance){
        //addAuthorization(server);

        server.route({
            method: 'GET',
            url: '/track/:track_id',
            schema: {
                summary: 'Returns one track or null',
                tags: ['track'],
                params: TrackParams,
                response: {
                    '2xx': Type.Union([Tracks, Type.Null()]),
                },
            },
            handler: async (request, reply) => {
                const { track_id } = request.params as TrackParams;
                if (!ObjectId.isValid(track_id)) {
                    reply.badRequest('track_id should be an ObjectId!');
                    return;
                }
        
                return prismaClient.track.findFirst({
                    where: { track_id },
                });
            },
        });
}
