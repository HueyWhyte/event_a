const eventResolvers = require("./event");
const userResolvers = require("./user");
const feedResolvers = require("./feed");
const commentResolvers = require("./comment");

module.exports = {
  Query: {
    ...eventResolvers.Query,
    ...feedResolvers.Query,
    ...userResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...eventResolvers.Mutation,
    ...feedResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
