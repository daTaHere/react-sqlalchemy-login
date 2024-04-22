import React from 'react'
import { Link } from 'react-router-dom'

const ExpireLink = () => {

    // expired token page
    return (
        <div className='container'>
            <div className='my-3'>
                <h1 className='row d-flex justify-content-center'>Your Activation Link Has Expired!</h1>
                <h1 className='row d-flex justify-content-center'>Please request a new one.</h1>
                <h5>
                    <Link className='row d-flex justify-content-center'to={'/login'} >Return to Login</Link>
                </h5>
            </div>
            <div className='row d-flex justify-content-center'>
                <img style={{width:"2500px", marginBottom:"150px"}} className='boarder shadow-dark' src="https://thecoolchristiansclub.files.wordpress.com/2012/10/expired2.jpg" alt='Expired Page'/>
            </div>
        </div >
    )
}

export default ExpireLink