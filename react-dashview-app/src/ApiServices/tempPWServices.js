import axios from "axios";

const endpoint = 'http://localhost:5000/dashboard';

// request password reset email
const sendPWResetEmail = (payload) => {
    const config = {
        method:'POST',
        url:`${endpoint}/forgot_pw`,
        data:{payload},
        withCredentials: false,
        crossdomain:true,
        headers:{
            'Content-Type':'application/json',
        }
    };
    return axios(config)
    .then(response=> {
        return response.data
    })
    .catch(error=> {
        return Promise.reject(error.message)
    });
};

// compare reset tokens 
const comfirmResetToken = (payload) => {
    const config = {
        method:'GET',
        url: `${endpoint}/forgot_pw_reset/${payload}`,
        crossdomain:true,
        headers:{
            'Content-type':'application/json',
        }
    };
    return axios(config)
    .then(response => {
        return response
    })
    .catch(error =>{
        return Promise.reject(error)
    })
}

// allow pw update request
const updatePW = (payload) => {
    const config = {
        method:'PUT',
        url:`${endpoint}/reset_password`,
        data:payload,
        withCredentials: false,
        crossdomain:true,
        headers:{
            'Content-type':'application/json',
        }
    };
    return axios(config)
    .then(response => {
        return response
    })
    .catch(error =>{
        return Promise.reject(error)
    })
}

const tempPWServices = {
    sendPWResetEmail,
    comfirmResetToken,
    updatePW,
};

export default tempPWServices;