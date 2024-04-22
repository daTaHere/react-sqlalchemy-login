import axios from "axios";

const endpoint = "http://localhost:5000/dashboard";

// request utc data and time
const getCurrentTime =()=>{
    const config = {
        method: "GET",
        url: `${endpoint}/api/time`,
        withCredentials: false,
        crossdomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    
      return axios(config).then((response)=>{
        response = response.data[0];
        console.log(response);
        return response;
      }).catch(error=>console.log(error));
    };

const currentTimeServices = {
  getCurrentTime,
};

export default currentTimeServices;