import { PlusIcon } from '@heroicons/react/20/solid';
import TableCentroDeCustos from '@/app/components/tableCentroDeCustos';

interface CentroCusto {
    id: number;
    nome_centro_custo: string;
}

const centroCustos: CentroCusto[] = [
    { id: 1, nome_centro_custo: 'UFV TAIUVA' },
    { id: 2, nome_centro_custo: 'Escritório' }
];

export default function CentroDeCusto() {
    return (
        <div className="fixed w-screen h-[calc(100vh-60px)] flex flex-col">
            <div className='mt-4 flex flex-col px-4 sm:pr-[170px] sm:pl-[148px] h-fit'>
                <form className='flex justify-center mt-[0.4rem]'>
                    <input id='cadastrar' className='appearance-none rounded-none relative
                        block border w-full px-4 py-2 rounded-t-md' type='text' placeholder='Cadastrar Centro De Custo' />
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
            <div className='mt-4 w-full px-2 sm:px-36 '>
                <TableCentroDeCustos centroCustos={centroCustos} />
            </div>
        </div>
    )
}
