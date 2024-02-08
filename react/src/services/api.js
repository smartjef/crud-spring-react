import axios from 'axios';

const API_BASE_URL = 'http://localhost:8091/api';

//--------------CATEGORY--------------------//
// Read
export const getAllCategories = () => axios.get(`${API_BASE_URL}/categories`);
export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create
export const addNewCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Update
export const updateCategory = async (categoryId, updatedCategoryData) => {
    const response = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, updatedCategoryData);
    return response.data;
};

// Delete
export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
        console.log('Category deleted successfully:', response);
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};


//-----------------PRODUCTS----------------//
//Read
export const getAllProducts = () => axios.get(`${API_BASE_URL}/products`);
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Create
export const addNewProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);
        return response;
    } catch (error) {
        throw error;
    }
};

//update
export const updateProduct = async (productId, updatedProductData) => {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProductData);
    return response.data;
};

//delete
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
        console.log('Product deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
