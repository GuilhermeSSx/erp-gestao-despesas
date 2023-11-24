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
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center rounded-lg bg-slate-50">
            <div className='flex w-full h-full justify-center'>
                <div className='w-full md:w-[32%] md:min-w-[490px] px-2'>
                    <h2 className="text-xl font-bold text-center mt-8">Selecione um Perfil de Acesso</h2>
                    <div className='mt-4 rounded-xl flex h-[calc(100vh-380px)]'>
                        <TablePerfisAcesso2 perfisAcessos={perfilAcessos} />
                    </div>
                    <CadastrarPerfilAcesso />
                </div>
            </div>
        </div>
    )
}