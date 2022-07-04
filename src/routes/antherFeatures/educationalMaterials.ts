import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/educationMaterials',
        schema: {
            summary: "get cours and tracks and project",
            tags: ["educationMaterials"]
        },
        handler: async (request, reply) => {

        }
    })
}