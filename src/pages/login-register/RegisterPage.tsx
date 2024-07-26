import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, RegisterRequest } from '../../auth/authService';

const RegisterPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const registerRequest: RegisterRequest = { fullName, email, password };
        try {
            await register(registerRequest);
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Error registering:', error);
        }
    };
    return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Username</label>
                  <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                  />
              </div>
              <div>
                  <label>Email</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <label>Password</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              {error && <p>{error}</p>}
              <button type="submit">Register</button>
          </form>
      </div>
  );
};

export default RegisterPage;