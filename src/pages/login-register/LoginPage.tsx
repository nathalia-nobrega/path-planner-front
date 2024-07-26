import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';

const LoginPage: React.FC = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (event: React.FormEvent) => {
       event.preventDefault();
       try {
           await login(email, password);
           navigate('/');
       } catch (error) {
           console.error('Failed to login');
       }
   };

    function navigateToRegister(): void {
        navigate('/auth/register')
    }

   return (
       <div>
        <form onSubmit={handleSubmit}>
           <div>
               <label>Email</label>
               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
           </div>
           <div>
               <label>Password</label>
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
           </div>
           <button type="submit">Login</button>
       </form>

       <button onClick={navigateToRegister}>
            Ir para página de registro
       </button>
       </div>
   );
};

export default LoginPage;
