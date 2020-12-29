const { UserInputError, AuthenticationError } = require("apollo-server");

const Event = require("../../models/Event");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getEvents: async () => {
      try {
        let events = await Event.find()
          .sort("-timestamp")
          .populate("organizer");
        return events;
      } catch (error) {
        throw new Error(error);
      }
    },

    getEvent: async (_, { eventId }) => {
      try {
        let event = await Event.findById(eventId).populate("organizer");
        return event;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    addEvent: async (_, { title, date, duration, coverImgUrl }, context) => {
      const user = checkAuth(context);

      if (title.trim() == "" || date.trim() == "" || duration.trim() == "")
        throw new UserInputError("No field shoud be empty!");

      let newEvent = new Event({
        title,
        organizer: user.id,
        date,
        coverImgUrl,
        duration,
      });

      let event = await newEvent.save();
      return event;
    },

    updateEvent: async (
      _,
      { eventId, title, date, coverImgUrl, duration },
      context
    ) => {
      const user = checkAuth(context);

      let event = await Event.findById(eventId);
      if (!event) throw new UserInputError("Event not Found!");

      if (title.trim() != "") event.title = title;
      if (date.trim() != "") event.date = date;
      if (duration.trim() != "") event.duration = duration;
      if (coverImgUrl.trim() != "") event.coverImgUrl = coverImgUrl;

      if (event.organizer == user.id) {
        try {
          await event.save();
          return event;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new AuthenticationError("Action not Allowed!");
      }
    },

    deleteEvent: async (_, { eventId }, context) => {
      const user = checkAuth(context);

      let event = await Event.findById(eventId);

      if (!event) throw new UserInputError("Event not Found!");

      if (event.organizer.toString() == user.id.toString()) {
        try {
          await event.remove();
          return "Event deleted";
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new AuthenticationError("Action not Allowed!");
      }
    },
  },
};
