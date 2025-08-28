"use client"
import React, { useState } from 'react';

interface Lancamento {
    lancId: number;
    lancData: string;
    lancFavorecidos: string;
    lancCategoria: string;
    lancFormaPagamento: string;
    lancValor: number;
    lancStatus: string;
    lancDetalhes?: () => void; // função para abrir detalhes
}

interface TableLancamentosProps {
    lancamentos: Lancamento[];
    onLancamentoSelected: (lancamento: Lancamento) => void;
}

const TableLancamentos: React.FC<TableLancamentosProps> = ({ lancamentos, onLancamentoSelected }) => {
    const [selectedItem, setSelectedItem] = useState<Lancamento | null>(null);

    const handleRowClick = (lancamento: Lancamento) => {
        setSelectedItem(lancamento);
        onLancamentoSelected(lancamento);
    };

    return (
        <div className="bg-[#00000083] rounded-lg h-full w-full overflow-auto">
            <table className='w-full h-fit'>
                <thead className='bg-gray-50 border-b-2 border-jpnrVerde sticky top-0'>
                    <tr className='divide-x-2 divide-gray-500 '>
                        <th className='w-[1%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Data</th>
                        <th className='w-[34%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Favorecido</th>
                        <th className='w-[34%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Categoria</th>
                        <th className='w-[10%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Forma Pgto</th>
                        <th className='w-[10%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Valor</th>
                        <th className='w-[10%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200'>Status</th>
                        <th className='w-[1%] p-[6px] text-responsive font-semibold tracking-wide text-left bg-slate-200 select-none' />
                    </tr>
                </thead>
                <tbody className='divide-y divide-white'>
                    {lancamentos.map((lancamento, index) => (
                        <tr
                            key={lancamento.lancId}
                            className={`hover:bg-slate-300 cursor-pointer h-8 divide-x-2 
                ${selectedItem?.lancId === lancamento.lancId ? 'bg-cyan-500' : (index % 2 === 0 ? 'bg-white' : 'bg-slate-200')}`}
                            onClick={() => handleRowClick(lancamento)}
                        >
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap font-semibold'>{lancamento.lancData}</td>
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap'>{lancamento.lancFavorecidos}</td>
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap'>{lancamento.lancCategoria}</td>
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap'>{lancamento.lancFormaPagamento}</td>
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap'>
                                R$ {Number(lancamento.lancValor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className='p-[5px] text-responsive text-gray-700 whitespace-nowrap'>{lancamento.lancStatus}</td>
                            <td className='p-[5px] text-base text-gray-700 whitespace-nowrap'>
                                {lancamento.lancDetalhes && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // não dispara clique da linha
                                            lancamento.lancDetalhes?.(); // abre detalhes
                                            handleRowClick(lancamento); // garante que a linha fique selecionada
                                        }}
                                        className="hover:scale-110 duration-150"
                                    >
                                        🔍
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableLancamentos;
