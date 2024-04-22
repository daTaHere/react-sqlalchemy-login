import { Navigate, Outlet } from 'react-router-dom'
import { ContextAuthorizer } from '../authorization/authorizeContext';

function PrivateRoutes(){
      const { isAuthorized } = ContextAuthorizer();
        
    return (
        isAuthorized === true ?  <Outlet/> : <Navigate to={'/login'} /> 
    )
};
export default PrivateRoutes 