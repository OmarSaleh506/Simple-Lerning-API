import { FastifyInstance } from 'fastify';
import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../prisma';
import { Course, CoursParams } from '../../TypeObject/TypeObjectCours'
import { ObjectId } from 'bson';
import { Type } from '@sinclair/typebox';



export default async function(server: FastifyInstance){
    //addAuthorization(server);
    server.route({
        method: 'GET',
        url: '/cours/:cours_id',
        schema: {
            summary: 'Returns one cours or null',
            tags: ['cours'],
            params: CoursParams,
            response: {
                '2xx': Type.Union([Course, Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const { cours_id } = request.params as CoursParams;
            if (!ObjectId.isValid(cours_id)) {
                reply.badRequest('cours_id should be an ObjectId!');
                return;
            }
    
            return prismaClient.cours.findFirst({
                where: { cours_id },
            });
        },
    });
}
    