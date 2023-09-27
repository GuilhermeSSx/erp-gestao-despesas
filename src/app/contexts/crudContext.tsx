"use client"
import { createContext, useContext } from "react";
import api from '../api';

export const CrudContext = createContext({} as any);

export const CrudStore = ({ children }: any) => {




    const teste = () => {
        // Faça algo com o token da sessão, por exemplo:
        
    }

    return (
        <CrudContext.Provider value={{
            teste
        }}>
            {children}
        </CrudContext.Provider>
    )
}
