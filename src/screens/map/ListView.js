import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const ListView = () => {
    return(
        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>
    )
}

const columns = [
    { field: 'boatId', headerName: 'ID' },
    { field: 'status', headerName: 'Status'},
    { field: 'battery',headerName: 'Battery'},
    { field: 'weight',headerName: 'Last Load'},
    { field: 'estimatedWeight',headerName: 'Estimated Weight'},
    { field: 'zone',headerName: 'Zone'},
  ];
  
  const rows = [
    {
        id: 1,
        boatId: 'Ally',
        status: 'active',
        battery: '20',
        weight: '20',
        estimatedWeight: '21',
        zone: '1',
    },
    {
        id: 2,
        boatId: 'Betty',
        status: 'inactive',
        battery: '80',
        weight: '30',
        estimatedWeight: '22',
        zone: '2',
    },
    {
        id: 3,
        boatId: 'Cally',
        status: 'moving',
        battery: '80',
        weight: '34',
        estimatedWeight: '33',
        zone: '3',
    },
      
    
  ];

export default ListView;
