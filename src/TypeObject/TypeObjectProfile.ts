import { Static, Type } from '@sinclair/typebox';

export const Profiles = Type.Object({
	profile_id: Type.Optional(Type.String()),
	first_name: Type.String(),
	last_name: Type.String(),
	age: Type.Integer(),
});
export const ProfileWithoutId = Type.Object({
	first_name: Type.String(),
	last_name: Type.String(),
	age: Type.Integer(),
});

export type ProfileWithoutId = Static<typeof ProfileWithoutId>;
export const PartialProfileWithoutId = Type.Partial(ProfileWithoutId);
export type PartialProfileWithoutId = Static<typeof PartialProfileWithoutId>;

export type GetProfileQuery = Static<typeof GetProfileQuery>;
export const GetProfileQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
export const ProfileParams = Type.Object({
	profile_id: Type.String(),
});
export type ProfileParams = Static<typeof ProfileParams>;
