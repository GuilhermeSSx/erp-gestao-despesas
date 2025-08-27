import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';

import TableFavorecidos from '@/app/components/ui/table/Favorecidos';
import { Metadata } from 'next';
import CrudFav from './crudFav';
import { FavorecidoProvider } from '@/app/contexts/FavorecidoContext';

export const metadata: Metadata = {
    title: 'Gestão - Favorecidos',
};

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
        <div className="w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex md:flex-row flex-col bg-slate-50 ">

            {/* Cadastro Favorecido */}
            <div className='mt-3 w-full h-[96%] flex flex-col px-[10px] bg-gradient-to-bl from-[#86868600] via-[#eb090900] to-[#0a8ffc10] rounded-xl'>
                <FavorecidoProvider>
                    <CrudFav />
                    <TableFavorecidos favorecidos={favorecidos} />
                </FavorecidoProvider>
            </div>

        </div >
    )
}
