import React, { useState, useEffect, useRef } from 'react';

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

        // Se um usuario foi adicionado ou removido, selecionar o primeiro
        if (selectedItemIndex === null) {
            setSelectedItemIndex(0);
            onUsuarioSelected(usuarios[0]);
        } else {
            if (usuarios[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
                onUsuarioSelected(usuarios[0]);
            }
            onUsuarioSelected(usuarios[selectedItemIndex]);
        }
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
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2 bg-white'>
            <table className="w-full h-fit select-none" ref={tableRef}>
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className='divide-x divide-gray-300'>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Usuarios</th>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Role</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {usuarios.map((usuario, index) => (
                        <tr
                            key={usuario.id}
                            className={`overflow-y-auto hover:bg-slate-300 cursor-pointer ${selectedItemIndex === index ? 'bg-selecaoLinha' : 'bg-white'}`}
                            onClick={() => handleRowClick(usuario, index)}
                        >
                            <td className="w-full p-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                <div>
                                    <h1 className='font-bold text-sm'>{usuario.name}</h1>
                                </div>
                                <div>
                                    <h2 className='font-semibold text-gray-500'>guilhermedosantos45@gmail.com</h2>
                                </div>

                            </td>
                            <td className='flex items-center justify-center text-gray-700 md-web:w-48 w-32'>
                                <div className="w-full p-1 bg-white border-x-2 border-blue-500">
                                    <select className='flex self-center z-50 w-full h-full p-2 text-sm' >
                                        <option className=' hover:bg-slate-200 bg-slate-100 w-full'>admin</option>
                                        <option className=' hover:bg-slate-200 bg-slate-100 w-full'>convidado</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableUsuarios;
