import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($eventId: String!) {
    getEvent(eventId: $eventId) {
      id
      title
      date
      duration
      timestamp
      coverImgUrl
      organizer {
        id
        username
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query getEvents {
    getEvents {
      id
      title
      date
      duration
      timestamp
      coverImgUrl
      organizer {
        id
        username
        profileImgUrl
      }
    }
  }
`;

export const GET_EVENT_FEEDS = gql`
  query getEventFeeds($eventId: String!) {
    getEventFeeds(eventId: $eventId) {
      id
      body
      timestamp
      media {
        id
        mediaUrl
      }
      user {
        id
        username
        profileImgUrl
      }
      event {
        id
        title
      }
      comments {
        id
        body
      }
    }
  }
`;

export const GET_FEEDS = gql`
  query getFeeds {
    getFeeds {
      id
      body
      timestamp
      media {
        id
        mediaUrl
      }
      user {
        id
        username
        profileImgUrl
        coverImgUrl
      }
      event {
        id
        title
        timestamp
      }
      comments {
        id
      }
    }
  }
`;

export const GET_USER_FEEDS = gql`
  query getUserFeeds($userId: String!) {
    getUserFeeds(userId: $userId) {
      id
      body
      timestamp
      media {
        id
        mediaUrl
      }
      user {
        id
        username
        profileImgUrl
      }
      event {
        id
        title
      }
      comments {
        id
        body
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID) {
    getUser(userId: $userId) {
      id
      username
      email
      profileImgUrl
      coverImgUrl
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      timestamp
      profileImgUrl
      coverImgUrl
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
      timestamp
      profileImgUrl
      coverImgUrl
      token
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $username: String
    $email: String
    $coverImgUrl: String
    $profileImgUrl: String
    $password: String!
  ) {
    updateAccount(
      username: $username
      email: $email
      profileImgUrl: $profileImgUrl
      coverImgUrl: $coverImgUrl
      password: $password
    ) {
      id
      username
      email
      profileImgUrl
      coverImgUrl
      timestamp
    }
  }
`;

// query getUser {
//   getUser(userId: "5fd630651160e72db81b7808") {
//     id
//     username
//     email
//     profileImgUrl
//     coverImgUrl
//   }
// }

// mutation deleteAccount {
//   deleteAccount(password: "Famous10")
// }
