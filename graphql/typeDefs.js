const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
    profileImgUrl: String
    coverImgUrl: String
    timestamp: String!
    token: String!
  }

  type Event {
    id: ID!
    title: String!
    organizer: User!
    date: String!
    duration: String!
    coverImgUrl: String
    timestamp: String!
  }

  type Comment {
    id: ID!
    body: String!
    user: User!
    timestamp: String!
  }

  type Media {
    id: ID!
    mediaUrl: String!
  }

  type Feed {
    id: ID!
    body: String!
    user: User!
    event: Event!
    media: [Media]!
    comments: [Comment]!
    timestamp: String!
  }

  type Query {
    getEvents: [Event]!
    getEvent(eventId: String!): Event!
    getEventFeeds(eventId: String!): [Feed]!
    getUserFeeds(userId: String!): [Feed]!
    getFeeds: [Feed]!
    getFeed(feedId: String!): Feed!
    getUser(userId: ID): User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(username: String!, password: String!): User!
    updateAccount(
      username: String
      email: String
      profileImgUrl: String
      coverImgUrl: String
      password: String!
    ): User!
    deleteAccount(password: String!): String!

    addEvent(
      title: String!
      date: String!
      coverImgUrl: String
      duration: String!
    ): Event!
    updateEvent(
      eventId: ID!
      title: String
      date: String
      duration: String
      coverImgUrl: String
    ): Event!
    deleteEvent(eventId: ID!): String!

    addFeed(body: String!, eventId: String!, mediaUrl: String): Feed!
    updateFeed(feedId: ID!, body: String!): Feed!
    deleteFeed(feedId: ID!): String!

    addComment(feedId: ID!, body: String!): Feed!
    updateComment(feedId: ID!): Feed!
    deleteComment(feedId: ID!, commentId: ID!): String!
  }
`;
