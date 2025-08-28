"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { PencilSquareIcon, PlusIcon, SunIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useFavorecido } from "@/app/contexts/FavorecidoContext";
import PopupCriarFav from "@/app/components/ui/modal/CriarFav";
import PopupExcluirFav from "@/app/components/ui/modal/ExcluirFav";
import PopupEditarFav from "@/app/components/ui/modal/EditarFav";
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

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
    { id: 1, nome_favorecido: 'EMPRESA TAL', email: 'guilhermedosantos45@gmail.com', telefone: '167733689', cnpj: '389978900162', endereco: 'AVENIDA DO COMERCIO - 232' }
];

interface Props {
    // children: ReactNode;
}

const CrudFav: React.FC<Props> = () => {

    const { selectedFavorecido } = useFavorecido();

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

    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // estado para abrir popup
    const [popupAbertoCadastroFav, setPopupCadastroFavAberto] = useState(false);
    const [popupAbertoCriarTipoFav, setPopupCriarTipoFavAberto] = useState(false);
    const [popupAbertoEditarFav, setPopupEditarFavAberto] = useState(false);
    const [popupAbertoExcluirFav, setPopupExcluirFavAberto] = useState(false);

    const [selectedFavId, setSelectedFavId] = useState<number | null>(null);

    const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const abrirPopupEditarFav = (favId: number) => {
        setSelectedFavId(favId);
        setPopupEditarFavAberto(true);
    };

    const fecharPopupEditarFav = () => {
        setPopupEditarFavAberto(false);
    };

    const abrirPopupExcluirFav = (favId: number) => {
        setSelectedFavId(favId);
        setPopupExcluirFavAberto(true);
    };

    const fecharPopupExcluirFav = () => {
        setPopupExcluirFavAberto(false);
    };

    const abrirPopupCadastroFav = (tipoFavId: any) => {
        setSelectedTipoId(tipoFavId);
        setPopupCadastroFavAberto(true);
    };

    const fecharPopupCadastroFav = () => {
        setPopupCadastroFavAberto(false);
    };

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>


            <div className='h-fit flex justify-end w-full'>
                <div className='h-fit flex flex-col py-1 items-center mt-1 mb-[6px]'>
                    <div className='w-full flex flex-col'>
                        <div className='flex justify-between w-full'>
                            <Link href={'/dashboard/cadastros'} title="voltar" className="absolute left-[208px] top-[72px]">
                                <div className='group items-center flex md:py-2 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                                    <span className='hidden md:block'>Voltar</span>
                                </div>
                            </Link>
                            <form>
                                <input
                                    ref={searchInputRef}
                                    id="searchInput"
                                    className='appearance-none rounded-none relative block border w-96 px-4 py-2 rounded-t-md mx-2'
                                    type='text'
                                    placeholder='Pesquisar Favorecidos'
                                    value={searchTerm}
                                    autoComplete="off"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </form>
                            <button
                                onClick={() => {
                                    abrirPopupCadastroFav(selectedTipoId);
                                }}
                                title="Criar Favorecido"
                                className={`group relative w-[16rem] flex justify-center items-center py-[2px] border border-transparent
                                        text-base rounded-md bg-emerald-500 hover:bg-emerald-600 
                                        ${'text-lime-200 opacity-50 cursor-not-allowed'} select-none`}
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
                                tipoFavNome={selectedTipoId === 1 ? "Pessoa Física" : selectedTipoId === 2 ? "Pessoa Jurídica" : "Não definido"}
                                camposExibidos={camposExibidos}
                            />

                            <button
                                onClick={() => {
                                    if (selectedFavorecido) {
                                        abrirPopupEditarFav(selectedFavorecido.id);
                                    } else {
                                        alert("Selecione um favorecido na tabela!")
                                    }
                                }
                                }
                                title="Editar Favorecido"
                                className={`group relative w-[25%] mx-2 flex justify-center items-center py-[2px] border border-transparent
                                        text-base rounded-md bg-orange-400 hover:bg-orange-500 
                                        ${selectedFavorecido ? 'text-orange-100' : 'text-gray-500 opacity-30 cursor-not-allowed'} select-none`}
                                disabled={!selectedFavorecido}
                            >
                                Editar
                                <PencilSquareIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedFavorecido) {
                                        abrirPopupExcluirFav(selectedFavorecido.id);
                                    } else {
                                        alert("Selecione um favorecido na tabela!")
                                    }
                                }
                                }
                                title="Excluir Favorecido"
                                className={`group relative w-[25%] flex justify-center items-center py-[2px] border border-transparent
                                        text-base rounded-md bg-red-600 hover:bg-red-800
                                        ${selectedFavorecido ? 'text-red-100' : 'text-gray-400 opacity-30 cursor-not-allowed'} select-none`}
                                disabled={!selectedFavorecido}
                            >
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





            {selectedFavorecido && (
                <PopupEditarFav
                    open={popupAbertoEditarFav}
                    onClose={fecharPopupEditarFav}
                    favId={selectedFavorecido.id}
                    favNome={selectedFavorecido.nome_favorecido}
                    favEmail={selectedFavorecido.email}
                    favTelefone={selectedFavorecido.telefone}
                    favCpf={selectedFavorecido.cpf}
                    favCnpj={selectedFavorecido.cnpj}
                    favEndereco={selectedFavorecido.endereco}
                    camposExibidos={camposExibidos}
                />
            )}
            {selectedFavorecido && (
                <PopupExcluirFav
                    open={popupAbertoExcluirFav}
                    onClose={fecharPopupExcluirFav}
                    favId={selectedFavorecido.id}
                    favNome={selectedFavorecido.nome_favorecido}

                />
            )}




        </>
    )


}

export default CrudFav;