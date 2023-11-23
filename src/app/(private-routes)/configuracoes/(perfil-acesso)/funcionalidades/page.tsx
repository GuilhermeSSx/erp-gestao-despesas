import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Funcionalidades Acesso',
};

interface Funcionalidade {
    id_funcionalidade: number;
    nome_funcionalidade: string;
    acesso: string;
}

export default function Funcionalidades() {
    return <p>Funcionalidades de Acesso</p>;
}