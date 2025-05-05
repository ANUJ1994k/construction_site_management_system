import axios from "axios";

const API = axios.create({
  baseURL: "https://construction-site-management-system.onrender.com/api", 
});

export default API;
