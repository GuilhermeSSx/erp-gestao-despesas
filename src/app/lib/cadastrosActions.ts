'use server';

import { revalidatePath } from 'next/cache';

interface CentroCusto {
    id_centro_custo: number;
    nome_centro_custo: string;
}

interface Saida {
    id_class_saida: number;
    nome_class_saida: string;
}

export const criarCentroCusto = async (nome_centro_custo: string) => {
    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/centro-custo`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome_centro_custo }),

        });

        

        if (response.status === 200) {
            revalidatePath('/modulos/cadastros/centroDeCusto');
        } else if(response.status === 400) {
            throw new Error('Ja existe um centro de custo com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export async function getCentroCustos(): Promise<{ centro_custo: CentroCusto[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/cadastros/get-centros-custos`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const updateCentroCusto = async (id_centro_custo: number, nome_centro_custo: string) => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/update-centro-custo`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_centro_custo, nome_centro_custo }),

        });


        if (response.status === 200) {
            revalidatePath('/modulos/cadastros/centroDeCusto');
        } else if(response.status === 400) {
            throw new Error('Ja existe um centro de custo com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const excluirCentroCusto = async (id_centro_custo: number) => {
    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/excluir-centro-custo/${id_centro_custo}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            revalidatePath('/modulos/cadastros/centroDeCusto');
        } else {
            throw new Error('Erro em deletar centro de custo');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
};

///-----------------------------------------------------------------


export const criarClassSaida = async (nome_class_saida: string) => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/class-saida`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome_class_saida }),

        });

        if (response.status === 200) {
            revalidatePath('/modulos/cadastros/saidas');
        } else if(response.status === 400) {
            throw new Error('Ja existe uma classificacao de saida com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export async function getClassSaida(): Promise<{ class_saida: Saida[] }> {
    // Configurando fetch para não armazenar cache
    const res = await fetch(`${process.env.API_ENDPOINT}/cadastros/get-class-saida`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const updateClassSaida = async (id_class_saida: number, nome_class_saida: string) => {

    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/update-class-saida`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_class_saida, nome_class_saida }),

        });


        if (response.status === 200) {
            revalidatePath('/modulos/cadastros/saidas');
        } else if(response.status === 400) {
            throw new Error('Ja existe uma classificacao de saida com este nome.');
        } else {
            throw new Error('Contate o administrador do sistema.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

};




export const excluirClassSaida = async (id_class_saida: number) => {
    try {
        const response = await fetch(`${process.env.API_ENDPOINT}/cadastros/excluir-class-saida/${id_class_saida}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            revalidatePath('/modulos/cadastros/saidas');
        } else {
            throw new Error('Erro em deletar classificação de saida.');
        }

    } catch (error) {
        console.error('Erro:', error);
    }
};