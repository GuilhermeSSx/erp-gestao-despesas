import TablePerfisAcesso from '@/app/components/tablePerfisAcesso';
import { getPerfilAcessos } from '@/app/lib/userActions';
import { Metadata } from 'next';
import CadastrarPerfilAcesso from './cadastrarPerfilAcesso';

export const metadata: Metadata = {
    title: 'Perfil de Acesso',
};

export default async function PerfilDeAcesso() {

    const dataPerfilAcessos = await getPerfilAcessos();
    const perfilAcessos = dataPerfilAcessos.perfil_acessos;  // Extraia apenas o array

    return (
        <div className="flex md-web:min-h-[calc(100dvh-131px)] h-[calc(100dvh-131px)] flex-col justify-center items-center">
            <div className='flex flex-col w-full h-full md:w-[32%] bg-slate-50 md:min-w-[500px] p-2 md:px-2 rounded-lg md:my-2'>
                <h2 className="text-sm font-bold text-center mt-2 select-none">Selecione um Perfil de Acesso</h2>
                <TablePerfisAcesso perfisAcessos={perfilAcessos} />
                <CadastrarPerfilAcesso />
            </div>
        </div>
    )
}