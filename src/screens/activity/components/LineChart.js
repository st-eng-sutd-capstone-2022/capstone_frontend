import React,{useEffect} from "react";
import { Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = (props) => {

    const options = {
        plugins: {
            legend: {
              display:false
            },
        },
        responsive: true,
        scales: {
            xAxis: {
                ticks: {
                    autoSkip: true, //may or maynot need this
                    maxTicksLimit: 10
                }
            }
        }
    };
    const labels = props.networkData.labels;
    let data;
    if (props.multi === true) {
        let ds = props.networkData.datasets;
        ds[0].borderColor = '#85D191';
        ds[1].borderColor = '#D98C8C';
        data = {
            labels,
            datasets: ds
        };
    } else {
        data = {
            labels,
            datasets:[
                {
                    data: props.networkData.datasets,
                    borderColor: 'rgb(24,118,209)',
                    backgroundColor:'rgb(24,118,209, 0.5)',
                    lineTension:0.5,
                }
            ]
        };
    }

    
    

    
    return(
        <Box sx={{minWidth:200}}>
            <Card variant="outlined">
                <List sx={style} aria-label="line chart">
                    <ListItem>
                        <ListItemText 
                            primary={props.title} 
                            secondary={props.subtitle}
                            data-cy="listItemText"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Line data={data} options={options} />
                    </ListItem>
                
                </List>
            </Card>
        </Box>
    );

}

const style = {
    bgcolor: 'background.paper',
};

export default LineChart;