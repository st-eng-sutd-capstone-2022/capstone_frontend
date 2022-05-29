import React, {useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Assign = () => {
    // 0 = assigned, 1 = assigned
    const [assignTab, setAssignTab] = useState(0);
    const [location, setLocation] = useState('');

    const handleChange = (event, newValue) => {
        setAssignTab(newValue);
    };

    const handleSelectChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          serialNumber: data.get('serial'),
          boatId: data.get('boatId'),
          location: location,
        });
    };

    return(
        <React.Fragment>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs variant="fullWidth" value={assignTab} onChange={handleChange} centered>
                    <Tab label="Assign" />
                    <Tab label="Assigned" />
                </Tabs>
            </Box>
            {assignTab === 0? 
            <Container maxWidth="sm">
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="serial"
                    label="Serial Number"
                    name="serial"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="boatId"
                    label="Boat ID"
                    id="boatId"
                    />
                    <FormControl fullWidth sx={{mt:2}}>
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="location"
                            id="location"
                            value={location}
                            label="location"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={"Seletar Reservior"}>Seletar Reservio</MenuItem>
                            <MenuItem value={"Bedok Reservoir"}>Bedok Reservoir</MenuItem>
                          
                        </Select>
                    </FormControl>
              
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Assign
                    </Button>
                   
                </Box>

            </Container>
            :
            <h1>assigned</h1>
            }
        </React.Fragment>
    )
}

export default Assign;