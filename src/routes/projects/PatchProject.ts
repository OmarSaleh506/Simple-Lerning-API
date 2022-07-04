import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { PartialProjectWithoutId, ProjectParams } from '../../TypeObject/TypeObjectProject'
import { ObjectId } from 'bson';

export default async function(server: FastifyInstance){
     //addAuthorization(server);
     server.route({
        method: 'PATCH',
        url: '/project/:project_id',
        schema: {
            summary: 'Update a project by id + you dont need to pass all properties',
            tags: ['project'],
            body: PartialProjectWithoutId,
            params: ProjectParams,
        },
        handler: async (request, reply) => {
            const { project_id } = request.params as ProjectParams;
            if (!ObjectId.isValid(project_id)) {
                reply.badRequest('Project_id should be an ObjectId!');
                return;
            }
    
            const project = request.body as PartialProjectWithoutId;
    
            return prismaClient.project.update({
                where: { project_id },
                data: project,
            });
        },
    });
}
   