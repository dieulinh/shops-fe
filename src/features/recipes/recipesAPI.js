import axiosInstance from '@/api/axiosInstance.js';

// Assumption: backend endpoint: GET /api/recipes returns { recipes: [...]} or with pagination { recipes: [], total_pages: n }
// Adjust if your API differs.
export const fetchRecipes = async ({ page = 1, query = '' } = {}) => {
  const params = {};
  if (page) params.page = page;
  if (query) params.q = query;
  const response = await axiosInstance.get('/recipes', { params });
  return response.data;
};
