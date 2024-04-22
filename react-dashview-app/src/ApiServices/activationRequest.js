import axios from 'axios'

const endpoint = 'http://localhost:5000/dashboard';

// request activation email
const sendActivation = (payload) => {
    const config = {
        method: 'POST',
        data:payload,
        url: `${endpoint}/activation_request`,
        crossdomain: true,
        headers:{
            'Content-type': 'application/json'
        }
    };

    return axios(config)
    .then(response=>console.log(response))
    .catch(error=>console.log({'Error': error}));
}

const activationRequest = {
    sendActivation,
};

export default activationRequest;