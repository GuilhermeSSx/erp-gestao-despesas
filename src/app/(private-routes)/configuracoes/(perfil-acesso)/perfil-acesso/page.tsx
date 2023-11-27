import TablePerfisAcesso2 from '@/app/components/tablePerfisAcesso2';
import { getPerfilAcessos } from '@/app/lib/actions';
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
                <h2 className="text-md font-bold text-center mt-2">Selecione um Perfil de Acesso</h2>
                <TablePerfisAcesso2 perfisAcessos={perfilAcessos} />
                <CadastrarPerfilAcesso />
            </div>
        </div>
    )
}