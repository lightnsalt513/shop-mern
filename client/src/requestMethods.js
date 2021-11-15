import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGE3ODE0MWEzMGJlZDE5ODRiMDBjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjQ2NTA0NCwiZXhwIjoxNjM2NzI0MjQ0fQ.tBejLfKtN30eIerxxoHtF_m3dYxqKKQyq5h_VGVWRWs";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {token: `Bearer ${TOKEN}`}
});