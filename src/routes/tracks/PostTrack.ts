import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { TrackWithoutId } from '../../TypeObject/TypeObjectTrack'
import { prismaClient } from '../../prisma';

export default async function(server: FastifyInstance){
    addAuthorization(server);

server.route({
    method: 'POST',
    url: '/track',
    schema: {
        summary: 'Creates new track ',
        tags: ['track'],
        body: TrackWithoutId,
    },
    handler: async (request, reply) => {
        const track = request.body as TrackWithoutId;
        return await prismaClient.track.create({
            data: track,
        });
    },
});
}


