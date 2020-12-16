import React from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const FeedDetails = () => {
  const { feedId } = useParams<{ feedId: string }>();
  console.log(feedId);

  return (
    <div>
      <h1>FeedDetails</h1>
    </div>
  );
};

export default FeedDetails;
