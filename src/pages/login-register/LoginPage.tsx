import { ArrowRight, Lock, MailIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import { Button } from '../../components/button';

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
    <div className="h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full p-6 space-10 text-center">
            <div className="p-8 bg-zinc-900 rounded-xl flex flex-col shadow-shape gap-4">
                <h2 className='text-zinc-300 font-semibold text-2xl'>Login</h2>
                <div className='flex items-center justify-center gap-2 truncate'>
                <MailIcon className='size-5 text-zinc-400'/>
                    <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="bg-zinc-800 w-full p-3 rounded-md text-lg outline-none placeholder-zinc-400"
                    required
                />
                </div>

                <div className='flex items-center justify-center gap-2 truncate'>
                    <Lock className='size-5 text-zinc-400'/>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="bg-zinc-800 w-full rounded-md p-3 text-lg placeholder-zinc-400"
                        required
                    />
                </div>
                <form className='flex items-center justify-center w-full' onSubmit={handleSubmit}>
                    <Button type='submit' size='full'>
                        Entrar
                        <ArrowRight className='size-5'/>
                    </Button>
                </form>
                <Button type='submit' size='full' variant='secondary' onClick={navigateToRegister}>
                    Fazer cadastro
                    <ArrowRight className='size-5'/>
                </Button>
            </div>
        </div>
    </div>
   );
};

export default LoginPage;
