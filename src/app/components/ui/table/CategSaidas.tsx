// components/TableCategorias.tsx
import React, { useState } from 'react';

interface CategoriaSaida {
    codigo: number;
    nome_saida: string;
}

interface TableCategSaidaProps {
    categSaidas: CategoriaSaida[];
    onCategSaidaSelected: (categSaida: CategoriaSaida) => void;
} 

const TableCategSaidas: React.FC<TableCategSaidaProps> = ({ categSaidas, onCategSaidaSelected }) => {
    const [selectedItem, setSelectedItem] = useState<CategoriaSaida | null>(null);

    const handleRowClick = (categSaida: CategoriaSaida) => {
        setSelectedItem(categSaida);
        onCategSaidaSelected(categSaida);
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
                    {categSaidas.map((categSaida) => (
                        <tr 
                            key={categSaida.codigo}
                            className={`hover:bg-slate-300 cursor-pointer 
                            ${selectedItem === categSaida ? 'bg-selecaoLinha' : 'bg-white'}`}

                            onClick={() => handleRowClick(categSaida)}
                        >
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {categSaida.codigo}
                            </td>
                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {categSaida.nome_saida}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableCategSaidas;
