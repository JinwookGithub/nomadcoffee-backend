import { gql } from 'apollo-server';

export default gql`
	type Coffee {
		id: Int!
		title: String!
		price: Int!
	}
	type Query {
		coffees: [Coffee]
		coffee(id: Int!): Coffee
	}
	type Mutation {
		createMenu(title: String!, price: Int!): Coffee
		deleteMenu(id: Int!): Coffee
		updateMenu(id: Int!, price: Int!): Coffee
	}
`;
