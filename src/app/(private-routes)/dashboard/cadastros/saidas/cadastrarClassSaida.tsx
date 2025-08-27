"use client"
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { criarClassSaida } from "@/app/lib/cadastrosActions";

interface Props {
    children: ReactNode;
}

const CadastrarClassSaida: React.FC<Props> = ({ children }) => {

    const [formData, setFormData] = useState({ nome_class_saida: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nome_class_saida = formData.nome_class_saida;
        setLoading(true); // Iniciar carregamento

        try {
            await criarClassSaida(nome_class_saida);

            toast.success('Classificação de saida: ' + nome_class_saida + ' criado com sucesso!', {
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
        <>
            <Link href={'/dashboard/cadastros'} title="voltar" className="absolute left-[250px] top-[72px]">
                <div className='group items-center flex md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>

            <div className='flex flex-col w-full md:w-[40%] md:min-w-[500px] h-[85%] md:h-[83%] items-center bg-slate-100 rounded-md p-3 mt-12 md:mt-0 shadow-[50px_50px_50px_-1px_rgba(0,0,0,0.2)]'>
                <motion.div
                    className='flex flex-col w-full rounded-lg'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, }}
                    exit={{ opacity: 0, x: -50 }}
                >
                    <form className='flex justify-center' onSubmit={handleSubmit}>
                        <input
                            id='cadastrar_class_saida'
                            name='nome_class_saida'
                            value={formData.nome_class_saida}
                            onChange={handleChange}
                            className='appearance-none rounded-none relative
                            block border w-full px-4 py-2 rounded-t-md outline-green-300'
                            type='text'
                            placeholder='Cadastrar Classificação de Saida'
                            required
                            maxLength={40}
                            minLength={3}
                            autoComplete="off"
                        />
                        <button
                            title="Adicionar Classificação de Saida"
                            className={`ml-1 group relative w-fit flex justify-center items-center py-2 px-4 border border-transparent
                            text-sm rounded-md ${loading ? 'bg-gray-400' : 'bg-emerald-400 hover:bg-lime-500'}`}
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : 'Cadastrar'}
                            <PlusIcon
                                className="ml-2 h-7 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                    </form>

                </motion.div>

                {children}

            </div>
        </>
    )


}

export default CadastrarClassSaida;