import React from "react";
import { useQuery } from "@apollo/client";

import "./style.css";
import { EventProps } from "../../assets/types";
import { GET_EVENTS } from "../../assets/queries";
import EventCard from "../../components/EventCard";

const Events: React.FC = () => {
  const { loading, data, error } = useQuery(GET_EVENTS, {
    pollInterval: 5000,
  });
  if (loading) return <h1>Loading Events...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="page_container">
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "0.4em",
          width: "inherit",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        {data.getEvents.map((event: EventProps) => (
          <EventCard key={event.id} {...event} />
        ))}
      </section>
    </div>
  );
};

export default Events;
