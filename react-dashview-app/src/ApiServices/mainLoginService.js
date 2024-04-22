import axios from "axios";

const endpoint = "http://localhost:5000/dashboard";

// request users access status to main page
const getCredentials = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/main`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      'Content-Type':'application/json', 
    },
  };

  return axios(config)
  .then((response) => {
    return response;})
  .catch(error => {
    console.log({'Error': error.message })
  });
};

const mainServices = {
    getCredentials,
};

export default mainServices;