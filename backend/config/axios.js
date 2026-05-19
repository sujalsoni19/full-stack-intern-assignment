import axios from "axios";

const api = axios.create({
  baseURL: "https://api.mfapi.in",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
