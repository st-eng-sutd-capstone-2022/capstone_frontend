import React,{useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent, Typography } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ZoneCard from "./ZoneCard";
import {AuthContext} from '../../common/context/auth-context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignLocationForm = () => {

    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const statelocation = useLocation();

    const [location, setLocation] = useState('');
    const [lng,setLng] = useState();
    const [lat,setLat] = useState();
    const [zones,setZones] = useState([]);

    React.useEffect(() => {
        if(statelocation.pathname !== '/assign/location/add'){
        const rowLocationData = statelocation.state;
        console.log(rowLocationData);
        setLocation(rowLocationData.location);
        setLng(rowLocationData.long);
        setLat(rowLocationData.lat);
        let zoneItems = []
        rowLocationData.zones.map((zone,_) => {
            const item = {
                name:zone.name,
                p1_lng:zone.longs[0],
                p1_lat:zone.lats[0],
                p2_lng:zone.longs[1],
                p2_lat:zone.lats[1],
                p3_lng:zone.longs[2],
                p3_lat:zone.lats[2],
                p4_lng:zone.longs[3],
                p4_lat:zone.lats[3]
            }
            zoneItems.push(item);
            setZones(zoneItems);
        })

        }
    },[statelocation]);

    console.log(zones);

    const addZone = () => {
        console.log("add zone");
        setZones([...zones,{
            name:"",
            p1_lng:"",
            p1_lat:"",
            p2_lng:"",
            p2_lat:"",
            p3_lng:"",
            p3_lat:"",
            p4_lng:"",
            p4_lat:""
        }])
    }

    const postLocation = async () => {
        let processedZones = []
        zones.map((zone,_) => {
            processedZones.push({
                name:zone.name,
                lats:[
                    parseFloat(zone.p1_lat),
                    parseFloat(zone.p2_lat),
                    parseFloat(zone.p3_lat),
                    parseFloat(zone.p4_lat)
                ],
                longs:[
                    parseFloat(zone.p1_lng),
                    parseFloat(zone.p2_lng),
                    parseFloat(zone.p3_lng),
                    parseFloat(zone.p4_lng)
                ]
            })
        })
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/location`,
            {
                location:location,
                lat:lat,
                long:lng,
                zones:processedZones
            },
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
                
        }).then(res => {
            console.log(res);
            navigate('/assign',{ state: { msg: "Successfully Created Location" } });
        })
        .catch(function (error) {
            console.log(error);
            setOpen(true);
          });
        
    }

    const putLocation = async () => {
        let processedZones = []
        zones.map((zone,_) => {
            processedZones.push({
                name:zone.name,
                lats:[
                    parseFloat(zone.p1_lat),
                    parseFloat(zone.p2_lat),
                    parseFloat(zone.p3_lat),
                    parseFloat(zone.p4_lat)
                ],
                longs:[
                    parseFloat(zone.p1_lng),
                    parseFloat(zone.p2_lng),
                    parseFloat(zone.p3_lng),
                    parseFloat(zone.p4_lng)
                ]
            })
        })
        axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/location`,
            {
                location:location,
                lat:lat,
                long:lng,
                zones:processedZones
            },
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
                
        }).then(res => {
            console.log(res);
            navigate('/assign',{ state: { msg: "Successfully Edited Location" } });
        })
        .catch(function (error) {
            console.log(error);
            setOpen(true);
          });
        
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleLngChange = (event) => {
        console.log(event.target.value);
        setLng(parseFloat(event.target.value));
    }

    const handleLatChange = (event) => {
        setLat(parseFloat(event.target.value));
    }

    const handleOnChange = (event,id) => {
        let items = [...zones];
        let item = {
            ...items[id],
            [event.target.name]: event.target.value
        }
        items[id] = item;
        setZones(items)
    }
    
    //delete card
    const handleCardClick = (id) => {
        console.log(id);
        setZones(zones.filter((_, i) => i !== id))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleSave = () => {
        if(statelocation.pathname !== '/assign/location/add'){
            putLocation();
        }
        else{
            postLocation();
        }
    }
    
    return(
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Failed to assign location!
                </Alert>
             </Snackbar>
            <Box sx={{mt:3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <TextField onChange={handleLocationChange} id="outlined-basic" label="Location" variant="outlined" sx={{width:"150px"}} value={location}/>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <TextField onChange={handleLngChange} id="outlined-basic" label="Longitude" variant="outlined" sx={{width:"150px"}} value={lng}/>
                    </Grid>
                    
                    <Grid item xs={6} md={2}>
                        <TextField onChange={handleLatChange} id="outlined-basic" label="Latitude" variant="outlined" sx={{width:"150px"}} value={lat}/>
                    </Grid>
                    <Grid item md={2}>
                        
                    </Grid>

                    <Grid item xs={6} md={2} sx={{paddingLeft:"0px !important"}}>
                        <Button variant="outlined" size="large" onClick={addZone}>
                            Add Zone
                        </Button>
                    </Grid>
                    <Grid item xs={5} md={2} sx={{paddingLeft:"0px !important"}}>
                        <Button variant="contained" size="large" onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                    
                </Grid>
            </Box>
            <Box sx={{mt:3}}>
                <Grid container spacing={2}>
                    {zones.map((zone,index) => 
                    { return (
                    <Grid item xs={12} md={4}>
                        <ZoneCard key={index} id={index} onClick={handleCardClick} onChange={handleOnChange} zone={zone}/>
                    </Grid> )
                    })}
                </Grid>
            </Box>
        </Container>
    );

}

export default AssignLocationForm;