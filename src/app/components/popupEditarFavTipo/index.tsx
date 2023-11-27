import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, PencilIcon } from '@heroicons/react/20/solid';
import ListaCamposFavTipo from '../listaCamposFavTipo';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    tipoNome: string;
    tipoId: number | null;
}

const PopupEditarFavTipo: React.FC<PopupProps> = ({ open, onClose, tipoNome, tipoId }) => {
    const [inputValue, setInputValue] = useState(tipoNome);

    useEffect(() => {
        if (!open) {
            setInputValue(tipoNome);
        }
    }, [open, tipoNome]);

    return (
        <Dialog open={open} onClose={onClose} className="absolute inset-0 z-10 top-[60px] overflow-y-auto ">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <div className='sm:w-[80%] md:w-[60%] w-full h-fit items-center bg-white z-20 p-3 rounded-xl  '>
                    <div className='rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Editar Tipo de Favorecido.</h2>
                        <div className="border mt-4" />
                        <input
                            id='editar nome tipo'
                            className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                            placeholder='Nome do tipo de favorecido...'
                            type='text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <h2 className="mt-3 text-base font-bold text-center">{tipoNome}, {tipoId}</h2>
                    </div>

                    <div className='mt-6 text-center'>
                        Selecione os campos que terão no seu tipo de favorecido.
                        <ListaCamposFavTipo />
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
                                // Lógica para Editar o tipo com o ID: tipoId
                                console.log(`Editar tipo com ID ${tipoId}`);
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

export default PopupEditarFavTipo;



