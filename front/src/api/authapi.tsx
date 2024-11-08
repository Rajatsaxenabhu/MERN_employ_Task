import axios from 'axios';

const authapi = axios.create({
  withCredentials: true,
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
      'Content-Type': 'application/json',
    },
});
export default authapi;