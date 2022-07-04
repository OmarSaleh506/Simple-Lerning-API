import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/mySub',
        schema: {
            summary: "",
            tags: ["mySubscriptions"]
        },
        handler: async (request, reply) => {

        }
    })
}