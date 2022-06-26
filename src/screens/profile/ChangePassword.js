import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {AuthContext} from '../../common/context/auth-context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePassword = () => {
    const [open, setOpen] = React.useState(false);
    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();

    const postChangePW = async (data) => {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/change-password`,
            {
                password: data.get('currentPassword'),
                newPassword: data.get('password'),
            },
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            },
                
        }).then(res => {
            console.log(res);
            navigate('/profile');
            alert("Password changed successfully!");
        })
        .catch(function (error) {
            console.log(error);
            setOpen(true);
          });
        
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        postChangePW(data);
    };

    return (
        <Container maxWidth="sm">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Failed to change password!
                </Alert>
             </Snackbar>
            <Typography variant="h5" style={{marginTop:"20px"}}>
                Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="currentPassword"
                label="Current Password"
                name="currentPassword"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                />
                {/* <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                /> */}
            
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Submit
                </Button>
                
            </Box>

         </Container>
    )
}

export default ChangePassword;