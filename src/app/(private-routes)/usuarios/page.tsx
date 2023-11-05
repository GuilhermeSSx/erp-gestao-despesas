"use client"
import TableUsuarios from '@/app/components/tableUsuarios';
import { useState, useEffect, useRef } from 'react';
import PopupExcluirUsuario from '@/app/components/popupExcluirUsuario';
import { useSession } from "next-auth/react"
import PopupCriarUsuario from '@/app/components/popupCriarUsuario';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function Usuarios() {

    const { data: session } = useSession(); // Obtenha a sessão do usuário

    const [usuariosData, setUsuariosData] = useState<Usuario[]>([]); // Initialize usuariosData state
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const [popupAbertoCriarUsuario, setPopupCriarUsuarioAberto] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setUsuariosData(data.usuarios);

            } else {
                throw new Error('Erro ao buscar os usuários');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

    const [popupAbertoExcluirUsuario, setPopupExcluirUsuarioAberto] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleUsuarioSelected = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
    };

    // ---------------------------------------------------------------------------

    const abrirPopupExcluirUsuario = (userId: number) => {
        setSelectedUserId(userId);
        setPopupExcluirUsuarioAberto(true);
    };

    const fecharPopupExcluirUsuario = () => {
        setPopupExcluirUsuarioAberto(false);
    };

    const abrirPopupCriarUsuario = () => {
        setPopupCriarUsuarioAberto(true);
    };

    const fecharPopupCriarUsuario = () => {
        setPopupCriarUsuarioAberto(false);
    };

    const filteredUsuariosData = usuariosData.filter(userData =>
        userData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className='fixed md-web:w-screen md-web:h-[calc(100vh-60px)] flex justify-center items-center p-2 flex-col bg-slate-50'>
            <Link href={'/modulos'} title="voltar">
                <div className='absolute top-[13px] z-10 left-3 group flex justify-center items-center py-8 px-4 border border-transparent text-base rounded-md hover:bg-slate-200 text-slate-400'>
                    <ArrowLeftIcon className="mr-4 h-7 w-5 text-center" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col w-full h-screen md:h-[80%] md:w-[32%] bg-slate-300 md:min-w-[500px] p-2 md:p-4 rounded-lg mt-24 md:mt-0'>
                <h1 className='font-extrabold  text-center mt-4 select-none'>Selecionar Usuarios</h1>
                <div className='flex justify-center mt-4 text-black w-full'>
                    <input
                        ref={searchInputRef}
                        id='pesquisar'
                        className='appearance-none rounded-none relative block border w-full px-4 py-1 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Usuarios'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <TableUsuarios usuarios={filteredUsuariosData} onUsuarioSelected={handleUsuarioSelected} />

                <div className='flex justify-center items-center rounded w-full h-fit'>
                    <div className='flex justify-between rounded-lg mt-3 w-full'>
                        {selectedUsuario ? (
                            <button
                                onClick={() => abrirPopupExcluirUsuario(selectedUsuario ? selectedUsuario.id : 0)}
                                className={`group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md ${selectedUsuario && selectedUsuario.name === session?.user?.name ? 'bg-red-500 text-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-400 text-white hover:scale-[1.01] duration-200'
                                    } `}
                                disabled={selectedUsuario && selectedUsuario.name === session?.user?.name}
                            >
                                Excluir
                            </button>
                        ) : (
                            <button
                                className='group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-500 text-gray-500 hover:scale-[1.02] duration-200 cursor-not-allowed select-none outline-none'
                            >
                                Excluir
                            </button>
                        )}

                        {selectedUsuario && (
                            <PopupExcluirUsuario
                                open={popupAbertoExcluirUsuario}
                                onClose={fecharPopupExcluirUsuario}
                                userId={selectedUsuario.id}
                                userName={selectedUsuario.name}
                                reloadUsers={getUsers}
                            />
                        )}

                    </div>
                </div>

            </div>
            <div className='flex justify-between rounded-lg my-4 w-full md:w-[32%] md:min-w-[490px]'>
                <div className='group relative flex-1'>
                    <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-lime-500 via-gray-200 to-gray-400 opacity-30 blur transition duration-500 group-hover:opacity-100'></div>
                    <button
                        onClick={abrirPopupCriarUsuario}
                        className='shadow-lg w-full relative bg-lime-300 rounded-lg  px-7 py-3 text-black select-none outline-none'
                    >
                        Cadastrar
                    </button>
                </div>
            </div>

            <PopupCriarUsuario
                open={popupAbertoCriarUsuario}
                onClose={fecharPopupCriarUsuario}
                reloadUsers={getUsers}
            />

        </main>
    )
}
