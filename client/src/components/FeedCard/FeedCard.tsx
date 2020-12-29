import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import "./style.css";
import { FeedProps } from "../../assets/types";

// const timeDiff = (current, previous) => {
//   let msPerMin = 60 * 1000;
//   let msPerHr = msPerMin * 60;
//   let msPerDay = msPerHr * 24;
//   let msPerMon = msPerDay * 30;
//   let msPerYr = msPerMon * 365;

//   let elapsed = current - previous;
// };

// const timeSince = (timestamp) => {

// };

const FeedCard: React.FC<FeedProps> = ({
  id,
  body,
  timestamp,
  user,
  event,
  media,
  comments,
}) => {
  return (
    <div className="FeedCard">
      <section style={{ display: "flex", flexDirection: "column" }}>
        <Link
          to={`/profile/${user.id}`}
          style={{ display: "flex", alignItems: "center", marginRight: "auto" }}
        >
          <img
            src={user.profileImgUrl}
            alt=""
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 14,
            }}
          >
            <p>@{user.username}</p>
            <TimeAgo style={{ fontSize: 12 }} date={parseInt(timestamp)} />
          </div>
        </Link>
        <Link to={`/events/${event.id}`} className="event_link">
          e_@{event.title}
        </Link>
      </section>

      <Link to={`/feeds/${id}`} style={{ margin: 8 }}>
        {body}
      </Link>

      {media &&
        media.map((med) => (
          <img
            key={med.id}
            src={med.mediaUrl}
            alt={med.id}
            style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
          />
        ))}

      <section className="actions_container">
        <p>Like</p>
        <p>{comments.length} Comments</p>
        <p>Pin</p>
      </section>
    </div>
  );
};

export default FeedCard;
