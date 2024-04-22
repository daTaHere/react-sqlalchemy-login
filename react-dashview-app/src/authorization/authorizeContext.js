import React, {useState, createContext, useContext} from "react";
import credentialServices from "../ApiServices/credentialServices";

const AuthorizeContext = createContext()

const AuthorizeProvider = ({children})=> {
    // state of current users
    const [currentUser, setCurrentUser] = useState(null);
    // state of users access
    const [isAuthorized, setIsAuthorized] = useState(false);

    // auth user
    const Authorize = (user) => {
        setCurrentUser((prevState)=>{
            let loggedUser = {...prevState};
            loggedUser = user;
            console.log(loggedUser)
            return loggedUser
            
        });
        
        setIsAuthorized(true);
    };

    // unauth user
    const Unauthorize = () => {
        if(currentUser !== null){
            setCurrentUser(null);
            setIsAuthorized(false);
        }
        else{
             setIsAuthorized(false);
        }
    };

    // check state of users activate session and handle response errors
    const CheckUserStatus = () => {

        const onGetCredentialsSuccess = ( response ) => {
            let result = response.data.isAuthorize;
          
            setIsAuthorized((prevState)=> {
                let authorize = {...prevState};
                authorize = result;
                return authorize;
            });
            };
    
        const onGetCredentialsError = ( error ) => {
        console.log({Error:error});
        };
        
        credentialServices.getCredentials()
        .then(onGetCredentialsSuccess)
        .catch(onGetCredentialsError)
        
    };

    return (
        <AuthorizeContext.Provider 
        value={{
            currentUser, 
            setCurrentUser, 
            isAuthorized, 
            Unauthorize, 
            Authorize, 
            setIsAuthorized, 
            CheckUserStatus,
             }}>
            {children}
        </AuthorizeContext.Provider>
    );
};

const ContextAuthorizer = () => {
    return useContext(AuthorizeContext)
}

export {AuthorizeProvider, ContextAuthorizer }
