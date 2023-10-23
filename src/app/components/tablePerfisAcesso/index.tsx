import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import PopupExcluirPerfilAcesso from '../popupExclurPerfilAcesso';

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}

interface TablePerfisAcessosProps {
    perfisAcessos: PerfilAcesso[];
    onPefilAcessoSelected: (perfilAcesso: PerfilAcesso) => void;
}

const TablePerfisAcesso: React.FC<TablePerfisAcessosProps> = ({ perfisAcessos, onPefilAcessoSelected }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<PerfilAcesso | null>(null);
    const [selectedEditarItem, setSelectedEditarItem] = useState<PerfilAcesso | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        if (selectedItemIndex === null) {
            setSelectedItemIndex(0);
            onPefilAcessoSelected(perfisAcessos[0]);
        } else {
            if (perfisAcessos[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
                onPefilAcessoSelected(perfisAcessos[0]);
            }
            onPefilAcessoSelected(perfisAcessos[selectedItemIndex]);
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!tableRef.current) return;

            const rows = Array.from(tableRef.current.querySelectorAll('tbody tr'));

            if (event.key === 'ArrowDown' && selectedItemIndex !== null) {
                const nextIndex = selectedItemIndex + 1;
                if (nextIndex < rows.length) {
                    setSelectedItemIndex(nextIndex);
                    onPefilAcessoSelected(perfisAcessos[nextIndex]);
                }
            } else if (event.key === 'ArrowUp' && selectedItemIndex !== null) {
                const prevIndex = selectedItemIndex - 1;
                if (prevIndex >= 0) {
                    setSelectedItemIndex(prevIndex);
                    onPefilAcessoSelected(perfisAcessos[prevIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItemIndex, onPefilAcessoSelected, perfisAcessos]);



    const handleRowClick = (perfilAcesso: PerfilAcesso, index: number) => {
        setSelectedItemIndex(index);
        onPefilAcessoSelected(perfilAcesso);
    };

    const [popupAbertoExcluirPerfilAcesso, setPopupAbertoExcluirPerfilAcesso] = useState(false);

    const abrirPopupExcluirPerfilAcesso = (perfil_acesso: PerfilAcesso) => {
        setSelectedItem(perfil_acesso);
        setPopupAbertoExcluirPerfilAcesso(true);
    };

    const fecharPopupExcluirPerfilAcesso = () => {
        setPopupAbertoExcluirPerfilAcesso(false);
    };



    return (
        <div className='rounded-lg border h-full w-[100%] overflow-y-scroll mt-2 bg-white'>
            <table className="w-full h-fit select-none" ref={tableRef}>
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className='divide-x divide-gray-300'>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Perfil de Acesso</th>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-blue-100">
                    {perfisAcessos.map((perfilAcesso, index) => (
                        <tr
                            key={perfilAcesso.id_perfil_acesso}
                        >

                            <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                <div>
                                    <h2 className='font-semibold text-gray-500'>{perfilAcesso.nome_perfil_acesso}</h2>
                                </div>
                            </td>
                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    <Link
                                        href={{ pathname: "/usuarios/perfil-acesso", query: { id: perfilAcesso.id_perfil_acesso } }}
                                        className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-blue-400 hover:bg-blue-300'
                                    >
                                        Selecionar
                                    </Link>
                                    <button
                                        className='w-[48%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md bg-red-300 hover:bg-red-400'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirPopupExcluirPerfilAcesso(perfilAcesso);

                                        }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <PopupExcluirPerfilAcesso
                open={popupAbertoExcluirPerfilAcesso}
                onClose={fecharPopupExcluirPerfilAcesso}
                id_perfil_acesso={selectedItem ? selectedItem.id_perfil_acesso : null}
                nome_perfil_acesso={selectedItem ? selectedItem.nome_perfil_acesso : ''}
                //reloadPerfilAcessos={reloadPerfilAcessos} -- Continuar
            /> */}

        </div>
    );
};

export default TablePerfisAcesso;
