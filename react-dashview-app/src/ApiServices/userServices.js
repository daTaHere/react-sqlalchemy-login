import axios from 'axios'

const endpoint = 'http://localhost:5000/dashboard';

// request new user registration
const createUser =(payload)=>{
    const config = {
        method: "POST",
        url: `${endpoint}/register`,
        data:{payload},
        withCredentials: true,
        crossdomain: true,
        headers: {
            'Access-Control-Request-Method': 'POST',
            'Content-Type': 'application/json',
        },
    }
    return axios(config).then(response=> {
        return response
    })
    .catch(error => {
        return Promise.reject(error);
    })
};

// check user activation status
const getUserById =(token)=>{
    console.log(token)
    const config = {
        method: "GET",
        url: `${endpoint}/get_user/${token}`,
        withCredentials: false,
        crossdomain: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return axios(config).then(response=> {
        return response
    })
    .catch(error => {
        return Promise.reject(error);
    })
};



const UserServices = {
    createUser,
    getUserById,
};

export default UserServices;