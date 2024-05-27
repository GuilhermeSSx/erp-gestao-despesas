"use client";
import { criarPerfilAcesso } from '@/app/lib/userActions';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CadastrarPerfilAcesso = () => {
    const [formData, setFormData] = useState({ nome_perfil_acesso: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nome_perfil_acesso = formData.nome_perfil_acesso;
        setLoading(true);

        try {
            await criarPerfilAcesso(nome_perfil_acesso);
            toast.success('Perfil de acesso: ' + nome_perfil_acesso + ' criado com sucesso!', {
                position: "bottom-left",
                autoClose: 2600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('' + error.message, {
                    position: "bottom-left",
                    autoClose: 3200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Erro Desconhecido: Contate o administrador do sistema.', {
                    position: "bottom-left",
                    autoClose: 3200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='w-full h-fit flex flex-col items-center rounded-xl' onSubmit={handleSubmit}>
            <div className='relative mt-3 w-full'>
                <input
                    id='nome-perfil-acesso'
                    name='nome_perfil_acesso'
                    className='appearance-none block border-1 w-full px-4 py-2 pr-24 rounded-md outline-slate-300'
                    placeholder='nome perfil de acesso...'
                    type='text'
                    required
                    onChange={handleChange}
                    maxLength={15}
                    minLength={2}
                />
                <button
                    type="submit"
                    className={`absolute right-[2px] top-[2px] h-[90%] bg-emerald-400 text-black m-0 px-5 py-2 rounded-md hover:bg-lime-500 transition duration-300 
                        text-sm font-medium ${loading ? 'bg-gray-400' : ''}`}
                    disabled={loading}
                    title="Cadastrar Perfil de Acesso"
                >
                    {loading ? 'Processando...' : (
                        <>
                            Cadastrar
                            <UserPlusIcon className="ml-2 h-5 w-5 inline" aria-hidden="true" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CadastrarPerfilAcesso;
