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

    let displayData = props.networkData.datasets;
    displayData = displayData.map(obj => ({ ...obj, backgroundColor: '#85D191' }));
    displayData[1].backgroundColor = "#D98C8C";
    displayData[2].backgroundColor = "#EDEF7C";

    const data = {
      labels,
      datasets:displayData
  };

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