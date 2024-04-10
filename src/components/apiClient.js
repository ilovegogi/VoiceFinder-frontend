import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // 모든 요청에 쿠키를 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
