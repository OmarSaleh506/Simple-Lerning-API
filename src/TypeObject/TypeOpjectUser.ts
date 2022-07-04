import { Static, Type } from '@sinclair/typebox';

export const Users = Type.Object({
	user_id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	password: Type.String(),
	secret_key: Type.Optional(Type.String()),
	profile: Type.Optional(Type.String()),
	cours: Type.Optional(Type.String()),
	track: Type.Optional(Type.String()),
	Project: Type.Optional(Type.String()),
});
export const UserWithoutId = Type.Object({
	name: Type.String(),
	email: Type.String(),
	password: Type.String(),
	secret_key: Type.Optional(Type.String()),
	profile: Type.Optional(Type.String()),
	cours: Type.Optional(Type.String()),
	track: Type.Optional(Type.String()),
	Project: Type.Optional(Type.String()),
});

export type UserWithoutId = Static<typeof UserWithoutId>;
export const PartialUserWithoutId = Type.Partial(UserWithoutId);
export type PartialUserWithoutId = Static<typeof PartialUserWithoutId>;

export type GetUserQuery = Static<typeof GetUserQuery>;
export const GetUserQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
export const UserParams = Type.Object({
	user_id: Type.String(),
});
export type UserParams = Static<typeof UserParams>;
