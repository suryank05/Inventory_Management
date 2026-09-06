import api from "./api";

export const login = async (req) => {
  return await api.post("/auth/login", req);
};

export const register = async (req) => {
  return await api.post("/auth/register", req);
};
