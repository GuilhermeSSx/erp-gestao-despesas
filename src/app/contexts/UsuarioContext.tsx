"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role_id: string;
}

// Definindo a estrutura do contexto
interface UsuarioContextType {
    selectedUsuario: Usuario | null;
    setSelectedUsuario: (usuario: Usuario | null) => void;
}

// Criando o contexto com um valor padrão
export const UsuarioContext = createContext<UsuarioContextType | null>(null);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

    return (
        <UsuarioContext.Provider value={{ selectedUsuario, setSelectedUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
    }
    return context;
};
