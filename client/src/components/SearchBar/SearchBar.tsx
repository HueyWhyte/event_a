import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import "./style.css";
import { SEARCH } from "../../assets/queries";
import { FeedProps } from "../../assets/types";

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  // const [feeds, setFeeds] = useState<FeedProps[]>([]);

  const [PSearch, { data }] = useMutation(SEARCH, {
    variables: { searchWord: searchText },
  });

  const DoSearch = () => {
    console.log("searching");
    PSearch();
  };

  console.log(data);

  return (
    <>
      <div className="SearchBar">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={DoSearch}
          type="text"
          name="my_search"
          placeholder="Search..."
        />
        {/* <p>icon</p> */}
      </div>

      {searchText !== "" ? (
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: 12,
            height: 200,
            width: 320,
            position: "absolute",
            marginLeft: "calc((100vw / 2) - 163px)",
            marginRight: "calc((100vw / 2) - 163px)",
            boxShadow: "0 0 2em 0 rgba(64, 74, 128, 0.15)",
            top: 65,
            padding: 6,
          }}
        >
          <p>results</p>
          {data.searchFeeds.map((feed: FeedProps) => (
            <h1>asfasf</h1>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
