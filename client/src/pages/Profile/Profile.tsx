import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./style.css";
import { FeedProps, UserProps } from "../../assets/types";
import { GET_USER_FEEDS, GET_USER } from "../../assets/queries";
import FeedCard from "../../components/FeedCard";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { userId },
  });

  const { loading: fl, data: feeds, error: fe } = useQuery(GET_USER_FEEDS, {
    pollInterval: 5000,
    variables: { userId },
  });

  if (loading) return <h1>Loading User Data...</h1>;
  if (error) return <h1>Error...</h1>;
  let User: UserProps = data.getUser;

  if (fl) return <h1>Loading Feeds...</h1>;
  if (fe) return <h1>Error While Loading Feeds...</h1>;
  let Feeds: [FeedProps] = feeds.getUserFeeds;

  return (
    <div className="page_container">
      <section
        className="profile_cover"
        style={{
          backgroundImage: `linear-gradient(#ffffff00, white), url(${User.coverImgUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            // backgroundColor: "red",
            marginTop: "auto",
            width: 400,
            borderRadius: 20,
            padding: "0.4em",
          }}
        >
          <img
            src={User.profileImgUrl}
            alt=""
            style={{ width: 130, height: 130, borderRadius: 20 }}
          />
          <h1 style={{ fontSize: "2em" }}>{User.username}</h1>
          <p>{User.email}</p>
        </div>
      </section>

      {/* <section
        style={{
          backgroundColor: "var(--blue)",
          borderRadius: 10,
          display: "flex",
          padding: "10px 0px",
          marginTop: 10,
          marginBottom: 20,
          width: "inherit",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p>Feeds</p>
        <p>Events</p>
      </section> */}

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
        {Feeds &&
          Feeds.map((feed: FeedProps) => <FeedCard key={feed.id} {...feed} />)}
      </section>
    </div>
  );
};

export default Profile;
