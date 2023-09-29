import TableGrupos from '@/app/components/tableGrupos';
import { PlusIcon } from '@heroicons/react/20/solid';

interface Grupo {
    id: number;
    nome_grupo: string;
}

const grupos: Grupo[] = [
    { id: 1, nome_grupo: 'Matriz' },
    { id: 2, nome_grupo: 'Invest' }
    // Mais objetos de categoria aqui...
];



export default function Grupos() {
    return (
        <div className="fixed w-screen h-[calc(100vh-60px)] flex flex-col">
            <div className='mt-4 flex flex-col px-4 sm:pr-[170px] sm:pl-[148px] h-fit'>
                <form className='flex justify-center mt-[0.4rem]'>
                    <input id='cadastrar' className='appearance-none rounded-none relative
                        block border w-full px-4 py-2 rounded-t-md' type='text' placeholder='Cadastrar Grupo Empresarial' />
                    <button title="Adicionar Categoria" className=' ml-1 group relative w-22 flex justify-center py-2 px-4 border border-transparent
                        text-base items-center rounded-md bg-lime-400 hover:bg-lime-500 text-lime-700'>
                        Cadastrar
                        <PlusIcon
                            className="ml-2 h-7 w-5 text-center"
                            aria-hidden="true"
                        />
                    </button>
                </form>
            </div>
            <div className='mt-1 flex w-full h-full sm:pb-28 sm:px-[140px]'>
                <TableGrupos grupos={grupos} />
            </div>
        </div>
    )
}
