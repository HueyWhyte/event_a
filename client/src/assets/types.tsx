export type FeedProps = {
  /** the ID of the feed */
  id: string;
  /** body of the feed */
  body: string;
  timestamp: string;
  /** contains list of all media of a feed */
  media: [
    {
      id: string;
      mediaUrl: string;
    }
  ];
  /** Titlew and ID of an Event */
  event: {
    id: string;
    title: string;
  };
  /** User that posted the feed: Object{} */
  user: {
    id: string;
    username: string;
    profileImgUrl: string;
    coverImgUrl: string;
  };
};

export type EventProps = {
  id: string;
  title: string;
  date: string;
  duration: string;
  coverImgUrl: string;
  organizer: {
    id: string;
    username: string;
    profileImgUrl: string;
  };
};

export type UserProps = {
  id: string;
  username: string;
  email: string;
  profileImgUrl: string;
  coverImgUrl: string;
  token: string;
};
