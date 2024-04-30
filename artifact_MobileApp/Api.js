import axios from "axios";

// const baseURL = import.meta.env.VITE_API_URL     
// todo: would be the best case scenario but we are in a hurry

const baseURL = "http://localhost:8080"

function apiInstance() {
  return axios.create({
    baseURL
  });
}

export default apiInstance;