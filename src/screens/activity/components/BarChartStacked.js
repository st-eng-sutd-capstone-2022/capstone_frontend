import React from "react";
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

const BarChartStacked = (props) => {

    const options = {
        
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
    };

    const labels = props.networkData.labels;

    const data = {
      labels,
      datasets:[
          {
              label: props.networkData.datasets[0].label,
              data: [4,6,6,5,6,6,5,6,7,8],
              backgroundColor:'rgba(185, 20, 20, 1)',
          },
          {
              label: props.networkData.datasets[1].label,
              data: [2,1,1,2,1,1,2,2,1,0],
              backgroundColor:'rgba(237, 239, 124, 1)',
          },
          {
              label: props.networkData.datasets[2].label,
              data: [2,1,1,1,1,1,1,1,1,1],
              backgroundColor:'rgba(133, 209, 145, 1)',
          }
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

export default BarChartStacked;