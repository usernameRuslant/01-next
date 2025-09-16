// import axios from 'axios';

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
