import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { addAuthorization } from '../../hooks/auth';
import { TrackParams } from '../../TypeObject/TypeObjectTrack'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
     //addAuthorization(server);
     server.route({
        method: 'DELETE',
        url: '/track/:track_id',
        schema: {
            summary: 'Deletes a track',
            tags: ['track'],
            params: TrackParams,
        },
        handler: async (request, reply) => {
            const { track_id } = request.params as TrackParams;
            if (!ObjectId.isValid(track_id)) {
                reply.badRequest('track_id should be an ObjectId!');
                return;
            }
    
            return prismaClient.track.delete({
                where: { track_id },
            });
        },
    });
}
   