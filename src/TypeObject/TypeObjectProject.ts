import { Static, Type } from '@sinclair/typebox';

export const Projects = Type.Object({
	project_id: Type.Optional(Type.String()),
	name: Type.String(),
	description: Type.String(),
	readcontent: Type.Boolean(),
});

export const ProjectWithoutId = Type.Object({
	name: Type.String(),
	description: Type.String(),
});
export type ProjectWithoutId = Static<typeof ProjectWithoutId>;
export const PartialProjectWithoutId = Type.Partial(ProjectWithoutId);
export type PartialProjectWithoutId = Static<typeof PartialProjectWithoutId>;

export type GetProjectQuery = Static<typeof GetProjectQuery>;

export const GetProjectQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
export const ProjectParams = Type.Object({
	project_id: Type.String(),
});
export type ProjectParams = Static<typeof ProjectParams>;
