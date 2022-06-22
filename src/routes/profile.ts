import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertProfileController } from '../controllers/profile';


const GetprofileQuery = Type.Object({
    name: Type.Optional(Type.String()),
});
const profile = Type.Object({
    id: Type.String({ format:'uuid' }),
    name: Type.String(),
})
type profile = Static<typeof profile>;
type GetprofileQuery = Static<typeof GetprofileQuery>


export let profiles: profile[] = [
    {id: '1', name: 'omar'},
    {id: '2', name: 'ahmed'}
]
export default async function(server: FastifyInstance){
    server.route({
    method: 'GET',
    url: '/profile',
    schema : {
        summary: 'get all profile',
        tags : ['profile'],
        querystring : GetprofileQuery,
        response: {
            '2xx': Type.Array(profile)
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetprofileQuery;

        if (query.name) {
            return profiles.filter((c) => c.name.includes(query.name ?? ''));
        } else {
            return profile;
        }
    },
}),
server.route({
    method: 'PUT',
    url: '/profile',
    schema: {
        summary: 'Creates new profile + all properties are required',
        tags: ['profile'],
        body: profile,
    },
    handler: async (request, reply) => {
        const newprofile: any = request.body;
        return upsertProfileController(profiles, newprofile);
    },
});
server.route({
    method: 'PATCH',
    url: '/profile/:id',
    schema: {
        summary: 'Update a profile by id + you dont need to pass all properties',
        tags: ['profile'],
        body: Type.Partial(profile),
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },
    handler: async (request, reply) => {
        const newprofile: any = request.body;
        return upsertProfileController(profiles, newprofile);
    },
});

server.route({
    method: 'DELETE',
    url: '/profile/:id',
    schema: {
        summary: 'Deletes a profile',
        tags: ['profile'],
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },
    handler: async (request, reply) => {
        const id = (request.params as any).id as string;

        profiles = profiles.filter((c) => c.id !== id);

        return profiles;
    },
});
}

