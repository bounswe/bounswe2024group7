import axios from "axios";
import { useState } from "react";

// const baseURL = import.meta.env.VITE_API_URL     
// todo: would be the best case scenario but we are in a hurry

// const baseURL = "http://10.0.2.2:8081"
const baseURL = "https://artifactbackend-yslcfqdwna-oa.a.run.app"

function apiInstance() {
  return axios.create({
    baseURL
  });
}

export default apiInstance;