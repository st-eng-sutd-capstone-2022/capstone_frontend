import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";


const ChangePassword = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            currentPassword: data.get('currentPassword'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        });
    };

    return (
        <Container maxWidth="sm">
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
                <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                />
            
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