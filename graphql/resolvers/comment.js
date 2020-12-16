const { UserInputError, AuthenticationError } = require("apollo-server");

const Feed = require("../../models/Feed");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    addComment: async (_, { feedId, body }, context) => {
      const user = checkAuth(context);

      const feed = await Feed.findById(feedId);

      if (feed) {
        try {
          feed.comments.unshift({ body, user: user.id });
          await feed.save();
          return feed;
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new UserInputError("Feed not Found!");
      }
    },

    updateComment: async (_, {}, context) => {
      const user = checkAuth(context);
    },

    deleteComment: async (_, { feedId, commentId }, context) => {
      const user = checkAuth(context);
      const feed = await Feed.findById(feedId);

      if (feed) {
        const commentIndex = feed.comments.findIndex((c) => c.id === commentId);

        if (feed.comments[commentIndex].user == user.id) {
          feed.comments.splice(commentIndex, 1);
          await feed.save();
          return feed;
        } else {
          throw new AuthenticationError("Action not Allowed");
        }
      } else {
        throw new UserInputError("Feed not Found!");
      }
    },
  },
};
