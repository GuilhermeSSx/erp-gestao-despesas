import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, PencilIcon } from '@heroicons/react/20/solid';
import InputDate from '../inputDate';
import { motion, AnimatePresence } from "framer-motion";
import ComboBox from '../comboBox';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    lancId: number | null;
    lancData?: string;
    lancVencimento?: string;
    lancClassificacao?: string;
    lancDescricao?: string;
    lancStatus?: string;
    lancFavorecido?: string;
    lancCentroCusto?: string;
    lancValor?: number;
    
}


interface Item {
    itemId: number;
    itemNome: string;
}

const dataFromClassificados: Item[] = [
    {
        itemId: 1,
        itemNome: 'CUSTO MATERIAS',
    },
    {
        itemId: 2,
        itemNome: 'Receita de vendas',
    },
    {
        itemId: 3,
        itemNome: 'CUSTO ADMINISTRATIVO',
    },
    {
        itemId: 4,
        itemNome: 'CUSTO VEICULO',
    }

];

const dataFromStatus: Item[] = [
    {
        itemId: 1,
        itemNome: 'Em Aberto'
    },
    {
        itemId: 2,
        itemNome: 'Pago'
    },
    {
        itemId: 3,
        itemNome: 'Inadimplente'
    }

];

const dataFromFavorecidos: Item[] = [
    {
        itemId: 1,
        itemNome: 'FOR- Ilumisol'
    },
    {
        itemId: 2,
        itemNome: 'FUN- Guilherme'
    },
    {
        itemId: 3,
        itemNome: 'FUN- Alcelio'
    }

];

const dataFromCentroCustos: Item[] = [
    {
        itemId: 1,
        itemNome: 'UFV TAIUVA'
    },
    {
        itemId: 2,
        itemNome: 'Escritório'
    }
];

