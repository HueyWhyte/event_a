import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { EventProps } from "../../assets/types";

const EventCard: React.FC<EventProps> = ({
  id,
  title,
  coverImgUrl,
  organizer,
  date,
  duration,
}) => {
  return (
    <div className="EventCard">
      <img
        src={coverImgUrl}
        alt=""
        style={{ width: "100%", borderRadius: 12 }}
      />

      <Link
        to={`/events/${id}`}
        style={{
          color: "var(--blue)",
          fontStyle: "normal",
          fontSize: 14,
          backgroundColor: "#e1e1e1",
          borderRadius: 12,
          padding: "1px 4px",
          margin: 8,
          marginRight: "auto",
        }}
      >
        e_@{title}
      </Link>

      {/* <p style={{}}>{title}</p> */}

      <section
        style={{
          backgroundColor: "#e1e1e1",
          display: "flex",
          borderRadius: 12,
          padding: "0.1em 0.3em",
          alignItems: "center",
          marginBottom: 10,
          boxShadow: "0px 0px 6px #8a8af3",
        }}
      >
        <Link to={`/profile/${organizer.id}`}>
          <img
            src={organizer.profileImgUrl}
            alt=""
            style={{ borderRadius: 10, height: 60, width: 60 }}
          />
        </Link>
        <div style={{ marginLeft: 14 }}>
          <p>{organizer.username}</p>
          <p>{date}</p>
          <p>{duration}</p>
        </div>
      </section>

      <section className="actions_container">
        <p>Like</p>
        <p>Comments</p>
        <p>Pin</p>
      </section>
    </div>
  );
};

export default EventCard;
