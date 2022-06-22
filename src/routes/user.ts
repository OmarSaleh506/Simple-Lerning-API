import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertUserController } from '../controllers/user';


const GetuserQuery = Type.Object({
    name: Type.Optional(Type.String()),
});
const user = Type.Object({
    id: Type.String({ format:'uuid' }),
    name: Type.String(),
})
type user = Static<typeof user>;
type GetuserQuery = Static<typeof GetuserQuery>


export let users: user[] = [
    {id: '1', name: 'omar'},
    {id: '2', name: 'ahmed'},
	{id: '3', name: 'ali'},
	{id: '4', name: 'saad'}
]
export default async function(server: FastifyInstance){
    server.route({
    method: 'GET',
    url: '/user',
    schema : {
        summary: 'get all user',
        tags : ['user'],
        querystring : GetuserQuery,
        response: {
            '2xx': Type.Array(user)
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetuserQuery;

        if (query.name) {
            return users.filter((c) => c.name.includes(query.name ?? ''));
        } else {
            return user;
        }
    },
}),
server.route({
    method: 'PUT',
    url: '/user',
    schema: {
        summary: 'Creates new user + all properties are required',
        tags: ['user'],
        body: user,
    },
    handler: async (request, reply) => {
        const newuser: any = request.body;
        return upsertUserController(users, newuser);
    },
});
}
