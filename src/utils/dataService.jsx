import axios from "axios";

const axiosDataClient = axios.create({
  baseURL: "https://localhost:7224/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { axiosDataClient };
