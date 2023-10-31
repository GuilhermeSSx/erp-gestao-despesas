import React, { useState } from 'react';
import PopupExcluirSaida from '../popupExcluirSaida';

interface Saida {
    id: number;
    nome_saida: string;
    // Outras propriedades do registro aqui...
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
        setEditedSaidaValue(saida.nome_saida);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedSaidaValue(event.target.value);
    };

    const handleEditConfirm = () => {
        // Lógica para confirmar a edição aqui (por exemplo, fazer uma chamada para atualizar no servidor)
        console.log('Edição confirmada:', editedSaidaValue);
        setSelectedEditarItem(null);
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
                            key={saida.id}
                            className='hover:bg-slate-200 cursor-pointer divide-w' 
                        >
                            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                {selectedEditarItem === saida ? (
                                    <input
                                        id='editarSaida'
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editedSaidaValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    saida.nome_saida
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
                                            onClick={(e) => {e.stopPropagation(); handleRowClick(saida)}}
                                        >
                                            Editar
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
                                        Excluir
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
                saidaId={selectedItem ? selectedItem.id : null}
                saidaNome={selectedItem ? selectedItem.nome_saida : ''}
            />
        </div>
    );
};

export default TableSaida;
