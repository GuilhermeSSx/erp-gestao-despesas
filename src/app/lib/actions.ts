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

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
    id_modulo_acesso?: number;
}

interface Funcionalidade {
    id_funcionalidade: number;
    nome_funcionalidade: string;
    acesso: string;
    id_funcionalidade_acesso?: number;
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

export const excluirUsuario = async (id: number) => {
    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/user/delete-user/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            revalidatePath('/configuracoes/usuarios');
        } else {
            throw new Error('Erro em deletar usuario');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
};

export const excluirPerfilAcesso = async (id_perfil_acesso: number) => {

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
            throw new Error('Erro em deletar perfil de acesso.');
        }

    } catch (error) {
        console.error('Erro:', error);

        // Handle error if necessary
    }

};

export async function getUsuarios(): Promise<{ usuarios: Usuario[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/user/get-users`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getUsuariosFiltrados(search: string): Promise<{ usuarios_filtrados: Usuario[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/user/get-usuario-filtrado`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify({ search }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const criarUsuario = async (name: string, email: string, password: string, role: string) => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/user/sign-up`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),

        });

        if (response.status === 200) {
            revalidatePath('/configuracoes/usuarios');
        } else if(response.status === 400) {
            throw new Error('Ja existe um usuario com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const criarPerfilAcesso = async (nome_perfil_acesso: string) => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/user/criar-perfil-acesso`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome_perfil_acesso }),

        });

        if (response.status === 200) {
            revalidatePath('/configuracoes/perfis-acessos');
        } else if(response.status === 400) {
            throw new Error('Ja existe um perfil de acesso com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};



export const getModulosAcesso = async (id_perfil_acesso: number) => {

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
            throw new Error('Não foi encontrado o id de modulos.');
        }

        return response.json();

    } catch (error) {
        console.error('Erro:', error);
        throw error;
        // Handle error if necessary
    }

};

export const getFuncionalidadesAcesso = async (id_perfil_acesso: number) => {

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
            throw new Error('Não foi encontrado o id de funcionalidades.');
        }

        return response.json();

    } catch (error) {
        console.error('Erro:', error);
        throw error;
        // Handle error if necessary
    }

};

export const updateModulosAcesso = async (modulos: Modulo[]) => {
    try {
        const idModuloAcessoList = modulos.map((modulo) => modulo.id_modulo_acesso).join(',');
        const acessoList = modulos.map((modulo) => modulo.acesso).join(',');

        const response = await fetch(`${process.env.API_ENDPOINT}/user/update-acesso-modulo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID_MODULO_ACESSO_LIST: idModuloAcessoList,
                ACESSO_LIST: acessoList,
            }),
        });

        if (response.ok) {
            revalidatePath('/configuracoes/modulos');
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Erro ao atualizar os acessos:', error);
    }
};

export const updateFuncionalidadesAcesso = async (funcionalidades: Funcionalidade[]) => {
    try {

        const idFuncionalidadeAcessoList = funcionalidades.map((funcionalidade) => funcionalidade.id_funcionalidade_acesso).join(',');
        const acessoList = funcionalidades.map((funcionalidade) => funcionalidade.acesso).join(',');

        const response = await fetch(`${process.env.API_ENDPOINT}/user/update-acesso-funcionalidade`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID_FUNCIONALIDADE_ACESSO_LIST: idFuncionalidadeAcessoList,
                ACESSO_LIST: acessoList,
            }),
        });

        if (response.ok) {
            revalidatePath('/configuracoes/funcionalidades');
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Erro ao atualizar os acessos:', error);
    }
};

export const carregarSelecaoPerfilAcesso = async () => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/user/get-perfil-acessos`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            // console.log(data);
            return data.perfil_acessos;

        }

    } catch (error) {
        console.error('Erro:', error);
    }
};



