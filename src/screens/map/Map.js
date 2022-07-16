
import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GoogleMapReact from "google-map-react";
import Markers from "./components/Markers";
import Button from '@mui/material/Button';
import { useQuery } from "react-query";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './Map.css';
import {AuthContext} from '../../common/context/auth-context';
import ListView from "./ListView";
import { Typography } from "@mui/material";

const boatObj = {
    id : "100100",
    status: "active",
    battery: "100",
    weight:"10",
    lat:1.404701,
    lng:103.838530,
}


const calculateCentroid = (lats,longs) => {
    const lat = lats.reduce((a, b) => a + b, 0)/lats.length;
    const long = longs.reduce((a, b) => a + b, 0)/longs.length;
    return {lat, long};
}

const Map = () => {
    const auth = React.useContext(AuthContext);

    const [location, setLocation] = useState({location:"Seletar",lat:1.4123541,lng:103.8416441});
    const [mapView, setMapView] = useState(true);

    const getLocations = async () => {

        let {data} = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/location`,{
              headers: {
                'Authorization': `Bearer ${auth.token}`
              }
          })
        return data;
    }

    const getLiveBoat = async() =>{
        let {data} = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/location/liveboats`,{
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                  }
            }
        )
        data = data.filter(item => {
            return '_id' in item;
        })
        console.log(data);
        return data
    }

    const {isLoading, error, data} = useQuery('locations', getLocations);
    const {isLoading:liveLoading,error:liveError, data:liveData} = useQuery('liveboats', getLiveBoat);

    
    if(isLoading || liveLoading){
        return (
            <Box sx={{ display: 'flex',justifyContent: 'center',marginTop:'20%'}}>
                <CircularProgress />
            </Box>
        )
    }

    const locationData = data.filter(o=>o.location===location.location);

    console.log(locationData);

    let centroids = [];
    for(var i =0; i < locationData.length; i++){
        for (var j = 0; j < locationData[i].zones.length; j++){
            const centroid = calculateCentroid(locationData[i].zones[j].lats,locationData[i].zones[j].longs);
            const name = locationData[i].zones[j].name;
            centroids.push({name,lat:centroid.lat,lng:centroid.long});
        }
    }

    console.log(centroids);

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
        let flightpaths = [];
        for(var i =0; i < data.length; i++){
            for (var j = 0; j < data[i].zones.length; j++){
                console.log(data[i].zones[j].lats[0]);
                var flightPath = new google.maps.Polyline({
                    path: [ 
                        { "lat": data[i].zones[j].lats[0], "lng": data[i].zones[j].longs[0] },
                        { "lat": data[i].zones[j].lats[1], "lng": data[i].zones[j].longs[1] }, 
                        { "lat": data[i].zones[j].lats[2], "lng": data[i].zones[j].longs[2] },
                        { "lat": data[i].zones[j].lats[3], "lng": data[i].zones[j].longs[3] }, 
                        { "lat": data[i].zones[j].lats[0], "lng": data[i].zones[j].longs[0] }],
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
                flightpaths.push(flightPath);
            }
        }
       
        for (var i = 0; i < flightpaths.length; i++) {
            flightpaths[i].setMap(google.map);
        }
      
    }   

    console.log(location);

    
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
                        value={location.location || ""}
                        label="Location"
                        onChange={handleChange}
                        MenuProps={{
                            style: {zIndex: 1700}
                        }}
                        >   
                            {data.map((d, index) => {
                                const loc = {location:d.location,lat:d.lat,lng:d.long};
                                return <MenuItem key={index} value={loc}>{d.location}</MenuItem>
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
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"#85D191",borderRadius:"50%",display:"inline-block"}}></span> Active </span>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"#D98C8C",borderRadius:"50%",display:"inline-block"}}></span> Inactive </span>
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <span className="spanBg"><span style={{height:15,width:15,backgroundColor:"#EDEF7C",borderRadius:"50%",display:"inline-block"}}></span> Moving </span>
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
             
                {liveData.map((boat,index)=>{
                    return <Markers
                        key = {boat.boatId}
                        boatId = {boat.boatId}
                        status={boat.status}
                        weight = {boat.weight.kg}
                        battery = {boat.batteryLevel}
                        lat={boat.latitude}
                        lng={boat.longtitude}
                    />
                })}
               
                {centroids.map((centroid, index) => {
                    return(
                    <Typography lat={centroid.lat} lng={centroid.lng} sx={{width:"50px",color:"red"}}>
                        Zone {centroid.name}
                    </Typography>
                    )
                })}
            
            </GoogleMapReact> : 
            <ListView/>
            }
        </React.Fragment>
    );
}



export default Map;

