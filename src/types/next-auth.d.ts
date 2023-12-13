import 'next-auth';

declare module 'next-auth' {
    export interface User {
        id: string;
        name: string;
        role_id: number;
        token: string;
        m_f_acessos: {
            id_modulo: number;
            modulo_acesso: string;
            id_funcionalidade: number;
            funcionalidade_acesso: string;
        }
    }

    export interface Session {
        user: User;
    }
}