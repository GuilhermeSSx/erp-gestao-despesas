"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import PopupCriarTipoFav from "@/app/components/popupCriarTipoFav";
import { PencilSquareIcon, PlusIcon, SunIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useFavTipo } from '@/app/contexts/FavTipoContext';
import PopupEditarFavTipo from "@/app/components/popupEditarFavTipo";
import PopupExcluirFavTipo from "@/app/components/popupExcluirFavTipo";
import { FcUp } from "react-icons/fc";

interface Props {
    // children: ReactNode;
}

const CrudFavTipo: React.FC<Props> = () => {

    const { selectedFavTipo } = useFavTipo();

    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // estado para abrir popup
    const [popupAbertoEditarFavTipo, setPopupEditarFavTipoAberto] = useState(false);
    const [popupAbertoDelTipo, setPopupDelTipoAberto] = useState(false);

    const [popupAbertoCriarTipoFav, setPopupCriarTipoFavAberto] = useState(false);

    const [selectedFavId, setSelectedFavId] = useState<number | null>(null);

    const [selectedTipoId, setSelectedTipoId] = useState<number | null>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

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

    return (
        <>
            <FcUp
                className="h-8 text-center flex justify-center items-center w-full"
                aria-hidden="true"
            />

            <div className='h-fit flex flex-col py-1 items-center mt-1'>

                <div className='flex justify-between w-full select-none'>
                    <button
                        onClick={() => {
                            if (selectedFavTipo) {
                                abrirPopupEditarFavTipo(selectedFavTipo.id);
                            } else {
                                alert("Selecione um TIPO de favorecido na tabela!")
                            }
                        }
                        }
                        title="Editar Tipo Favorecido"

                        className={`group relative w-[49%] flex justify-center items-center py-[2px] border border-transparent
                                    text-xs rounded-md bg-orange-400 hover:bg-orange-500 
                                    ${selectedFavTipo ? 'text-orange-100' : 'text-gray-500 opacity-30 cursor-not-allowed'} select-none`}
                        disabled={!selectedFavTipo}
                    >
                        Editar
                        <PencilSquareIcon
                            className="ml-2 h-8 w-5 text-center"
                            aria-hidden="true"
                        />
                    </button>
                    {selectedFavTipo && (
                        <PopupEditarFavTipo
                            open={popupAbertoEditarFavTipo}
                            onClose={fecharPopupEditarFavTipo}
                            tipoNome={selectedFavTipo.nome_tipo}
                            tipoId={selectedFavTipo.id}
                        />
                    )}

                    <button
                        onClick={() => {
                            if (selectedFavTipo) {
                                abrirPopupDelTipo(selectedFavTipo.id);
                            } else {
                                alert("Selecione um TIPO de Categoria de favorecido na tabela!")
                            }
                        }
                        }
                        title="Excluir Tipo Favorecido"
                        className={`group relative w-[49%] flex justify-center items-center py-[2px] border border-transparent
                            text-xs rounded-md bg-red-500 hover:bg-red-800
                            ${selectedFavTipo ? 'text-red-200' : 'text-gray-400 opacity-30 cursor-not-allowed'} select-none`}
                        disabled={!selectedFavTipo}
                    >
                        Excluir
                        <SunIcon
                            className="ml-2 h-8 w-5 text-center "
                            aria-hidden="true"
                        />
                    </button>
                    {selectedFavTipo && (
                        <PopupExcluirFavTipo
                            open={popupAbertoDelTipo}
                            onClose={fecharPopupDelTipo}
                            tipoNome={selectedFavTipo.nome_tipo}
                            tipoId={selectedFavTipo.id}
                        />
                    )}

                </div>
                <button
                    onClick={abrirPopupCriarTipoFav}
                    title="Criar Tipo de Favorecido" className='mt-1 group relative w-full flex justify-center py-1 px-4 border border-transparent
                            text-sm rounded-md bg-emerald-500 hover:bg-emerald-600 text-lime-100 items-center '>
                    Novo tipo de Favorecido
                    <PlusIcon
                        className="h-8 w-6 text-center"
                        aria-hidden="true"
                    />
                </button>
                <PopupCriarTipoFav open={popupAbertoCriarTipoFav} onClose={fecharPopupCriarTipoFav} />

            </div>
        </>
    )


}

export default CrudFavTipo;