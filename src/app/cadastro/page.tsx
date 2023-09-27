"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [cadastroSuccess, setCadastroSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showDiv, setShowDiv] = useState(false); // Estado para controlar a visibilidade da div

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://jpnr-gestao-api.vercel.app/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setCadastroSuccess(true);
                setShowDiv(true); // Mostrar a div após um cadastro bem-sucedido
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Erro no cadastro.');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            setErrorMessage('Erro no cadastro.');
        } finally {
            setLoading(false);
        }
    };

    const handleVoltarParaLogin = () => {
        router.push('/');
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === 'cdt2023') {
            setShowDiv(true); // Mostrar a div quando o usuário digitar "cdt2023"
        } else {
            setShowDiv(false); // Ocultar a div se a entrada for diferente de "cdt2023"
        }
    };

    return (
        <main className='fixed h-[calc(100vh-100px)] w-screen bg-slate-400 flex justify-center items-center px-4'>
            {showDiv ? ( // Mostrar a div apenas quando showDiv for true
                <div className='px-24 sm:px-28 max-w-[100%] h-[30rem] bg-[#ffffff] rounded-xl flex flex-col items-center'>
                    <h2 className='text-[1.3rem] font-extrabold mt-12 text-center'>Criar sua Conta</h2>
                    <form className='w-[150%] flex flex-col justify-center' onSubmit={handleSubmit}>
                        <div className=''>
                            <input
                                name='nome'
                                type='text'
                                autoComplete='none'
                                required
                                className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-6 rounded-t-md'
                                placeholder='Nome'
                                onChange={handleChange}
                            />
                        </div>
                        <div className=''>
                            <input
                                name='email'
                                type='email'
                                autoComplete='none'
                                required
                                className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                                placeholder='Email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name='password'
                                type='password'
                                autoComplete='none'
                                required
                                className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                                placeholder='Senha'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex h-fit items-center justify-center mt-10'>
                            <div className='group relative flex-1'>
                                <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-lime-500 via-gray-200 to-gray-400 opacity-30 blur transition duration-500 group-hover:opacity-100'></div>
                                <button
                                    className='shadow-lg w-full relative bg-lime-300 rounded-lg  px-7 py-4 text-black'
                                    disabled={loading}
                                >
                                    {loading ? 'Carregando...' : 'Cadastrar'}
                                </button>
                            </div>
                        </div>
                        {cadastroSuccess && <p className='text-green-500 mt-4 flex justify-center'>Cadastro realizado com sucesso!</p>}
                        {errorMessage && <p className='text-red-500 mt-4'>{errorMessage}</p>}
                        <button
                            type='button' // Defina o tipo como 'button' para evitar envio do formulário
                            className='mt-4 text-blue-500 hover:underline cursor-pointer'
                            onClick={handleVoltarParaLogin}
                        >
                            Voltar para o Login
                        </button>
                    </form>
                </div>
            ) : (
                // Mostrar o campo de entrada para digitar "cdt2023"
                <input
                    type='text'
                    placeholder='Digite a senha para liberar o cadastro'
                    onChange={handleInput}
                    className='mt-4 px-3 py-2 rounded-md border w-[400px]'
                />
            )}
        </main>
    );
}
