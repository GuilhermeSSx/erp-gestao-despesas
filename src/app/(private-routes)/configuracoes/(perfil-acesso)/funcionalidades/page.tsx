import TableFuncionalidades from '@/app/components/tableFuncionalidades';
import { getFuncionalidadesAcesso, updateFuncionalidadesAcesso } from '@/app/lib/userActions';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Funcionalidades Acesso',
};

export default async function Funcionalidades( {searchParams}: {searchParams: {id: number} }) {

    const id_perfil_acesso = searchParams.id;

    const dataFuncionalidadesAcessos = await getFuncionalidadesAcesso(id_perfil_acesso);
    const funcionalidadesAcessos = dataFuncionalidadesAcessos.funcionalidades_acessos;  // Extraia apenas o array

    return (
        <div className="w-full flex md-web:min-h-[calc(100dvh-131px)] h-[calc(100dvh-131px)] justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md:w-[40%] md:min-w-[500px] mx-1 py-8">
                <TableFuncionalidades funcionalidades={funcionalidadesAcessos} onFuncionalidadesChange={updateFuncionalidadesAcesso} />
            </div>
        </div>

    )
}