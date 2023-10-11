import React, { useState, useEffect, useRef } from 'react';

interface Modulo {
    id: number;
    name: string;
}

interface TableUsuariosProps {
    modulos: Modulo[];
    onModuloSelected: (modulo: Modulo) => void;
}

const TableModulos: React.FC<TableUsuariosProps> = ({ modulos, onModuloSelected }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {

        // Se um modulo foi adicionado ou removido, selecionar o primeiro
        if (selectedItemIndex === null) {
            setSelectedItemIndex(0);
            onModuloSelected(modulos[0]);
        } else {
            if (modulos[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
                onModuloSelected(modulos[0]);
            }
            onModuloSelected(modulos[selectedItemIndex]);
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!tableRef.current) return;

            const rows = Array.from(tableRef.current.querySelectorAll('tbody tr'));

            if (event.key === 'ArrowDown' && selectedItemIndex !== null) {
                const nextIndex = selectedItemIndex + 1;
                if (nextIndex < rows.length) {
                    setSelectedItemIndex(nextIndex);
                    onModuloSelected(modulos[nextIndex]);
                }
            } else if (event.key === 'ArrowUp' && selectedItemIndex !== null) {
                const prevIndex = selectedItemIndex - 1;
                if (prevIndex >= 0) {
                    setSelectedItemIndex(prevIndex);
                    onModuloSelected(modulos[prevIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItemIndex, onModuloSelected, modulos]);



    const handleRowClick = (modulo: Modulo, index: number) => {
        setSelectedItemIndex(index);
        onModuloSelected(modulo);
    };

    return (
        <div className='rounded-lg border h-full w-[100%] overflow-y-scroll mt-2 bg-white'>
            <table className="w-full h-fit select-none " ref={tableRef}>
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className='divide-x divide-gray-300'>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">ID</th>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Modulo</th>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Acesso</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-blue-100">
                    {modulos.map((modulo, index) => (
                        <tr
                            key={modulo.id}
                            className={` hover:bg-slate-100 cursor-pointer ${selectedItemIndex === index ? 'bg-slate-50' : 'bg-white'}`}
                            onClick={() => handleRowClick(modulo, index)}
                        >

                            <td className="w-12 p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                <div>
                                    <h1 className='font-bold text-sm'>{modulo.id}</h1>
                                </div>
                            </td>

                            <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                <div>
                                    <h2 className='font-semibold text-gray-500'>{modulo.name}</h2>
                                </div>
                            </td>

                            <td className='flex items-center justify-center text-gray-700 w-full'>
                                <div className="flex justify-center items-center w-full p-2 border-l border-blue-500">
                                    <select className='w-full h-full p-3 text-sm flex items-center' >
                                        <option className=' hover:bg-slate-200 bg-slate-100 w-full'>Sem acesso</option>
                                        <option className=' hover:bg-slate-200 bg-slate-100 w-full'>Apenas leitura</option>
                                        <option className=' hover:bg-slate-200 bg-slate-100 w-full'>Leitura e Gravação</option>
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

export default TableModulos;
