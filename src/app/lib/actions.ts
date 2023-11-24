'use server';

import { revalidatePath } from 'next/cache';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PerfilAcesso {
    id_perfil_acesso: number;
    nome_perfil_acesso: string;
}


export async function getPerfilAcessos(): Promise<{ perfil_acessos: PerfilAcesso[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/user/get-perfil-acessos`, {
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
        
        const response = await fetch(`${process.env.API_ENDPOINT}/user/excluir-perfil-acesso`, {
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
        
        const response = await fetch(`${process.env.API_ENDPOINT}/user/criar-perfil-acesso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome_perfil_acesso }),

            
        });
        
        if (response.ok) {
            revalidatePath('/configuracoes/perfis-acessos');            
        } else {
            const errorBody = await response.json(); // Supondo que o corpo da resposta contém detalhes do erro
            console.log(errorBody);
            throw new Error('Erro contate o administrador.');
        }

    } catch (error) {
        console.error('Erro:', error);
        throw error;
        // Handle error if necessary
    }

};

export async function getUsuarios(): Promise<{ usuarios: Usuario[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/user/get-users`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

