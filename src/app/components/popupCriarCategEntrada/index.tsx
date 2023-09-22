import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    
}

const PopupCriarCategEntrada: React.FC<PopupProps> = ({ open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />
                

                <div className='sm:w-[60%] md:w-[30%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center">Cadastrar categoria de entrada</h2>
                        <div className="border mt-3" />
                    </div>  
                    <div className='flex justify-center mt-6 flex-col'>
                        <input
                            id='codigo'
                            className='appearance-none rounded-none relative block border-2 w-full px-4 py-1 rounded-t-md'
                            type='text'
                            placeholder='Codigo...'
                        />
                        <input
                            id='nomeEntrada'
                            className='mt-3 appearance-none rounded-none relative block border-2 w-full px-4 py-1 rounded-t-md'
                            type='text'
                            placeholder='Nome entrada...'
                        />  
                        <div className='flex justify-between mt-4'>
                            <button title="Criar Favorecido" className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-emerald-400 hover:bg-lime-500 '>
                                Cadastrar
                                <UserPlusIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            <button onClick={onClose} title="Fechar" className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'>
                                Fechar
                                <ArrowUturnLeftIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Dialog>
    );
};

export default PopupCriarCategEntrada;
