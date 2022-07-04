import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { PartialTrackWithoutId, TrackParams } from '../../TypeObject/TypeObjectTrack'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
   // addAuthorization(server);

    server.route({
        method: 'PATCH',
        url: '/track/:track_id',
        schema: {
            summary: 'Update a track by id + you dont need to pass all properties',
            tags: ['track'],
            body: PartialTrackWithoutId,
            params: TrackParams,
        },
        handler: async (request, reply) => {
            const { track_id } = request.params as TrackParams;
            if (!ObjectId.isValid(track_id)) {
                reply.badRequest('track_id should be an ObjectId!');
                return;
            }
    
            const track = request.body as PartialTrackWithoutId;
    
            return prismaClient.track.update({
                where: { track_id },
                data: track,
            });
        },
    });
}