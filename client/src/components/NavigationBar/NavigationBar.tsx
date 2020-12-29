import React from "react";
import { NavLink } from "react-router-dom";

import "./style.css";
import SearchBar from "../SearchBar/SearchBar";

const userId = localStorage.getItem("userId");

const NavigationBar: React.FC = () => {
  return (
    <div className="NavigationBar">
      <div>
        <h1>LOGO</h1>
      </div>

      <SearchBar />

      <div style={{ display: "flex" }}>
        <NavLink
          exact
          className="nav_btn"
          activeClassName="active_nav_btn"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          exact
          className="nav_btn"
          activeClassName="active_nav_btn"
          to="/events"
        >
          Events
        </NavLink>
        {userId ? (
          <NavLink
            exact
            className="nav_btn"
            activeClassName="active_nav_btn"
            to={`/profile/${userId}`}
          >
            Profile
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default NavigationBar;
