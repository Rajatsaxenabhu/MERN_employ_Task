import axios from 'axios';

const userapi = axios.create({
  withCredentials: true,
    baseURL: `http://localhost:3000/api/user`,
    headers: {
      'Content-Type': 'application/json',
    },
});
export default userapi;