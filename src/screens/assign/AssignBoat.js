import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import axios from "axios";

import {AuthContext} from '../../common/context/auth-context';

function EditToolbar(props) {

  const navigate = useNavigate();
  
  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
    console.log("mousedown")
    navigate('/assign/boat/add');
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Button
        onMouseDown={handleMouseDown}
        color="primary"
        variant="outlined"
        sx={{ mr: 1 }}
        >
        Add
      </Button>
    
    </Box>
  );
}

export default function AssignBoat() {

  const auth = React.useContext(AuthContext);

  const getAssign = async () => {

    let {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/assign`,{
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
      })
    
    data.forEach((o,i)=>o.id=i+1);
    return data;
  }

  const [mode, setMode] = React.useState('upcoming');

  const {isLoading, error, data, isFetching} = useQuery(`assign-${mode}`, getAssign, {
    initialData: [{id:1,boatId:1,serialNumber:'123',location:'123'}],
  });
  console.log(data);

  const columns = [
    { field: 'boatId', headerName: 'Boat ID', width: 60 },
    { field: 'location', headerName: 'Location', width: 140},
    {
      field: 'serialNumber',
      headerName: 'Serial Number',
      width: 120,
    },
    {
      field: 'assignee',
      headerName: 'Assigner',
      width: 80,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <strong>
          {/* {params.id} */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(event) => {
              event.ignore = true;
              console.log("delete");
              event.stopPropagation();
            }}
            style={{ marginLeft: 16 }}
          >
            Delete
          </Button>
        </strong>
      ),
      width: 100,
    },
  
  ];
  
  const rows = data
 

  const navigate = useNavigate();

  const handleOnClick= (rowParams)=>{
    console.log(rowParams.id);
    //navigate('/assign/'+rowParams.boatId);
  }

  return (
    <div style={{ height: 500, width: '95%',margin:'auto',marginTop:'20px' }}>
      <DataGrid

        rows={rows}
        columns={columns}
        onRowClick={(event, params) => {
          console.log(params);
          if (!event.ignore) {
            handleOnClick(params.row);
          }
        }}
        components={{
          Toolbar: EditToolbar,
        }}
        
      />
    </div>
  );
}


