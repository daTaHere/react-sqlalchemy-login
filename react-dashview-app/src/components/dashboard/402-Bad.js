import React from 'react'
import { Link } from 'react-router-dom'

const BadLink = () => {

    // Bad token page
    return (
        <div className='container'>
            <div className='my-3'>
                <h1 className='row d-flex justify-content-center'>BAD Activation Link! </h1>
                <h1 className='row d-flex justify-content-center'>Please request a new one.</h1>
                <h5>
                    <Link className='row d-flex justify-content-center'to={'/login'} >Return to Login</Link>
                </h5>
            </div>
            <div className='row d-flex justify-content-center'>
                <img style={{width:"2500px", marginBottom:"150px"}} className='boarder shadow-dark' src="https://cdn.akamai.steamstatic.com/steam/apps/2397630/capsule_616x353.jpg?t=1701889236://thecoolchristiansclub.files.wordpress.com/2012/10/expired2.jpg" alt='Bad Egg page' />
            </div>
        </div >
    )
}

export default BadLink