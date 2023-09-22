import React, { useState } from 'react';
import PopupExcluirEntrada from '../popupExcluirEntrada';

interface Entrada {
    id: number;
    nome_entrada: string;
}

interface TableEntradaProps {
    entradas: Entrada[];
}

const TableEntrada: React.FC<TableEntradaProps> = ({ entradas }) => {
    const [selectedEditarItem, setSelectedEditarItem] = useState<Entrada | null>(null);
    const [selectedItem, setSelectedItem] = useState<Entrada | null>(null);
    const [editedEntradaValue, setEditedEntradaValue] = useState<string>('');
    const [popupAbertoExcluirEntrada, setPopupAbertoExcluirEntrada] = useState(false);

    const handleRowClick = (entrada: Entrada) => {
        setSelectedEditarItem(entrada);
        setEditedEntradaValue(entrada.nome_entrada);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedEntradaValue(event.target.value);
    };

    const handleEditConfirm = () => {
        // Lógica para confirmar a edição aqui (por exemplo, fazer uma chamada para atualizar no servidor)
        console.log('Edição confirmada:', editedEntradaValue);
        setSelectedEditarItem(null);
    };

    const abrirPopupExcluirEntrada = (entrada: Entrada) => {
        setSelectedItem(entrada);
        setPopupAbertoExcluirEntrada(true);
    };

    const fecharPopupExcluirEntrada = () => {
        setPopupAbertoExcluirEntrada(false);
    };

    return (
        <div className='rounded-lg shadow-[0_10px_10px_-1px_rgba(0,0,0,0.5)] h-full w-full overflow-y-scroll'>
            <table className='w-full h-fit'>
                <thead className='bg-gray-50 border-b-2 border-gray-200 sticky top-0'>
                    <tr>
                        <th className="w-[70%] p-3 text-sm font-semibold tracking-wide text-left bg-emerald-500">Registros De Entradas</th>
                        <th className="w-[30%] p-3 text-sm font-semibold tracking-wide text-center bg-orange-300 select-none">Ação</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    {entradas.map((entrada) => (
                        <tr
                            key={entrada.id}
                            className='hover:bg-slate-200 cursor-pointer divide-w'
                        >
                            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                {selectedEditarItem === entrada ? (
                                    <input
                                        id='editarEntrada'
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editedEntradaValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    entrada.nome_entrada
                                )}
                            </td>
                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    {selectedEditarItem === entrada ? (
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
                                            onClick={(e) => {e.stopPropagation(); handleRowClick(entrada)}}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        className='w-[48%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md bg-red-300 hover:bg-red-400'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirPopupExcluirEntrada(entrada);
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PopupExcluirEntrada
                open={popupAbertoExcluirEntrada}
                onClose={fecharPopupExcluirEntrada}
                entradaId={selectedItem ? selectedItem.id : null}
                entradaNome={selectedItem ? selectedItem.nome_entrada : ''}
            />
        </div>
    );
};

export default TableEntrada;
