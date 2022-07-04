import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/readcontent',
        schema: {
            summary: "",
            tags: ["readcontent"]
        },
        handler: async (request, reply) => {

        }
    })
}