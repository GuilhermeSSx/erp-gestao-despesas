"use client"
import React, { useState, useRef, useEffect } from 'react';
import TableSaida from '@/app/components/tableSaidas';
import TableCategSaidas from '@/app/components/tableCategSaidas';
import PopupCriarCategSaida from '@/app/components/popupCriarCategSaida';
import PopupEditarCategSaida from '@/app/components/popupEditarCategSaida';
import PopupExcluirSaida from '@/app/components/popupExcluirSaida';
import { motion, AnimatePresence } from "framer-motion";


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

interface CategoriaSaida {
    codigo: number;
    nome_saida: string;
}

const categoriasSaidas: CategoriaSaida[] = [
    { codigo: 1.1, nome_saida: 'Serviços1' },
    { codigo: 1.2, nome_saida: 'Serviços2' },
    { codigo: 1.3, nome_saida: 'Serviços3' },
    { codigo: 1.4, nome_saida: 'Serviços4' },
    { codigo: 1.5, nome_saida: 'Serviços5' }
];

export default function Saidas() {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedCategSaida, setSelectedCategSaida] = useState<CategoriaSaida | null>(null);

    const [popupAbertoCriarCategSaida, setPopupCriarCategSaidaAberto] = useState(false);
    const [popupAbertoExcluirCategSaida, setPopupExcluirCategSaidaAberto] = useState(false);
    const [popupAbertoEditarCategSaida, setPopupEditarCategSaidaAberto] = useState(false);

    const handleCategSaidaSelected = (categSaida: CategoriaSaida) => {
        setSelectedCategSaida(categSaida);
    };

    const abrirPopupEditarCategSaida = () => {
        setPopupEditarCategSaidaAberto(true);
    };

    const fecharEditarCategSaida = () => {
        setPopupEditarCategSaidaAberto(false);
    };

    const abrirPopupExcluirCategSaida = () => {
        setPopupExcluirCategSaidaAberto(true);
    };

    const fecharExcluirCategSaida = () => {
        setPopupExcluirCategSaidaAberto(false);
    };

    const abrirPopupCriarCategSaida = () => {
        setPopupCriarCategSaidaAberto(true);
    };

    const fecharCriarCategSaida = () => {
        setPopupCriarCategSaidaAberto(false);
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const filteredCategSaidas = categoriasSaidas.filter(categSaida =>
        categSaida.nome_saida.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed w-screen h-[calc(100vh-60px)] flex">
            <div className='sm:w-[60%] w-full h-full flex py-1 px-1'>
                <TableSaida saidas={saidas} />
            </div>

            {/* barra lateral */}
            <div className='bg-[#3d3b3b3f] md:w-[40%] hidden sm:flex h-full flex-col'>
                <form className='flex justify-center px-2 mt-[0.4rem]'>
                    <input
                        id='pesquisar'
                        ref={searchInputRef}
                        className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Categorias Saidas'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                <TableCategSaidas categSaidas={filteredCategSaidas} onCategSaidaSelected={handleCategSaidaSelected} />

                <div className='flex justify-between rounded-lg mt-1 px-2'>
                    <button
                        onClick={abrirPopupCriarCategSaida}
                        className='group relative items-center w-[32%] flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md bg-emerald-500 hover:bg-emerald-400 text-white'
                    >
                        Nova
                    </button>

                    <PopupCriarCategSaida open={popupAbertoCriarCategSaida} onClose={fecharCriarCategSaida} />

                    <button
                        onClick={() => {
                            if (selectedCategSaida) {
                                abrirPopupEditarCategSaida();
                            } else {
                                alert("Selecione uma Categoria de saida na tabela!")
                            }
                        }
                        }
                        className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white'
                    >
                        Editar
                    </button>
                    {selectedCategSaida && (
                        <PopupEditarCategSaida
                            open={popupAbertoEditarCategSaida}
                            onClose={fecharEditarCategSaida}
                            saidaNome={selectedCategSaida.nome_saida}
                            saidaId={selectedCategSaida.codigo}
                        />
                    )}
                    <button
                        onClick={() => {
                            if (selectedCategSaida) {
                                abrirPopupExcluirCategSaida();
                            } else {
                                alert("Selecione uma Categoria de saida na tabela!")
                            }
                        }
                        }
                        className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-600 hover:bg-red-500 text-white'
                    >
                        Excluir
                    </button>
                    {selectedCategSaida && (
                        <PopupExcluirSaida
                            open={popupAbertoExcluirCategSaida}
                            onClose={fecharExcluirCategSaida}
                            saidaNome={selectedCategSaida.nome_saida}
                            saidaId={selectedCategSaida.codigo}
                        />
                    )}
                </div>

                <div className="border mt-4" />


                {selectedCategSaida && (
                    <AnimatePresence key={selectedCategSaida.codigo}>
                        <motion.div
                            initial={{ opacity: 0, y: -200 }}
                            animate={{ opacity: 1, y: 0, }}
                            exit={{ opacity: 0, y: -50 }}
                        >
                            <h1 className='text-center mt-4 text-black text-base'>Registrar em {selectedCategSaida.nome_saida}</h1>
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
