import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context';


function PrivetRoute({ children}) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const loadedComponent = user ? children : <Navigate to='/login' state={ {from: location.pathname}} />
    return (
      <>
            {loadedComponent}
      </>
  )
}

export default PrivetRoute