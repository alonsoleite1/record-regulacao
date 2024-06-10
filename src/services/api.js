import axios from "axios";

export const api = axios.create({
    baseURL: "https://record-regulacao-api.onrender.com",
    timeout: 15 * 1000
});