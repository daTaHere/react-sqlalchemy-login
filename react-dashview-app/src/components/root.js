import React from "react";
import App from "../app/App";
import { BeforeRenderProvider } from "../authorization/contextBeforeRender";
import {BrowserRouter} from 'react-router-dom'

function Root(){

    return(
       
        <BeforeRenderProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </BeforeRenderProvider>
        
    )
}
export default Root;