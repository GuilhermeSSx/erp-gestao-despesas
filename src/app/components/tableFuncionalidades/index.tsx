import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Funcionalidade {
    id_funcionalidade: number;
    nome_funcionalidade: string;
    acesso: string;
    id_funcionalidade_acesso?: number;
}

interface TableFuncionalidadesProps {
    funcionalidades: Funcionalidade[];
    onFuncionalidadeSelected: (funcionalidades: Funcionalidade[]) => void;
}

const TableFuncionalidades: React.FC<TableFuncionalidadesProps> = ({ funcionalidades, onFuncionalidadeSelected }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [originalFuncionarios, setOriginalFuncionarios] = useState<Funcionalidade[]>([]); // Estado para o array original
    const [isSelectionChanged, setIsSelectionChanged] = useState(false); // Estado para controlar se as seleções foram alteradas
    const tableRef = useRef<HTMLTableElement | null>(null);


    const extractAcessoData = (funcionalidades: Funcionalidade[]) => {
        // Mapeia os objetos Modulo para as listas de id_modulo_acesso e acesso
        const idFuncionalidadeAcessoList = funcionalidades.map((funcionalidade) => funcionalidade.id_funcionalidade_acesso);
        const acessoList = funcionalidades.map((funcionalidade) => funcionalidade.acesso);
        // Converte as listas em strings separadas por vírgulas
        const idFuncionalidadeAcessoString = idFuncionalidadeAcessoList.join(', ');
        const acessoString = acessoList.join(',');
        return { idFuncionalidadeAcessoList: idFuncionalidadeAcessoString, acessoList: acessoString };
    };

    
    const updateFuncionalidadesAcesso = async () => {
        try {
            const { idFuncionalidadeAcessoList, acessoList } = extractAcessoData(funcionalidades);
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/update-acesso-funcionalidade', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID_FUNCIONALIDADE_ACESSO_LIST: idFuncionalidadeAcessoList,
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
            onFuncionalidadeSelected(funcionalidades);
        } else {
            if (funcionalidades[selectedItemIndex] === undefined) {
                setSelectedItemIndex(0);
                onFuncionalidadeSelected(funcionalidades);
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
    }, [selectedItemIndex, onFuncionalidadeSelected, funcionalidades]);

    const handleSelectChange = (index: number, newAcesso: string) => {
        const updatedFuncionalidades = [...funcionalidades];
        updatedFuncionalidades[index].acesso = newAcesso;
        onFuncionalidadeSelected(updatedFuncionalidades);
        setIsSelectionChanged(true); // Marque que as seleções foram alteradas
    };

    const handleSave = () => {
        setOriginalFuncionarios([...funcionalidades]); // Atualize o array original
        setIsSelectionChanged(false); // Redefina o estado de alterações nas seleções
        updateFuncionalidadesAcesso();
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
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Funcionalidade</th>
                            <th className="p-3 text-sm font-bold tracking-wide text-left">Acesso</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-blue-100">
                        {funcionalidades.map((funcionalidade, index) => (
                            <tr
                                key={funcionalidade.id_funcionalidade}
                                className={`hover:bg-slate-100 cursor-pointer ${selectedItemIndex === index ? 'bg-slate-50' : 'bg-white'}`}
                            >
                                <td className="w-12 p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">
                                    <div>
                                        <h1 className='font-bold text-sm'>{funcionalidade.id_funcionalidade}</h1>
                                    </div>
                                </td>
                                <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                    <div>
                                        <h2 className='font-semibold text-gray-500'>{funcionalidade.nome_funcionalidade}</h2>
                                    </div>
                                </td>
                                <td className='flex items-center justify-center text-gray-700 w-full'>
                                    <div className="flex justify-center items-center w-full p-2 border-l border-blue-500">
                                        <select
                                            className='w-full h-full p-3 text-sm flex items-center'
                                            value={funcionalidade.acesso}
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

export default TableFuncionalidades;
