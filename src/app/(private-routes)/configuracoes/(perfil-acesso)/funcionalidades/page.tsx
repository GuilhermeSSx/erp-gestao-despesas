import TableFuncionalidades2 from '@/app/components/tableFuncionalidades2';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Funcionalidades Acesso',
};

const getFuncionalidadesAcesso = async (id_perfil_acesso: number) => {

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