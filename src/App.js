import React, { Component } from "react";
import { Route } from 'react-router-dom';
import SelectedCity from "./components/SelectedCity";
import { Link } from "react-router-dom";
import Location from "./home/Location";

export default class App extends Component {
  render() {
    return (
      <div>
        <SelectedCity />
        {/* <Route exact path="/" component={SelectedCity} /> */}

        <Route path='/currentLocation' component={Location} />
        <Link to='/currentLocation'>
          <button> My location </button>
        </Link>
      </div>
    );
  }
}
