import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LogCard from "./components/LogCard";
import { GridLoadingOverlay } from "@mui/x-data-grid";



const Log = ({data}) => {
    //console.log(data);

    // const data = [
    //     {
    //         "boatId":"001",
    //         "location":"Seletar Reservoir",
    //         "daterange": [
    //             {
    //                 "date":"01-05-2022",
    //                 "activeHours":"00:08:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z","T03:02:25Z"],
    //                 "weight":[50,50,49.6]
    //             },
    //             {
    //                 "date":"02-05-2022",
    //                 "activeHours":"00:06:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z"],
    //                 "weight":[50,49.6]
    //             }
    //         ]
    //     },
    //     {
    //         "boatId":"002",
    //         "location":"Reservoir",
    //         "daterange": [
    //             {
    //                 "date":"01-05-2022",
    //                 "activeHours":"00:08:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z","T03:02:25Z"],
    //                 "weight":[50,50,49.6]
    //             },
    //             {
    //                 "date":"03-05-2022",
    //                 "activeHours":"00:07:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z","T03:02:25Z","T03:02:25Z"],
    //                 "weight":[50,50,49.6,57.3]
    //             }
    //         ]
    //     },
    //     {
    //         "boatId":"003",
    //         "location":"Seletar",
    //         "daterange": [
    //             {
    //                 "date":"02-05-2022",
    //                 "activeHours":"00:06:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z"],
    //                 "weight":[50,49.6]
    //             },
    //             {
    //                 "date":"03-05-2022",
    //                 "activeHours":"00:07:00",
    //                 "time":["T03:02:25Z", "T03:02:25Z","T03:02:25Z","T03:02:25Z"],
    //                 "weight":[50,50,49.6,57.3]
    //             }
    //         ]
    //     }
    // ]


    

    return(
        <Grid container>
            <Grid item xs={12}>
                {data && data.length > 0 ? data.map((row,idx) => {
                    return <LogCard key={idx} data={row} />
                }) : "No entries found..."}
            </Grid>
        </Grid>
    );
}

export default Log;