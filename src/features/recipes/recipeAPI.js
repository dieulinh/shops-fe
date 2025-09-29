import axiosInstance from '@/api/axiosInstance.js';

// GET /api/recipes/:id -> { recipe: {...} }
export const fetchRecipe = async (id) => {
  const response = await axiosInstance.get(`/recipes/${id}`);
  return response.data;
};
