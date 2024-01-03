"use client";
import { useFavTipo } from '@/app/contexts/FavTipoContext';
import React, { useState } from 'react';

interface TipoFav {
    id: number;
    nome_tipo: string;
}

interface TableFavTiposProps {
    tiposFavs: TipoFav[];
}

const TableTiposFav: React.FC<TableFavTiposProps> = ({ tiposFavs }) => {

    const { setSelectedFavTipo } = useFavTipo();

    const [selectedItem, setSelectedItem] = useState<TipoFav | null>(null);

    const handleRowClick = (tipoFav: TipoFav) => {
        setSelectedItem(tipoFav);
        setSelectedFavTipo(tipoFav);
    };

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll'>
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className='divide-x divide-gray-300 bg-[#cccccc36]'>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Tipo Favorecido</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {tiposFavs.map((tipoFav) => (
                        <tr 
                            key={tipoFav.id}
                            className={`hover:bg-slate-300 cursor-pointer ${
                            selectedItem === tipoFav ? 'bg-selecaoLinha' : 'bg-white' }`}
                            onClick={() => handleRowClick(tipoFav)}
                        >
                            <td className="p-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {tipoFav.nome_tipo}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableTiposFav;
