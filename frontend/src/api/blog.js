import axios from 'axios';

// Backend API URL
const API_URL = 'http://localhost:5000/api/blogs';

// Get all blogs
export const getBlogs = () => axios.get(API_URL);

// Get a specific blog by ID
export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);

// Create a new blog
export const createBlog = (blog) => axios.post(API_URL, blog);

// Update an existing blog
export const updateBlog = (id, blog) => axios.put(`${API_URL}/${id}`, blog);

// Delete a blog
export const deleteBlog = (id) => axios.delete(`${API_URL}/${id}`);




