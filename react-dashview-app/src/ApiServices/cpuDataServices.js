import axios from "axios";

const endpoint = "http://localhost:5000/dashboard";

// update cpu data
const GetCpuData =()=>{
    const config = {
        method: "GET",
        url: `${endpoint}/cpu`,
        withCredentials: true,
        crossdomain: true,
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    return axios(config)
    .then((response)=>{
        response = response.data;
    return response;
    })
    .catch(error=> {
        // console.log(`Service error: ${error}`));
        return Promise.reject(error.message)}
    );
};

const cpuDataServices = {
    GetCpuData,
}

export default cpuDataServices;