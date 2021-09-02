import React from 'react'

export default function Location() {

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;

        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        return `Широта: ${crd.latitude}`
      };
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      
      navigator.geolocation.getCurrentPosition(success, error, options);



    return (
        <div>
            <h3>Широта: {success()}}</h3>
            <h3>Долгота:</h3>
        </div>
    )
}
