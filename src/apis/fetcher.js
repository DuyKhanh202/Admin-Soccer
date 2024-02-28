import axios from "axios";

// Setup axios instance - tạo ra cấu hình mặc định
const fetcher = axios.create({
  baseURL: "http://localhost:8080",
});

fetcher.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X25hbWUiOiJraGFuaDIwMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTg1MTQwNiwiZXhwIjoxNzA1MDM1NDA2fQ.oOPKgzpd34aTMq-XrJr-etWQhkJ2u1Qx3etAntn8eFc";
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;