
import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GoogleMapReact from "google-map-react";
import Markers from "./components/Markers";
import Button from '@mui/material/Button';

import './Map.css';
import ListView from "./ListView";

const boatObj = {
    id : "100100",
    status: "active",
    battery: "100",
    weight:"10",
    lat:1.404701,
    lng:103.838530,
}

const locationData = [
    {location:"Seletar",
    lat:1.4123541,
    lng:103.8416441},
    {location:"Bedok",
    lat:1.3425956,
    lng:103.9220676},
]

const Map = () => {

    const [location, setLocation] = useState({location:"Seletar",lat:1.4123541,lng:103.8416441});
    const [mapView, setMapView] = useState(true);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleView = () => {
        setMapView(!mapView);
    }
   
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
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8} md={3} style={{zIndex:1700}}>
                    <FormControl sx={{ ml: 5, mt:3, minWidth: 200, backgroundColor:"#fff" }}>
                        <InputLabel id="location-label">Location</InputLabel>
                        <Select
                        labelId="location-label"
                        id="location-select"
                        defaultValue=""
                        value={location.location}
                        label="Location"
                        onChange={handleChange}
                        MenuProps={{
                            style: {zIndex: 1700}
                        }}
                        >   
                            {locationData.map((data, index) => {
                                return <MenuItem key={index} value={data}>{data.location}</MenuItem>
                            })}
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} md={2} className="grid_margin" style={{zIndex:1400,marginTop:15,marginRight:5}}>
                    <Button variant="contained" onClick={handleView}>
                        {mapView ? "List View" : "Map View"}
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} className="grid_margin">
                    <Grid container spacing={2} style={{paddingLeft:10,paddingRight:10}}>
                        <Grid item xs={4} md={3}>
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"green",borderRadius:"50%",display:"inline-block"}}></span> Active </span>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"yellow",borderRadius:"50%",display:"inline-block"}}></span> Inactive </span>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"red",borderRadius:"50%",display:"inline-block"}}></span> Moving </span>
                        </Grid>
                    </Grid>  
                  
                </Grid>
            </Grid>
            {mapView ?
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
                defaultCenter={{lat:1.4123541, lng:103.8416441}}
                defaultZoom={15}
                center={{lat:location.lat, lng:location.lng}}
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
            
            </GoogleMapReact> : 
            <ListView/>
            }
        </React.Fragment>
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

