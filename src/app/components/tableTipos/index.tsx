import React, { useState } from 'react';

interface Tipo {
    id: number;
    nome_tipo: string;
}

interface TableTiposProps {
    tipos: Tipo[];
    onTipoSelected: (tipo: Tipo) => void;
}

const TableTipos: React.FC<TableTiposProps> = ({ tipos, onTipoSelected }) => {

    const [selectedItem, setSelectedItem] = useState<Tipo | null>(null);

    const handleRowClick = (tipo: Tipo) => {
        setSelectedItem(tipo);
        onTipoSelected(tipo);
    };

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2'>
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Tipo De Favorecido</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {tipos.map((tipo) => (
                        <tr 
                            key={tipo.id}
                            className={`hover:bg-slate-300 cursor-pointer ${
                            selectedItem === tipo ? 'bg-selecaoLinha' : 'bg-white' }`}
                            onClick={() => handleRowClick(tipo)}
                        >
                            <td className="p-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {tipo.nome_tipo}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableTipos;
