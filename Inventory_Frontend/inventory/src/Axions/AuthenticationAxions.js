import axios from 'axios';

export const login = async (req) => {
  return axios.post("http://localhost:8083/auth/login", req);
};

export const register = async (req) => {
  return axios.post("http://localhost:8083/auth/register", req);
};
