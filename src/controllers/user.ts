import { users } from "../routes/user";

export function upsertUserController(user: any[], newuser: any) {
	const userIndex = user.findIndex((el) => el.id === newuser.id);
	if (userIndex === -1) {
		users.push(newuser);
	} else {
		users[userIndex] = {
			...users[userIndex],
			...newuser,
		};
	}
	return users;
}