import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://chattapp-backend-stgw.onrender.com/api",
    withCredentials:true,
})