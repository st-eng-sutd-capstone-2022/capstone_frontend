import React from "react";
import Card from '@mui/material/Card';
import { CardContent, Typography } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ZoneCard = (props) => {
    return(
        <Card sx={{ minWidth: 350 }}>
            <CardContent>
                
                <Typography gutterBottom variant="h5" component="div">
                    Zone 
                    <br/>
                    <TextField name='name' id="outlined-basic" label="Name" variant="outlined" sx={{width:"150px",mr:1}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.name}/>
                </Typography>
                    
                    <Typography>
                        Point 1
                    </Typography>
                
                    <TextField name='p1_lng' id="outlined-basic" label="Longitude" variant="outlined" sx={{width:"150px",mr:1}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p1_lng}/>
                   
                    <TextField name='p1_lat' id="outlined-basic" label="Latitude" variant="outlined" sx={{width:"150px"}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p1_lat}/>
                
                    <Typography>
                        Point 2
                    </Typography>
                    <TextField name="p2_lng" id="outlined-basic" label="Longitude" variant="outlined" sx={{width:"150px",mr:1}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p2_lng}/>
                    <TextField name="p2_lat" id="outlined-basic" label="Latitude" variant="outlined" sx={{width:"150px"}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p2_lat}/>
                    <Typography>
                        Point 3
                    </Typography>
                    <TextField name="p3_lng" id="outlined-basic" label="Longitude" variant="outlined" sx={{width:"150px",mr:1}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p3_lng}/>
                    <TextField name="p3_lat" id="outlined-basic" label="Latitude" variant="outlined" sx={{width:"150px"}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p3_lat}/>
                    <Typography>
                        Point 4
                    </Typography>
                    <TextField name="p4_lng" id="outlined-basic" label="Longitude" variant="outlined" sx={{width:"150px",mr:1}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p4_lng}/>
                    <TextField name="p4_lat" id="outlined-basic" label="Latitude" variant="outlined" sx={{width:"150px"}} onChange={(e) => props.onChange(e,props.id)} value={props.zone.p4_lat}/>
         
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.onClick(props.id)}>Remove</Button>
            </CardActions>

        </Card>
    )
}

export default ZoneCard;