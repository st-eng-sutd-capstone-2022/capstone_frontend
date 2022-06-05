import React,{useState} from "react";
import { Drawer,Box,Typography,IconButton, Icon, Toolbar, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Activity from "./Activity";

export const ActivityWrapperWithDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [type,setType] = useState('overall');
  const [zone,setZone] = useState('all');
  const [boatId,setBoatId] = useState('');
  const [date, setDate] = React.useState(new Date());

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  }

  const handleBoatIdChange = (event) => {
    setBoatId(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log(date);
  };
  return(
    <>
      <Toolbar>
        <Typography variant="h6" type="title" color="inherit" style={{ flex: 1 }}>
          Boat Data
        </Typography>
        <IconButton size="large" edge="end" color="inherit" aria-label="logo" onClick={()=>setIsDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Toolbar>

      <Activity/>
      
      <Drawer anchor="right" open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
        <Box p={2} width="240px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Filter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             
              <FormControl fullWidth sx={{mt:2}}>
                  <InputLabel id="locationLabel">Location</InputLabel>
                  <Select
                      labelId="location"
                      id="location"
                      value={location}
                      label="location"
                      onChange={handleLocationChange}
                  >
                      <MenuItem value={"Seletar Reservior"}>Seletar Reservoir</MenuItem>
                      <MenuItem value={"Bedok Reservoir"}>Bedok Reservoir</MenuItem>
                    
                  </Select>
              </FormControl>
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="typeLabel">Search Type</InputLabel>
                    <Select
                        labelId="type"
                        id="tpye"
                        value={type}
                        label="type"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={"overall"}>Overall</MenuItem>
                        <MenuItem value={"zone"}>Zone</MenuItem>
                        <MenuItem value={"boatId"}>Boat Id</MenuItem>
                      
                    </Select>
              </FormControl>
              {type === 'zone'&&
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="zoneLabel">Search Zone</InputLabel>
                    <Select
                        labelId="zone"
                        id="zone"
                        value={zone}
                        label="type"
                        onChange={handleZoneChange}
                    >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"1"}>Zone 1</MenuItem>
                        <MenuItem value={"2"}>Zone 2</MenuItem>
                      
                    </Select>
              </FormControl>
              }
              {type === 'boatId'&&
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="idLabel">Search Boat ID</InputLabel>
                    <Select
                        labelId="boatId"
                        id="boatId"
                        value={boatId}
                        label="boatId"
                        onChange={handleBoatIdChange}
                    >
                        <MenuItem value={"Alexa"}>Alexa</MenuItem>
                        <MenuItem value={"Ally"}>Ally</MenuItem>
                        <MenuItem value={"Betty"}>Betty</MenuItem>
                      
                    </Select>
              </FormControl>
              }

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
           
                  label="Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{mt:2}} />}
                />
                <MobileDatePicker
                  label="End Date"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{mt:2}}/>}
                />
              </LocalizationProvider>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Search
              </Button>
              
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ActivityWrapperWithDrawer;