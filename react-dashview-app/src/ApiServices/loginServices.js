import axios from 'axios'

const endpoint = 'http://localhost:5000/dashboard';

// request user login and logout 
const logInUser =(payload)=>{
    const config = {
        method: "POST",
        url: `${endpoint}/login`,
        data:{payload},
        withCredentials: true,
        crossdomain: true,
        headers: {
            'Content-Type' : 'application/json',
        },
    }
    return axios(config).then(response=> {
        console.log(response)
        return response
    })
    .catch(error => {
        return Promise.reject(error.message);
    })
};

const logOutUser =()=>{
    const config = {
        method:'POST',
        url:`${endpoint}/logout`,
        withCredentials: true,
        headers: {
            'Content-Type' : 'applciation/json'
        }
    }
    return axios(config).then(response=>{
        console.log(response)
    }).catch(error=>{
        console.log({'Error': error})
    });
};

const LoginServices = {
    logInUser,
    logOutUser
};

export default LoginServices;