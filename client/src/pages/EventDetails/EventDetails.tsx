import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./style.css";
import { FeedProps, EventProps } from "../../assets/types";
import { GET_EVENT, GET_EVENT_FEEDS } from "../../assets/queries";
import FeedCard from "../../components/FeedCard/FeedCard";

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { loading, data, error } = useQuery(GET_EVENT, {
    variables: { eventId },
    pollInterval: 5000,
  });

  const { loading: ld, data: feeds, error: er } = useQuery(GET_EVENT_FEEDS, {
    variables: { eventId },
    pollInterval: 5000,
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: Evant Cannot be found!...</h1>;
  let myEvent: EventProps = data.getEvent;

  if (ld) return <h1>Feeds Loading...</h1>;
  if (er) return <h1>Error Feeds...</h1>;
  let myFeeds: [FeedProps] = feeds.getEventFeeds;

  return (
    <div className="EventDetails">
      <section
        className="event_details_banner"
        style={{
          background: `linear-gradient(#ffffff00, #ffffffef, white), url(${myEvent.coverImgUrl})`,
          backgroundSize: "cover",
        }}
      >
        <h1 style={{ fontSize: "2.5em", marginTop: "auto" }}>
          {myEvent.title}
        </h1>
        <p>Date: {myEvent.date}</p>
        <p>Duration: {myEvent.duration}</p>
        <p>Organizer: {myEvent.organizer.username}</p>
      </section>

      <section className="event_feeds_container">
        {myFeeds &&
          myFeeds.map((feed: FeedProps) => (
            <FeedCard key={feed.id} {...feed} />
          ))}
      </section>
    </div>
  );
};

export default EventDetails;
