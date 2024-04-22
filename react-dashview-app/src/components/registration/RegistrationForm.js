import React from "react";
import {Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { RegistrationSchema } from "../validations/RegistrationSchema";

import userServices from '../../ApiServices/userServices'
import Alerts from "../sweatAlerts/alert";

import '../componentCss/form.css'


function Register(){

    const navigate = useNavigate();

    // handle user registration success and aknowledge message
    const onUserCreateSuccess =(response)=>{
        (async ()=>{
            const navi = await navigate('/login');
            Alerts.Comfirmation.fire({
                title: "Account Was Successfully Created",
                html: `Link Will Be Sent To <strong class="font-weight-bold text-primary">${response.data.email}</strong> For Activation` 
            });
        })()
    };

    // handle new user registration error
    const onUserCreateError =(error)=>{
        Alerts.Toast.fire({
            title: 'This Account Already Exist Please Try Again.',
            icon: 'error',
            position: 'center'

        })
        console.log({'Error': error.message});
    }

    // handle Registration request form payload
    const onSubmit = (values,{resetForm}) => {
        userServices.createUser(values)
        .then(onUserCreateSuccess)
        .catch(onUserCreateError)
    };

    return(
        <div className="container">
            <div className="row d-flex justify-content-center my-4">
                <div className="col-9">
                    <h1 className="text-center">Registration</h1>
                </div>
                <div className="row d-flex justify-content-center">
                <Formik
                 initialValues={{
                    first_name:'',
                    middle_initial:'',
                    last_name:'',
                    username:'',
                    email:'',
                    password:'',
                }}
                 validationSchema={RegistrationSchema}
                 onSubmit={onSubmit}
                 >
                    {({errors,touched})=>{
                        return(
                        <Form className="reg-form-container shadow-lg col-4 p-3 my-3 rounded-4 border border-dark">
                            <label htmlFor="first_name">First Name</label>
                            <Field 
                                className="form-control mt-1 mb-2 border border-dark" 
                                type="text"
                                name="first_name"
                                placeholder="Enter first name"/>
                                {errors.first_name && touched.first_name ? 
                                (<div className="form-danger">{errors.first_name}</div>) : null}
                                <label htmlFor="first_name">MI</label>
                            <Field 
                                className="form-control mt-1 mb-2 border border-dark" 
                                type="text"
                                name="middle_initial"
                                placeholder="Enter Middle Initial"/>
                                {errors.middle_initial && touched.middle_initial ? 
                                (<div className="form-danger">{errors.middle_initial}</div>) : null}
                                <label htmlFor="middle_initial">Last Name</label>
                            <Field 
                                className="form-control mt-1 mb-2 border border-dark" 
                                type="text"
                                name="last_name"
                                placeholder="Enter Last Name"/>
                                {errors.last_name && touched.last_name ? 
                                (<div className="form-danger">{errors.last_name}</div>) : null}
                                <label htmlFor="last_name">Email</label>
                            <Field 
                                className="form-control mt-1 mb-2 border border-dark" 
                                type="email"
                                name="email"
                                placeholder="Enter Email"/>
                                {errors.email && touched.email ? 
                                (<div className="form-danger">{errors.email}</div>) : null}
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
                                className="form-control mt-1 mb-3 border border-dark" 
                                type="password"
                                name="password"
                                placeholder="Enter Password"/>
                                {errors.password && touched.password ? 
                                (<div className="form-danger">{errors.password}</div>) : null}
                            <div className="row mb-2">
                                <div className="col-5">
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        size="lg"
                                        className="col-12 form-btn-submit"
                                        >Submit
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <Link className="col-12 form-link-reg" to={"/login"}>Login</Link>
                                </div>
                            </div>
                        </Form>
                        )
                    }}
                </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register;