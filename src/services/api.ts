import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rituals24-bend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});