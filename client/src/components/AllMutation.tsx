import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_EVENT, ADD_FEED } from "../assets/queries";

const AllMutation: React.FC = () => {
  const [values, setValues] = useState({
    body: "",
    title: "",
    date: "",
    duration: "",
  });

  const [errors, setErrors] = useState({
    addFeedError: "",
  });

  const [addFeed, { loading: feedLoading }] = useMutation(ADD_FEED, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
    variables: { body: values.body, eventId: "5fe4bc3b623d4f2abc37ff33" },
  });

  const [addEvent, { loading: eventLoading }] = useMutation(ADD_EVENT, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      title: values.title,
      date: values.date,
      duration: values.duration,
    },
  });

  if (feedLoading) return <h1>Loading...</h1>;
  if (eventLoading) return <h1>Loading...</h1>;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const newFeed = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFeed();
    setValues({ ...values, body: "" });
  };

  const newEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEvent();
    setValues({ ...values, title: "", date: "", duration: "" });
  };

  return (
    <div>
      <h1>Mutaions</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: 5,
          borderRadius: 12,
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2>Add feed</h2>
        {errors ? <p>{errors.addFeedError}</p> : null}

        <form className="form_container" onSubmit={newFeed}>
          <input
            onChange={onChange}
            value={values.body}
            type="text"
            name="body"
            placeholder="feed body"
          />
          <input type="submit" value="Add Feed" />
        </form>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: 5,
          borderRadius: 12,
          marginTop: 20,
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2>Add Event</h2>
        {errors ? <p>{errors.addFeedError}</p> : null}

        <form className="form_container" onSubmit={newEvent}>
          <input
            onChange={onChange}
            value={values.title}
            type="text"
            name="title"
            placeholder="title"
          />
          <input
            onChange={onChange}
            value={values.date}
            type="date"
            name="date"
            placeholder="date"
          />
          <input
            onChange={onChange}
            value={values.duration}
            type="text"
            name="duration"
            placeholder="duration"
          />
          <input type="submit" value="Add Event" />
        </form>
      </div>
    </div>
  );
};

export default AllMutation;
