import React,{useState,useEffect,useContext} from "react";
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
import { useQuery } from "react-query";
import axios from "axios";

import {AuthContext} from '../../common/context/auth-context';
import Activity from "./Activity";

export const ActivityWrapperWithDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [log, setLog] = useState(false);
  const [location, setLocation] = useState('');
  const [type,setType] = useState('overall');
  const [zone,setZone] = useState('all');
  const [boatId,setBoatId] = useState('');

  var today = new Date();
  var priorDate = new Date(new Date().setDate(today.getDate() - 30));

  priorDate.setUTCHours(0,0,0,0);
  const [startDate, setStartDate] = useState(priorDate.toISOString());
  const [endDate,setEndDate] = useState(new Date(new Date().setUTCHours(23,59,59,999)).toISOString());

  const auth = useContext(AuthContext);

  const getLocations = async () => {

    let {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/location`,{
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
      })
    return data;
  }

  const {isLoading:locationLoading, data: locationData } = useQuery('locations',getLocations);
  

  useEffect(() => {
    if (!locationLoading) {
      setLocation(locationData[0].location);
    }
  }, [locationData]);

  const getSearch = async () => {

    let {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/search?type=${type}&locationId=${location}&log=${log}&endTime=${endDate}&startTime=${startDate}&zoneId=${zone}&boatId=${boatId}`,{
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
      })
    
    return data;
  }

  const {isLoading, error, data, refetch} = useQuery(['search',log], getSearch);

  const getAssign = async () => {

    let {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/assign`,{
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
      })
    
    return data;
  }

  const {isLoading:assignLoading, data:assignData} = useQuery(`assign`, getAssign);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleStartDateChange = (newValue) => {
    setStartDate(new Date(newValue).toISOString());
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(new Date(newValue).toISOString());
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  }

  const handleBoatIdChange = (event) => {
    setBoatId(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      refetch();
  };

  const handleChange = (prop) => {
    console.log("prop"+prop);
    if (prop === 1){
      setLog(true);
      setType('overall');
    } else {
      setLog(false);
    }
  }

  return(
    <>
      <Toolbar>
        <Typography variant="h6" type="title" color="inherit" style={{ flex: 1 }}>
          Boat Data: {location}
        </Typography>
        <IconButton size="large" edge="end" color="inherit" aria-label="logo" onClick={()=>setIsDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Toolbar>

      <Activity isLoading={isLoading} data={data} onChange={handleChange} type={type}/>
      
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
                      {!locationLoading && locationData.map((d, index) => {
                          const loc = d.location;
                          return <MenuItem key={index} value={loc}>{d.location}</MenuItem>
                      })}
                    
                  </Select>
              </FormControl>
              {log===false &&
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="typeLabel">Type</InputLabel>
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
              }
              {log===false && type === 'zone'&&
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="zoneLabel">Zone</InputLabel>
                    <Select
                        labelId="zone"
                        id="zone"
                        value={zone}
                        label="type"
                        onChange={handleZoneChange}
                    > 
                      <MenuItem value={"all"}>All</MenuItem>
                    {!locationLoading && locationData.filter(loc=>
                      loc.location.includes(location))[0].zones.map(zone=>{
                        return <MenuItem key={zone.name} value={zone.name}>Zone {zone.name}</MenuItem>
                      })}
                        
                      
                    </Select>
              </FormControl>
              }
              {log===false && type === 'boatId' &&
              <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="idLabel">Search Boat ID</InputLabel>
                    <Select
                        labelId="boatId"
                        id="boatId"
                        value={boatId}
                        label="boatId"
                        onChange={handleBoatIdChange}
                    >
                        {!assignLoading && assignData.map((boat,idx)=>{
                          return <MenuItem key={boat.boatId} value={boat.boatId}>{boat.boatId}</MenuItem>
                        })}
                      
                    </Select>
              </FormControl>
              }

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
           
                  label="Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{mt:2}} />}
                />
                <MobileDatePicker
                  label="End Date"
                  inputFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={handleEndDateChange}
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