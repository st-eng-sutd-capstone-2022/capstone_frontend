import React, {useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';

import Timeseries from "./Timeseries";
import Log from "./Log";

const Activity = ({isFetching, isLoading,data,onChange,type}) => {
 
    const [tab, setTab] = useState(0);
    

    const handleChange = (event, newValue) => {
        console.log("new value" + newValue);
        setTab(newValue);
        onChange(newValue);
        
    };
    
    if (isFetching || isLoading) {
        return (
          <Box sx={{ display: 'flex',justifyContent: 'center',marginTop:'20%'}}>
            <CircularProgress />
          </Box>
        );
    }

    return(
        <React.Fragment>
            
            <Box sx={{ bgcolor: 'background.paper' }}>
            
                <Tabs variant="fullWidth" value={tab} onChange={handleChange} centered>
                    <Tab label="Timeseries" value={0}/>
                    <Tab label="Activity Log" value={1}/>
                </Tabs>
                
            </Box>
            {tab === 0? 
            <Timeseries data={data} type={type} isLoading={isLoading} isFetching={isFetching}/>
            :
            <Log data={data}/>
            }
        </React.Fragment>
    )
}

export default Activity;