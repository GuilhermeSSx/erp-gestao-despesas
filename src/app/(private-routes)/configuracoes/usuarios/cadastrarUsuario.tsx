"use client";
import PopupCriarUsuario from "@/app/components/popupCriarUsuario";
import PopupExcluirUsuario from "@/app/components/popupExcluirUsuario";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useUsuario } from '@/app/contexts/UsuarioContext';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
}

const CadastrarUsuario = () => {

    const { selectedUsuario } = useUsuario();

    // console.log(selectedUsuario);

    const { data: session } = useSession(); // Obtenha a sessão do usuário

    // const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

    const [popupAbertoCriarUsuario, setPopupCriarUsuarioAberto] = useState(false);
    const [popupAbertoExcluirUsuario, setPopupExcluirUsuarioAberto] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const abrirPopupExcluirUsuario = (userId: number) => {
        setSelectedUserId(userId);
        setPopupExcluirUsuarioAberto(true);
    };

    const fecharPopupExcluirUsuario = () => {
        setPopupExcluirUsuarioAberto(false);
    };

    const abrirPopupCriarUsuario = () => {
        setPopupCriarUsuarioAberto(true);
    };

    const fecharPopupCriarUsuario = () => {
        setPopupCriarUsuarioAberto(false);
    };


    return (
        <>
            <div className='flex justify-center items-center rounded w-full h-fit'>
                <div className='flex justify-between rounded-lg my-2 w-full'>
                    {selectedUsuario ? (
                        <button
                            onClick={() => abrirPopupExcluirUsuario(selectedUsuario ? selectedUsuario.id : 0)}
                            className={`group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md ${selectedUsuario && selectedUsuario.name === session?.user?.name ? 'bg-slate-100 text-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-400 text-white hover:scale-[1.01] duration-200'
                                } `}
                        disabled={selectedUsuario && selectedUsuario.name === session?.user?.name}
                        >
                            Excluir
                        </button>
                    ) : (
                        <button
                            className='group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-500 text-gray-500 hover:scale-[1.02] duration-200 cursor-not-allowed select-none outline-none'
                        >
                            Excluir
                        </button>
                    )}

                    {selectedUsuario && (
                        <PopupExcluirUsuario
                            open={popupAbertoExcluirUsuario}
                            onClose={fecharPopupExcluirUsuario}
                            userId={selectedUsuario.id}
                            userName={selectedUsuario.name}
                        />
                    )}

                </div>
            </div>
            <div className='flex justify-between rounded-lg md:my-1 my-1 w-full md:w-full'>
                <div className='group relative flex-1'>
                    <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-lime-500 via-gray-200 to-gray-400 opacity-30 blur transition duration-500 group-hover:opacity-100'></div>
                    <button
                        onClick={abrirPopupCriarUsuario}
                        className='shadow-lg w-full relative bg-lime-300 rounded-lg  px-7 py-3 text-black select-none outline-none'
                    >
                        Cadastrar
                    </button>
                </div>
            </div>

            <PopupCriarUsuario
                open={popupAbertoCriarUsuario}
                onClose={fecharPopupCriarUsuario}
            />
        </>
    );
};

export default CadastrarUsuario;