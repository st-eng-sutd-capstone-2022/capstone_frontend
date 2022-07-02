import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const BarChart = (props) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display:false
          },
        },
    };

    const labels = props.networkData.labels;

    const data = {
        labels,
        datasets:[
            {
                data: props.networkData.datasets,
                backgroundColor:'rgb(24,118,209)',
            },
           
        ]
    };

    return(
        <Box sx={{minWidth:200}}>
            <Card variant="outlined">
                <List sx={style} aria-label="line chart">
                    <ListItem>
                        <ListItemText 
                            primary={props.title} 
                            secondary={props.subtitle}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Bar data={data} options={options} />
                    </ListItem>
                
                </List>
            </Card>
        </Box>
    );
}

const style = {
    bgcolor: 'background.paper',
};

export default BarChart;