import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { motion } from "framer-motion";
import ComboBox from '../comboBox';
import InputDate from '../inputDate';

interface ItemData {
    itemId: number;
    itemNome: string;
}

const dataFromClassificados: ItemData[] = [
    {
        itemId: 1,
        itemNome: 'CUSTO MATERIAS',
    },
    {
        itemId: 2,
        itemNome: 'Receita de vendas',
    },
    {
        itemId: 3,
        itemNome: 'CUSTO ADMINISTRATIVO',
    },
    {
        itemId: 4,
        itemNome: 'CUSTO VEICULO',
    }

];

const dataFromStatus: ItemData[] = [
    {
        itemId: 1,
        itemNome: 'Em Aberto'
    },
    {
        itemId: 2,
        itemNome: 'Pago'
    },
    {
        itemId: 3,
        itemNome: 'Inadimplente'
    }

];

const dataFromFavorecidos: ItemData[] = [
    {
        itemId: 1,
        itemNome: 'FOR- Ilumisol'
    },
    {
        itemId: 2,
        itemNome: 'FUN- Guilherme'
    },
    {
        itemId: 3,
        itemNome: 'FUN- Alcelio'
    }

];

const dataFromCentroCustos: ItemData[] = [
    {
        itemId: 1,
        itemNome: 'UFV TAIUVA'
    },
    {
        itemId: 2,
        itemNome: 'Escritório'
    }
];

interface PopupProps {
    open: boolean;
    onClose: () => void;
    LancId?: number | null;
    LancClassificacao?: string;
}

const PopupCriarLancamento: React.FC<PopupProps> = ({ open, onClose, LancId, LancClassificacao }) => {

    let ClassificadosId: number | null;
    let PlanoContaId: number | null;
    let StatusId: number | null;
    let FavorecidosId: number | null;
    let CentroCustoId: number | null;

    return (
        <Dialog open={open} onClose={onClose} className="relative inset-0 z-10 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.5, rotate: 64 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    exit={{ opacity: 0, x: -80 }}
                    className='sm:w-[90%] md:w-[80%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center select-none">Cadastrar Novo Lançamento</h2>
                        <div className="border mt-3" />
                    </div>

                    <div className='flex justify-center mt-6 flex-col'>

                        <div className='flex flex-col justify-between flex-wrap xl:flex-row px-6 xl:px-0'>

                            <InputDate placeholder='Data' />

                            <input className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-40 px-4 py-2 rounded-t-md' type='date' placeholder='Vencimento' />

                            <ComboBox
                                selectValue={''}
                                className='m-1 w-fit'
                                placeholder='Classificação'
                                data={dataFromClassificados}
                                onItemSelect={(itemId) => {
                                    ClassificadosId = itemId;
                                    console.log(ClassificadosId)
                                }}
                            />

                            <input className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-[30%] px-4 py-2 rounded-t-md' type='text' placeholder='Descrição' />

                            <ComboBox
                                selectValue={''}
                                className='m-1 w-fit' 
                                placeholder='Status' 
                                data={dataFromStatus}
                                onItemSelect={(itemId) => {
                                    StatusId = itemId;
                                    console.log(StatusId)
                                }}
                            />

                            <ComboBox
                                selectValue={''}
                                className='m-1 w-fit' 
                                placeholder='favorecido' 
                                data={dataFromFavorecidos}
                                onItemSelect={(itemId) => {
                                    FavorecidosId = itemId;
                                    console.log(FavorecidosId)
                                }}
                            />

                            <ComboBox
                                selectValue={''}
                                className='m-1 w-fit' 
                                placeholder='Centro de Custo' 
                                data={dataFromCentroCustos}
                                onItemSelect={(itemId) => {
                                    CentroCustoId = itemId;
                                    console.log(CentroCustoId)
                                }}
                            />

                            <input className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-[15%] px-4 py-2 rounded-t-md' type='combobox' placeholder='Valor' />

                            
                        </div>

                        <div className='flex justify-between mt-4'>
                            <button 
                                title="Salvar Favorecido" 
                                className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent text-base rounded-md bg-emerald-400 hover:bg-lime-500 '
                                onClick={() => console.log(
                                    ClassificadosId,
                                    PlanoContaId,
                                    StatusId,
                                    FavorecidosId,
                                    CentroCustoId
                                )}
                                >
                                Salvar
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
                </motion.div>
            </div>
        </Dialog>
    );
};

export default PopupCriarLancamento;
