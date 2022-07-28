import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import BarChartStacked from "./components/BarChartStacked";

const Timeseries = ({data,type}) => {

    // const activeHoursData = {
    //     labels:['01-05-2022', '02-05-2022', '03-05-2022', '04-05-2022', '05-05-2022', '06-05-2022', '07-05-2022','08-05-2022','09-05-2022','10-05-2022'],
    //     datasets: [1,2,5,2,6,7,2,5,2,8]      
    // }

    const activeHoursData = {
        "labels":["01-05-2022", "02-05-2022", "03-05-2022", "04-05-2022", "05-05-2022", "06-05-2022", "07-05-2022","08-05-2022","09-05-2022","10-05-2022"],
        "datasets": [
                           {
                   "label": "ActiveHours",
                   "data": [1,2,5,2,6,7,2,5,2,8]
               },
                           {
                                   "label": "BatteryUsed",
                   "data": [50.3,63.3,70,62.8,71,61,68.2,53,80]
                           }
                       ]
   
   }
   const localData = 
    {
        "weightZoneData":{
        "labels":[1,2,3,4,5,6],
        "datasets":[50,60,40,50,45,40]
        },
        "zone1":{
        "labels":["01-05-2022", "02-05-2022", "03-05-2022"],
        "datasets":[40,50,60]
        },
        "zone2":{
        "labels":["01-05-2022", "02-05-2022", "03-05-2022"],
        "datasets":[40,50,60]
        }
    }

    let localDataArr = Object.keys(localData).map(key => {
        return localData[key];
    })

    let zoneArr = localDataArr.slice(1);

    return (
        <React.Fragment>
            <Box sx={{margin:"10px"}}>
                <Grid container spacing={2}>
                    {type==='zone' ? 
                    <React.Fragment>
                        <Grid item xs={12} sm={6} md={4}>
                            <BarChart
                                networkData={localData.weightZoneData}
                                title="Total weight collected per Zone"
                                subtitle={''}
                            />
                        </Grid>
                        
                        {zoneArr.map((zone,idx)=>{
                            return(
                        <Grid key={idx} item xs={12} sm={6} md={4}>
                            <LineChart
                                networkData={zone}
                                title=""
                                subtitle={``}
                            />
                        </Grid>)
                        })}
                        
                    </React.Fragment> :
                    <React.Fragment>
                        <Grid item xs={12} sm={6} md={4}>
                            <LineChart
                                networkData={data.activeHoursData}
                                multi={true}
                                title="Total Active Hours per Day"
                                subtitle={`Total active hours from ${data.activeHoursData.labels[0]} to ${data.activeHoursData.labels[data.activeHoursData.labels.length-1]}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <BarChartStacked
                                networkData={data.activityLevelData}
                                title="Activity Level per Day"
                                subtitle={`Average Active Time/day from ${data.activityLevelData.labels[0]} to ${data.activityLevelData.labels[data.activityLevelData.labels.length-1]}`}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <LineChart
                                networkData={data.weightDayData}
                                title="Total Active Hours per Day"
                                subtitle={`Total active hours from ${data.weightDayData.labels[0]} to ${data.weightDayData.labels[data.weightDayData.labels.length-1]}`}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <BarChart
                                networkData={data.weightZoneData}
                                title="Total weight collected per Zone"
                                subtitle={''}
                            />
                        </Grid>
                    </React.Fragment>
                    }
                </Grid>
                
                
            </Box>
            
        </React.Fragment>
    );
}

export default Timeseries;