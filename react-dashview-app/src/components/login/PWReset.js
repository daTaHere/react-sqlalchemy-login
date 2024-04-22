import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import '../componentCss/form.css'

import { useParams, useNavigate } from 'react-router-dom'
import { Formik, Form, Field,  } from 'formik';

import tempPWServices from '../../ApiServices/tempPWServices';
import { PWResetSchema } from '../validations/PWResetSchema';
import Alerts from '../sweatAlerts/alert';


function PWReset(){

    const tempPw = useParams();
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('');

    // retrive token and check auth status
    useEffect(()=>{
        tempPWServices.comfirmResetToken(tempPw.token)
        .then(onConfirmTempPWSuccess)
        .catch(onConfirmTempPWError)
    // eslint-disable-next-line
    },[]);
    const onConfirmTempPWSuccess = (response) => {
        (async ()=>{
            console.log(response)
            const swalMixin = await Alerts.ComfirmPWReset();
    // request users input their username
            swalMixin.fire({
                customClass:{
                    confirmButton:"onSendComfirmPWReset"
                },
    // compare username to username assoicated with token
                preConfirm:(text) =>{
                    if(text !== response.data.username){
    // handle incorrect user input
                        navigate('/login')
                        Alerts.Toast.fire({
                            icon:'error',
                            position:'center',
                            timer:2500,
                            title: `There is an issue with your credentials Pleas Check your username or Email.` 
                        });
    // comfirmed user and allow password update
                    }else{
                        setCurrentUser((prevState)=>{
                            let newState = {...prevState};
                            newState = response.data;
                            return newState
                        })
                        Alerts.Toast.fire({
                            icon:'success',
                            position:'center',
                            title: `Your account is verified!!! Complete Password reset.` 
                        });
                    }
                }
            })
        })()
    };
    // handle faulty request or token
    const onConfirmTempPWError = (error) => {
        console.log(error)
        if(error.response){
            navigate(`/${error.response.data}`)
        }else{
            console.log(error.message)
            navigate(`/bad`)
        }
    };
  
    // PWReset form payload
    const onSubmit = (values,{resetForm}) => {
        resetForm();
        let request = { payload:{
            new_password:values.new_password, 
            user_id:currentUser.id} 
        }
        tempPWServices.updatePW(request)
        .then(onUpdatePwSuccess)
        .catch(onUpdatePwError)
    };
    // aknowledge update success
    const onUpdatePwSuccess = (response) => {
        (async ()=>{
            // eslint-disable-next-line
            const resetComfirmed = await
            Alerts.Comfirmation.fire({
                title:'Reset Completed Successful!',
                text:'Continue to Login.'
            });
            navigate('/login')
        })();
    };
    // handle PW update request error
    const onUpdatePwError = (error) => {
       Alerts.Toast.fire({
        icon:'error',
        position:'center',
        timer:2500,
        title: `There Was An Issue With Your Request! Please Try Again Or Request A New Link.` 
       })
    };


    return(
        <div className="container">
            <div className="row d-flex justify-content-center my-4">
                <div className="col-9">
                    <h1 className="text-center">Password Reset</h1>
                </div>
                <div className="row d-flex justify-content-center">
                    <Formik
                    initialValues={{new_password:"", confirm_password:"" }}
                    validationSchema={PWResetSchema}
                    onSubmit={onSubmit}
                    >
                        {({errors, touched, resetForm })=>{
                            return(
                                <Form className="login-form-container shadow-lg col-3 pt-2 px-3 my-3 rounded-4 border border-dark">
                                    <label htmlFor="new_password">Password</label>
                                    <Field 
                                        className="form-control mt-1 mb-2 border border-dark" 
                                        type="password"
                                        name="new_password"
                                        placeholder="Enter Username"/>
                                        {errors.new_password && touched.new_password ? 
                                    (<div className="form-danger">{errors.new_password}</div>) : null}
                                    <label htmlFor="comfirm_password">Comfirm Password</label>
                                    <Field 
                                        className="form-control mt-1 border border-dark"
                                        type="password"
                                        name="confirm_password"
                                        placeholder="Re-Enter Password"
                                        />
                                        {errors.confirm_password && touched.confirm_password ? 
                                    (<div className="form-danger mb-1">{errors.confirm_password}</div>) : null}
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

export default PWReset;