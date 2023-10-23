"use client"
import TablePerfisAcesso from '@/app/components/tablePerfisAcesso';
import { useState, useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}

const CriarSelecionarPerfilAcesso = () => {

    const [perfilAcessosData, setPerfilAcessosData] = useState<PerfilAcesso[]>([]);

    useEffect(() => {
        getPerfilAcessos();
    }, []);

    const getPerfilAcessos = async () => {
        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acessos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPerfilAcessosData(data.perfil_acessos);

            } else {
                throw new Error('Erro ao buscar os perfis de acessos.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    //-------------------------------------------------------------------------------

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nome_perfil_acesso: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/criar-perfil-acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                getPerfilAcessos();

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
        } finally {
            setLoading(false);
        }
    };

    const [selectedPefilAcesso, setSelectedPerfilAcesso] = useState<PerfilAcesso | null>(null);

    const handlePefilAcessoSelected = (perfilAcesso: PerfilAcesso) => {
        setSelectedPerfilAcesso(perfilAcesso);
        console.log(selectedPefilAcesso);
    };

    return (
        <main className='fixed w-screen h-[calc(100vh-60px)] flex justify-center'>

            <div className='w-full h-full md-web:w-[70%] md:w-[50%]'>

                <form className='w-full h-fit flex flex-col items-center rounded-xl mt-8' onSubmit={handleSubmit}>
                    <div className='rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center">Criar perfil de acesso</h2>
                        <div className="border mt-4" />
                        <input
                            id='nome-perfil-acesso'
                            name='nome_perfil_acesso'
                            className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                            placeholder='Nome do perfil de acesso...'
                            type='text'
                            required
                            onChange={handleChange}
                            maxLength={15}
                            minLength={4}
                        />
                    </div>

                    <div className='flex justify-between mt-2 w-full'>
                        <button
                            title="Cadastrar Perfil de Acesso"
                            className='mt-2 group relative w-full flex justify-center items-center py-1 px-4 border border-transparent
                            text-base rounded-md bg-emerald-400 hover:bg-lime-500'
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Cadastrar'}
                            <UserPlusIcon
                                className="ml-2 h-7 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </form>

                <div className='mt-4 rounded-xl flex h-[calc(100vh-300px)]'>
                    <TablePerfisAcesso perfisAcessos={perfilAcessosData} onPefilAcessoSelected={handlePefilAcessoSelected} />
                </div>
                


            </div>


        </main>
    );
};

export default CriarSelecionarPerfilAcesso;
