import axios from "axios";

const api = axios.create({
  // Emulator 10.0.2.2:3333
  baseURL: "http://localhost:3333",
});

export default api;
