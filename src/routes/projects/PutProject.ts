import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { ObjectId } from 'bson';
import { Projects } from '../../TypeObject/TypeObjectProject'
import { addAuthorization } from '../../hooks/auth';
import {  Project } from '@prisma/client'
import _ from 'lodash';

export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
        method: 'PUT',
        url: '/project',
        schema: {
            summary: 'Creates new project + all properties are required',
            tags: ['project'],
            body: Projects,
        },
        handler: async (request, reply) => {
            const project = request.body as Project;
            if (!ObjectId.isValid(project.project_id)) {
                reply.badRequest('project_id should be an ObjectId!');
            } else {
                return await prismaClient.project.upsert({
                    where: { project_id: project.project_id },
                    create: project,
                    update: _.omit(project, ['project_id']),
                });
            }
        },
    });
}
    