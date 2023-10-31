"use client"
import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';
import PopupExcluirCentroCusto from '../popupExcluirCentroCusto';

interface CentroCusto {
    id: number;
    nome_centro_custo: string;
}

interface TableCentroCustosProps {
    centroCustos: CentroCusto[];
}

const TableCentroDeCustos: React.FC<TableCentroCustosProps> = ({ centroCustos }) => {
    const [selectedEditarItem, setSelectedEditarItem] = useState<CentroCusto | null>(null);
    const [selectedItem, setSelectedItem] = useState<CentroCusto | null>(null);
    const [editedCentroCustoValue, setEditedCentroCustoValue] = useState<string>(''); // Valor editado
    const [popupAbertoExcluirCentroCusto, setPopupAbertoExcluirCentroCusto] = useState(false);

    const handleRowClick = (centroCusto: CentroCusto) => {
        setSelectedEditarItem(centroCusto);
        setEditedCentroCustoValue(centroCusto.nome_centro_custo);
    };

    const abrirPopupExcluirCentroCusto = (centroCusto: CentroCusto ) => {
        setSelectedItem(centroCusto);
        setPopupAbertoExcluirCentroCusto(true);
    };

    const fecharPopupExcluirCentroCusto = () => {
        setPopupAbertoExcluirCentroCusto(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCentroCustoValue(event.target.value);
    };

    const handleEditConfirm = () => {
        // Lógica para confirmar a edição aqui
        console.log('Edição confirmada:', editedCentroCustoValue);
        setSelectedEditarItem(null);
    };

    return (
        <div className='rounded-lg h-full w-full overflow-y-scroll'>
            <table className="w-full h-fit">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="w-[10%] p-3 text-sm font-bold tracking-wide text-left">ID</th>
                        <th className="w-[50%] p-3 text-sm font-semibold tracking-wide text-left">Nome</th>
                        <th className="w-[40%] p-3 text-sm font-semibold tracking-wide text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {centroCustos.map((centroCusto) => (
                        <tr key={centroCusto.id} className="bg-white hover:bg-slate-50 divide-w">
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {centroCusto.id}
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {selectedEditarItem === centroCusto ? (
                                    <input
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editedCentroCustoValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    centroCusto.nome_centro_custo
                                )}
                            </td>
                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    {selectedEditarItem === centroCusto ? (
                                        <button
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-green-300 hover:bg-green-400'
                                            onClick={handleEditConfirm}
                                        >
                                            Confirmar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {e.stopPropagation(); handleRowClick(centroCusto)}}
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
                                            abrirPopupExcluirCentroCusto(centroCusto);
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
            <PopupExcluirCentroCusto
                open={popupAbertoExcluirCentroCusto}
                onClose={fecharPopupExcluirCentroCusto}
                centroCustoId={selectedItem ? selectedItem.id : null}
                centroCustoNome={selectedItem ? selectedItem.nome_centro_custo : ''}
            />
        </div>
    );
};

export default TableCentroDeCustos;
