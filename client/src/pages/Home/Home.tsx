import React from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import "./style.css";
import { FeedProps } from "../../assets/types";
import { GET_FEEDS } from "../../assets/queries";
import FeedCard from "../../components/FeedCard";
import { fetchFeeds } from "../../redux/actions/feed";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(GET_FEEDS, {
    pollInterval: 5000,
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  const myFeeds: [FeedProps] = data.getFeeds;

  // const myFeeds: [FeedProps] = data.getEventFeeds;
  dispatch(fetchFeeds(myFeeds));

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
