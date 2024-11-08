import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './hooks/ProtectedRoute';
import Dashboard from './components/Dashboard';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store';
import Error from './pages/Error';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />         
            <Route path="*" element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
