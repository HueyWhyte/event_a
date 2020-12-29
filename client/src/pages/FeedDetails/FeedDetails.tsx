import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import TimeAgo from "react-timeago";

import "./style.css";
import { GET_FEED, ADD_COMMENT } from "../../assets/queries";
import { FeedProps } from "../../assets/types";

const FeedDetails: React.FC = () => {
  const [values, setValues] = useState({
    body: "",
  });

  const { feedId } = useParams<{ feedId: string }>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const { loading, data, error } = useQuery(GET_FEED, {
    variables: { feedId },
    pollInterval: 5000,
  });

  const [addComment, { loading: commentLoading }] = useMutation(ADD_COMMENT, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      body: values.body,
      feedId,
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Feed cannot be found!</h1>;
  if (commentLoading) return <h1>Loading...</h1>;

  const newComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment();
    setValues({ ...values, body: "" });
  };

  const feed: FeedProps = data.getFeed;

  return (
    <div className="page_container">
      <section
        style={{
          marginBottom: 20,
          backgroundColor: "white",
          marginTop: 20,
          width: "60%",
          padding: 7,
          borderRadius: 12,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Link
          to={`/profile/${feed.user.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "auto",
          }}
        >
          <img
            src={feed.user.profileImgUrl}
            alt=""
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              marginRight: 14,
            }}
          />
          <div>
            <p>@{feed.user.username}</p>
            <TimeAgo style={{ fontSize: 12 }} date={parseInt(feed.timestamp)} />
          </div>
        </Link>

        <Link to={`/events/${feed.event.id}`} className="event_link">
          e_@{feed.event.title}
        </Link>

        <p style={{ margin: 8 }}>{feed.body}</p>

        {feed.media
          ? feed.media.map((med) => (
              <img
                key={med.id}
                src={med.mediaUrl}
                alt={med.id}
                style={{ width: "100%", borderRadius: 12 }}
              />
            ))
          : null}
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: 70,
        }}
        className="commnt_section"
      >
        <h4
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 6,
            marginRight: "auto",
            marginBottom: 5,
          }}
        >
          {feed.comments.length} Comments
        </h4>
        {feed.comments.map((comment) => (
          <div
            style={{
              backgroundColor: "white",
              marginBottom: 2,
              padding: 7,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            key={comment.id}
          >
            <Link
              to={`/profile/${comment.user.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "auto",
              }}
            >
              <img
                src={comment.user.profileImgUrl}
                alt=""
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  marginRight: 14,
                }}
              />
              <div>
                <p>@{comment.user.username}</p>
                <TimeAgo
                  style={{ fontSize: 12 }}
                  date={parseInt(comment.timestamp)}
                />
              </div>
            </Link>
            <p style={{ margin: "8px 10px 0px 30px" }}>{comment.body}</p>
          </div>
        ))}
      </section>

      <form
        className="form_container"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "inherit",
          bottom: 0,
          position: "fixed",
        }}
        onSubmit={newComment}
      >
        <input
          style={{ flex: 1 }}
          onChange={onChange}
          value={values.body}
          type="text"
          name="body"
          placeholder="add comment..."
        />
        <input type="submit" value="Add Comment" />
      </form>
    </div>
  );
};

export default FeedDetails;
