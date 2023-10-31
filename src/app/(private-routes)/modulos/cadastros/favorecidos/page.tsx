"use client"
import TableFavorecidos from '@/app/components/TableFavorecidos';
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';
import TableTipos from '@/app/components/tableTipos';
import PopupExcluirFavTipo from '@/app/components/popupExcluirFavTipo';
import PopupEditarFavTipo from '@/app/components/popupEditarFavTipo';
import PopupExcluirFav from '@/app/components/popupExcluirFav';
import PopupEditarFav from '@/app/components/popupEditarFav';
import PopupCriarTipoFav from '@/app/components/popupCriarTipoFav';
import PopupCriarFav from '@/app/components/popupCriarFav';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

interface Tipo {
    id: number;
    nome_tipo: string;
}

const tipoData: Tipo[] = [
    { id: 1, nome_tipo: 'CLIENTES' },
    { id: 2, nome_tipo: 'FORNECEDORES' },
    { id: 3, nome_tipo: 'FUNCIONÁRIOS' },
    { id: 4, nome_tipo: 'SÓCIOS' },
    { id: 5, nome_tipo: 'CONSULTORES' },
    { id: 6, nome_tipo: 'OUTROS' },
    // Mais objetos de categoria aqui...
];

interface Favorecido {
    id: number;
    nome_favorecido: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    endereco?: string;
}

const favorecidos: Favorecido[] = [
    { id: 1, nome_favorecido: 'JPNR NEGOCIOS CORPORATIVOS LTDA', email: 'guilhermedosantos45@gmail.com', telefone: '19999533689', cpf: '46296186860', cnpj: '34653835000162', endereco: 'Rua Mauro Zamboni - Jardim Silvana, 256 - 13612-250' }
];

