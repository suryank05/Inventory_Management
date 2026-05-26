import axios from "axios";



export const getall = async () => {
  const token = localStorage.getItem("token"); 
  return await axios.get("http://localhost:8083/inventory/getall", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addItem = async (item) => {
  const token = localStorage.getItem("token"); 
  return await axios.post("http://localhost:8083/inventory/add", item, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const getDeletedItems = async () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN for deleted:", token); 
  return await axios.get("http://localhost:8083/inventory/deleted", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const restoreItem = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.put(`http://localhost:8083/inventory/restore/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};




export const updateItem = async (item) => {
  const token = localStorage.getItem("token"); 
  return await axios.put("http://localhost:8083/inventory/update", item, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const deleteItem = async (id) => {
  console.log("Deleting item with ID:", id);
  const token = localStorage.getItem("token"); 
  return await axios.delete(`http://localhost:8083/inventory/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const upload_excel = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();   
  formData.append("file", file);     

  return await axios.post(
    "http://localhost:8083/user/upload-excel",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
