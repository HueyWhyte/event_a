import React from "react";
import { useQuery } from "@apollo/client";

import "./style.css";
import { FeedProps } from "../../assets/types";
import { GET_FEEDS } from "../../assets/queries";
import FeedCard from "../../components/FeedCard";

const Home: React.FC = () => {
  const { loading, data, error } = useQuery(GET_FEEDS, {
    pollInterval: 5000,
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="page_container">
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "0.4em",
          marginBottom: "0.4em",
          width: "inherit",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        {data.getFeeds.map((feed: FeedProps) => (
          <FeedCard key={feed.id} {...feed} />
        ))}
      </section>
    </div>
  );
};

export default Home;
