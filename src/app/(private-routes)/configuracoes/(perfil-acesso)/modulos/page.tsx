import { Metadata } from 'next';
import TableModulos2 from '@/app/components/tableModulos2';

export const metadata: Metadata = {
    title: 'Modulos Acesso',
};

const getModulosAcesso = async (id_perfil_acesso: number) => {

    try {

        const response = await fetch(`${process.env.API_ENDPOINT}/user/get-perfil-acesso`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_perfil_acesso: id_perfil_acesso }),

        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return response.json();

    } catch (error) {
        console.error('Erro:', error);
        throw error;
        // Handle error if necessary
    }

};



export default async function Modulos( {searchParams}: {searchParams: {id: number}} ) {

    const id_perfil_acesso = searchParams.id;

    const dataModulosAcessos = await getModulosAcesso(id_perfil_acesso);
    const modulosAcessos = dataModulosAcessos.modulos_acessos;  // Extraia apenas o array

    return (
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableModulos2 modulos={modulosAcessos} />
            </div>
        </div>
    )
}