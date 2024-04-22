import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {

    // 404 route not found page
    return (
        <div className='container'>
            <div className='my-3'>
                <h1 className='row d-flex justify-content-center'>404 page not found!</h1>
                <h5>
                    <Link className='row d-flex justify-content-center'to={'/main'} >Return to Dashboard</Link>
                </h5>
            </div>
            <div className='row d-flex justify-content-center'>
                <img src="https://miro.medium.com/v2/resize:fit:1200/1*EQisBuMOijQT8woW0Jn6pA.jpeg" alt='Not Found Page'/>
            </div>
        </div >
    )
}

export default PageNotFound