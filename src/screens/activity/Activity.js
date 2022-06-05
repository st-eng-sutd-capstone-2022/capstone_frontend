import React, {useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Timeseries from "./Timeseries";
import Log from "./Log";

const Activity = () => {
    // 0 = timeseries, 1 = activity log
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };


    return(
        <React.Fragment>
            
            <Box sx={{ bgcolor: 'background.paper' }}>
            
                <Tabs variant="fullWidth" value={tab} onChange={handleChange} centered>
                    <Tab label="Timeseries" />
                    <Tab label="Activity Log" />
                </Tabs>
                
            </Box>
            {tab === 0? 
            <Timeseries/>
            :
            <Log />
            }
        </React.Fragment>
    )
}

export default Activity;