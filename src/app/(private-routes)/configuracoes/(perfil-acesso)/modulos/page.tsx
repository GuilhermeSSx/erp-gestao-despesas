import { Metadata } from 'next';
import { getModulosAcesso, updateModulosAcesso } from '@/app/lib/actions';
import TableModulos from '@/app/components/tableModulos';

export const metadata: Metadata = {
    title: 'Modulos Acesso',
};

export default async function Modulos( {searchParams}: {searchParams: {id: number}} ) {

    const id_perfil_acesso = searchParams.id;

    const dataModulosAcessos = await getModulosAcesso(id_perfil_acesso);
    const modulosAcessos = dataModulosAcessos.modulos_acessos;  // Extraia apenas o array

    return (
        <div className="w-full flex md-web:min-h-[calc(100dvh-131px)] h-[calc(100dvh-131px)] justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableModulos modulos={modulosAcessos} onModulosChange={updateModulosAcesso} />
            </div>
        </div>
    )
}