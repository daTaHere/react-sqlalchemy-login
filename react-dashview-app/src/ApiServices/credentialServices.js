import axios from "axios";

const endpoint = "http://localhost:5000/dashboard";

// request current users auth status
const getCredentials = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/authorization`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      'Content-Type':'application/json', 
    },
  };

  return axios(config).then((response)=> {
    return response;})
  .catch(error => {
    return Promise.reject(error.message);
  });
};

const credentialServices = {
    getCredentials,
};

export default credentialServices;