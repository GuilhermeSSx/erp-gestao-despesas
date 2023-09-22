import React, { useState } from 'react';

interface Favorecido {
    id: number;
    nome_favorecido: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    endereco?: string;
}

interface TableFavorecidosProps {
    favorecidos: Favorecido[];
    onFavorecidoSelected: (favorecido: Favorecido) => void;
}

const formatarTelefone = (telefone: string) => {
    const telefoneFormatado = telefone.toString();
    return `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2, 3)} ${telefoneFormatado.slice(3, 7)}-${telefoneFormatado.slice(7)}`;
};

const formatarCPF = (cpf: string) => {
    const cpfFormatado = cpf.replace(/\D/g, ''); // Remover não números
    return `${cpfFormatado.slice(0, 3)}.${cpfFormatado.slice(3, 6)}.${cpfFormatado.slice(6, 9)}-${cpfFormatado.slice(9)}`;
};

const formatarCNPJ = (cnpj: string) => {
    const cnpjFormatado = cnpj.replace(/\D/g, ''); // Remover não números
    return `${cnpjFormatado.slice(0, 2)}.${cnpjFormatado.slice(2, 5)}.${cnpjFormatado.slice(5, 8)}/${cnpjFormatado.slice(8, 12)}-${cnpjFormatado.slice(12)}`;
};

const TableFavorecidos: React.FC<TableFavorecidosProps> = ({ favorecidos, onFavorecidoSelected }) => {
    const [selectedItem, setSelectedItem] = useState<Favorecido | null>(null);
    const selectedFields: (keyof Favorecido)[] = ["nome_favorecido", "email", "telefone", "cpf", "cnpj", "endereco"];

    const handleRowClick = (favorecido: Favorecido) => {
        setSelectedItem(favorecido);
        onFavorecidoSelected(favorecido);
    };

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2'>
            <table className="w-full h-fit">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0 divide-x divide-black">
                    <tr>
                        {selectedFields.map((field) => {
                            const fieldValue = favorecidos.some((favorecido) => !!favorecido[field]);
                            if (fieldValue) {
                                return (
                                    <th key={field} className="p-3 text-sm font-bold tracking-wide text-left">
                                        {field === "nome_favorecido" ? "Nome Favorecido" :
                                            field === "email" ? "Email" :
                                                field === "telefone" ? "Telefone" :
                                                    field === "cpf" ? "CPF" :
                                                        field === "cnpj" ? "CNPJ" :
                                                            field === "endereco" ? "Endereço" : null}
                                    </th>
                                );
                            }

                            return null;
                        })}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {favorecidos.map((favorecido) => (
                        <tr
                            key={favorecido.nome_favorecido}
                            className={`hover:bg-slate-300 cursor-pointer ${selectedItem === favorecido ? 'bg-selecaoLinha' : 'bg-white'}`}
                            onClick={() => handleRowClick(favorecido)}
                        >
                            {selectedFields.map((field) => {
                                const fieldValue = favorecido[field];
                                if (fieldValue) {
                                    return (
                                        <td key={field} className="p-3 w-fit text-[0.73rem] text-gray-800 whitespace-nowrap">
                                            {field === "telefone" ? formatarTelefone(fieldValue as string) :
                                                field === "cpf" ? formatarCPF(fieldValue as string) :
                                                    field === "cnpj" ? formatarCNPJ(fieldValue as string) :
                                                        fieldValue}
                                        </td>
                                    );
                                }

                                return null;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableFavorecidos;
