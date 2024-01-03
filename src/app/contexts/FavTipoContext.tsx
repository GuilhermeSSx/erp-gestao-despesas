"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FavTipo {
    id: number;
    nome_tipo: string;
}

// Definindo a estrutura do contexto
interface FavTipoContextType {
    selectedFavTipo: FavTipo | null;
    setSelectedFavTipo: (favTipo: FavTipo | null) => void;
}

// Criando o contexto com um valor padrão
export const FavTipoContext = createContext<FavTipoContextType | null>(null);

export const FavTipoProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFavTipo, setSelectedFavTipo] = useState<FavTipo | null>(null);

    return (
        <FavTipoContext.Provider value={{ selectedFavTipo, setSelectedFavTipo }}>
            {children}
        </FavTipoContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useFavTipo = () => {
    const context = useContext(FavTipoContext);
    if (!context) {
        throw new Error('useFavTipo deve ser usado dentro de um FavTipoProvider');
    }
    return context;
};
