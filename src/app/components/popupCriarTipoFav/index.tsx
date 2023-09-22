import React from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, SquaresPlusIcon } from '@heroicons/react/20/solid';
import ListaCamposFavTipo from '../listaCamposFavTipo';

interface PopupProps {
    open: boolean;
    onClose: () => void;
}

const PopupCriarTipoFav: React.FC<PopupProps> = ({ open, onClose }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />


                <div className='sm:w-[80%] md:w-[60%] w-full h-[80%] items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center select-none">Cadastrar Tipo de Favorecido</h2>
                        <div className="border mt-3" />
                    </div>
                    
                    <div className='flex justify-center mt-4 flex-col select-none'>
                        <input
                            id='nome tipo favorecido'
                            className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                            type='text'
                            placeholder='Nome do tipo de favorecido...'
                        />

                        <div className='mt-6 text-center'>
                            Selecione os campos que terão no seu tipo de favorecido.
                            <ListaCamposFavTipo />
                        </div>
                        

                        <div className='flex justify-between mt-3'>
                            <button title="Criar Favorecido" className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md text-white bg-jpnrVerde hover:bg-lime-500 '>
                                Salvar
                                <SquaresPlusIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            <button onClick={onClose} title="Fechar" className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-slate-200 hover:bg-slate-300 text-black'>
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

export default PopupCriarTipoFav;
