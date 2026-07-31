import axios from "axios";

const API = axios.create({
    baseURL: "https://ecommerceapp-zou4.onrender.com"
});

export default API;