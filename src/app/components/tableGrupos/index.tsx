"use client"
import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';
import PopupExcluirGrupo from '../popupExcluirGrupo';

interface Grupo {
    id: number;
    nome_grupo: string;
}

interface TableGruposProps {
    grupos: Grupo[];
}

const TableGrupos: React.FC<TableGruposProps> = ({ grupos }) => {
    const [selectedEditarItem, setSelectedEditarItem] = useState<Grupo | null>(null);
    const [selectedItem, setSelectedItem] = useState<Grupo | null>(null);
    const [editedGrupoValue, setEditedGrupoValue] = useState<string>(''); // Valor editado
    const [popupAbertoExcluirGrupo, setPopupAbertoExcluirGrupo] = useState(false);

    const handleRowClick = (grupo: Grupo) => {
        setSelectedEditarItem(grupo);
        setEditedGrupoValue(grupo.nome_grupo);
    };

    const abrirPopupExcluirGrupo = (grupo: Grupo ) => {
        setSelectedItem(grupo);
        setPopupAbertoExcluirGrupo(true);
    };

    const fecharPopupExcluirGrupo = () => {
        setPopupAbertoExcluirGrupo(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedGrupoValue(event.target.value);
    };

    const handleEditConfirm = () => {
        // Lógica para confirmar a edição aqui
        console.log('Edição confirmada:', editedGrupoValue);
        setSelectedEditarItem(null);
    };

    return (
        <div className='rounded-lg pl-2 h-[26rem] w-[98%] overflow-y-scroll'>
            <table className="w-full h-fit">
                {/* ... (thead) */}
                <tbody className="divide-y divide-gray-100">
                    {grupos.map((grupo) => (
                        <tr key={grupo.id} className="bg-white hover:bg-slate-50 divide-w">
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {grupo.id}
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {selectedEditarItem === grupo ? (
                                    <input
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editedGrupoValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    grupo.nome_grupo
                                )}
                            </td>
                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    {selectedEditarItem === grupo ? (
                                        <button
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-green-300 hover:bg-green-400'
                                            onClick={handleEditConfirm}
                                        >
                                            Confirmar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {e.stopPropagation(); handleRowClick(grupo)}}
                                            title='Editar'
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-orange-400 hover:bg-orange-600'
                                        >
                                            <PencilSquareIcon
                                                className="h-7 w-5 text-center"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    )}
                                    <button
                                        title='Excluir'
                                        className='w-[48%] h-[38px] flex items-center justify-center border border-transparent
                                            text-sm rounded-md bg-red-500 hover:bg-red-400'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirPopupExcluirGrupo(grupo);
                                        }}
                                    >
                                        <XCircleIcon
                                            className="h-7 w-5 text-center text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PopupExcluirGrupo
                open={popupAbertoExcluirGrupo}
                onClose={fecharPopupExcluirGrupo}
                grupoId={selectedItem ? selectedItem.id : null}
                grupoNome={selectedItem ? selectedItem.nome_grupo : ''}
            />
        </div>
    );
};

export default TableGrupos;
