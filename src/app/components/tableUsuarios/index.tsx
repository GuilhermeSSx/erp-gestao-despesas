"use client";
import React, { useState, useEffect, useCallback } from 'react';

import { useUsuario } from '@/app/contexts/UsuarioContext';
import { updateUsuarioRoleId } from '@/app/lib/actions';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role_id: string;
}

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}

interface TableUsuariosProps {
    usuarios: Usuario[];
    perfil_acessos: PerfilAcesso[];
}

const TableUsuarios: React.FC<TableUsuariosProps> = React.memo(({ usuarios, perfil_acessos }) => {

    const { setSelectedUsuario } = useUsuario();

    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const handleRowClick = useCallback((usuario: Usuario, index: number) => {
        setSelectedItemIndex(index);
        setSelectedUsuario(usuario);
        //console.log('Row clicked:', usuario);
    }, []);

    const [selectedPerfisAcesso, setSelectedPerfisAcesso] = useState<string[]>([]);

    const handleSelectChange = (index: number, newRoleId: string) => {
        const updatedSelectedPerfisAcesso = [...selectedPerfisAcesso];
        updatedSelectedPerfisAcesso[index] = newRoleId;
        setSelectedPerfisAcesso(updatedSelectedPerfisAcesso); // Atualize o estado
        // console.log(usuarios[index].id, newRoleId);
        updateUsuarioRoleId(usuarios[index].id, newRoleId);
    };

    useEffect(() => {
        // Inicialize o estado selectedPerfisAcesso com os perfis de acesso atuais dos usuários

        setSelectedPerfisAcesso(usuarios.map((usuario) => usuario.role_id));
        // console.log(selectedPerfisAcesso);
    }, [usuarios]);

    return (
        <div className='rounded-lg h-full w-[100%] overflow-y-scroll mt-2 bg-white'>
            <table className="w-full h-fit select-none">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                    <tr className='divide-x divide-gray-300'>
                        <th className="p-3 text-xs font-bold tracking-wide text-left">Usuário</th>
                        <th className="p-3 text-xs font-bold tracking-wide text-left">Perfil de Acesso</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-blue-100">
                    {usuarios.map((usuario, index) => (
                        <tr
                            key={usuario.id}
                            className={` hover:bg-slate-300 cursor-pointer ${selectedItemIndex === index ? 'bg-selecaoLinha' : 'bg-white'}`}
                            onClick={() => handleRowClick(usuario, index)}
                        >
                            <td className="w-full p-2 px-4 text-gray-700 whitespace-nowrap">
                                <div>
                                    <h1 className='font-bold text-sm'>{usuario.name}</h1>
                                </div>
                                <div>
                                    <h2 className='font-semibold text-gray-500 text-xs'>{usuario.email}</h2>
                                </div>

                            </td>
                            <td className='flex items-center justify-center text-gray-700 md-web:w-48 w-[132px]'>
                                <div className="flex justify-center items-center w-full p-2 border-l border-blue-500">
                                    <select
                                        name='select-perfil'
                                        className='w-full p-2 text-xs md:text-sm flex items-center'
                                        value={usuario.role_id}  // Use o valor do estado local
                                        onChange={(e) => handleSelectChange(index, e.target.value)}
                                    >
                                        {perfil_acessos.map((perfil_acesso) => (
                                            <option
                                                key={perfil_acesso.id_perfil_acesso}
                                                value={perfil_acesso.id_perfil_acesso}
                                            >
                                                {perfil_acesso.nome_perfil_acesso}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default TableUsuarios;
