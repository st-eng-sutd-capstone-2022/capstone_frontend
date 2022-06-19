import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import {AuthContext} from '../../common/context/auth-context';

const AssignBoatForm = (props) => {
    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();
    const statelocation = useLocation();

    console.log(useParams());

    const [location, setLocation] = useState('');
    const [serial,setSerial] = useState('');
    const [date,setDate] = useState(new Date().toLocaleDateString());
    const [boatId,setBoatId] = useState('');

    React.useEffect(() => {
        if(statelocation.pathname !== '/assign/boat/add'){
        setLocation(statelocation.state.location);
        setSerial(statelocation.state.serialNumber);
        setBoatId(statelocation.state.boatId);
        }
    },[statelocation]);

    const postAssign = async () => {
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/assign`,
            {
                boatId: boatId,
                serialNumber: serial,
                location: location,
            },
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
                
        }).then(res => {
            console.log(res);
            navigate('/assign');
            alert('Assign success');
        })
        .catch(function (error) {
            console.log(error);
          });
        
    }

    const patchAssign = async () => {
        axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/assign/${statelocation.state._id}`,
            {
                boatId: boatId,
                serialNumber: serial,
                location: location,
            },
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
                
        }).then(res => {
            console.log(res);
            navigate('/assign');
            alert('Edit success');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(statelocation.pathname !== '/assign/boat/add'){
            patchAssign();
        }
        else{
            postAssign();
        }
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
      };

    const handleBoatIdChange = (event) => {
        setBoatId(event.target.value);
    }
    
    const handleSerialChange = (event) => {
        setSerial(event.target.value);
    }

    return(
        <Container maxWidth="sm">
            <Typography variant="h5" style={{marginTop:"20px"}}>
                {useParams().id ==="add"?"Add Boat":("Edit Boat "+boatId)}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="boatId"
                label="Boat ID"
                name="boatId"
                autoFocus
                onChange={handleBoatIdChange}
                {...(boatId ==="add"?{value:""}:{value:boatId})}
                />
                <FormControl fullWidth sx={{mt:2}}>
                  <InputLabel id="locationLabel">Location</InputLabel>
                  <Select
                      labelId="location"
                      id="location"
                      required
                      value={location}
                      label="location"
                      onChange={handleLocationChange}
                  >
                      <MenuItem value={"Seletar"}>Seletar</MenuItem>
                      <MenuItem value={"Bedok"}>Bedok Reservoir</MenuItem>
                    
                  </Select>
                </FormControl>
                <TextField
                margin="normal"
                required
                fullWidth
                id="serial"
                label="Serial Number"
                name="serial"
                onChange={handleSerialChange}
                {...(boatId ==="add"?{value:""}:{value:serial})}
                />
                {/* <TextField
                margin="normal"
                disabled
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                /> */}
                <TextField
                margin="normal"
                disabled
                fullWidth
                id="date"
                label="Date"
                name="date"
                value={date}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                {useParams().id ==="add"?"Add Boat":"Edit Boat "+boatId}
                </Button>
                
            </Box>

         </Container>
    )
}

export default AssignBoatForm;