import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import BarChartStacked from "./components/BarChartStacked";

const Timeseries = () => {

    const activeHoursData = {
        labels:['01-05-2022', '02-05-2022', '03-05-2022', '04-05-2022', '05-05-2022', '06-05-2022', '07-05-2022','08-05-2022','09-05-2022','10-05-2022'],
        datasets: [1,2,5,2,6,7,2,5,2,8]      
    }

    const activityLevelData = {
        labels:['01-05-2022', '02-05-2022', '03-05-2022', '04-05-2022', '05-05-2022', '06-05-2022', '07-05-2022','08-05-2022','09-05-2022','10-05-2022'],
        datasets:[
            {
                label: 'Active',
                data: [4,6,6,5,6,6,5,6,7,8]
            },
            {
                label: 'Inactive',
                data: [2,1,1,2,1,1,2,2,1,0]
            },
            {
                label: 'Moving',
                data: [2,1,1,1,1,1,1,1,1,1]     
            }
        ]
    }

    const weightZoneData = {
        labels:[1, 2, 3, 4, 5, 6],
    
        datasets: [40,60,60,50,60,70],
          
    }

    console.log("timeseries");

    return (
        <React.Fragment>
            <Box sx={{margin:"10px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <LineChart
                            networkData={activeHoursData}
                            title="Total Active Hours per Day"
                            subtitle={`Total active hours from ${activeHoursData.labels[0]} to ${activeHoursData.labels[activeHoursData.labels.length-1]}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BarChartStacked
                            networkData={activityLevelData}
                            title="Activity Level per Day"
                            subtitle={`Average Active Time/day from ${activityLevelData.labels[0]} to ${activityLevelData.labels[activityLevelData.labels.length-1]}`}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <BarChart
                            networkData={weightZoneData}
                            title="Total weight collected per Zone"
                            subtitle={''}
                        />
                    </Grid>
                </Grid>
            </Box>
            
        </React.Fragment>
    );
}

export default Timeseries;