import axios from 'axios';

const userapi = axios.create({
  withCredentials: true,
    baseURL: 'http://backend.local/api/user',
    headers: {
      'Content-Type': 'application/json',
    },
});
export default userapi;