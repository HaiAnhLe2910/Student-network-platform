import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

//intercept the request before it is handled by then or catch in api calls
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    // const token = "1|hJs335YMqCc63HsldCASVBefGS3V2aOjX7edlC6Q";

    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
      // POST request
      config.headers.post["Content-type"] = 'application/x-www-form-urlencoded';
      config.headers.post["Accept"] = 'application/json'; 
      // PUT request
      config.headers.put["Content-type"] = 'application/x-www-form-urlencoded';
      config.headers.put["Accept"] = 'application/json';
      // DELETE request
      config.headers.delete["Accept"] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;