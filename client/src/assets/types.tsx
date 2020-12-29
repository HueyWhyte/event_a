export type UserProps = {
  /** ID of user */
  id: string;
  /** user's username */
  username: string;
  /** user's email address */
  email: string;
  /** user's profile image url */
  profileImgUrl: string;
  /** user's cover image url */
  coverImgUrl: string;
  token: string;
};

export type FeedProps = {
  /** the ID of the feed */
  id: string;
  /** body of the feed */
  body: string;
  /** timestamp of the feed */
  timestamp: string;
  /** contains list of all media of a feed */
  media: [
    {
      id: string;
      /** media url */
      mediaUrl: string;
    }
  ];
  /** Title and ID of an Event */
  event: {
    id: string;
    /** Event title */
    title: string;
  };
  /** User that posted the feed: Object{} */
  user: UserProps;
  comments: [
    {
      id: string;
      body: string;
      timestamp: string;
      user: UserProps;
    }
  ];
};

export type EventProps = {
  id: string;
  title: string;
  date: string;
  duration: string;
  coverImgUrl: string;
  organizer: UserProps;
};
