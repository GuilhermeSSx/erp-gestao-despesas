import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, PencilIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    entradaNome: string;
    entradaId: number | null;
}

const PopupEditarCategEntrada: React.FC<PopupProps> = ({ open, onClose, entradaNome, entradaId }) => {
    const [inputValue, setInputValue] = useState(entradaNome);

    useEffect(() => {
        if (!open) {
            setInputValue(entradaNome);
        }
    }, [open, entradaNome]);

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <div className='sm:w-[60%] md:w-[30%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className='rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Confirmar Edição.</h2>
                        <div className="border mt-4" />
                        <input
                            id='nomeEntrada'
                            className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                            type='text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <h2 className="mt-3 text-base font-bold text-center">{entradaNome}, {entradaId}</h2>
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
                                // Lógica para Editar o categ entrada com o ID: entradaId
                                console.log(`Editar tipo com ID ${entradaId}`);
                            }}
                            title="Editar"
                            className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-orange-400 hover:bg-orange-700 text-white'>
                            Editar
                            <PencilIcon
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

export default PopupEditarCategEntrada;
