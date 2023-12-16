"use client";
import { criarCentroCusto } from "@/app/lib/cadastrosActions";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Props {
    children: ReactNode;
}

const CadastrarCentroCusto: React.FC<Props> = ({ children }) => {

    const [formData, setFormData] = useState({ nome_centro_custo: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nome_centro_custo = formData.nome_centro_custo;
        setLoading(true); // Iniciar carregamento

        try {
            await criarCentroCusto(nome_centro_custo);

            toast.success('Centro de custo: ' + nome_centro_custo + ' criado com sucesso!', {
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
            <Link href={'/modulos/cadastros'} title="voltar">
                <div className='absolute left-0 md:top-16 top-20 group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>
            <div className='flex flex-col w-full md:w-[40%] md:min-w-[500px] h-[85%] md:h-[83%] items-center bg-slate-100 rounded-md p-3 mt-12 md:mt-0'>
                <div className='flex flex-col w-full rounded-lg'>
                    <form className='flex justify-center' onSubmit={handleSubmit}>
                        <input
                            id='cadastrar_centro_custo'
                            name='nome_centro_custo'
                            value={formData.nome_centro_custo}
                            onChange={handleChange} 
                            className='appearance-none rounded-none relative
                            block border w-full px-4 py-2 rounded-t-md'
                            type='text' 
                            placeholder='Cadastrar Centro De Custo'
                            required
                            maxLength={40}
                            minLength={3}
                            autoComplete="off"
                        />
                        <button
                            title="Adicionar centro de custo"
                            className={`ml-1 group relative w-22 flex justify-center items-center py-2 px-4 border border-transparent
                            text-base rounded-md ${loading ? 'bg-gray-400' : 'bg-emerald-400 hover:bg-lime-500'}`}
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : 'Cadastrar'}
                            <PlusIcon
                                className="ml-2 h-7 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                    </form>

                    
                </div>

                { children }

            </div>
        </>

    )
}

export default CadastrarCentroCusto;