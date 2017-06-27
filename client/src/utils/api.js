import axios from 'axios';

const instance = axios.create({
  baseURL: API_URL
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers = request.headers || {};
    request.headers.Authorization = `JWT ${token}`;
  }
  return request;
});

export default instance;
