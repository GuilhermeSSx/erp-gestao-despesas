import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
    id_modulo_acesso?: number;
}

interface TableUsuariosProps {
    modulos: Modulo[];
    onModuloSelected: (modulos: Modulo[]) => void;
}

const TableModulos: React.FC<TableUsuariosProps> = ({ modulos, onModuloSelected }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [originalModulos, setOriginalModulos] = useState<Modulo[]>([]); // Estado para o array original
    const [isSelectionChanged, setIsSelectionChanged] = useState(false); // Estado para controlar se as seleções foram alteradas
    const tableRef = useRef<HTMLTableElement | null>(null);

    const extractAcessoData = (modulos: Modulo[]) => {
        // Mapeia os objetos Modulo para as listas de id_modulo_acesso e acesso
        const idModuloAcessoList = modulos.map((modulo) => modulo.id_modulo_acesso);
        const acessoList = modulos.map((modulo) => modulo.acesso);
        // Converte as listas em strings separadas por vírgulas
        const idModuloAcessoString = idModuloAcessoList.join(', ');
        const acessoString = acessoList.join(',');
        return { idModuloAcessoList: idModuloAcessoString, acessoList: acessoString };
    };

    
    const updateModulosAcesso = async () => {
        try {
            const { idModuloAcessoList, acessoList } = extractAcessoData(modulos);
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/update-acesso-modulo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID_MODULO_ACESSO_LIST: idModuloAcessoList,
                    ACESSO_LIST: acessoList,
                }),
            });

            if(response.ok) {
                toast.success('Acessos atualizados com sucesso', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            } else {
                toast.error('Erro ao atualizar os acessos', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            
        } catch (error) {
            toast.error(`Erro: ${error}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        if (selectedItemIndex === null) {
            setSelectedItemIndex(0);
            onModuloSelected(modulos);
            setOriginalModulos([...modulos]); // Salve o array original
        } else {
            if (modulos[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
                onModuloSelected(modulos);
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
    }, [selectedItemIndex, onModuloSelected, modulos]);

    const handleSelectChange = (index: number, newAcesso: string) => {
        const updatedModulos = [...modulos];
        updatedModulos[index].acesso = newAcesso;
        onModuloSelected(updatedModulos);
        setIsSelectionChanged(true); // Marque que as seleções foram alteradas
    };

    const handleSave = () => {
        setOriginalModulos([...modulos]); // Atualize o array original
        setIsSelectionChanged(false); // Redefina o estado de alterações nas seleções
        updateModulosAcesso();
    };

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <button
                onClick={handleSave}
                className={`${isSelectionChanged ? 'flex' : 'hidden'
                    } bg-blue-500 text-white p-2 rounded-md w-full cursor-pointer mb-4 flex h-fit justify-center`}
            >
                Salvar
            </button>
            <div className='rounded-lg border h-full w-[100%] overflow-y-scroll bg-white'>

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
                                key={modulo.id_modulo}
                                className={` hover:bg-slate-100 cursor-pointer ${selectedItemIndex === index ? 'bg-slate-50' : 'bg-white'}`}
                            >
                                <td className="w-12 p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                    <div>
                                        <h1 className='font-bold text-sm'>{modulo.id_modulo}</h1>
                                    </div>
                                </td>

                                <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                    <div>
                                        <h2 className='font-semibold text-gray-500'>{modulo.nome_modulo}</h2>
                                    </div>
                                </td>

                                <td className='flex items-center justify-center text-gray-700 w-full'>
                                    <div className="flex justify-center items-center w-full p-2 border-l border-blue-500">
                                        <select
                                            className='w-full h-full p-3 text-sm flex items-center'
                                            value={modulo.acesso} // Use o estado 'acesso' do módulo para o valor do select
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
