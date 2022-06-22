import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertCoursController } from '../controllers/cours';


const GetcoursQuery = Type.Object({
    name: Type.Optional(Type.String()),
});
const cours = Type.Object({
    id: Type.String({ format:'uuid' }),
    name: Type.String(),
})
type cours = Static<typeof cours>;
type GetcoursQuery = Static<typeof GetcoursQuery>


export let course: cours[] = [
    {id: '3fa85f64-5717-4562-b3fc-2c963f66afa9', name: 'typescript'},
    {id: '3fa85f64-5717-4562-b3fc-2c963f66afa7', name: 'javascript'}
]
export default async function(server: FastifyInstance){
    server.route({
    method: 'GET',
    url: '/cours',
    schema : {
        summary: 'get all cours',
        tags : ['cours'],
        querystring : GetcoursQuery,
        response: {
            '2xx': Type.Array(cours)
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetcoursQuery;

        if (query.name) {
            return course.filter((c) => c.name.includes(query.name ?? ''));
        } else {
            return cours;
        }
    },
}),
server.route({
    method: 'PUT',
    url: '/cours',
    schema: {
        summary: 'Creates new cours + all properties are required',
        tags: ['cours'],
        body: cours,
    },
    handler: async (request, reply) => {
        const newcours: any = request.body;
        return upsertCoursController(course, newcours);
    },
});
server.route({
    method: 'PATCH',
    url: '/cours/:id',
    schema: {
        summary: 'Update a cours by id + you dont need to pass all properties',
        tags: ['cours'],
        body: Type.Partial(cours),
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },
    handler: async (request, reply) => {
        const newcours: any = request.body;
        return upsertCoursController(course, newcours);
    },
});

server.route({
    method: 'DELETE',
    url: '/cours/:id',
    schema: {
        summary: 'Deletes a cours',
        tags: ['cours'],
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },
    handler: async (request, reply) => {
        const id = (request.params as any).id as string;

        course = course.filter((c) => c.id !== id);

        return course;
    },
});
}

