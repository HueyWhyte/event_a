const { UserInputError, AuthenticationError } = require("apollo-server");

const Feed = require("../../models/Feed");
const Event = require("../../models/Event");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getFeeds: async () => {
      try {
        let feeds = await Feed.find()
          .sort("-timestamp")
          .populate("user")
          .populate("event");
        return feeds;
      } catch (error) {
        throw new Error(error);
      }
    },

    getFeed: async (_, { feedId }) => {
      try {
        let feed = await Feed.findById(feedId)
          .populate("user")
          .populate("event");
        return feed;
      } catch (error) {
        throw new Error(error);
      }
    },

    getEventFeeds: async (_, { eventId }) => {
      let eventFeeds = await Feed.find({ event: eventId })
        .sort("-timestamp")
        .populate("user")
        .populate("event");
      return eventFeeds;
    },

    getUserFeeds: async (_, { userId }) => {
      let userFeeds = await Feed.find({ user: userId })
        .sort("-timestamp")
        .populate("user")
        .populate("event");
      return userFeeds;
    },
  },

  Mutation: {
    addFeed: async (_, { body, eventId, mediaUrl }, context) => {
      const user = checkAuth(context);

      let event = await Event.findById(eventId);
      if (!event) throw new UserInputError("Event cannot be Found!");

      if (body.trim() == "")
        throw new UserInputError("Body field should not be empty!");

      let newFeed = new Feed({
        body,
        event: eventId,
        user: user.id,
      });

      let feed = await newFeed.save();

      // if (mediaUrl.trim() == "")  throw new UserInputError("Body field should not be empty!");

      if (feed) {
        try {
          feed.media.unshift({ mediaUrl });
          await feed.save();
          return feed;
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new UserInputError("Feed not Found!");
      }

      // return feed;
    },

    updateFeed: async (_, { feedId, body }, context) => {
      const user = checkAuth(context);

      let feed = await Feed.findById(feedId);
      if (!feed) throw new UserInputError("Feed not Found!");

      if (feed.user == user.id) {
        feed.body = body;
        // feed.user = user.id;

        try {
          await feed.save();
          return feed;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new AuthenticationError("Action not Allowed!");
      }
    },

    deleteFeed: async (_, { feedId }, context) => {
      const user = checkAuth(context);

      let feed = await Feed.findById(feedId);

      if (!feed) throw new UserInputError("Feed not Found!");
      if (feed.user == user.id) {
        try {
          await feed.remove();
          return "Feed deleted";
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new AuthenticationError("Action not Allowed!");
      }
    },
  },
};
