import axios from "axios";

//const baseURL = import.meta.env.VITE_API_URL
const baseURL = 'http://165.227.166.132:30002'

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