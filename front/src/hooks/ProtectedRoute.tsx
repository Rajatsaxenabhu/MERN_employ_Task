import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication status from persisted state
  const authenticated = useSelector((state: RootState) => state.isAuthenticated);
  const user=useSelector((state: RootState) => state.user);
  
  // Optional: check for the loading status of persisted state (if needed)
  const rehydrated = useSelector((state: RootState) => state._persist?.rehydrated);

  // Wait for the state to rehydrate if redux-persist is still loading
  if (rehydrated === false) {
    return <div>Loading...</div>; // Show a loading state until rehydration is complete
  }

  if (!authenticated || user===null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
