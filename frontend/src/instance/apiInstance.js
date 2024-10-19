import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 

function apiInstance(
  username,
  password
) {
  if (!username || !password) {
    return axios.create({
      baseURL
    });
  }

  const token = btoa(`${username}:${password}`)

  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Basic ${token}`
    }
  });
}

export default apiInstance;