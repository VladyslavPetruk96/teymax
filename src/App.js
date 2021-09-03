import React from "react";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LocationPage from "./pages/LocationPage";
import WeatherPage from "./pages/WeatherPage";

export default function App() {
  return (
    <>
      <Router>
        <Link to="/location">Location</Link>
        <br />
        <Link to="/search">Search</Link>
        <Switch>
          <Route path="/search">
            <WeatherPage />
          </Route>
          <Route path="/location">
            <LocationPage />
          </Route>
          <Redirect from="/" to="/search" />
        </Switch>
      </Router>
    </>
  );
}
