import React  from 'react';
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ContextAuthorizer } from "../../authorization/authorizeContext";
import LoginServices from '../../ApiServices/loginServices';

import './main.css'

function Main() {
    const navigate = useNavigate();
    const { Unauthorize } = ContextAuthorizer();
    
    // route to cpu data graph component
    const onCpuData = () => {
        navigate('/cpu')
    }

    // end users session
    const LogOut = ()=> {
        LoginServices.logOutUser()
        .then(onLogOutUserSuccess)
        .catch(onLogOutUserError)
        
    };

    // logout acknowledgement
    const onLogOutUserSuccess = (response)=> {
        console.log(response);
        Unauthorize();
    };

    // handle logout error
    const onLogOutUserError = (error)=> {
        console.log({'Error': error});
    };

    return (
        <div>
            <div className='mt-3'>
                <h1 className="text-center">Main</h1>
            </div>
                <Box sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                }}>
                <div className="col-1">
                    <div className="row mb-3 btn-main">
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={onCpuData}>
                            CPU DATA
                        </Button>
                    </div>
                    <div className="row">
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={LogOut}>
                            LOGOUT
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
        
    )
}

export default Main;