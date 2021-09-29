import { gql } from 'apollo-server';

export default gql`
	type User {
		id: String!
		name: String!
		username: String!
		email: String!
		location: String!
		avatarURL: String
		githubUsername: String
	}
	type createUserResult {
		ok: Boolean
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
		): createUserResult
	}
	type Query {
		seeProfile(username: String): User
	}
`;
// password는 graphql에 불필요. 묻지않음
