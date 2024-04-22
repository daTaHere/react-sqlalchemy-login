import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from '../components/registration/RegistrationForm'
import Login from '../components/login/LoginForm';


import Main from '../components/dashboard/Main';
import Cpu from '../components/grahps/CpuIOGraph';

import PageNotFound from '../components/dashboard/404-Page';
import ExpireLink from '../components/dashboard/402-Expire';
import BadLink from '../components/dashboard/402-Bad';

import PrivateRoutes from '../routes/privateRoutes'
import PublicRoutes from '../routes/publicRoutes';
import PWReset from '../components/login/PWReset';
import '../App.css';

function App() {

  return (
    
    <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path= 'login/:isActived' element={<Login/>}/>
      </Route>
      <Route element={<PrivateRoutes/>}>
        <Route path='/main' element={<Main/>}/>
        <Route path='/cpu' element={<Cpu/>}/>
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/password_reset/:token' element={<PWReset/>}/>
      <Route path='/expire' element={<ExpireLink/>}/>
      <Route path='/bad' element={<BadLink/>}/>
    </Routes>

  );
}

export default App;