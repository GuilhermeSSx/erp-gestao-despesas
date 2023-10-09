"use client"
import ListaCamposFavTipo from '@/app/components/listaCamposFavTipo';
import { useSearchParams } from 'next/navigation'
import { ArrowUturnLeftIcon, PencilIcon } from '@heroicons/react/20/solid';

const Permissoes = () => {

    const usuarioParams = useSearchParams();
    const id = usuarioParams.get('id')


    return (
        <main className='md-web:w-screen md-web:h-[calc(100vh-60px)] flex justify-center items-center p-2 md-web:flex-row flex-col overflow-auto'>

            <div className='w-[40%] flex flex-col items-center bg-orange-300 p-3 rounded-xl  '>
                <div className='rounded-lg w-full p-1 '>
                    <h2 className="text-xl font-bold text-center">Criar Permissão</h2>
                    <div className="border mt-4" />
                    <input
                        id='editar nome tipo'
                        className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                        placeholder='Nome da permissão...'
                        type='text'
                        // value={}
                        // onChange={(e) => setInputValue(e.target.value)}
                    />
                    <h2 className="mt-3 text-base font-bold text-center"> {id}</h2>
                </div>

                <div className='flex justify-between mt-4 w-full'>
                    <button
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
                            // Lógica para Editar o tipo com o ID: tipoId
                            console.log(`Editar tipo com ID ${id}`);
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

            <div className='w-[40%] flex flex-col items-center bg-white p-3 rounded-xl  '>
                <div className='rounded-lg w-full p-1 '>
                    <h2 className="text-xl font-bold text-center">Criar Permissão</h2>
                    <div className="border mt-4" />
                    <input
                        id='editar nome tipo'
                        className='mt-3 relative block border-2 w-full px-4 py-2 rounded-t-md'
                        placeholder='Nome da permissão...'
                        type='text'
                        // value={}
                        // onChange={(e) => setInputValue(e.target.value)}
                    />
                    <h2 className="mt-3 text-base font-bold text-center"> {id}</h2>
                </div>

                <div className='flex justify-between mt-4 w-full'>
                    <button
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
                            // Lógica para Editar o tipo com o ID: tipoId
                            console.log(`Editar tipo com ID ${id}`);
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


        </main>
    );
};

export default Permissoes;
