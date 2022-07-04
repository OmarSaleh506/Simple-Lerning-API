import { Static, Type } from '@sinclair/typebox';

export const Tracks = Type.Object({
	track_id: Type.Optional(Type.String()),
	name: Type.String(),
	description: Type.String(),
	readcontent: Type.Boolean(),
});
export const TrackWithoutId = Type.Object({
	name: Type.String(),
	description: Type.String(),
});

export type TrackWithoutId = Static<typeof TrackWithoutId>;
export const PartialTrackWithoutId = Type.Partial(TrackWithoutId);
export type PartialTrackWithoutId = Static<typeof PartialTrackWithoutId>;

export type GetTrackQuery = Static<typeof GetTrackQuery>;
export const GetTrackQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
export const TrackParams = Type.Object({
	track_id: Type.String(),
});
export type TrackParams = Static<typeof TrackParams>;
