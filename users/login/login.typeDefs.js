import { gql } from "apollo-server";

export default gql`
	type LoginResult {
		ok: Boolean!
		token: String
		error: String
	}

	type Mutation {
		login(username: String!, password: String!): LoginResult!
	}
`;
// password는 graphql에 불필요. 묻지않음
