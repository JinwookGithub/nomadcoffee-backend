import { gql } from "apollo-server";

export default gql`
  type SeeUserResult {
    ok: Boolean!
    error: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
  type Query {
    seeUser(username: String!, lastId: Int): SeeUserResult!
  }
`;
