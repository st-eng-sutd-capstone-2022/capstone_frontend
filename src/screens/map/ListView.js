import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "react-query";
import axios from "axios";

import {AuthContext} from '../../common/context/auth-context';

const ListView = () => {

    const auth = React.useContext(AuthContext);

    const getLiveBoat = async() =>{
        let {data} = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/location/liveboats`,{
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                  }
            }
        )
        return data
    }
    const {isLoading:liveLoading,error:liveError, data:liveData} = useQuery('liveboats', getLiveBoat);
    if(liveLoading){
        return <h1>loading</h1>
    }

    const columns = [
        { field: 'boatId', headerName: 'ID' },
        { field: 'status', headerName: 'Status'},
        { field: 'battery',headerName: 'Battery'},
        { field: 'weight',headerName: 'Last Load'},
        { field: 'estimatedWeight',headerName: 'Estimated Weight', width: 150},
        { field: 'zone',headerName: 'Zone'},
    ];

    let rows = [];
    liveData.map((boat,index)=>{
        const row = {
            id: index,
            boatId: boat.boatID,
            status: boat.status,
            battery: boat.battery,
            weight: boat.weight.kg,
            estimatedWeight: boat.estimatedWeight,
            zone: boat.zone,
        }
        rows.push(row)
    })
    
    return(
        <div style={{ height: 400, width: '95%',margin:'auto',marginTop:'20px'}}>
          
            <DataGrid columns={columns} rows={rows}/>
               
        </div>
    )
}


export default ListView;
