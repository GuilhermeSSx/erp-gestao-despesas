"use client"
import TableUsuarios from '@/app/components/tableUsuarios';
import { useState, useEffect, useRef } from 'react';
import PopupExcluirUsuario from '@/app/components/popupExcluirUsuario';
import Link from 'next/link';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react"

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

    const [loading, setLoading] = useState(false);

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

    // ---------------------------------------------------------------------------

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // console.log(response)

            if (response.ok) {
                getUsers();

                toast.success('Cadastro Realizado com sucesso', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            } else {
                toast.error('Erro em cadastrar o usuário', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        } catch (error) {
            toast.error('Erro contate o adminstrador!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------------------------

    const filteredUsuariosData = usuariosData.filter(userData =>
        userData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className='md-web:w-screen md-web:h-[calc(100vh-60px)] flex justify-center items-center p-2 md-web:flex-row flex-col overflow-auto bg-black'>

            {/* Cadastro de novo usuario */}
            <div className='px-4 md-web:mr-1 md-web:px-4 w-full md-web:w-[47%] md:w-[43%] h-full bg-slate-500 rounded-xl flex flex-col items-center'>
                <h1 className='font-extrabold text-white mt-4 select-none'>Cadastrar Novo Usuario</h1>
                <form className='w-full h-full flex flex-col md:justify-center' onSubmit={handleSubmit}>
                    <div className=''>
                        <input
                            name='name'
                            type='text'
                            autoComplete='new-name'
                            required
                            className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-6 rounded-t-md'
                            placeholder='Nome'
                            onChange={handleChange}
                            maxLength={40}
                            minLength={4}
                        />
                    </div>
                    <div className=''>
                        <input
                            name="email"
                            type='email'
                            autoComplete='new-email'
                            required
                            className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                            placeholder='Email...'
                            onChange={handleChange}
                            maxLength={64}
                        />
                    </div>
                    <div>
                        <input
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            required
                            className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                            placeholder='Senha'
                            onChange={handleChange}
                            maxLength={60}
                            minLength={6}
                        />
                    </div>

                    <select className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'>
                        <option value="Administrador">convidado</option>
                        <option value="Colaborador">admin</option>
                    </select>
                    <div className='flex justify-between rounded-lg my-6 w-full'>
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

                </form>

                <div className='flex justify-between rounded-lg my-8 w-full'>
                    <Link
                        href={'/usuarios/permissoes'}
                        className='group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200 mr-1'
                    >
                        Perfil de Acesso
                    </Link>
                </div>

            </div>

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col items-center w-full md-web:w-[53%] md:w-[57%] md-web:mt-0 mt-4 h-screen md-web:h-full bg-orange-400 rounded-lg md-web:ml-1 px-4'>
                <h1 className='font-extrabold text-white text-center mt-4 select-none'>Selecionar Usuarios Permissões / Remover </h1>
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
                    <div className='flex justify-between rounded-lg my-2 w-full'>
                        {selectedUsuario ? (
                            <button
                                onClick={() => abrirPopupExcluirUsuario(selectedUsuario ? selectedUsuario.id : 0)}
                                className={`group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md ${selectedUsuario && selectedUsuario.name === session?.user?.name ? 'bg-red-500 text-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200'
                                    } ml-1`}
                                disabled={selectedUsuario && selectedUsuario.name === session?.user?.name}
                            >
                                Excluir
                            </button>
                        ) : (
                            <button
                                className='group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-500 text-gray-500 hover:scale-[1.02] duration-200 ml-1 cursor-not-allowed'
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

        </main>
    )
}