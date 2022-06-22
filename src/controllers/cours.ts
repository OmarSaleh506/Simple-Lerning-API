import { course } from "../routes/cours";

export function upsertCoursController(contacts: any[], newcours: any) {
	const coursIndex = course.findIndex((el) => el.id === newcours.id);
	if (coursIndex === -1) {
		contacts.push(newcours);
	} else {
		course[coursIndex] = {
			...course[coursIndex],
			...newcours,
		};
	}
	return course;
}
