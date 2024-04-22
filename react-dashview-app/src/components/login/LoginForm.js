import React, { useEffect } from "react";

import { Button} from "react-bootstrap";
import "../componentCss/form.css";

import {Formik, Form, Field } from "formik";
import { LoginSchema } from "../validations/LoginSchema";

import loginServices from "../../ApiServices/loginServices";
import UserServices from "../../ApiServices/userServices";
import tempPWServices from "../../ApiServices/tempPWServices";

import { Link, useParams, useNavigate } from "react-router-dom";
import { ContextAuthorizer } from "../../authorization/authorizeContext";

import Alerts from "../sweatAlerts/alert";


function Login(){
  
    const { Authorize } = ContextAuthorizer();
    const { isActived } = useParams();
    const navigate = useNavigate()


    // check url for activation token
    useEffect(()=>{
        if(isActived){
            console.log(isActived)
            UserServices.getUserById(isActived)
            .then(onGetUserByIdSuccess)
            .catch((error)=>{
                (async () => {
                    const toast = await navigate('/login');
                    Alerts.Toast.fire({
                        icon: 'error',
                        position: 'center',
                        title: `${error.response.data}`,
                        timer: 2800
                    });
                })()
                
            })
        };
    },[])
    // render greeting after successful user activaton
    const onGetUserByIdSuccess = (response) => {
        let activationGreeting = response.data;
        if(!activationGreeting.includes("UnAuthorized")){
            Alerts.newActivation.fire({
                title: `Congratulations ${activationGreeting}!\n Your Account is now Activated.`,
                icon: 'success'
            })
        }
        else{
            
        }
    }

    // registration form api payload
    const onSubmit = (values,{resetForm}) => {
        resetForm();
        loginServices.logInUser(values)
        .then(onLogInUserSuccess)
        .catch(onLogInUserError)
    };
    
    // login in user
    const onLogInUserSuccess = (response) => {
        // handle accounts not yet activated
        let user = response.data;
        if(user === 'Inactive'){
           Alerts.notActive()
        }
        // aknowledged successful login
        else{
            Authorize(user);
            Alerts.Toast.fire({
            icon: 'success',
            position: 'top-end',
            title: 'Login Success'
            });
        };
    };
    // error message on failed login
    const onLogInUserError = (error) => {
        Alerts.Toast.fire({
            icon: 'error',
            position: 'top-end',
            title: 'Login Failed! /n Please Check Username and Password and try again',
          })
        console.log({'Error':error})
    };

    // request password reset link
    const onForgotPW = (e) => {
        e.preventDefault();
        (async () =>{
            const swalMixin = await Alerts.RequestTempPW();
            swalMixin.fire({
                customClass:{
                    confirmButton:'onSendTempPW'
                },
                preConfirm:(email) =>{
                    tempPWServices.sendPWResetEmail(email)
                    .then(onSendPWResetEmailSuccess)
                    .catch(onSendPWResetEmailError)
                }
            })
        })()
    };
    // aknowledge pw reset email was sent
    const onSendPWResetEmailSuccess = (response) => {
        Alerts.Toast.fire({
            icon:'success',
            position:'top-end',
            title: `Tempory Password Has Been sent to ${response.email}`
        });
    };
    // message user on failed pw email requested
    const onSendPWResetEmailError = (error) => {
        Alerts.Email.fire({
            icon:'error',
            title:'Account Can Not Be Found.',

            html:'<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJoddSpx_GuSAJudJy3uPdClnE5acJWNyMBQ&s" width="300px" height="250px" alt="No Acct." /><strong><div className="row" style="color:red">Please Check Your Email</div><strong/>',
        });
    };

    return(
        <div className="container">
            <div className="row d-flex justify-content-center my-4">
                <div className="col-9">
                    <h1 className="text-center">Login</h1>
                </div>
                <div className="row d-flex justify-content-center">
                    <Formik
                    initialValues={{username:"", password:""}}
                    validationSchema={LoginSchema}
                    onSubmit={onSubmit}
                    >
                        {({errors, touched, resetForm })=>{
                            return(
                                <Form className="login-form-container shadow-lg col-3 pt-2 px-3 my-3 rounded-4 border border-dark">
                                    <label htmlFor="username">Username</label>
                                    <Field 
                                        className="form-control mt-1 mb-2 border border-dark" 
                                        type="text"
                                        name="username"
                                        placeholder="Enter Username"/>
                                        {errors.username && touched.username ? 
                                    (<div className="form-danger">{errors.username}</div>) : null}
                                    <label htmlFor="password">Password</label>
                                    <Field 
                                        className="form-control mt-1 border border-dark"
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        />
                                        {errors.password && touched.password ? 
                                    (<div className="form-danger mb-1">{errors.password}</div>) : null}
                                    <div className="row mb-2">
                                        <div className="col-5 mt-3 ms-1">
                                            <Button 
                                                type="submit"
                                                variant="primary" 
                                                size="lg"
                                                className="col-12 form-btn-submit"
                                                >Submit
                                            </Button>
                                        </div>
                                        <div className="col-6 ">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <Link className="col-12 form-link-reg" to={"/register"}>Registration</Link>
                                                </li>
                                                <li>
                                                    <Link className="col-12 form-link-reg" onClick={onForgotPW}>Forgot Password</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
};

export default React.memo(Login);