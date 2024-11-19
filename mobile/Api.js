import axios from "axios";

// const baseURL = import.meta.env.VITE_API_URL     
// todo: would be the best case scenario but we are in a hurry

//const baseURL = "http://localhost:8080"
const baseURL = "http://165.227.166.132:30002/auth/"


function apiInstance() {
  return axios.create({
    baseURL
  });
}

export default apiInstance;