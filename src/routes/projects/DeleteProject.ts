import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { addAuthorization } from '../../hooks/auth';
import { ProjectParams } from '../../TypeObject/TypeObjectProject'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
        method: 'DELETE',
        url: '/project/:project_id',
        schema: {
            summary: 'Deletes a project',
            tags: ['project'],
            params: ProjectParams,
        },
        handler: async (request, reply) => {
            const { project_id } = request.params as ProjectParams;
            if (!ObjectId.isValid(project_id)) {
                reply.badRequest('project_id should be an ObjectId!');
                return;
            }
    
            return prismaClient.project.delete({
                where: { project_id },
            });
        },
    });
}
    