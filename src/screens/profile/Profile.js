import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../common/context/auth-context';

const Profile = () => {
    const navigate = useNavigate();
    const auth = React.useContext(AuthContext);

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    }

    return(
        <Box sx={{margin:"20px" }}>
            <Card sx={{ maxWidth: 345,margin:"0 auto" }}>
                <CardActionArea onClick={()=>navigate('/profile/change-password')}>
                    <CardContent style={{textAlign:"center"}}>
                        <Typography variant="h6" style={{alignItems: 'center',display:"inline-flex"}}>
                            Change Password
                            <ChevronRightIcon style={{textAlign:"right"}}/>
                        </Typography>
                    
                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            <Card sx={{ maxWidth: 345,margin:"0 auto" }}>
                <CardActionArea onClick={()=>navigate('/profile/instruction')}>
                    <CardContent style={{textAlign:"center"}}>
                    <Typography variant="h6" style={{alignItems: 'center',display:"inline-flex"}}>
                        App Instructions
                        <ChevronRightIcon style={{textAlign:"right"}}/>
                    </Typography>
                    
                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            {auth.type==="super" &&
            <>
            <Card sx={{ maxWidth: 345,margin:"0 auto" }}>
                <CardActionArea onClick={()=>navigate('/profile/create-account')}>
                    <CardContent style={{textAlign:"center"}}>
                    <Typography variant="h6" style={{alignItems: 'center',display:"inline-flex"}} data-cy="create">
                        Create Account
                        <ChevronRightIcon style={{textAlign:"right"}}/>
                    </Typography>
                    
                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            </>
            }
            <Card sx={{ maxWidth: 345,margin:"0 auto" }}>
                <CardActionArea onClick={handleLogout}>
                    <CardContent style={{textAlign:"center"}}>
                    <Typography variant="h6" style={{alignItems: 'center',display:"inline-flex"}} data-cy="logout">
                        Log Out
                        <ChevronRightIcon style={{textAlign:"right"}}/>
                    </Typography>
                    
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>

    );
}

export default Profile;