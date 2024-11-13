import axios from 'axios';

const authapi = axios.create({
  withCredentials: true, // Send cookies with requests
  baseURL: `${import.meta.env.VITE_BACK_API}/api/auth`, // Use the service name 'backend' for Docker container resolution
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authapi;
