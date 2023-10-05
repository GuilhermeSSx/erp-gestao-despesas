import React from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';


interface PopupProps {
    open: boolean;
    onClose: () => void;
    userName: string;
    userId: number;
}

const PopupExcluirUsuario: React.FC<PopupProps> = ({ open, onClose, userName, userId }) => {

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`https://jpnr-gestao-api.vercel.app/user/delete-user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response)

        } catch (error) {
            console.error('Erro:', error);
            // Handle error if necessary
        }
    };


    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <div className='sm:w-[60%] md:w-[30%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className='rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Deseja Excluir?</h2>
                        <div className="border mt-4" />
                        <h2 className="mt-3 text-base font-bold text-center">{userName} - {userId}</h2>
                    </div>

                    <div className='flex justify-between mt-4'>
                        <button
                            onClick={onClose}
                            title="Cancelar"
                            className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'>
                            Cancelar
                            <ArrowUturnLeftIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            onClick={() => {
                                // Lógica para excluir o USER com o ID: userId
                                try {
                                    deleteUser(userId)
                                    onClose();
                                } catch (error) {
                                    console.log(error);
                                }
                                
                            }}
                            title="Excluir"
                            className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-red-400 hover:bg-red-600 '>
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

export default PopupExcluirUsuario;
