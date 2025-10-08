import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

if (/ngrok(?:-free)?\.(?:app|io)/i.test(BACKEND_URL)) {
  axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
}
export default axiosInstance;