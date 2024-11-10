import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, } from '../redux/slice/authSlice';
import { AppDispatch } from '../redux/store';
import authapi from '../api/authapi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ToastContainer, toast } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (username.length < 4) {
      toast.error('Username must be at least 4 characters long.');
      return;
    }
  
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }  
    setIsLoading(true); //
    try {
      await authapi.post('/signup', { username, password });
      dispatch(setCredentials({ user: username }));
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        toast.error(axiosError.response?.data?.message || 'Signup failed, please try again.');
      } else {
        toast.error('An unknown error occurred. Please try again later.');
      }
      console.error('Signup failed', err);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
    </div>
  );
};

export default Signup;
