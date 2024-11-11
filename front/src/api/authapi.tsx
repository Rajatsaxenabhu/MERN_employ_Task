import axios from 'axios';

const authapi = axios.create({
  withCredentials: true, // Send cookies with requests
  baseURL: 'http://localhost:3000/api/auth', // Use the service name 'backend' for Docker container resolution
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authapi;
