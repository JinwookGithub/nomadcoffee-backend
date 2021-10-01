import { gql } from "apollo-server";

export default gql`
	type CreateAccountResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		createAccount(
			name: String!
			username: String!
			email: String!
			location: String!
			password: String!
			avatarURL: String
			githubUsername: String
		): CreateAccountResult!
	}
`;
// password는 graphql에 불필요. 묻지않음
