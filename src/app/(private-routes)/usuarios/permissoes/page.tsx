"use client"
import TablePerfisAcesso from '@/app/components/tablePerfisAcesso';
import { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/20/solid';

interface PerfilAcesso {
    id: number;
    name: string;
}

const perfisAcessos: PerfilAcesso[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Convidado' },
    { id: 3, name: 'funcionario' },
];

const CriarSelecionarPerfilAcesso = () => {

    const [selectedPefilAcesso, setSelectedPerfilAcesso] = useState<PerfilAcesso | null>(null);

    const handlePefilAcessoSelected = (perfilAcesso: PerfilAcesso) => {
        setSelectedPerfilAcesso(perfilAcesso);
        console.log(selectedPefilAcesso);
    };

    return (
        <main className='md-web:w-screen w-full h-[calc(100vh-60px)] flex justify-center items-center p-2 flex-col overflow-auto'>

            <section className='w-full h-full md-web:w-[60%] md:w-[40%] flex flex-col justify-center items-center'>
                <div className='w-full flex flex-col items-center  p-3 rounded-xl  '>
                    <div className='rounded-lg w-full p-1 '>
                        <h2 className="text-xl font-bold text-center">Criar perfil de acesso</h2>
                        <div className="border mt-4" />
                        <input
                            id='nome-perfil-acesso'
                            className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                            placeholder='Nome do perfil de acesso...'
                            type='text'
                        // value={}
                        // onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-between mt-4 w-full'>
                        <button title="Salvar Favorecido" className='mt-2 group relative w-full flex justify-center items-center py-1 px-4 border border-transparent
                                        text-base rounded-md bg-emerald-400 hover:bg-lime-500 '>
                            Cadastrar
                            <UserPlusIcon
                                className="ml-2 h-7 w-5 text-center"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>

                <div className='mt-8 w-full flex flex-col items-center p-3 rounded-xl'>
                    <TablePerfisAcesso perfisAcessos={perfisAcessos} onPefilAcessoSelected={handlePefilAcessoSelected} />

                </div>


            </section>


        </main>
    );
};

export default CriarSelecionarPerfilAcesso;
