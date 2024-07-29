import { ArrowRight, Lock, MailIcon, TextIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest, register } from '../../auth/authService';
import { Button } from '../../components/button';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/errorResponse';

const RegisterPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const registerRequest: RegisterRequest = { fullName, email, password };
        try {
            await register(registerRequest);
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>
            if (error.response && error.response.status === 409) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full p-6 space-10 text-center">
                <div className="p-8 bg-zinc-900 rounded-xl flex flex-col shadow-shape gap-4">
                    <h2 className='text-zinc-300 font-semibold text-2xl'>Cadastro</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    <div className='flex items-center justify-center gap-3 truncate'>
                        <TextIcon className='size-5 text-zinc-400'/>
                            <input 
                            type="text" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nome completo"
                            className="bg-zinc-800 w-full p-3 rounded-md text-lg outline-none placeholder-zinc-400"
                            required
                        />
                    </div>

                    <div className='flex items-center justify-center gap-3 truncate'>
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
    
                    <div className='flex items-center justify-center gap-3 truncate'>
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
                        {errorMessage && <p>{errorMessage}</p>}
                        <Button type='submit' size='full'>
                            Completar cadastro
                            <ArrowRight className='size-5'/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
       );
};

export default RegisterPage;