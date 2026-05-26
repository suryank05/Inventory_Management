import axios from 'axios'

const BASE_URL = "http://localhost:8083/user";

const getToken = () => localStorage.getItem("token");

export const addUser = async (user) => {
  return await axios.post(`${BASE_URL}/add`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const getUser = async () => {
  return await axios.get(`${BASE_URL}/get`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateUser = async (user) => {
  return await axios.put(`${BASE_URL}/update`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const deleteUser = async (e) => {
  return await axios.delete(`http://localhost:8083/user/delete`, {
    params: { email : e },
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