export default function Favorecidos() {
    const [camposExibidos, setCamposExibidos] = useState<string[]>([]);

    useEffect(() => {
        // Percorra os itens da tabela para identificar os campos presentes
        const camposPresentes: Set<string> = new Set();
        favorecidos.forEach(favorecido => {
            Object.keys(favorecido).forEach(campo => {
                camposPresentes.add(campo);
            });
        });
        // Converta o conjunto de campos para um array
        const camposExibidosArray = Array.from(camposPresentes);
        // Defina o array de campos exibidos
        setCamposExibidos(camposExibidosArray);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // estado para abrir popup
    const [popupAbertoEditarFavTipo, setPopupEditarFavTipoAberto] = useState(false);
    const [popupAbertoEditarFav, setPopupEditarFavAberto] = useState(false);
    const [popupAbertoDelTipo, setPopupDelTipoAberto] = useState(false);
    const [popupAbertoExcluirFav, setPopupExcluirFavAberto] = useState(false);
    const [popupAbertoCadastroFav, setPopupCadastroFavAberto] = useState(false);
    const [popupAbertoCriarTipoFav, setPopupCriarTipoFavAberto] = useState(false);

    const [selectedFavId, setSelectedFavId] = useState<number | null>(null);
    const [selectedFav, setSelectedFav] = useState<Favorecido | null>(null);

    const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);
    const [selectedTipo, setSelectedTipo] = useState<Tipo | null>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Atualize a seleção do tipo
    const handleTipoSelected = (tipo: Tipo) => {
        setSelectedTipo(tipo);
    };

    // Atualize a seleção do favorecido
    const handleFavorecidoSelected = (favorecido: Favorecido) => {
        setSelectedFav(favorecido);
    };

    const abrirPopupExcluirFav = (favId: number) => {
        setSelectedFavId(favId);
        setPopupExcluirFavAberto(true);
    };

    const fecharPopupExcluirFav = () => {
        setPopupExcluirFavAberto(false);
    };

    const abrirPopupEditarFav = (favId: number) => {
        setSelectedFavId(favId);
        setPopupEditarFavAberto(true);
    };

    const fecharPopupEditarFav = () => {
        setPopupEditarFavAberto(false);
    };

    const abrirPopupEditarFavTipo = (tipoId: number) => {
        setSelectedTipoId(tipoId);
        setPopupEditarFavTipoAberto(true);
    };

    const fecharPopupEditarFavTipo = () => {
        setPopupEditarFavTipoAberto(false);
    };

    const abrirPopupDelTipo = (tipoId: number) => {
        setSelectedTipoId(tipoId);
        setPopupDelTipoAberto(true);
    };

    const fecharPopupDelTipo = () => {
        setPopupDelTipoAberto(false);
    };

    const abrirPopupCriarTipoFav = () => {
        setPopupCriarTipoFavAberto(true);
    };

    const fecharPopupCriarTipoFav = () => {
        setPopupCriarTipoFavAberto(false);
    };

    const abrirPopupCadastroFav = (tipoFavId: any) => {
        setSelectedTipoId(tipoFavId);
        setPopupCadastroFavAberto(true);
    };

    const fecharPopupCadastroFav = () => {
        setPopupCadastroFavAberto(false);
    };

    const filteredFavorecidos = favorecidos.filter(favorecido =>
        favorecido.nome_favorecido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed w-screen h-[calc(100vh-60px)] flex bg-slate-50 justify-center items-center">
            <div className='flex flex-col h-[92%] w-[12%] min-w-[160px] mt-2 rounded-xl '>

                <Link href={'/modulos/cadastros'} title="voltar" className='h-fit'>
                    <div className='group flex justify-center items-center py-2 md:px-4 border border-transparent text-base rounded-md hover:bg-slate-200 text-slate-400'>
                        <ArrowLeftIcon className="mr-4 h-7 w-5 text-center" aria-hidden="true" />
                        <span className='hidden md:block'>Voltar</span>
                    </div>
                </Link>

                {/* Cadastro Tipo */}
                <div className='pb-1 mt-2 w-full h-full flex flex-col bg-gradient-to-r from-[#8ed15aec] via-[#ffffff80] to-[#80797802] px-2 rounded-lg'>

                    <div className='h-fit'>
                        <button
                            onClick={abrirPopupCriarTipoFav}
                            title="Criar Favorecido" className='mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent
                                    text-base rounded-md bg-emerald-500 hover:bg-emerald-600 text-lime-100 items-center '>
                            Cadastrar tipo de Favorecido
                            <PlusIcon
                                className="h-8 w-6 text-center"
                                aria-hidden="true"
                            />
                        </button>
                        <PopupCriarTipoFav open={popupAbertoCriarTipoFav} onClose={fecharPopupCriarTipoFav} />
                    </div>

                    <TableTipos tipos={tipoData} onTipoSelected={handleTipoSelected} />

                    <div className='h-fit flex flex-col py-1 items-center mt-1'>
                        <div className='flex justify-between w-full select-none'>
                            <button
                                onClick={() => {
                                    if (selectedTipo) {
                                        abrirPopupEditarFavTipo(selectedTipo.id);
                                    } else {
                                        alert("Selecione um TIPO de favorecido na tabela!")
                                    }
                                }
                                }
                                title="Editar Tipo Favorecido" className=' group relative w-[49%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-sm rounded-md bg-orange-400 hover:bg-orange-500 text-orange-100'>
                                Editar
                                <PencilSquareIcon
                                    className="ml-2 h-8 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            {selectedTipo && (
                                <PopupEditarFavTipo
                                    open={popupAbertoEditarFavTipo}
                                    onClose={fecharPopupEditarFavTipo}
                                    tipoNome={selectedTipo.nome_tipo}
                                    tipoId={selectedTipo.id}
                                />
                            )}
                            <button
                                onClick={() => {
                                    if (selectedTipo) {
                                        abrirPopupDelTipo(selectedTipo.id);
                                    } else {
                                        alert("Selecione um TIPO de Categoria de favorecido na tabela!")
                                    }
                                }
                                }
                                title="Excluir Tipo Favorecido" className=' group relative w-[49%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-sm rounded-md bg-red-500 hover:bg-red-800 text-red-200'>
                                Excluir
                                <XCircleIcon
                                    className="ml-2 h-8 w-5 text-center "
                                    aria-hidden="true"
                                />
                            </button>
                            {selectedTipo && (
                                <PopupExcluirFavTipo
                                    open={popupAbertoDelTipo}
                                    onClose={fecharPopupDelTipo}
                                    tipoNome={selectedTipo.nome_tipo}
                                    tipoId={selectedTipo.id}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Cadastro Favorecido */}
            <div className='mt-2 w-[82%] h-[92%] flex flex-col px-2 bg-gradient-to-bl from-[#86868600] via-[#eb090900] to-[#8ed15acb] rounded-xl'>

                <div className='h-fit'>
                    <form className='flex justify-center'>
                        <input
                            ref={searchInputRef}
                            id="searchInput"
                            className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                            type='text'
                            placeholder='Pesquisar Favorecidos'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>

                {selectedTipo ? ( // Verifica se há um tipo selecionado
                    <TableFavorecidos favorecidos={filteredFavorecidos} onFavorecidoSelected={handleFavorecidoSelected} />
                ) : (
                    <div className="h-full flex items-center justify-center">
                        Selecione um tipo de favorecido ao lado.
                    </div>
                )}

                <div className='h-fit flex flex-col py-1 items-center mt-1 mb-2'>
                    <div className='w-full flex flex-col'>
                        <div className='flex justify-between w-full'>
                            <button
                                onClick={() => {
                                    if (selectedTipo) {
                                        abrirPopupCadastroFav(selectedTipo?.id);
                                    } else {
                                        alert("Selecione um TIPO de favorecido na tabela lateral!")
                                    }
                                }}
                                title="Criar Favorecido"
                                className={`group relative w-[30%] flex justify-center items-center py-[2px] border border-transparent
                                text-base rounded-md bg-emerald-500 hover:bg-emerald-600 ${selectedTipo ? 'text-lime-200' : 'text-gray-400 opacity-50 cursor-not-allowed'
                                    } select-none`}
                                disabled={!selectedTipo}
                            >
                                Cadastrar
                                <PlusIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>

                            <PopupCriarFav
                                open={popupAbertoCadastroFav}
                                onClose={fecharPopupCadastroFav}
                                tipoFavId={selectedTipoId}
                                tipoFavNome={selectedTipo ? selectedTipo.nome_tipo : ''}
                                camposExibidos={camposExibidos}
                            />

                            <button
                                onClick={() => {
                                    if (selectedFav) {
                                        abrirPopupEditarFav(selectedFav.id);
                                    } else {
                                        alert("Selecione um favorecido na tabela!")
                                    }
                                }
                                }
                                title="Editar Favorecido" className=' group relative w-[30%] flex justify-center items-center py-[2px] border border-transparent
                                text-base rounded-md bg-orange-400 hover:bg-orange-500 text-orange-100 select-none'>
                                Editar
                                <PencilSquareIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedFav) {
                                        abrirPopupExcluirFav(selectedFav.id);
                                    } else {
                                        alert("Selecione um favorecido na tabela!")
                                    }
                                }
                                }
                                title="Excluir Favorecido" className=' group relative w-[30%] flex justify-center items-center py-[2px] px-4 border border-transparent
                                    text-base rounded-md bg-red-600 hover:bg-red-800 text-red-200 select-none'>
                                Remover
                                <XCircleIcon
                                    className="ml-2 h-7 w-5 text-center "
                                    aria-hidden="true"
                                />

                            </button>

                        </div>
                    </div>
                </div>

            </div>
            {selectedFav && (
                <PopupEditarFav
                    open={popupAbertoEditarFav}
                    onClose={fecharPopupEditarFav}
                    favId={selectedFav.id}
                    favNome={selectedFav.nome_favorecido}
                    favEmail={selectedFav.email}
                    favTelefone={selectedFav.telefone}
                    favCpf={selectedFav.cpf}
                    favCnpj={selectedFav.cnpj}
                    favEndereco={selectedFav.endereco}
                    camposExibidos={camposExibidos}
                />
            )}
            {selectedFav && (
                <PopupExcluirFav
                    open={popupAbertoExcluirFav}
                    onClose={fecharPopupExcluirFav}
                    favId={selectedFav.id}
                    favNome={selectedFav.nome_favorecido}

                />
            )}
        </div>
    )
}
