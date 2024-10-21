import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 

function apiInstance(
 sessionToken,
) {
  if (!sessionToken) {
    return axios.create({
      baseURL
    });
  }

  return axios.create({
    baseURL,
    headers: {
      'x-session-token': sessionToken
    }
  });
}

export default apiInstance;