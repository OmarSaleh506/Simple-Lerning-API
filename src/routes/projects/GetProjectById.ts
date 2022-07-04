import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Projects, ProjectParams } from '../../TypeObject/TypeObjectProject'
import { ObjectId } from 'bson';
import { Type } from '@sinclair/typebox';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
        method: 'GET',
        url: '/project/:project_id',
        schema: {
            summary: 'Returns one project or null',
            tags: ['project'],
            params: ProjectParams,
            response: {
                '2xx': Type.Union([Projects, Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const { project_id } = request.params as ProjectParams;
            if (!ObjectId.isValid(project_id)) {
                reply.badRequest('project_id should be an ObjectId!');
                return;
            }
    
            return prismaClient.project.findFirst({
                where: { project_id },
            });
        },
    });
}
    