import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user=useSelector((state: RootState) => state.auth.user);
  const rehydrated = useSelector((state: RootState) => state._persist?.rehydrated);
  if (rehydrated === false) {
    return <div>Loading...</div>; // Show a loading state until rehydration is complete
  }

  if (!authenticated || user===null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
