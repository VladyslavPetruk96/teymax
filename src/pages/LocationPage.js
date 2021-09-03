import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../components/Card";
import styled from "styled-components";

import { requestLocationAction } from "../redux/Location/location.actions";

const LocationContainer = styled.section``;

function LocationPage(props) {
  const { requestLocationAction, location, isLoading } = props;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    var crd = pos.coords;

    requestLocationAction(crd.latitude, crd.longitude);
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  return (
    <LocationContainer>
      {isLoading && <div>Loading...</div>}
      {!isLoading && location ? (
        <div className='content'>
          {location?.daily.map((day, index) => (
            <Card day={day} key={index} />
          ))}
        </div>
      ) : null}

      <div>Timezone: {location?.timezone}</div>
    </LocationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.location.isLoading,
    location: state.location.location,
  };
};

const mapDispatchToProps = { requestLocationAction };

export default connect(mapStateToProps, mapDispatchToProps)(LocationPage);
