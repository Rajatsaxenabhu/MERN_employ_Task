import axios from 'axios';

const uploadapi = axios.create({
  withCredentials: true,
    baseURL: 'http://backend.local/api',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});
export default uploadapi;