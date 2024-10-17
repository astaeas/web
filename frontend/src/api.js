import axios from 'axios';

const API_URL = 'http://192.168.56.3:5001';

export const getItems = async () => {
  return await axios.get(`${API_URL}/items`);
};

export const createItem = async (item) => {
  return await axios.post(`${API_URL}/items`, item);
};

export const updateItem = async (id, item) => {
  return await axios.put(`${API_URL}/items/${id}`, item);
};

export const deleteItem = async (id) => {
  return await axios.delete(`${API_URL}/items/${id}`);
};
