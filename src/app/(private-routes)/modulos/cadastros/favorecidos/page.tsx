import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import TableTiposFav from '@/app/components/tableTipos';
import { FavTipoProvider } from '@/app/contexts/FavTipoContext';
import TableFavorecidos from '@/app/components/TableFavorecidos';
import { Metadata } from 'next';
import CrudFavTipo from './crudFavTipo';
import CrudFav from './crudFav';
import { FavorecidoProvider } from '@/app/contexts/FavorecidoContext';

export const metadata: Metadata = {
    title: 'Gestão - Favorecidos',
};

interface Tipo {
    id: number;
    nome_tipo: string;
}

const tipoData: Tipo[] = [
    { id: 1, nome_tipo: 'CLIENTES' },
    { id: 2, nome_tipo: 'FORNECEDORES' },
    { id: 3, nome_tipo: 'FUNCIONÁRIOS' },
    { id: 4, nome_tipo: 'SÓCIOS' },
    { id: 5, nome_tipo: 'CONSULTORES' },
    { id: 6, nome_tipo: 'OUTROS' },
    // Mais objetos de categoria aqui...
];

interface Favorecido {
    id: number;
    nome_favorecido: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    endereco?: string;
}

const favorecidos: Favorecido[] = [
    {   
        id: 1,
        nome_favorecido: 'EMPRESA TAL',
        email: 'guilhermedosantos45@gmail.com', 
        telefone: '19999343689', 
        cnpj: '34653835000162', 
        endereco: 'DURVALINO 4535 - AVENIDA' 
    }
];


export default async function Favorecidos() {

    return (
        <div className="w-screen md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex md:flex-row flex-col bg-slate-50 ">
            <FavTipoProvider>
                <div className='md:ml-1 mt-5 md:w-[12%] md:min-w-[210px] w-full h-[96%] flex flex-col bg-gradient-to-bl from-[#86868600] via-[#eb090900] to-[#afafaf31] rounded-xl'>
                    <Link href={'/modulos/cadastros'} title="voltar">
                        <div className='group flex justify-evenly items-center py-2 md:px-4 mx-2 border border-transparent text-base rounded-md hover:bg-slate-200 text-slate-400'>
                            <ArrowLeftIcon className=" h-7 w-5 text-center" aria-hidden="true" />
                            <span className='hidden md:block'>Voltar</span>
                        </div>
                    </Link>

                    {/* Cadastro Tipo */}
                    <div className='pb-1 mt-2 w-full h-full flex flex-col px-2 rounded-lg'>

                        <TableTiposFav tiposFavs={tipoData} />
                        <CrudFavTipo />

                    </div>
                </div>

                {/* Cadastro Favorecido */}
                <div className='mt-3 w-full h-[96%] flex flex-col px-[10px] bg-gradient-to-bl from-[#86868600] via-[#eb090900] to-[#0a8ffc10] rounded-xl'>
                    <FavorecidoProvider>
                        <CrudFav />
                        <TableFavorecidos favorecidos={favorecidos} />
                    </FavorecidoProvider>
                </div>
            </FavTipoProvider>
        </div >
    )
}
