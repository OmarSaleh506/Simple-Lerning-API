import { Static, Type } from '@sinclair/typebox';

export const Course = Type.Object({
	cours_id: Type.Optional(Type.String()),
	name: Type.String(),
	description: Type.String(),
	lessons: Type.String(),
});
export const CoursWithoutId = Type.Object({
	name: Type.String(),
	description: Type.String(),
	lessons: Type.String(),
});
export type CoursWithoutId = Static<typeof CoursWithoutId>;
export const PartialCoursWithoutId = Type.Partial(CoursWithoutId);
export type PartialCoursWithoutId = Static<typeof PartialCoursWithoutId>;

export type GetCoursQuery = Static<typeof GetCoursQuery>;
export const GetCoursQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
export const CoursParams = Type.Object({
	cours_id: Type.String(),
});
export type CoursParams = Static<typeof CoursParams>;
