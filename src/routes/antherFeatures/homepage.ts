import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/homepage',
        schema: {
            summary: "",
            tags: ["homepage"]
        },
        handler: async (request, reply) => {

        }
    })
}