import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Usuario {
    id: number;
    name: string;
}

interface TableUsuariosProps {
    usuarios: Usuario[];
    onUsuarioSelected: (usuario: Usuario) => void;
}

const TableUsuarios: React.FC<TableUsuariosProps> = ({ usuarios, onUsuarioSelected }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!tableRef.current) return;

            const rows = Array.from(tableRef.current.querySelectorAll('tbody tr'));

            if (event.key === 'ArrowDown' && selectedItemIndex !== null) {
                const nextIndex = selectedItemIndex + 1;
                if (nextIndex < rows.length) {
                    setSelectedItemIndex(nextIndex);
                    onUsuarioSelected(usuarios[nextIndex]);
                }
            } else if (event.key === 'ArrowUp' && selectedItemIndex !== null) {
                const prevIndex = selectedItemIndex - 1;
                if (prevIndex >= 0) {
                    setSelectedItemIndex(prevIndex);
                    onUsuarioSelected(usuarios[prevIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItemIndex, onUsuarioSelected, usuarios]);

    const handleRowClick = (usuario: Usuario, index: number) => {
        setSelectedItemIndex(index);
        onUsuarioSelected(usuario);
    };

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2'>
            <table className="w-full h-fit select-none" ref={tableRef}>
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Usuarios</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {usuarios.map((usuario, index) => (
                        <tr
                            key={usuario.id}
                            className={`hover:bg-slate-300 cursor-pointer ${selectedItemIndex === index ? 'bg-selecaoLinha' : 'bg-white'}`}
                            onClick={() => handleRowClick(usuario, index)}
                        >
                            <td className="p-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {usuario.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableUsuarios;
