import axios from "axios";

export const api = axios.create({
    baseURL: "https://record-regulacao-api.onrender.com",
    timeout: 8 * 1000
});