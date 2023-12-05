"use client";
import { criarPerfilAcesso } from '@/app/lib/actions';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CadastrarPerfilAcesso = () => {

    const [formData, setFormData] = useState({ nome_perfil_acesso: '' });
    const [loading, setLoading] = useState(false); // Adicionado para controlar o estado de carregamento

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nome_perfil_acesso = formData.nome_perfil_acesso;
        setLoading(true); // Iniciar carregamento

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
            setLoading(false); // Finalizar carregamento
        }
    };

    return (
        <form className='w-full h-fit flex flex-col items-center rounded-xl' onSubmit={handleSubmit}>
            <div className='rounded-lg w-full'>
                <input
                    id='nome-perfil-acesso'
                    name='nome_perfil_acesso'
                    className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                    placeholder='Nome do novo perfil de acesso...'
                    type='text'
                    required
                    onChange={handleChange}
                    maxLength={15}
                    minLength={2}
                />
            </div>

            <div className='flex justify-between w-full'>
                <button
                    title="Cadastrar Perfil de Acesso"
                    className={`mt-2 group relative w-full flex justify-center items-center py-1 px-4 border border-transparent
                        text-base rounded-md ${loading ? 'bg-gray-400' : 'bg-emerald-400 hover:bg-lime-500'}`}
                    disabled={loading} // Desabilitar enquanto carrega
                >
                    {loading ? 'Processando...' : 'Cadastrar'}
                    <UserPlusIcon
                        className="ml-2 h-7 w-5 text-center"
                        aria-hidden="true"
                    />
                </button>
            </div>

        </form>
    )
}

export default CadastrarPerfilAcesso;