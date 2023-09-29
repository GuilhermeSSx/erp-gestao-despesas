"use client"
import TableUsuarios from '@/app/components/tableUsuarios';
import React, { useState } from 'react';

interface Usuario {
    id: number;
    nome_usuario: string;
}

const usuarioData: Usuario[] = [
    { id: 1, nome_usuario: 'Guilherme' },
    { id: 2, nome_usuario: 'Alcélio' },
    { id: 3, nome_usuario: 'Taina' },
    { id: 4, nome_usuario: 'Paulo' },
    { id: 5, nome_usuario: 'Gabriel' },
    { id: 6, nome_usuario: 'Luca' },
    { id: 7, nome_usuario: 'Kodama' },
    { id: 8, nome_usuario: 'usuario teste' },
    // Mais objetos de usuario aqui...
];

export default function CadastroUsuarios() {


    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

    const handleUsuarioSelected = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
    };


    return (
        <main className=' fixed h-[calc(100vh-60px)] w-screen flex justify-center items-center p-2'>
            {/* Cadastro de novo usuario */}
            <div className='flex flex-col items-center w-[50%] h-full bg-red-500 rounded-lg mr-1'>
                <h1 className='font-extrabold text-white mt-4 select-none'>Cadastrar Novo Usuario</h1>

                <div className='flex flex-col items-center w-[90%] h-full bg-red-400 px-6 m-4 rounded-lg p-3'>
                    <input className='m-2 w-full' placeholder='nome' />
                    <input className='m-2 w-full' placeholder='email' />
                    <input className='m-2 w-full' placeholder='senha' />
                    <button
                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500'
                    >
                        Registrar
                    </button>
                </div>

            </div>

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col items-center w-[50%] h-full bg-blue-500 rounded-lg ml-1 px-4'>
                <h1 className='font-extrabold text-white text-center mt-4 select-none'>Selecionar Usuarios Permissões / Remover </h1>
                <form className='flex justify-center mt-4 text-black w-full'>
                    <input
                        id='pesquisar'
                        className='appearance-none rounded-none relative block border w-full px-4 py-1 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Usuarios'
                    />
                </form>

                <TableUsuarios usuarios={usuarioData} onUsuarioSelected={handleUsuarioSelected} />


                <div className='flex justify-center items-center rounded w-full h-fit'>
                    <div className='flex justify-between rounded-lg my-2 w-full'>
                        <button
                            className='group relative items-center w-[50%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200 mr-1'
                        >
                            Permissões
                        </button>
                        <button

                            className='group relative items-center w-[50%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200 ml-1'
                        >
                            Excluir
                        </button>
                    </div>
                </div>

            </div>

        </main>
    )
}
