import axios from 'axios';
const API_URL = 'http://localhost:500/profile';

export const getProfile = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
};

export const updateProfile = async (token, profileData) => {
    try {
        const response = await axios.put(API_URL, profileData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
