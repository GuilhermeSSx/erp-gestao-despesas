import { Metadata } from 'next';
import TableModulos2 from '@/app/components/tableModulos2';
import { getModulosAcesso, updateModulosAcesso } from '@/app/lib/actions';

export const metadata: Metadata = {
    title: 'Modulos Acesso',
};



export default async function Modulos( {searchParams}: {searchParams: {id: number}} ) {

    const id_perfil_acesso = searchParams.id;

    const dataModulosAcessos = await getModulosAcesso(id_perfil_acesso);
    const modulosAcessos = dataModulosAcessos.modulos_acessos;  // Extraia apenas o array

    return (
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableModulos2 modulos={modulosAcessos} onModulosChange={updateModulosAcesso} />
            </div>
        </div>
    )
}