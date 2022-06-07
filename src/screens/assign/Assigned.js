import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

function EditToolbar(props) {

  const navigate = useNavigate();
  
  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
    console.log("mousedown")
    navigate('/assign/add');
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



export default function StartEditButtonGrid() {
  const navigate = useNavigate();

  const handleOnClick= (rowParams)=>{
    console.log(rowParams)
    //navigate('/assign/'+rowParams.boatId);

  }

  return (
    <div style={{ height: 600, width: '100%' }}>
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

const columns = [
  { field: 'boatId', headerName: 'Boat ID', width: 60 },
  { field: 'location', headerName: 'Location', width: 140},
  {
    field: 'serial',
    headerName: 'Serial Number',
    width: 120,
  },
  {
    field: 'assigner',
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

const rows = [
  {
    id: 1,
    boatId: '001',
    location: 'lower seletar reservoir',
    serial: '12412124',
    assigner: 'sam',
  },
  
];
