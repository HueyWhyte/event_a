import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import AllMutation from "./components/AllMutation";
import EventDetails from "./pages/EventDetails";
import FeedDetails from "./pages/FeedDetails";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Home from "./pages/Home";

import { loadUser } from "./redux/actions/auth";
import { LOAD_USER } from "./assets/queries";
import { UserProps } from "./assets/types";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useQuery(LOAD_USER);
  let user: UserProps = data.loadUser;
  dispatch(loadUser(user));

  return (
    <Router>
      <NavigationBar />

      <Switch>
        <Route exact path="/events/:eventId" component={EventDetails} />

        <Route exact path="/feeds/:feedId" component={FeedDetails} />

        <Route exact path="/profile/:userId" component={Profile} />

        <Route exact path="/events" component={Events} />

        <Route exact path="/allmutations" component={AllMutation} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />

        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
