import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ name, email, password, username, location, avatarURL, githubUsername }
		) => {
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								username, // ES6
							},
							{
								email,
							},
						],
					},
				});
				//console.log(existingUser);
				if (existingUser) {
					throw new Error("This username/password si already taken.");
				}
				// hash password
				const uglyPassword = await bcrypt.hash(password, 10);
				const newUser = await client.user.create({
					// 브라우저는 응답을 기다리므로 여기서 await는 생략가능
					data: {
						name,
						email,
						password: uglyPassword,
						username,
						location,
						avatarURL,
						githubUsername,
					},
				});
				console.log(newUser);
				if (newUser) {
					const ok = true;
					return { ok };
				} else {
					throw new Error("Creat Accout failure.");
				}
				// save and return the user
			} catch (e) {
				const ok = false;
				return {
					ok,
					error: String(e),
				};
			}
			// check if username or email are already on DB
		},
	},
};
