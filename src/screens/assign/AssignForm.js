import React,{useState} from "react";
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

//need to call /user if params === add
//need to call /boat/<id> if params !== add

const AssignForm = () => {

    const [location, setLocation] = useState('');
    const [serial,setSerial] = useState('');
    const [username,setUsername] = useState('Sam');
    const [date,setDate] = useState(new Date().toLocaleDateString());

    const boatId = useParams().boatId;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          employeeId: data.get('employeeId'),
          name: data.get('name'),
          email: data.get('email'),
        });
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
      };

    return(
        <Container maxWidth="sm">
            <Typography variant="h5" style={{marginTop:"20px"}}>
                {boatId ==="add"?"Add Boat":("Edit Boat"+boatId)}
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
                      <MenuItem value={"Seletar Reservior"}>Seletar Reservoir</MenuItem>
                      <MenuItem value={"Bedok Reservoir"}>Bedok Reservoir</MenuItem>
                    
                  </Select>
                </FormControl>
                <TextField
                margin="normal"
                required
                fullWidth
                id="serial"
                label="Serial Number"
                name="serial"
               
                {...(boatId ==="add"?{value:""}:{value:serial})}
                />
                <TextField
                margin="normal"
                disabled
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                />
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
                Create
                </Button>
                
            </Box>

         </Container>
    )
}

export default AssignForm;