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
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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