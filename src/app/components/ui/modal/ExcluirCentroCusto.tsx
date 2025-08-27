import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { excluirCentroCusto } from '@/app/lib/cadastrosActions';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    id_centro_custo: number;
    nome_centro_custo: string;
}

const ExcluirCentroCusto: React.FC<PopupProps> = ({ open, onClose, id_centro_custo, nome_centro_custo }) => {

    const handleDelete = async (id: number) => {
        try {
            await excluirCentroCusto(id);

            toast.success('Centro de custo deletado com sucesso!', {
                position: "bottom-left",
                autoClose: 2600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });

            onClose();

        } catch (error) {
            console.error('Erro:', error);
            toast.error('Erro ao deletar o centro de custo!', {
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
    };

    return (
        <Dialog open={open} onClose={onClose} className="absolute inset-0 z-10 top-[60px] overflow-y-auto ">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />


                <div className='sm:w-[60%] md:w-[30%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Deseja Excluir ?</h2>
                        <div className="border mt-4" />
                        <h2 className="mt-3 text-base font-bold text-center">{id_centro_custo}, {nome_centro_custo}</h2>
                    </div>

                    <div className='flex justify-between mt-4'>
                        <button onClick={onClose} title="Cancelar" className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'>
                            Cancelar
                            <ArrowUturnLeftIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            title="Excluir"
                            className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-red-400 hover:bg-red-600'
                            onClick={() => {
                                try {
                                    handleDelete(id_centro_custo);
                                } catch (error) {
                                    console.log(error);
                                }

                            }}
                        >
                            Excluir
                            <XMarkIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

            </div>
        </Dialog>
    );
};

export default ExcluirCentroCusto;
