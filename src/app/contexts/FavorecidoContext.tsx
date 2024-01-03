"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Favorecido {
    id: number;
    nome_favorecido: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    endereco?: string;
}

// Definindo a estrutura do contexto
interface FavorecidoContextType {
    selectedFavorecido: Favorecido | null;
    setSelectedFavorecido: (favorecido: Favorecido | null) => void;
}

// Criando o contexto com um valor padrão
export const FavorecidoContext = createContext<FavorecidoContextType | null>(null);

export const FavorecidoProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFavorecido, setSelectedFavorecido] = useState<Favorecido | null>(null);

    return (
        <FavorecidoContext.Provider value={{ selectedFavorecido, setSelectedFavorecido }}>
            {children}
        </FavorecidoContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useFavorecido = () => {
    const context = useContext(FavorecidoContext);
    if (!context) {
        throw new Error('useFavorecido deve ser usado dentro de um FavorecidoProvider');
    }
    return context;
};
