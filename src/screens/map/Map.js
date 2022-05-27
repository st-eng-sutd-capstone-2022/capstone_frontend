import React from "react";
import GoogleMapReact from "google-map-react";
import Markers from "./components/Markers";

const boatObj = {
    id : "100100",
    status: "active",
    battery: "100",
    weight:"10",
    lat:"1.404701",
    lng:"103.838530",
}

const Map = () => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 2,
      };
    
    const handleGoogleMapApi = (google) => {
        var flightPath1 = new google.maps.Polyline({
            path: [ { "lat": 1.409413, "lng": 103.837896 },{ "lat": 1.398108, "lng": 103.840167 } ],
            geodesic: true,
            strokeColor: '#DB5F5F',
            strokeOpacity: 0,
            icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "20px",
                },
            ],
            strokeWeight: 1
        });
        var flightPath2 = new google.maps.Polyline({
            path: [ { "lat": 1.408092, "lng": 103.845198 },{ "lat": 1.404102, "lng": 103.846333} ],
            geodesic: true,
            strokeColor: '#DB5F5F',
            strokeOpacity: 0,
            icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "20px",
                },
            ],
            strokeWeight: 1
        });
        var flightPath3 = new google.maps.Polyline({
            path: [ { "lat": 1.413085, "lng": 103.849976 },{ "lat": 1.410249, "lng": 103.852984} ],
            geodesic: true,
            strokeColor: '#DB5F5F',
            strokeOpacity: 0,
            icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "20px",
                },
            ],
            strokeWeight: 1
        });
    
        flightPath1.setMap(google.map);
        flightPath2.setMap(google.map);
        flightPath3.setMap(google.map);
    }   
   
    return(
        <GoogleMapReact
            style={{}}
            bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                libraries: [
                    "places",
                    "geometry",
                    "drawing",
                    "visualization",
                ],
            }}
            defaultCenter={{ lat: 1.4123541, lng: 103.8416441 }}
            defaultZoom={15}
           
            hoverDistance={70}
            options={{
                clickableIcons: false,
                fullscreenControl: false,
                zoomControl: false,
                gestureHandling: "greedy",
                minZoom: 11
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
           
        >
            <Markers
                key = {boatObj.id}
                boatObj={boatObj}
                lat={boatObj.lat}
                lng={boatObj.lng}
            />
           
        </GoogleMapReact>
    );
}



export default Map;

//polling code for future api integration
// const [state, setState] = React.useState(0)
// const [timer, setTimer] = React.useState(null)
// const [isMounted, setIsMounted] = React.useState(false)

// async function updateDevicePosition () {
//   try {
//     const result = await fetch('http://192.168.10.233:34599/')
//     const data = await result.json()
//     setState(data.x)
//   } catch (e) {
//     console.error(e)
//   }
//   clearTimeout(timer)
//   setTimer(setTimeout(updateDevicePosition, 200))
// }

// useEffect(() => {
//   if (!isMounted) {
//      updateDevicePosition()
//      setIsMounted(true)
//   }
// })