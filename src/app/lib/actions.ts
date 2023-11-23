'use server';

import { revalidatePath } from 'next/cache';

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}


export async function getPerfilAcessos(): Promise<{ perfil_acessos: PerfilAcesso[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acessos', {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return { perfil_acessos: data.perfil_acessos };
}

export const excluirPerfilAcesso = async (id_perfil_acesso: number ) => {

    try {
        
        const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/excluir-perfil-acesso', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_perfil_acesso }),

            
        });
        
        if (response.ok) {
            revalidatePath('/configuracoes/perfis-acessos');            
        } else {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error('Erro:', error);

        // Handle error if necessary
    }

};

export const criarPerfilAcesso = async (nome_perfil_acesso: string ) => {

    try {
        
        const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/criar-perfil-acesso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome_perfil_acesso }),

            
        });
        
        if (response.ok) {
            revalidatePath('/configuracoes/perfis-acessos');            
        } else {
            throw new Error('Failed to fetch data');
        }

    } catch (error) {
        console.error('Erro:', error);

        // Handle error if necessary
    }

};
