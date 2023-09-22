import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import InputEmail from '../inputEmail';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import InputTelefone from '../inputTelefone';
import InputCpf from '../inputCpf';
import InputCnpj from '../inputCnpj';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    tipoFavId: number | null;
    tipoFavNome: string;
    camposExibidos: string[]; // Array dos campos a serem exibidos
}

const PopupCriarFav: React.FC<PopupProps> = ({ open, onClose, tipoFavId, tipoFavNome, camposExibidos }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [cpfValue, setCpfValue] = useState('');
    const [cnpjValue, setCnpjValue] = useState('');

    const handlePhoneChange = (newValue: string) => {
        setPhoneNumber(newValue);
    };

    const handleCpfChange = (newCpf: string) => {
        setCpfValue(newCpf);
    };

    const handleCnpjChange = (newCnpj: string) => {
        setCnpjValue(newCnpj);
    };

    // Atualizar o valor do CPF e CNPJ para vazio quando o popup for fechado
    useEffect(() => {
        if (!open) {
            setCpfValue('');
            setCnpjValue('');
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                <div className='sm:w-[60%] md:w-[50%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                    <div className=' rounded-lg w-full'>
                        <h2 className="text-xl font-bold text-center">Cadastrar Favorecido</h2>
                        <div className="border mt-3" />
                        <h2 className="mt-3 text-base font-bold text-center">{tipoFavNome} - {tipoFavId}</h2>
                    </div>  
                    <form className='flex justify-center mt-6 flex-col'>
                        {camposExibidos.includes("nome_favorecido") && (
                            <input
                                id='nomeFav'
                                className='appearance-none rounded-none relative block border-2  w-full px-4 py-1 rounded-t-md'
                                type='text'
                                placeholder='Nome...'
                            />
                        )}
                        {camposExibidos.includes("email") && (
                            <InputEmail />
                        )}
                        {camposExibidos.includes("telefone") && (
                            <InputTelefone value={phoneNumber} onChange={handlePhoneChange} />
                        )}
                        {camposExibidos.includes("cpf") && (
                            <InputCpf value={cpfValue} onChange={handleCpfChange} />
                        )}
                        {camposExibidos.includes("cnpj") && (
                            <InputCnpj value={cnpjValue} onChange={handleCnpjChange} />
                        )}
                        {camposExibidos.includes("endereco") && (
                            <textarea
                                id='enderecoFav'
                                className='h-16 max-h-16 mt-2 resize-none appearance-none rounded-none relative block border-2 w-full px-4 py-1 rounded-t-md'
                                maxLength={98}
                                placeholder='endereco...'
                            />
                        )}

                        {/* ... outros campos de acordo com a necessidade */}

                        <div className='flex justify-between mt-4'>
                            <button title="Salvar Favorecido" className='mt-2 group relative w-[50%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-emerald-400 hover:bg-lime-500 '>
                                Salvar
                                <UserPlusIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                            <button onClick={onClose} title="Fechar" className='mt-2 group relative w-[48%] flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-slate-100 hover:bg-slate-200 text-black'>
                                Fechar
                                <ArrowUturnLeftIcon
                                    className="ml-2 h-7 w-5 text-center"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default PopupCriarFav;
