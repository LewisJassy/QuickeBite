import axios from 'axios';

const API_URL = 'http://localhost:5001/restaurants';

export const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};