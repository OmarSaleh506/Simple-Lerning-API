
import { FastifyInstance } from 'fastify';


export default async function(server: FastifyInstance){
    server.route({
        method: "GET",
        url: '/verify',
        schema: {
            summary: "",
            tags: ["user"]
        },
        handler: async (request, reply) => {

        }
    })
}