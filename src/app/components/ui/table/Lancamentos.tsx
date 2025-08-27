"use client"
import React, { useState } from 'react';

interface Lancamento {
    lancId: number;
    lancVencimento: string;
    lancData: string;
    lancClassificacao: string;
    lancDescricao: string;
    lancAutorizacao: string;
    lancStatus: string;
    lancFavorecidos: string;
    lancCentroCusto: string;
    lancValor: number;
    
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
        <div className=" bg-[#00000083] rounded-lg h-full w-full overflow-auto">
            <table className='w-full h-fit'>
                <thead className='bg-gray-50 border-b-2 border-jpnrVerde sticky top-0'>
                    <tr className='divide-x divide-gray-300'>
                        <th className='w-[2%] p-[6px] text-sm font-semibold tracking-wide text-left bg-jpnrVerde'>Data Lançamento</th>
                        <th className='w-[2%] p-[6px] text-sm font-semibold tracking-wide text-left'>Vencimento</th>
                        <th className='w-[15%] p-[6px] text-sm font-semibold tracking-wide text-left'>Classificação</th>
                        <th className='w-[25%] p-[6px] text-sm font-semibold tracking-wide text-left'>Descrição</th>
                        <th className='w-[5%] p-[6px] text-sm font-semibold tracking-wide text-left'>Autorização</th>
                        <th className='w-[5%] p-[6px] text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='w-[10%] p-[6px] text-sm font-semibold tracking-wide text-left'>Favorecido</th>
                        <th className='w-[10%] p-[6px] text-sm font-semibold tracking-wide text-left'>Centro de Custo</th>
                        <th className='w-[6%] p-[6px] text-sm font-semibold tracking-wide text-left'>Valor</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-500'>
                    {lancamentos.map((lancamento, index) => {
                        return (
                            <tr
                                key={lancamento.lancId}
                                className={`hover:bg-slate-300 cursor-pointer h-8 divide-x-2 
                                    ${selectedItem === lancamento ? 'bg-cyan-500'
                                        :
                                        (index % 2 === 0 ? 'bg-white' : 'bg-slate-200')
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Impede a propagação do evento de clique para elementos pai
                                    handleRowClick(lancamento)
                                }}
                            >
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap font-semibold'>{lancamento.lancData}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancVencimento}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancClassificacao}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-normal'>{lancamento.lancDescricao}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancAutorizacao}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancStatus}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancFavorecidos}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancCentroCusto}</td>
                                <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{lancamento.lancValor}</td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableLancamentos;
