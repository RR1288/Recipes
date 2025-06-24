import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchIngredients = (params) => API.get('/ingredients', { params });
export const addIngredient = (data) => API.post('/ingredients', data);
export const deleteIngredient = (id) => API.delete(`/ingredients/${id}`);
export const updateIngredient = (id, data) => API.put(`/ingredients/${id}`, data);
