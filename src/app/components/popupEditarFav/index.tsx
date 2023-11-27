import React, { useState, useEffect, ChangeEvent } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowUturnLeftIcon, PencilIcon, XMarkIcon } from '@heroicons/react/20/solid';
import InputEmail from '../inputEmail';
import InputTelefone from '../inputTelefone';
import InputCpf from '../inputCpf';
import InputCnpj from '../inputCnpj';

    interface PopupProps {
        open: boolean;
        onClose: () => void;
        favId: number | null;
        favNome: string;
        favEmail?: string;
        favTelefone?: string;
        favCpf?: string;
        favCnpj?: string;
        favEndereco?: string;
        camposExibidos: string[];
    }

    const PopupEditarFav: React.FC<PopupProps> = ({ open, onClose, favNome, favId, favEmail, favTelefone, favCpf, favCnpj, favEndereco, camposExibidos }) => {
        const [inputFavNome, setInputFavNome] = useState(favNome);
        const [inputFavEmail, setInputFavEmail] = useState(favEmail);
        const [inputFavTelefone, setInputFavTelefone] = useState(favTelefone);
        const [inputFavCpf, setInputFavCpf] = useState(favCpf);
        const [inputFavCnpj, setInputFavCnpj] = useState(favCnpj);
        const [inputFavEndereco, setInputFavEndereco] = useState(favEndereco);


        useEffect(() => {
            if (!open) {
                setInputFavNome(favNome);
                setInputFavEmail(favEmail);
                setInputFavTelefone(favTelefone);
                setInputFavCpf(favCpf);
                setInputFavCnpj(favCnpj);
                setInputFavEndereco(favEndereco);
            }
        }, [open, favNome, favEmail, favTelefone, favCpf, favCnpj, favEndereco]);

        const handleEditClick = () => {
            // Lógica para editar o favorecido com o ID fornecido (favId)
            console.log(`Editando favorecido com ID ${favId}`);
        };

        return (
            <Dialog open={open} onClose={onClose} className="absolute inset-0 z-10 top-[60px] overflow-y-auto ">
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />

                    <div className='sm:w-[60%] md:w-[45%] w-full h-76 items-center bg-white z-20 p-3 rounded-xl'>
                        <div className='rounded-lg w-full p-1 '>
                            <h2 className="text-xl font-bold text-center">Confirmar Edição.</h2>
                            <div className="border mt-4" />
                            
                            {camposExibidos.includes("nome_favorecido") && (
                                <input
                                    id='nomeFav'
                                    className='mt-4 appearance-none rounded-none relative block border-2 w-full px-4 py-1 rounded-t-md'
                                    type='text'
                                    placeholder='Nome...'
                                    maxLength={55}
                                    value={inputFavNome}
                                    onChange={(e) => setInputFavNome(e.target.value)}
                                />
                            )}
                            {camposExibidos.includes("email") && (
                                <InputEmail
                                    value={inputFavEmail}
                                />
                            )}
                            {camposExibidos.includes("telefone") && (
                                <InputTelefone         
                                    value={inputFavTelefone || ""}
                                    onChange={(newPhone) => setInputFavTelefone(newPhone)}
                                />
                            )}
                            {camposExibidos.includes("cpf") && (
                                <InputCpf value={inputFavCpf || ""} onChange={(newCpf) => setInputFavCpf(newCpf)} />
                            )}
                            {camposExibidos.includes("cnpj") && (
                                <InputCnpj value={inputFavCnpj || ""} onChange={(newCnpj) => setInputFavCnpj(newCnpj)} />
                            )}
                            {camposExibidos.includes("endereco") && (
                                <textarea
                                    id='enderecoFav'
                                    className='h-16 max-h-16 mt-2 resize-none appearance-none rounded-none relative block border-2 w-full px-4 py-1 rounded-t-md'
                                    value={inputFavEndereco}
                                    maxLength={98}
                                    onChange={(e) => setInputFavEndereco(e.target.value)}
                                    placeholder='endereco...'
                                />
                            )}

                            {/* ... outros campos de acordo com a necessidade */}

                            <h2 className="mt-3 text-base font-bold text-center">{favId}</h2>
                        </div>

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
                                    // Lógica para Editar o fav com o ID: favId
                                    console.log(`Editar tipo com ID ${favId}`);
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
                    </div>
                </div>
            </Dialog>
        );
    };

    export default PopupEditarFav;
