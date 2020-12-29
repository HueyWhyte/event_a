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
        profileImgUrl
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

export const ADD_EVENT = gql`
  mutation addEvent($title: String!, $date: String!, $duration: String!) {
    addEvent(title: $title, date: $date, duration: $duration) {
      id
      title
      date
      duration
      coverImgUrl
      timestamp
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId)
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

export const GET_FEED = gql`
  query getFeed($feedId: String!) {
    getFeed(feedId: $feedId) {
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
        user {
          id
          username
          coverImgUrl
        }
        timestamp
      }
    }
  }
`;

export const SEARCH = gql`
  mutation searchFeeds($searchWord: String!) {
    searchFeeds(searchWord: $searchWord) {
      id
      body
      timestamp
      user {
        id
        username
        profileImgUrl
      }
      event {
        id
        title
      }
    }
  }
`;

export const ADD_FEED = gql`
  mutation addFeed($body: String!, $eventId: String!) {
    addFeed(body: $body, eventId: $eventId) {
      id
      body
      timestamp
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($feedId: ID!, $body: String!) {
    addComment(feedId: $feedId, body: $body) {
      id
      comments {
        id
        body
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

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password)
  }
`;
