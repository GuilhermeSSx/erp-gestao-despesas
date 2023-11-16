import Link from "next/link";
import { ButtonRemover } from "./button";

// Em app/page.tsx
interface Perfil {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}

async function getData(): Promise<{ perfil_acessos: Perfil[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acessos', {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }


    return res.json();
}

export default async function Page() {
    const data = await getData();
    const perfis = data.perfil_acessos;

    console.log(perfis);

    return (
        <div className="rounded-lg border h-full w-[100%] overflow-y-scroll mt-2 bg-white">
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className="divide-x divide-gray-300">
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Nome do Perfil</th>
                        <th className="p-3 text-sm font-bold tracking-wide text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-blue-100">
                    {perfis.map((perfil: Perfil) => (
                        <tr key={perfil.id_perfil_acesso}>
                            <td className='w-[50%] p-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap'>
                                <div>
                                    <h2 className='font-semibold text-gray-500'>{perfil.nome_perfil_acesso}</h2>
                                </div>
                            </td>

                            <td className='text-sm text-gray-700 whitespace-nowrap h-[46px] px-1 justify-evenly items-center select-none'>
                                <div className='flex justify-evenly items-center'>
                                    <Link
                                        href={{
                                            pathname: "/usuarios/perfil-acesso",
                                            query: {
                                                id: perfil.id_perfil_acesso,
                                            },
                                        }}
                                        className={`w-[50%] h-[38px] flex items-center justify-center border border-transparent
                                        text-sm rounded-md ${perfil.id_perfil_acesso ? 'bg-green-400' : 'bg-blue-400'} hover:bg-blue-300`}
                                    >
                                        {perfil.id_perfil_acesso ? 'Selecionado' : 'Selecionar'}
                                    </Link>
                                    <ButtonRemover
                                        id_perfil_acesso={perfil.id_perfil_acesso}
                                        nome_perfil_acesso={perfil.nome_perfil_acesso}
                                    />
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


