import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/lessons',
        schema: {
            summary: "",
            tags: ["lessons"]
        },
        handler: async (request, reply) => {

        }
    })
}