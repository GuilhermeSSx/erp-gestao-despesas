import TableFuncionalidades2 from '@/app/components/tableFuncionalidades2';
import { getFuncionalidadesAcesso } from '@/app/lib/actions';

import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Funcionalidades Acesso',
};

export default async function Funcionalidades( {searchParams}: {searchParams: {id: number} }) {

    const id_perfil_acesso = searchParams.id;

    const dataFuncionalidadesAcessos = await getFuncionalidadesAcesso(id_perfil_acesso);
    const funcionalidadesAcessos = dataFuncionalidadesAcessos.funcionalidades_acessos;  // Extraia apenas o array

    return (
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableFuncionalidades2 funcionalidades={funcionalidadesAcessos} />
            </div>
        </div>

    )
}