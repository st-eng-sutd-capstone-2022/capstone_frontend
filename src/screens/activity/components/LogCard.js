import React, { useState, useEffect } from "react";
import {
    Card,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Divider,
} from "@mui/material";

import '../activity.css';

const LogCard = ({ data }) => {
    // const [logData, setLogData] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const params = {
    //             log: true,
    //             locationId: 1,
    //             startTime: "2022-04-21 23:59:00.000",
    //             endTime: "2022-05-21 23:59:00.000"
    //         }

    //         const result = await fetch(`/api/search`, params);
    //         const body = await result.json();
    //         setLogData(body);
    //     };
    //     fetchData();
    // }, []);

    const getDataRows = (data) => {
        const rows = [];

        for(let i=0; i<data.daterange.length; i++) {
            for (let j=0; j<data.daterange[i].time.length; j++) {
                rows.push(
                    <TableRow key={j}>
                        <TableCell>{j===0 ? data.daterange[i].date : ""}</TableCell>
                        <TableCell>{j===0 ? data.daterange[i].activeHours : ""}</TableCell>
                        <TableCell>{data.daterange[i].time[j]}</TableCell>
                        <TableCell>{data.daterange[i].weight[j]}</TableCell>
                    </TableRow>
                );
            }
        }

        return rows;
    }

    const getTotalWeight = (data) => {
        let total = 0;
        for(let i=0; i<data.daterange.length; i++) {
            for (let j=0; j<data.daterange[i].weight.length; j++) {
                total += data.daterange[i].weight[j];
            }
        }

        return total;
    }



    return(
        <Card variant="outlined">
            <Grid container direction="row">
                <Grid className="logCard" container item xs={3} sm={2} direction="column" justfyContent="flex-start" alignItems="flex-start" spacing={2}>
                    <Grid item >
                        <Typography variant="subtitle2"> Boat ID </Typography>
                        <Typography variant="subtitle1" color="inherit" style={{ flex: 1 }}> {data && data.boatID ? data.boatID : 'Loading...'} </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2"> Location </Typography>
                        <Typography variant="subtitle1" color="inherit" style={{ flex: 1 }}> {data && data.location ? data.location : 'Loading...'} </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2"> Total Weight </Typography>
                        <Typography variant="subtitle1" color="inherit" style={{ flex: 1 }}> {data ? getTotalWeight(data) : 0} kg </Typography>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                <Grid item xs={9} sm={10}>
                    <TableContainer>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Activeness</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data ? getDataRows(data) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Card>

    );
}

const style = {
    bgcolor: 'background.paper',
};

export default LogCard;