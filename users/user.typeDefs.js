import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    name: String!
    username: String!
    email: String!
    location: String!
    avatarURL: String
    githubUsername: String
    following: [User]
    followers: [User]
  }
`;
