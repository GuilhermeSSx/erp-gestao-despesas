"use client"
import TableUsuarios from '@/app/components/tableUsuarios';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button } from "@material-tailwind/react";
import PopupExcluirUsuario from '@/app/components/popupExcluirUsuario';

interface Usuario {
    id: number;
    name: string;
}


export default function CadastroUsuarios() {

    const [usuariosData, setUsuariosData] = useState<Usuario[]>([]); // Initialize usuariosData state

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch('https://jpnr-gestao-api.vercel.app/user/get-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data);

                // Assuming 'usuarios' is the array in your JSON data
                setUsuariosData(data.usuarios);
            } else {
                throw new Error('Erro ao buscar os usuários');
            }
        } catch (error) {
            console.error('Erro:', error);
            // Handle error if necessary
        }
    };

    const [loading, setLoading] = useState(false);
    const [cadastroSuccess, setCadastroSuccess] = useState(false);
    const [cadastroError, setCadastroError] = useState(false);

    const router = useRouter();

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
            const response = await fetch('https://jpnr-gestao-api.vercel.app/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response)

            if (response.ok) {
                getUsers();
                setCadastroSuccess(true);
                setCadastroError(false);
            } else {
                setCadastroError(true);
                setCadastroSuccess(false);
            }
        } catch (error) {
            setCadastroError(true);
            setCadastroSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------------------

    function Icon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
            >
                <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }

    const [alertVisible, setAlertVisible] = useState(false); // Nova variável de estado

    useEffect(() => {
        // Se cadastroSuccess ou cadastroError forem true, mostra o Alert
        if (cadastroSuccess || cadastroError) {
            setAlertVisible(true);
        }
    }, [cadastroSuccess, cadastroError]);

    const handleAlertClose = () => {
        setAlertVisible(false);
        setCadastroSuccess(false);
        setCadastroError(false);
    };

    return (
        <main className='md-web:w-screen md-web:h-[calc(100vh-60px)] flex justify-center items-center p-2 md-web:flex-row flex-col overflow-auto bg-black'>

            {/* Cadastro de novo usuario */}
            <div className='px-4 md-web:mr-1 md-web:px-4 w-full md-web:w-[50%] h-full bg-slate-500 rounded-xl flex flex-col items-center'>
                <h1 className='font-extrabold text-white mt-4 select-none'>Cadastrar Novo Usuario</h1>
                <form className='w-full h-full flex flex-col md:justify-center' onSubmit={handleSubmit}>
                    <div className=''>
                        <input
                            name='name'
                            type='text'
                            autoComplete='none'
                            required
                            className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-6 rounded-t-md'
                            placeholder='Nome'
                            onChange={handleChange}
                            maxLength={40}
                            minLength={5}
                        />
                    </div>
                    <div className=''>
                        <input
                            name="email"
                            type='email'
                            autoComplete='none'
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
                            autoComplete='none'
                            required
                            className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                            placeholder='Senha'
                            onChange={handleChange}
                            maxLength={60}
                            minLength={6}
                        />
                    </div>
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
            </div>



            {alertVisible && (
                <Alert
                    className={`absolute bottom-6 left-6 bg-${cadastroSuccess ? 'jpnrVerde' : 'red-500'} w-fit h-fit text-center items-center z-50`}
                    open={alertVisible}
                    icon={<Icon />}
                    action={
                        <Button
                            variant="text"
                            color="white"
                            size="sm"
                            onClick={handleAlertClose}
                        >
                            Fechar
                        </Button>
                    }
                >
                    <span className='text-center p-4'>
                        {cadastroSuccess ? 'Cadastro realizado com sucesso!' : 'Erro no cadastro!'}
                    </span>
                </Alert>
            )}

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col items-center w-full md-web:w-[50%] md-web:mt-0 mt-4 h-full bg-orange-400 rounded-lg md-web:ml-1 px-4'>
                <h1 className='font-extrabold text-white text-center mt-4 select-none'>Selecionar Usuarios Permissões / Remover </h1>
                <form className='flex justify-center mt-4 text-black w-full'>
                    <input
                        id='pesquisar'
                        className='appearance-none rounded-none relative block border w-full px-4 py-1 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Usuarios'
                    />
                </form>

                <TableUsuarios usuarios={usuariosData} onUsuarioSelected={handleUsuarioSelected} />

                <div className='flex justify-center items-center rounded w-full h-fit'>
                    <div className='flex justify-between rounded-lg my-2 w-full'>
                        <button
                            onClick={() => router.push('/cadastroUsuarios/permissoes')}
                            className='group relative items-center w-[50%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200 mr-1'
                        >
                            Permissões
                        </button>
                        <button
                            onClick={() => {
                                if (selectedUsuario) {
                                    abrirPopupExcluirUsuario(selectedUsuario.id);
                                } else {
                                    alert("Selecione um usuario na tabela!")
                                }
                            }
                            }

                            className='group relative items-center w-[50%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200 ml-1'
                        >
                            Excluir
                        </button>
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