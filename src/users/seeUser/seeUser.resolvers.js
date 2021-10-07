import client from "../../client";

export default {
  Query: {
    seeUser: async (_, { username, lastId }, { loggedInUser }) => {
      const { id } = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!id) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user.findUnique({ where: { username } }).following({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      const followers = await client.user.findUnique({ where: { username } }).followers({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      const totalFollowing = await client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
      const isMe = loggedInUser ? id === loggedInUser.id : false;
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      const isFollowing = loggedInUser ? Boolean(exists) : false;
      return {
        ok: true,
        following,
        followers,
        totalFollowing,
        totalFollowers,
        isMe,
        isFollowing,
      };
    },
  },
};
