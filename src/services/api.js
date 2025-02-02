import axios from "axios";

// Axios configuration
const API_URL = "http://localhost:5000/api"; // Change this to your API base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User registration
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// User login
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Get all flashcards
export const getFlashcards = async () => {
  const response = await api.get("/flashcards");
  return response.data;
};

// Create a new flashcard
export const createFlashcard = async (data, token) => {
  const response = await api.post("/flashcards", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a flashcard
export const deleteFlashcard = async (id, token) => {
  const response = await api.delete(`/flashcards/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
