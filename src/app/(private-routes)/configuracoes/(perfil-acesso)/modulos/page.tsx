"use client";
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';
import TableModulos from '@/app/components/tableModulos';

// export const metadata: Metadata = {
//     title: 'Modulos Acesso',
// };

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
}

export default function Modulos() {

    const usuarioParams = useSearchParams();
    const id_perfil_acesso = usuarioParams.get('id');

    const [modulosAcessoData, setModulosAcessoData] = useState<Modulo[]>([]);

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
                setModulosAcessoData(data.modulos_acessos);
            } else {
                throw new Error('Erro em carregar o perfil de acesso!');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        getAcessos();
    }, []);

    const handleModuloSelected = (modulos: Modulo[]) => {
        setModulosAcessoData(modulos); // Atualize o estado modulosAcessoData com os módulos selecionados
    };

    return (
        <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
            <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                <TableModulos modulos={modulosAcessoData} onModuloSelected={handleModuloSelected} />
            </div>
        </div>
    )
}