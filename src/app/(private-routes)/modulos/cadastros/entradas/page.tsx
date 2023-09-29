"use client"
import React, { useState, useRef, useEffect } from 'react';
import TableEntrada from '@/app/components/tableEntradas';
import TableCategEntradas from '@/app/components/tableCategEntradas';
import PopupCriarCategEntrada from '@/app/components/popupCriarCategEntrada';
import PopupExcluirCategEntrada from '@/app/components/popupExcluirCategEntrada';
import PopupEditarCategEntrada from '@/app/components/popupEditarCategEntrada';
import { motion, AnimatePresence } from "framer-motion";

interface Entrada {
    id: number;
    nome_entrada: string;
    // Outras propriedades do registro aqui...
}

const entradas: Entrada[] = [
    { id: 1, nome_entrada: 'Bateria e refeições' },
    { id: 2, nome_entrada: 'VENDA ENERGIA' },
    { id: 3, nome_entrada: 'INVESTIMENTO' },
    // Mais objetos de registro aqui...
];

interface CategoriaEntrada {
    codigo: number;
    nome_entrada: string;
}

const categoriasEntradas: CategoriaEntrada[] = [
    { codigo: 1, nome_entrada: 'Serviços1' },
    { codigo: 2, nome_entrada: 'Serviços2' },
    { codigo: 3, nome_entrada: 'Serviços3' },
    { codigo: 4, nome_entrada: 'Serviços4' },
    { codigo: 5, nome_entrada: 'Serviços5' }
    // Mais objetos de categoria aqui...
];

export default function Entradas() {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedCategEntrada, setSelectedCategEntrada] = useState<CategoriaEntrada | null>(null);

    const [popupAbertoCriarCategEntrada, setPopupCriarCategEntradaAberto] = useState(false);
    const [popupAbertoExcluirCategEntrada, setPopupExcluirCategEntradaAberto] = useState(false);
    const [popupAbertoEditarCategEntrada, setPopupEditarCategEntradaAberto] = useState(false);

    const handleCategEntradaSelected = (categEntrada: CategoriaEntrada) => {
        setSelectedCategEntrada(categEntrada);
    };

    const abrirPopupEditarCategEntrada = () => {
        setPopupEditarCategEntradaAberto(true);
    };

    const fecharEditarCategEntrada = () => {
        setPopupEditarCategEntradaAberto(false);
    };

    const abrirPopupExcluirCategEntrada = () => {
        setPopupExcluirCategEntradaAberto(true);
    };

    const fecharExcluirCategEntrada = () => {
        setPopupExcluirCategEntradaAberto(false);
    };

    const abrirPopupCriarCategEntrada = () => {
        setPopupCriarCategEntradaAberto(true);
    };

    const fecharCriarCategEntrada = () => {
        setPopupCriarCategEntradaAberto(false);
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const filteredCategEntradas = categoriasEntradas.filter(categEntrada =>
        categEntrada.nome_entrada.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <div className="fixed w-screen h-[calc(100vh-60px)] flex">
            <div className='sm:w-[60%] w-full h-full flex py-1 px-1'>
                <TableEntrada entradas={entradas} />
            </div>

            <div className='bg-[#3d3b3b3f] md:w-[40%] hidden sm:flex h-full flex-col'>
                <form className='flex justify-center px-2 mt-[0.4rem]'>
                    <input
                        id='pesquisar'
                        ref={searchInputRef}
                        className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Categorias Entradas'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                <TableCategEntradas categEntradas={filteredCategEntradas} onCategEntradaSelected={handleCategEntradaSelected} />

                <div className='flex justify-between rounded-lg mt-1 px-2'>
                    <button
                        onClick={abrirPopupCriarCategEntrada}
                        className='group relative items-center w-[32%] flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md bg-emerald-500 hover:bg-emerald-400 text-white'
                    >
                        Nova
                    </button>

                    <PopupCriarCategEntrada open={popupAbertoCriarCategEntrada} onClose={fecharCriarCategEntrada} />

                    <button
                        onClick={() => {
                            if (selectedCategEntrada) {
                                abrirPopupEditarCategEntrada();
                            } else {
                                alert("Selecione uma Categoria de entrada na tabela!")
                            }
                        }
                        }
                        className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white'
                    >
                        Editar
                    </button>
                    {selectedCategEntrada && (
                        <PopupEditarCategEntrada
                            open={popupAbertoEditarCategEntrada}
                            onClose={fecharEditarCategEntrada}
                            entradaNome={selectedCategEntrada.nome_entrada}
                            entradaId={selectedCategEntrada.codigo}
                        />
                    )}
                    <button
                        onClick={() => {
                            if (selectedCategEntrada) {
                                abrirPopupExcluirCategEntrada();
                            } else {
                                alert("Selecione uma Categoria de entrada na tabela!")
                            }
                        }
                        }
                        className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-600 hover:bg-red-500 text-white'
                    >
                        Excluir
                    </button>
                    {selectedCategEntrada && (
                        <PopupExcluirCategEntrada
                            open={popupAbertoExcluirCategEntrada}
                            onClose={fecharExcluirCategEntrada}
                            entradaNome={selectedCategEntrada.nome_entrada}
                            entradaId={selectedCategEntrada.codigo}
                        />
                    )}
                </div>

                <div className="border mt-4" />



                {selectedCategEntrada && (
                    <AnimatePresence key={selectedCategEntrada.codigo}>
                        <motion.div
                            initial={{ opacity: 0, y: -200 }}
                            animate={{ opacity: 1, y: 0, }}
                            exit={{ opacity: 0, y: -50 }}
                        >
                            <h1 className='text-center mt-4 text-black text-base select-none'>Regristrar em {selectedCategEntrada.nome_entrada}</h1>
                            <form className='flex justify-center px-2 mt-2'>
                                <input
                                    id='criar'
                                    className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                                    type='text'
                                    placeholder='Criar Registro'
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
                )}


            </div>
        </div>
    );
}
