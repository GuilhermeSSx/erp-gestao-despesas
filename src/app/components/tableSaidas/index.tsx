"use client";
import React, { useState } from 'react';
import PopupExcluirSaida from '../popupExcluirSaida';
import { updateClassSaida } from '@/app/lib/cadastrosActions';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Saida {
    id_class_saida: number;
    nome_class_saida: string;
}

interface TableEntradaProps {
    saidas: Saida[];
}

const TableSaida: React.FC<TableEntradaProps> = ({ saidas }) => {
    const [selectedEditarItem, setSelectedEditarItem] = useState<Saida | null>(null);
    const [selectedItem, setSelectedItem] = useState<Saida | null>(null);
    const [editedSaidaValue, setEditedSaidaValue] = useState<string>('');
    const [popupAbertoExcluirSaida, setPopupAbertoExcluirSaida] = useState(false);

    const handleRowClick = (saida: Saida) => {
        setSelectedEditarItem(saida);
        setEditedSaidaValue(saida.nome_class_saida);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedSaidaValue(event.target.value);
    };

    const handleEditConfirm = async () => {
        try {
            if (selectedEditarItem?.nome_class_saida === editedSaidaValue) {
                setSelectedEditarItem(null);
                return;
            }

            await updateClassSaida(selectedEditarItem?.id_class_saida || 0, editedSaidaValue);

            toast.success(`Classificação de saída: ${selectedEditarItem?.nome_class_saida} atualizado com sucesso!`, {
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

    const abrirPopupExcluirEntrada = (saida: Saida) => {
        setSelectedItem(saida);
        setPopupAbertoExcluirSaida(true);
    };

    const fecharPopupExcluirEntrada = () => {
        setPopupAbertoExcluirSaida(false);
    };

    return (
        <div className='rounded-lg shadow-[0_10px_10px_-1px_rgba(0,0,0,0.5)] h-full w-full overflow-y-scroll'>
            <table className='w-full h-fit'>
                <thead className='bg-gray-50 border-b-2 border-gray-200 sticky top-0'>
                    <tr>
                        <th className="w-[60%] p-3 text-sm font-semibold tracking-wide text-left bg-emerald-500">Classificações de Saida</th>
                        <th className="w-[40%] p-3 text-sm font-semibold tracking-wide text-center bg-orange-300 select-none">Ação</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    {saidas.map((saida) => (
                        <tr
                            key={saida.id_class_saida}
                            className='hover:bg-slate-200 cursor-pointer divide-w'
                        >
                            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                {selectedEditarItem === saida ? (
                                    <form onSubmit={ (e) => e.preventDefault()}>
                                        <input
                                            id='editarSaida'
                                            type="text"
                                            className="w-full p-1 border rounded"
                                            value={editedSaidaValue}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            required
                                            minLength={3}
                                            maxLength={30}
                                            // onKeyDown={(event) => {
                                            //     if (event.key === 'Enter') {
                                            //         event.preventDefault();
                                            //         handleEditConfirm();
                                            //     }
                                            // }}
                                        />
                                    </form>
                                ) : (
                                    saida.nome_class_saida
                                )}
                            </td>
                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    {selectedEditarItem === saida ? (
                                        <button
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-green-300 hover:bg-green-400'
                                            onClick={handleEditConfirm}
                                        >
                                            Confirmar
                                        </button>
                                    ) : (
                                        <button
                                            className='w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                                text-sm rounded-md bg-orange-300 hover:bg-orange-400'
                                            onClick={(e) => { e.stopPropagation(); handleRowClick(saida) }}
                                        >
                                            <span className='hidden md:block mx-3 text-white'>Editar</span>
                                            <PencilSquareIcon
                                                className="h-7 w-5 text-center text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    )}
                                    <button
                                        className='w-[48%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md bg-red-300 hover:bg-red-400'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirPopupExcluirEntrada(saida);
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
            <PopupExcluirSaida
                open={popupAbertoExcluirSaida}
                onClose={fecharPopupExcluirEntrada}
                id_class_saida={selectedItem ? selectedItem.id_class_saida : 0}
                nome_class_saida={selectedItem ? selectedItem.nome_class_saida : ''}
            />
        </div>
    );
};

export default TableSaida;
