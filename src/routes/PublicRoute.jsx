import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context';

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation();
  const loadedComponent = user ?
    (<Navigate to={location?.state?.from ? location?.state?.from : '/contacts'} />)
    : (children);
    
  return (
      <>
          {loadedComponent}
      </>
  )
}

export default PublicRoute