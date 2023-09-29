import React, { useState } from 'react';

interface Usuario {
    id: number;
    nome_usuario: string;
}

interface TableUsuariosProps {
    usuarios: Usuario[];
    onUsuarioSelected: (usuario: Usuario) => void;
}

const TableUsuarios: React.FC<TableUsuariosProps> = ({ usuarios, onUsuarioSelected }) => {

    const [selectedItem, setSelectedItem] = useState<Usuario | null>(null);

    const handleRowClick = (usuario: Usuario) => {
        setSelectedItem(usuario);
        onUsuarioSelected(usuario);
    };

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2'>
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Usuarios</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {usuarios.map((usuario) => (
                        <tr 
                            key={usuario.id}
                            className={`hover:bg-slate-300 cursor-pointer ${
                            selectedItem === usuario ? 'bg-selecaoLinha' : 'bg-white' }`}
                            onClick={() => handleRowClick(usuario)}
                        >
                            <td className="p-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {usuario.nome_usuario}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableUsuarios;
