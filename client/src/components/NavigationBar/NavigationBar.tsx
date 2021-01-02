import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import SearchBar from "../SearchBar/SearchBar";

type UserData = {
  data: {
    isAuthenticated: boolean;
    user: {
      id: string;
    };
  };
};

const NavigationBar: React.FC<UserData> = ({
  data: {
    isAuthenticated,
    user: { id },
  },
}) => {
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
        {isAuthenticated ? (
          <NavLink
            exact
            className="nav_btn"
            activeClassName="active_nav_btn"
            to={`/profile/${id}`}
          >
            Profile
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.authReducer,
});

export default connect(mapStateToProps)(NavigationBar);
