import 'next-auth';

declare module 'next-auth' {
    export interface User {
        id: string;
        name: string;
        role_id: number;
        token: string;
    }

    export interface Session {
        user: User;
    }
}