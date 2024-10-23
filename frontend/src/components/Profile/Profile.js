import React, { useState, useEffect } from 'react';
import { getProfile } from '../../services/profileService';

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            try {
                const data = await getProfile(token);
                setUser(data);
            } catch (e) {
                console.error('Profile fetch error:', e);
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        };

        fetchProfile();
        }, []);

        const handleLogout = () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        };

        if (!user) return <p>Loading...</p>;

        return (
            <div>
                <h1>Profile</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
};

export default Profile;