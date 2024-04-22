import { Navigate, Outlet } from 'react-router-dom'
import { ContextAuthorizer } from '../authorization/authorizeContext';

function PublicRoutes() {
      const { isAuthorized } = ContextAuthorizer();

    return (
        !isAuthorized ? <Outlet/>  : <Navigate to={'/main'}/>
    )
}

export default PublicRoutes