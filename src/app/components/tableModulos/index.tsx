"use client";
import React, { useState, useEffect, useRef } from 'react';

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
    id_modulo_acesso?: number;
}

interface TableUsuariosProps {
    modulos: Modulo[];
    onModulosChange: (modulos: Modulo[]) => void;
}

const TableModulos: React.FC<TableUsuariosProps> = ({ modulos, onModulosChange }) => {
    const [modulosEstado, setModulosEstado] = useState<Modulo[]>(modulos);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        if (selectedItemIndex === null) {
            setSelectedItemIndex(0);
        } else {
            if (modulosEstado[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!tableRef.current) return;

            const rows = Array.from(tableRef.current.querySelectorAll('tbody tr'));

            if (event.key === 'ArrowDown' && selectedItemIndex !== null) {
                const nextIndex = selectedItemIndex + 1;
                if (nextIndex < rows.length) {
                    setSelectedItemIndex(nextIndex);
                }
            } else if (event.key === 'ArrowUp' && selectedItemIndex !== null) {
                const prevIndex = selectedItemIndex - 1;
                if (prevIndex >= 0) {
                    setSelectedItemIndex(prevIndex);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItemIndex, modulosEstado]);

    const handleSelectChange = (index: number, newAcesso: string) => {
        const updatedModulos = modulosEstado.map((modulo, idx) =>
            idx === index ? { ...modulo, acesso: newAcesso } : modulo
        );
        setModulosEstado(updatedModulos);
        onModulosChange(updatedModulos);
    };

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <div className='rounded-lg border h-full w-[100%] overflow-y-scroll bg-white'>
                <table className="w-full h-fit select-none" ref={tableRef}>
                    <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                        <tr className='divide-x divide-gray-300'>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">ID</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Modulo</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Acesso</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-blue-100">
                        {modulosEstado.map((modulo, index) => (
                            <tr
                                key={modulo.id_modulo}
                                className={`hover:bg-slate-100 cursor-pointer ${selectedItemIndex === index ? 'bg-slate-50' : 'bg-white'}`}
                            >
                                <td className="w-12 p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                    <h1 className='font-bold text-sm'>{modulo.id_modulo}</h1>
                                </td>

                                <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                    <h2 className='font-semibold text-gray-500'>{modulo.nome_modulo}</h2>
                                </td>

                                <td className='flex items-center justify-center text-gray-700 w-full'>
                                    <div className="flex justify-center items-center w-full p-2 border-l border-blue-500">
                                        <select
                                            className='w-full h-full p-3 text-sm flex items-center'
                                            value={modulo.acesso}
                                            onChange={(e) => handleSelectChange(index, e.target.value)}
                                        >
                                            <option value="Sem acesso">Sem acesso</option>
                                            <option value="Apenas leitura">Apenas leitura</option>
                                            <option value="Leitura e Gravação">Leitura e Gravação</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableModulos;
