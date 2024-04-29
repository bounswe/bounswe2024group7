import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 

function apiInstance() {
  return axios.create({
    baseURL
  });
}

export default apiInstance;