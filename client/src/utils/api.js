/* global API_URL */
import axios from 'axios';

let instance;

if (API_URL !== '9999') {
  instance = axios.create({
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
} else {
  instance = axios;
}

export default instance;
