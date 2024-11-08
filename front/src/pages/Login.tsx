import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slice/authSlice';
import authapi from '../api/authapi';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await authapi.post('/login', { username, password });
      const { usernames } = response.data;
      console.log(usernames)
      dispatch(setCredentials({ user:usernames }));
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed, please try again.');
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Log In</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
