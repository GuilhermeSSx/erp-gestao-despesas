"use client"
import React, { useState } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/20/solid';
import PopupExcluirCentroCusto from '../popupExcluirCentroCusto';
import { updateCentroCusto } from '@/app/lib/cadastrosActions';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface CentroCusto {
    id_centro_custo: number;
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

    const abrirPopupExcluirCentroCusto = (centroCusto: CentroCusto) => {
        setSelectedItem(centroCusto);
        setPopupAbertoExcluirCentroCusto(true);
    };

    const fecharPopupExcluirCentroCusto = () => {
        setPopupAbertoExcluirCentroCusto(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCentroCustoValue(event.target.value);
        event.preventDefault();
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedEditarItem?.nome_centro_custo === editedCentroCustoValue) {
                setSelectedEditarItem(null);
                return;
            }

            await updateCentroCusto(selectedEditarItem?.id_centro_custo || 0, editedCentroCustoValue);

            toast.success(`Centro de custo: ${selectedEditarItem?.nome_centro_custo} atualizado com sucesso!`, {
                position: "bottom-left",
                autoClose: 2600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error(`${error}`, {
                position: "bottom-left",
                autoClose: 3200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setSelectedEditarItem(null);
        }
    };

    return (
        <div className='rounded-lg h-full w-full overflow-y-scroll my-1'>
            <table className="w-full h-fit">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="w-[10%] p-3 text-sm font-bold tracking-wide text-left">ID</th>
                        <th className="w-[50%] p-3 text-sm font-semibold tracking-wide text-left select-none">Nome</th>
                        <th className="w-[40%] p-3 text-sm font-semibold tracking-wide text-left select-none">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {centroCustos.map((centroCusto) => (
                        <tr key={centroCusto.id_centro_custo} className="bg-white hover:bg-slate-50 divide-w">
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {centroCusto.id_centro_custo}
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {selectedEditarItem === centroCusto ? (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <input
                                            type="text"
                                            className="w-full p-1 border rounded"
                                            value={editedCentroCustoValue}
                                            onChange={handleInputChange}
                                            minLength={3}
                                            maxLength={40}
                                            required
                                        />
                                        
                                    </form>

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
                                            onClick={() => {
                                                handleEditConfirm();
                                            }}
                                        >
                                            Confirmar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRowClick(centroCusto) }}
                                            title='Editar'
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-orange-400 hover:bg-orange-600'
                                        >
                                            <span className='hidden md:block mx-3 text-white'>Editar</span>
                                            <PencilSquareIcon
                                                className="h-7 w-5 text-center text-white"
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
                                        <span className='hidden md:block mx-3 text-white'>Excluir</span>
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
                id_centro_custo={selectedItem ? selectedItem.id_centro_custo : 0}
                nome_centro_custo={selectedItem ? selectedItem.nome_centro_custo : ''}
            />
        </div>
    );
};

export default TableCentroDeCustos;
