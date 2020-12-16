import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { FeedProps } from "../../assets/types";

const FeedCard: React.FC<FeedProps> = ({
  body,
  timestamp,
  user,
  event,
  media,
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
            <p style={{ fontSize: 12 }}>{timestamp}</p>
          </div>
        </Link>
        <Link
          to={`/events/${event.id}`}
          style={{
            color: "var(--blue)",
            margin: 5,
            fontStyle: "normal",
            fontSize: 12.5,
            backgroundColor: "#e1e1e1",
            borderRadius: 12,
            padding: "1px 4px",
            marginRight: "auto",
          }}
        >
          e_@{event.title}
        </Link>
      </section>

      {media &&
        media.map((med) => (
          <img
            key={med.id}
            src={med.mediaUrl}
            alt={med.id}
            style={{ width: "100%", borderRadius: 12 }}
          />
        ))}

      <p style={{ margin: 8 }}>{body}</p>

      <section className="actions_container">
        <p>Like</p>
        <p>Comments</p>
        <p>Pin</p>
      </section>
    </div>
  );
};

export default FeedCard;
