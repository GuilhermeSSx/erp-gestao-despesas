import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/20/solid';
import TableCentroDeCustos from '@/app/components/tableCentroDeCustos';
import { VoltarButton } from '@/app/components/voltarButton';
import Link from 'next/link';

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
        <div className="w-screen md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center ">
            <Link href={'/modulos/cadastros'} title="voltar">
                <div className='absolute left-0 md:top-16 top-20 group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>
            <div className='flex flex-col w-full md:w-[40%] md:min-w-[500px] h-[85%] md:h-[80%] items-center bg-slate-100 rounded-md p-2 mt-12 md:mt-0'>
                <div className='flex flex-col w-full rounded-lg'>
                    <form className='flex justify-center'>
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
                <div className='mt-4 w-full h-full '>
                    <TableCentroDeCustos centroCustos={centroCustos} />
                </div>
            </div>
        </div>
    )
}
