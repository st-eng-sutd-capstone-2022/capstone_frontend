import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

import {AuthContext} from '../../common/context/auth-context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        data-cy="add"
        >
        Add
      </Button>
    
    </Box>
  );
}

export default function AssignBoat() {
  const [open, setOpen] = React.useState(false);
  const [msg,setMsg] = React.useState("");
  const [severity,setSeverity] = React.useState("success");
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(()=>{
    if(location?.state?.msg){
        setOpen(true);
        setMsg(location.state.msg)
        navigate(location.pathname, {});  
    }
  },[location])

  const getAssign = async () => {

    let {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/assign`,{
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
      })
    
    //data.forEach((o,i)=>o.id=o._id);
    return data;
  }

  const delAssign = async (rowBoatId) => {
    axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/assign/${rowBoatId}`,
        {
        headers: {
            'Authorization': `Bearer ${auth.token}`
        },
            
    }).then(res => {
       setOpen(true);
       setMsg("Successfully deleted boat");
       navigate(location.pathname, {});  
       window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
        setOpen(true);
        setSeverity("error");
        setMsg("Error deleting boat")
    });
  }

  const {isLoading, error, data, isFetching} = useQuery(`assign`, getAssign);
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex',justifyContent: 'center',marginTop:'20%'}}>
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { field:'_id',headerName:'ID',width:0,hide:true},
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
              console.log(params.getValue(params.id,'boatId'));
              delAssign(params.getValue(params.id,'boatId'));
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
 
  const handleOnClick= (rowParams)=>{
    const rowBoatObjectId = rowParams.getValue(rowParams.id,'_id');
    const rowBoatId = rowParams.getValue(rowParams.id,'boatId');
    const rowSerial = rowParams.getValue(rowParams.id,'serialNumber');
    const rowLocation = rowParams.getValue(rowParams.id,'location');
    console.log(rowLocation);
    navigate('/assign/boat/'+rowBoatObjectId,{
      state: {
        _id: rowBoatObjectId,
        boatId: rowBoatId,
        serialNumber: rowSerial,
        location: rowLocation
      }
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ height: 500, width: '95%',margin:'auto',marginTop:'20px' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
        </Alert>
      </Snackbar>
      <DataGrid
        sx={{cursor: 'pointer'}}
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        onRowClick={(params, event, details) => {
          if (!event.ignore) {
            handleOnClick(params);
          }
        }}
        components={{
          Toolbar: EditToolbar,
        }}
        
      />
    </div>
  );
}


