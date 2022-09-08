import axios from "axios";
const token = JSON.parse(localStorage.getItem('token'));

export const axiosPublicInstance = axios.create({
    baseURL : 'http://localhost:1337/api'
});

export const axiosPrivetInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        Authorization: `Bearer ${token}`
    }
});