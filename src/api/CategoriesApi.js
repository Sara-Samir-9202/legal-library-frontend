import api from './axiosConfig';

// ─── GET ALL CATEGORIES ──────────────────────────────────────
export const getCategories = async () => {
  try {
    const response = await api.get('/Categories');
    const data = response.data;

    if (Array.isArray(data))        return data;
    if (data?.data?.items)          return data.data.items;
    if (Array.isArray(data?.data))  return data.data;
    if (data?.items)                return data.items;
    return [];
  } catch (error) {
    console.error("Get categories error:", error);
    return [];
  }
};

// ─── GET SINGLE CATEGORY ─────────────────────────────────────
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/Categories/${id}`);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error("Get category error:", error);
    return null;
  }
};

// ─── CREATE CATEGORY ─────────────────────────────────────────
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/Categories', categoryData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Create category error:", error);
    throw error;
  }
};

// ─── UPDATE CATEGORY ─────────────────────────────────────────
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/Categories/${id}`, categoryData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Update category error:", error);
    throw error;
  }
};

// ─── DELETE CATEGORY ─────────────────────────────────────────
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/Categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete category error:", error);
    throw error;
  }
};