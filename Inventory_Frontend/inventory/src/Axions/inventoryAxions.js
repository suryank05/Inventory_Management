import api from "./api";

export const getall = async (page = 0, size = 9) => {
  return await api.get(`/inventory/getall?page=${page}&size=${size}`);
};

export const addItem = async (item) => {
  return await api.post("/inventory/add", item);
};

export const getDeletedItems = async () => {
  return await api.get("/inventory/deleted");
};

export const restoreItem = async (id) => {
  return await api.put(`/inventory/restore/${id}`);
};

export const updateItem = async (item) => {
  return await api.put("/inventory/update", item);
};

export const deleteItem = async (id) => {
  return await api.delete(`/inventory/delete/${id}`);
};

export const upload_excel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/user/upload-excel", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
