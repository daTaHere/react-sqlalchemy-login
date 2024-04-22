import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box'
import { Button } from '@mui/material';
import { Container } from '@mui/system';

import IOChart from "./IOChart";
import CpuDataService from '../../ApiServices/cpuDataServices'


function CpuIOGraph () {

  const navigate = useNavigate();
  
  // store cpu state and handle updates
  const [cpuData, setCpuData] = useState({
    arrayOfData:[],
    dataComponents:[],
  });

  // Set intial rendering then delay cpu data request
  const [isInitial, setIsInitila] = useState(true)

  // Render cpu graph 
  const onGetCpuDataSuccess = (response) => {
    setIsInitila(false);
    setCpuData((prevState)=>{
      let newState = {...prevState};
      newState.arrayOfData = response;
      newState.dataComponents = response.map(mapData);
      return newState
    });
  };
  const onGetCpuDataError = (error) => {
    console.log({Error:error});
  };

  // Handle 1st of cpu state update without time delay 
  useEffect(()=>{
        if(isInitial){
          CpuDataService.GetCpuData()
          .then(onGetCpuDataSuccess)
          .catch(onGetCpuDataError);
        }
      // eslint-disable-next-line   
      },[]);

  // Handle cpu data state update 2 sec interval
  useEffect(()=> {
    const updateCpuData = setInterval(() => {
      CpuDataService.GetCpuData()
        .then(onGetCpuDataSuccess)
        .catch(onGetCpuDataError);
      },2200);
      return () => clearInterval(updateCpuData);
      // eslint-disable-next-line 
  },[cpuData]);
  
  // map data to graph component
  const mapData = (iOData) => {
    return(
      <IOChart
       iOData={iOData}
       />
      )
    };

  // route back to homepage
  const onHome = () =>{
    navigate('/main');
  }

    return(
        <div>
            <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 10,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          <h1> CPU READ and WRITE DATA </h1>
        </Box>
        <Container maxWidth="md">
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        {cpuData.dataComponents}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          ml: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          <Button 
          variant="contained" 
          size="medium"
          onClick={onHome}
          > Home 
          </Button>   
        </Box>
        </Container>
        </div>
    )
}

export default CpuIOGraph;