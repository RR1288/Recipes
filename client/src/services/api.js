import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Ingredients
export const fetchIngredients = (params) => API.get("/ingredients", {params});
export const getIngredient = (id) => API.get(`/ingredients/${id}`);
export const addIngredient = (data) => API.post("/ingredients", data);
export const deleteIngredient = (id) => API.delete(`/ingredients/${id}`);
export const updateIngredient = (id, data) =>
    API.put(`/ingredients/${id}`, data);

// Recipes
export const fetchRecipes = (params) => API.get("/recipes", {params});
export const addRecipe = (data) => API.post("/recipes", data);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const updateRecipe = (id, data) =>
    API.put(`/recipes/${id}`, data);
