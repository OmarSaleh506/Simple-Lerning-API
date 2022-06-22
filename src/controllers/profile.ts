import { profiles } from "../routes/profile";

export function upsertProfileController(contacts: any[], newprofile: any) {
	const profileIndex = profiles.findIndex((el) => el.id === newprofile.id);
	if (profileIndex === -1) {
		contacts.push(newprofile);
	} else {
		profiles[profileIndex] = {
			...profiles[profileIndex],
			...profiles,
		};
	}
	return profiles;
}