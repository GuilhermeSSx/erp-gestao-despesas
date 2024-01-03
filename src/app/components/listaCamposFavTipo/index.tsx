import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

interface CampoFavTipo {
    id: number;
    nome_campo: string;
    selecionado?: boolean;
}

const camposFavTipo: CampoFavTipo[] = [
    { id: 1, nome_campo: 'Nome Favorecido', selecionado: false },
    { id: 2, nome_campo: 'Email', selecionado: false },
    { id: 3, nome_campo: 'Telefone', selecionado: false },
    { id: 4, nome_campo: 'CPF', selecionado: false },
    { id: 5, nome_campo: 'CNPJ', selecionado: false },
    { id: 6, nome_campo: 'Endereço', selecionado: false },
];

const ListaCamposFavTipo: React.FC = () => {
    const [camposFav, setCamposFav] = useState<CampoFavTipo[]>(camposFavTipo);
    const [listaCamposFav, setListaCamposFav] = useState<CampoFavTipo[]>([]);

    const toggleCampoSelecionado = (id: number) => {
        setCamposFav(campos =>
            campos.map(campo =>
                campo.id === id ? { ...campo, selecionado: !campo.selecionado } : campo
            )
        );

        setListaCamposFav(listaCampos => {
            const campo = camposFav.find(c => c.id === id);
            if (campo) {
                if (campo.selecionado) {
                    return listaCampos.filter(c => c.id !== id);
                } else {
                    // Verificar se o campo selecionado é CPF ou CNPJ
                    if (campo.nome_campo === 'CPF') {
                        return [
                            ...listaCampos.filter(c => c.nome_campo !== 'CNPJ'),
                            campo
                        ];
                    } else if (campo.nome_campo === 'CNPJ') {
                        return [
                            ...listaCampos.filter(c => c.nome_campo !== 'CPF'),
                            campo
                        ];
                    }
                    return [...listaCampos, campo];
                }
            }
            return listaCampos;
        });
    };

    console.log(listaCamposFav);

    return (
        <div className='mt-3 flex flex-col justify-center items-center h-fit w-full'>
            {/* Lista de Campos Favorecido Tipo */}
            <div className={`bg-jpnrVerde rounded-lg w-full h-fit flex p-3 flex-wrap`}>
                {camposFav.map(campo => (
                    <div
                        onClick={() => {
                            if (
                                !((campo.nome_campo === 'CPF' && listaCamposFav.some(c => c.nome_campo === 'CNPJ')) ||
                                (campo.nome_campo === 'CNPJ' && listaCamposFav.some(c => c.nome_campo === 'CPF')))
                            ) {
                                toggleCampoSelecionado(campo.id);
                            }
                        }}
                        key={campo.id}
                        className={`w-fit h-10 p-3 m-1 rounded-lg ${campo.selecionado ? 'bg-jpnrPink' : 'bg-gray-300'
                            } ${(campo.nome_campo === 'CPF' && listaCamposFav.some(c => c.nome_campo === 'CNPJ')) ||
                                (campo.nome_campo === 'CNPJ' && listaCamposFav.some(c => c.nome_campo === 'CPF'))
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                            } flex items-center justify-between`}
                    >
                        <span
                            className={`font-semibold text-sm ${campo.selecionado ? 'text-gray-100' : 'text-gray-700'
                                } select-none flex items-center`}
                        >
                            {campo.nome_campo}
                            {campo.selecionado && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                            !((campo.nome_campo === 'CPF' && listaCamposFav.some(c => c.nome_campo === 'CNPJ')) ||
                                            (campo.nome_campo === 'CNPJ' && listaCamposFav.some(c => c.nome_campo === 'CPF')))
                                        ) {
                                            toggleCampoSelecionado(campo.id);
                                        }
                                    }}
                                    className='ml-2 bg-[#bb1b50] rounded-full p-1'
                                    disabled={
                                        (campo.nome_campo === 'CPF' && listaCamposFav.some(c => c.nome_campo === 'CNPJ')) ||
                                        (campo.nome_campo === 'CNPJ' && listaCamposFav.some(c => c.nome_campo === 'CPF'))
                                    }
                                >
                                    <CheckIcon className="flex h-4 w-4 text-center" aria-hidden="true" />
                                </button>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaCamposFavTipo;

