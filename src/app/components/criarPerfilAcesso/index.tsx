"use client"
import { useState, useEffect, useLayoutEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
    getPerfilAcessos: () => void;
}

interface ButtonCriarPerfilProps {
    getPerfilAcessos: () => void;
}

export const CriarPerfilAcesso = ({ getPerfilAcessos }: ButtonCriarPerfilProps) => {

    const [formData, setFormData] = useState({
        nome_perfil_acesso: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/criar-perfil-acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {

                toast.success('Cadastro Realizado com sucesso', {
                    position: 'bottom-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                toast.error('Erro em cadastrar o usuário', {
                    position: 'bottom-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } catch (error) {
            toast.error('Erro contate o administrador!', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    const [selectedPefilAcesso, setSelectedPerfilAcesso] = useState<PerfilAcesso | null>(null);

    const handlePefilAcessoSelected = (perfilAcesso: PerfilAcesso) => {
        setSelectedPerfilAcesso(perfilAcesso);
    };

    
    return (
        <div>
            <form className='w-full h-fit flex flex-col items-center rounded-xl mt-4' onSubmit={handleSubmit}>
                <div className='rounded-lg w-full'>

                    <div className="border mt-2" />
                    <input
                        id='nome-perfil-acesso'
                        name='nome_perfil_acesso'
                        className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                        placeholder='Nome do novo perfil de acesso...'
                        type='text'
                        required
                        onChange={handleChange}
                        maxLength={15}
                        minLength={4}
                    />
                </div>

                <div className='flex justify-between w-full'>
                    <button
                        title="Cadastrar Perfil de Acesso"
                        className='mt-2 group relative w-full flex justify-center items-center py-1 px-4 border border-transparent
                            text-base rounded-md bg-emerald-400 hover:bg-lime-500'
                    >
                        Cadastrar
                        <UserPlusIcon
                            className="ml-2 h-7 w-5 text-center"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </form>
        </div>
    )
}