const PopupEditarLancamento: React.FC<PopupProps> = (
    {
        open, onClose, lancId, lancData, lancClassificacao,
        lancDescricao, lancStatus, lancFavorecido, lancCentroCusto, lancValor, lancVencimento
    }) => {

    const [inputLancData, setInputLancData] = useState(lancData);
    const [inputLancClassificacao, setInputLancClassificacao] = useState(lancClassificacao);
    const [inputLancDescricao, setInputLancDescricao] = useState(lancDescricao);
    const [inputLancStatus, setInputLancStatus] = useState(lancStatus);
    const [inputLancFavorecido, setInputLancFavorecido] = useState(lancFavorecido);
    const [inputLancCentroCusto, setInputLancCentroCusto] = useState(lancCentroCusto);
    const [inputLancValor, setInputLancValor] = useState(lancValor);
    const [inputLancVencimento, setInputLancVencimento] = useState(lancVencimento);

    useEffect(() => {
        setInputLancData(lancData);
        setInputLancClassificacao(lancClassificacao);
        setInputLancDescricao(lancDescricao);
        setInputLancStatus(lancStatus);
        setInputLancFavorecido(lancFavorecido);
        setInputLancCentroCusto(lancCentroCusto);
        setInputLancValor(lancValor);
        setInputLancVencimento(lancVencimento);

        // Agora, vamos verificar se há um valor selecionado nos ComboBoxes e,
        // se houver, encontrar o item correspondente e atribuir seus valores.
        if (lancClassificacao) {
            const selectedClassificacao = dataFromClassificados.find(
                (item) => item.itemNome === lancClassificacao
            );
            if (selectedClassificacao) {
                setClassificadosId(selectedClassificacao.itemId);
                setInputLancClassificacao(selectedClassificacao.itemNome);
            } else {
                setClassificadosId(null);
            }
        }

        if (lancStatus) {
            const selectedStatus = dataFromStatus.find(
                (item) => item.itemNome === lancStatus
            );
            if (selectedStatus) {
                setStatusId(selectedStatus.itemId);
                setInputLancStatus(selectedStatus.itemNome);
            } else {
                setStatusId(null);
            }
        }

        if (lancFavorecido) {
            const selectedFavorecido = dataFromFavorecidos.find(
                (item) => item.itemNome === lancFavorecido
            );
            if (selectedFavorecido) {
                setFavorecidosId(selectedFavorecido.itemId);
                setInputLancFavorecido(selectedFavorecido.itemNome);
            } else {
                setFavorecidosId(null);
            }
        }

        if (lancCentroCusto) {
            const selectedCentroCusto = dataFromCentroCustos.find(
                (item) => item.itemNome === lancCentroCusto
            );
            if (selectedCentroCusto) {
                setCentroCustoId(selectedCentroCusto.itemId);
                setInputLancCentroCusto(selectedCentroCusto.itemNome);
            } else {
                setCentroCustoId(null);
            }
        }


    }, [open, lancData, lancClassificacao, lancDescricao,
        lancStatus, lancFavorecido, lancCentroCusto, lancValor, lancVencimento]);

    const [classificadosId, setClassificadosId] = useState<number | null>(null);
    const [planoContaId, setPlanoContaId] = useState<number | null>(null);
    const [statusId, setStatusId] = useState<number | null>(null);
    const [favorecidosId, setFavorecidosId] = useState<number | null>(null);
    const [centroCustoId, setCentroCustoId] = useState<number | null>(null);

    //uso temporiario para converter a data para o formato ISO
    function convertDateToISOFormat(dateString: string | undefined): string {
        if (!dateString) return '';

        const [day, month, year] = dateString.split('/');
        if (day && month && year) {
            return `${year}-${month}-${day}`;
        }
        return '';
    }

    return (
        <Dialog open={open} onClose={onClose} className="absolute inset-0 z-10 top-[60px] overflow-y-auto ">
            <div className="flex flex-col items-center justify-center h-full p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.2,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    className='sm:w-[90%] md:w-[80%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center select-none">Editar Lançamento</h2>
                        <div className="border mt-3" />
                    </div>

                    <div className='mt-2 flex flex-col justify-between flex-wrap xl:flex-row px-6 xl:px-0'>

                        <InputDate placeholder='Data' />

                        <input
                            value={inputLancVencimento ? convertDateToISOFormat(inputLancVencimento) : ''}
                            onChange={(e) => setInputLancVencimento(e.target.value)}
                            className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-40 px-4 py-2 rounded-t-md'
                            type='date'
                            placeholder='Vencimento'
                        />

                        <ComboBox
                            selectValue={inputLancClassificacao || ''}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setInputLancClassificacao(selectedValue);

                                // Verifica se o valor do input corresponde a algum item da lista
                                const selectedItem = dataFromClassificados.find(
                                    (item) => item.itemNome === selectedValue
                                );

                                // Define o ID com base na correspondência ou como null se não corresponder
                                setClassificadosId(selectedItem ? selectedItem.itemId : null);
                            }}
                            className="m-1 w-fit"
                            placeholder="Classificação"
                            data={dataFromClassificados}
                            onItemSelect={(itemId) => {
                                setClassificadosId(itemId);
                                console.log(classificadosId);
                            }}
                        />

                        <input
                            value={inputLancDescricao}
                            onChange={(e) => setInputLancDescricao(e.target.value)}
                            className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-[30%] px-4 py-2 rounded-t-md'
                            type='combobox'
                            placeholder='Descrição'
                        />

                        <ComboBox
                            selectValue={inputLancStatus || ''}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setInputLancStatus(selectedValue);

                                // Verifica se o valor do input corresponde a algum item da lista
                                const selectedItem = dataFromStatus.find(
                                    (item) => item.itemNome === selectedValue
                                );

                                // Define o ID com base na correspondência ou como null se não corresponder
                                setStatusId(selectedItem ? selectedItem.itemId : null);
                            }}
                            className='m-1 w-fit'
                            placeholder='Status'
                            data={dataFromStatus}
                            onItemSelect={(itemId) => {
                                setStatusId(itemId);
                                console.log(statusId);
                            }}
                        />

                        <ComboBox
                            selectValue={inputLancFavorecido || ''}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setInputLancFavorecido(selectedValue);

                                // Verifica se o valor do input corresponde a algum item da lista
                                const selectedItem = dataFromFavorecidos.find(
                                    (item) => item.itemNome === selectedValue
                                );

                                // Define o ID com base na correspondência ou como null se não corresponder
                                setFavorecidosId(selectedItem ? selectedItem.itemId : null);
                            }}
                            className='m-1 w-fit'
                            placeholder='Favorecido'
                            data={dataFromFavorecidos}
                            onItemSelect={(itemId) => {
                                setFavorecidosId(itemId);
                                console.log(favorecidosId);
                            }}
                        />

                        <ComboBox
                            selectValue={inputLancCentroCusto || ''}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setInputLancCentroCusto(selectedValue);

                                // Verifica se o valor do input corresponde a algum item da lista
                                const selectedItem = dataFromCentroCustos.find(
                                    (item) => item.itemNome === selectedValue
                                );

                                // Define o ID com base na correspondência ou como null se não corresponder
                                setCentroCustoId(selectedItem ? selectedItem.itemId : null);
                            }}
                            className='m-1 w-fit'
                            placeholder='Centro de Custo'
                            data={dataFromCentroCustos}
                            onItemSelect={(itemId) => {
                                setCentroCustoId(itemId);
                                console.log(centroCustoId);
                            }}
                        />

                        <input
                            value={inputLancValor}
                            onChange={(e) => setInputLancValor(Number(e.target.value))}
                            className='m-1 appearance-none rounded-none relative h-8 block border w-full xl:w-[15%] px-4 py-2 rounded-t-md'
                            type='combobox'
                            placeholder='Valor'
                        />

                    </div>

                    {/* // ----------------------------------------------------- // */}

                    <div className='flex justify-between mt-4'>
                        <button
                            onClick={onClose}
                            title="Cancelar"
                            className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'>
                            Cancelar
                            <ArrowUturnLeftIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            onClick={() => {
                                // Lógica para Editar o lancamento com o ID: lancId
                                console.log(`Editar tipo com ID ${lancId}`);
                                console.log(
                                    classificadosId,
                                    statusId,
                                    favorecidosId,
                                    centroCustoId
                                )
                            }}
                            title="Editar"
                            className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                    text-base rounded-md bg-orange-400 hover:bg-orange-700 text-white'>
                            Editar
                            <PencilIcon
                                className="ml-2 h-8 w-5 text-center"
                                aria-hidden="true"
                            />

                        </button>
                    </div>
                </motion.div>
            </div>
        </Dialog >

    );
};

export default PopupEditarLancamento;



