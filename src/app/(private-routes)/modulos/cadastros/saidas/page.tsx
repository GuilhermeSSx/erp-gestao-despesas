"use client"
import React, { useState, useRef, useEffect } from 'react';
import TableSaida from '@/app/components/tableSaidas';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';


interface Saida {
    id_class_saida: number;
    nome_class_saida: string;
}

const saidas: Saida[] = [
    { id_class_saida: 1, nome_class_saida: 'Bateria e refeições' },
    { id_class_saida: 2, nome_class_saida: 'Marmita' },
    { id_class_saida: 3, nome_class_saida: 'Aluguel Caminhão Muck' },
    { id_class_saida: 4, nome_class_saida: 'Pacote Adobe' },
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
            <Link href={'/modulos/cadastros'} title="voltar">
                <div className='absolute left-0 md:top-16 top-20 group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>

            <div className='flex flex-col w-full h-full md:h-[80%] items-center mt-12 md:mt-0'>
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
