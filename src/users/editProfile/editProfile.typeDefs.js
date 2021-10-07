import { gql } from "apollo-server";

export default gql`
	type EditProfileResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		editProfile(
			name: String
			username: String
			email: String
			location: String
			password: String
			avatarURL: Upload
			githubUsername: String
		): EditProfileResult!
	}
`;
