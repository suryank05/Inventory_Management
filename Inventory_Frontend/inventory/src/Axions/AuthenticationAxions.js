import api from "./api";


export const login = async (req) => {
  const response = await api.post("/auth/login", req);

  console.log("Login response:", response.data);

  const data = response.data;

  const token =
    typeof data === "string"
      ? data
      : data.token || data.jwt || data.accessToken;

  if (!token || token === "undefined") {
    console.error("Token is missing from the login response");
    return response;
  }

  localStorage.setItem("token", token);

  console.log("Token saved:", !!localStorage.getItem("token"));

  return response;
};

export const register = async (req) => {
  return await api.post("/auth/register", req);
};