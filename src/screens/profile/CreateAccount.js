import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

const CreateAccount = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          employeeId: data.get('employeeId'),
          name: data.get('name'),
          email: data.get('email'),
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" style={{marginTop:"20px"}}>
                Create Sub Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="employeeId"
                label="Employee ID"
                name="employeeId"
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                id="email"
                />
            
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Create
                </Button>
                
            </Box>

         </Container>
    );
}

export default CreateAccount;