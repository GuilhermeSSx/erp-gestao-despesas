"use client"
import React, { useState, useRef, useEffect } from 'react';
import TableSaida from '@/app/components/tableSaidas';
import { motion, AnimatePresence } from "framer-motion";
import { VoltarButton } from '@/app/components/voltarButton';


interface Saida {
    id: number;
    nome_saida: string;
}

const saidas: Saida[] = [
    { id: 1, nome_saida: 'Bateria e refeições' },
    { id: 2, nome_saida: 'Marmita' },
    { id: 3, nome_saida: 'Aluguel Caminhão Muck' },
    { id: 4, nome_saida: 'Pacote Adobe' },
];



export default function Saidas() {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <div className="w-screen md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center">
            <VoltarButton />

            <div className='flex flex-col w-full h-full md:h-[80%] items-center mt-24 md:mt-0'>
                <AnimatePresence>
                    <motion.div
                        className='flex flex-col w-full md:w-[30%] md:min-w-[500px] rounded-lg'
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0, }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <h1 className='text-center mt-4 text-black text-base' />
                        <form className='flex justify-center px-2 mt-2'>
                            <input
                                id='criar'
                                className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                                type='text'
                                placeholder='Criar classificação de saida...'

                            />
                        </form>
                        <div className='rounded-lg mt-2 mb-2 px-2'>
                            <button
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500'
                            >
                                Registrar
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className='md:w-[30%] md:min-w-[500px] w-full h-full flex p-2'>
                    <TableSaida saidas={saidas} />
                </div>

            </div>

        </div>
    );
}
