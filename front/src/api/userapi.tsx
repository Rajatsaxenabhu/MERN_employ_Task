import axios from 'axios';

const userapi = axios.create({
  withCredentials: true,
    baseURL: `${import.meta.env.VITE_BACK_API}/api/user`,
    headers: {
      'Content-Type': 'application/json',
    },
});
export default userapi;