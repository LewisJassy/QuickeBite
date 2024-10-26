import React, { useState } from 'react';
import { register } from '../../services/authService';
import './Register.css'

const Register =() => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('false');

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
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
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
                    type='password'
                    placehalder='password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Register</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>Registration successful. Redirecting to login...</p>}
        </div>
    );
};

export default Register;
