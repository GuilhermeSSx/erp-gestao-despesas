import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { carregarSelecaoPerfilAcesso } from '../../lib/apiRequests';

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}

interface PopupProps {
    open: boolean;
    onClose: () => void;
    LancId?: number | null;
    LancClassificacao?: string;
    reloadUsers: () => void;
}

const PopupCriarUsuario: React.FC<PopupProps> = ({ open, onClose, reloadUsers }) => {

    const [perfilAcessos, setPerfilAcessos] = useState<PerfilAcesso[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await carregarSelecaoPerfilAcesso();
                setPerfilAcessos(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'convidado'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        let response; // Declaramos a variável response fora do bloco try

        try {
            response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData)

            if (response.ok) {
                toast.success('Cadastro Realizado com sucesso', {
                    position: "bottom-left",
                    autoClose: 2200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                reloadUsers();
            } else {
                toast.error('Erro em cadastrar o usuário', {
                    position: "bottom-left",
                    autoClose: 3600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error('Erro contate o administrador!', {
                position: "bottom-left",
                autoClose: 3600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoading(false);
            if (response && response.ok) {
                onClose();
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="absolute inset-0 z-10 top-[60px] overflow-y-auto ">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />

                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.2,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    exit={{ opacity: 0, x: -80 }}
                    className='flex flex-col w-full md:w-[30%] md:min-w-[440px] rounded-lg z-50'>

                    <div className='bg-slate-100 w-full h-full rounded-lg md:p-12 p-2'>
                        <h1 className='font-extrabold mt-4 select-none text-center text-xl'>Cadastrar novo Usuario</h1>
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
                                    autoComplete='off'
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
                                    autoComplete='off'
                                    required
                                    className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                                    placeholder='Senha'
                                    onChange={handleChange}
                                    maxLength={60}
                                    minLength={6}
                                />
                            </div>

                            <select
                                name='role'
                                onChange={handleSelectChange}
                                value={formData.role}
                                className='appearance-none rounded-none relative block border w-full px-3 py-2 mt-4 rounded-t-md'
                            >
                                <option value="convidado">Convidado</option>
                                {perfilAcessos.map((perfil_acesso) => (
                                    <option
                                        key={perfil_acesso.id_perfil_acesso}
                                        value={perfil_acesso.nome_perfil_acesso}
                                    >
                                        {perfil_acesso.nome_perfil_acesso}
                                    </option>
                                ))}
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

                    </div>

                </motion.div>
            </div >
        </Dialog >
    );
};

export default PopupCriarUsuario;
