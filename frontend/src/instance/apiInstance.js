import axios from "axios";

//
const baseURL = 'http://165.227.166.132:30002'


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
