import axios from 'axios';

const host = import.meta.env.VITE_API_PORTS;
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8080/api" : `${host}/api`,
    withCredentials: true,
})

export default axiosInstance;