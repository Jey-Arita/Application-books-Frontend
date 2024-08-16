import axios from "axios";


const API_URL = 'https://localhost:7152/api';

const appApi = axios.create({
    baseURL : API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});


// TODO: add interceptors

export {
    appApi,
    API_URL
}