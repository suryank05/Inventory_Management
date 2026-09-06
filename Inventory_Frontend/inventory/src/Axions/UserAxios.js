import api from "./api";

export const addUser = async (user) => {
  return await api.post("/user/add", user);
};

export const getUser = async () => {
  return await api.get("/user/get");
};

export const updateUser = async (user) => {
  return await api.put("/user/update", user);
};

export const deleteUser = async (email) => {
  return await api.delete("/user/delete", {
    params: { email }
  });
};
