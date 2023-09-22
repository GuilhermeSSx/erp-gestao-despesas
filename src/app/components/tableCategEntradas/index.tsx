// components/TableCategorias.tsx
import React, { useState } from 'react';

interface CategoriaEntrada {
    codigo: number;
    nome_entrada: string;
}

interface TableCategEntradaProps {
    categEntradas: CategoriaEntrada[];
    onCategEntradaSelected: (categEntrada: CategoriaEntrada) => void;
}

const TableCategEntradas: React.FC<TableCategEntradaProps> = ({ categEntradas, onCategEntradaSelected }) => {
    const [selectedItem, setSelectedItem] = useState<CategoriaEntrada | null>(null);

    const handleRowClick = (categEntrada: CategoriaEntrada) => {
        setSelectedItem(categEntrada);
        onCategEntradaSelected(categEntrada);
    };

    return (
        <div className='rounded-lg mt-[0.1rem] pl-2 h-full w-[98%] overflow-y-scroll'>
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Codigo</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Nome Categoria</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {categEntradas.map((categEntrada) => (
                        <tr 
                            key={categEntrada.codigo}
                            className={`hover:bg-slate-300 cursor-pointer 
                            ${selectedItem === categEntrada ? 'bg-selecaoLinha' : 'bg-white'}`}
                            onClick={() => handleRowClick(categEntrada)}
                        >
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {categEntrada.codigo}
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {categEntrada.nome_entrada}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableCategEntradas;
