import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';
import "react-toastify/dist/ReactToastify.css";
import { excluirPerfilAcesso } from '../../lib/apiRequests';
import { useRouter } from 'next/navigation';


interface PopupProps {
    open: boolean;
    onClose: () => void;
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
    getPerfilAcessos: () => void;
}

const PopupExcluirPerfilAcesso: React.FC<PopupProps> = ({ open, onClose, id_perfil_acesso, nome_perfil_acesso, getPerfilAcessos }) => {
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

    const router = useRouter();

    const handleDelete = async () => {
        try {
            await excluirPerfilAcesso(id_perfil_acesso);
            getPerfilAcessos(); // Chame a função para atualizar a lista
            onClose();

            // Use o router para navegar para a mesma página sem o parâmetro 'id'
            router.replace('/usuarios/perfil-acesso');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open) {
            cancelButtonRef.current?.focus();
        }
    }, [open]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            cancelButtonRef.current?.focus();
        } else if (event.key === 'ArrowRight') {
            deleteButtonRef.current?.focus();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="relative inset-0 z-10 overflow-y-auto "
            onKeyDown={handleKeyDown}
        >
            <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <div className='sm:w-[60%] md:w-[30%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className='rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Deseja Excluir?</h2>
                        <div className="border mt-4" />
                        <h2 className="mt-3 text-base font-bold text-center">{nome_perfil_acesso}, {id_perfil_acesso}</h2>
                    </div>

                    <div className='flex justify-between mt-4'>
                        <button
                            onClick={onClose}
                            title="Cancelar"
                            className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'
                            ref={cancelButtonRef}
                        >
                            Cancelar
                            <ArrowUturnLeftIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            onClick={() => {
                                try {
                                    handleDelete();
                                    onClose();
                                } catch (error) {
                                    console.log(error);
                                }

                            }}
                            title="Excluir"
                            className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-red-400 hover:bg-red-600 '
                            ref={deleteButtonRef}
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

export default PopupExcluirPerfilAcesso;
