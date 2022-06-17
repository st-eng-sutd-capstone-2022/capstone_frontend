import React, {useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AssignBoat from './AssignBoat';
import AssignLocation from './AssignLocation';



const Assign = () => {
    // 0 = assigned, 1 = assigned
    const [tab, setTab] = useState(0);
    const [location, setLocation] = useState('');

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return(
        <React.Fragment>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs variant="fullWidth" value={tab} onChange={handleChange} centered>
                    <Tab label="Boat" />
                    <Tab label="Location" />
                </Tabs>
            </Box>
            {tab === 0? 
            <AssignBoat />
            :
            <AssignLocation/>
            }
        </React.Fragment>
    )
}

export default Assign;