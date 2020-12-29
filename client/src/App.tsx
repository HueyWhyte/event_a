import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import FeedDetails from "./pages/FeedDetails";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AllMutation from "./components/AllMutation";

export default class App extends Component {
  render() {
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
  }
}
