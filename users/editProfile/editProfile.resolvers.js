import { createWriteStream } from "fs"; //file system
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
	_,
	{
		name,
		username,
		email,
		location,
		password: newPassword,
		avatarURL,
		githubUsername,
	}, // rename
	{ loggedInUser }
) => {
	// console.log(loggedInUser);
	let avatarUrl = null;
	if (avatarURL) {
		// console.log(avatarURL); // Promise 타입
		const { filename, createReadStream } = await avatarURL;
		const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
		const readStream = createReadStream(); // reading file
		// console.log(stream);
		const writeStream = createWriteStream(
			process.cwd() + "/uploads/" + newFilename
		);
		readStream.pipe(writeStream); // 위의 path에 write. pipe로 받은걸 흘려보냄(연결).
		avatarUrl = `http://localhost:5000/static/${newFilename}`;
	}
	let uglyPassword = null;
	if (newPassword) {
		// password 변경시
		uglyPassword = await bcrypt.hash(newPassword, 10);
	}
	const updateUser = await client.user.update({
		// user return
		where: {
			id: loggedInUser.id,
		},
		data: {
			name,
			username,
			email,
			location,
			...(uglyPassword && { password: uglyPassword }), // ES6
			...(avatarUrl && { avatarURL: avatarUrl }),
			githubUsername,
		},
	});
	if (updateUser.id) {
		return {
			ok: true,
		};
	} else {
		return {
			ok: false,
			error: "Could not update Profile",
		};
	}
};

export default {
	Mutation: {
		editProfile: protectedResolver(resolverFn),
	},
};
