import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);
    const role = parsed.role || "";
    return {
      email: parsed.sub || "",
      role: role,
      isAdmin: role.includes("ADMIN"),
      isEmployee: role.includes("EMPLOYEE")
    };
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};

export default api;