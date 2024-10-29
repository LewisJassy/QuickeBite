import React, { useState } from 'react';
import { register } from '../../services/authService';
import Hero from '../Hero';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(username, email, password);
            setSuccess(true);
            setTimeout(() => {
                window.location.href = '/Homepage';
            }, 1500);
        } catch (e) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div>
            <Hero title="Register" />
            <div className="register-container">
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">Registration successful. Redirecting to homepage...</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;