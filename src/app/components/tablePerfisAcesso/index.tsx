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
    const [selectedItem, setSelectedItem] = useState<PerfilAcesso | null>(null); // Change variable name to 'selectedItem'
    const tableRef = useRef<HTMLTableElement | null>(null);

    const handleRowClick = (perfilAcesso: PerfilAcesso, index: number) => {
        if (selectedItem && selectedItem.id_perfil_acesso === perfilAcesso.id_perfil_acesso) {
            // Deselect the current item if it's already selected
            setSelectedItem(null);
            setSelectedItemIndex(null);
        } else {
            // Select the clicked item
            setSelectedItem(perfilAcesso);
            setSelectedItemIndex(index);
        }
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
                            onClick={() => handleRowClick(perfilAcesso, index)} // Added onClick event
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
                                        className={`w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md ${selectedItem && selectedItem.id_perfil_acesso === perfilAcesso.id_perfil_acesso ? 'bg-green-400' : 'bg-blue-400'} hover:bg-blue-300`}
                                    >
                                        {selectedItem && selectedItem.id_perfil_acesso === perfilAcesso.id_perfil_acesso
                                            ? 'Selecionado'
                                            : 'Selecionar'}
                                    </Link>
                                    <button
                                        className='w-[48%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md bg-red-300 hover-bg-red-400'
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
            <PopupExcluirPerfilAcesso
                open={popupAbertoExcluirPerfilAcesso}
                onClose={fecharPopupExcluirPerfilAcesso}
                id_perfil_acesso={selectedItem ? selectedItem.id_perfil_acesso : 0}
                nome_perfil_acesso={selectedItem ? selectedItem.nome_perfil_acesso : ''}
            />
        </div>
    );
};

export default TablePerfisAcesso;
