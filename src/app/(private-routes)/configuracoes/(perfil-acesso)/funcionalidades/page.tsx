"use client";
import TableFuncionalidades from '@/app/components/tableFuncionalidades';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//     title: 'Funcionalidades Acesso',
// };

interface Funcionalidade {
    id_funcionalidade: number;
    nome_funcionalidade: string;
    acesso: string;
}

export default function Funcionalidades() {

    const usuarioParams = useSearchParams();
    const id_perfil_acesso = usuarioParams.get('id');

    const [funcionalidadesAcessoData, setFuncionalidadesAcessoData] = useState<Funcionalidade[]>([]);

    const getAcessos = async () => {
        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_perfil_acesso: id_perfil_acesso })
            });

            if (response.ok) {
                const data = await response.json();
                setFuncionalidadesAcessoData(data.funcionalidades_acessos);
            } else {
                throw new Error('Erro em carregar o perfil de acesso!');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        getAcessos();
    }, [id_perfil_acesso]);

    const handleFuncionalidadeSelected = (funcionalidade: Funcionalidade[]) => {
        setFuncionalidadesAcessoData(funcionalidade);
    };

    return (
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableFuncionalidades funcionalidades={funcionalidadesAcessoData} onFuncionalidadeSelected={handleFuncionalidadeSelected} />
            </div>
        </div>

    )
}