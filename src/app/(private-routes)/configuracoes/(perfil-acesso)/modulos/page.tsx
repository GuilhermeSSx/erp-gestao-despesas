import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Modulos Acesso',
};

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
}

export default function Modulos() {
    return <p>Modulos Acesso</p>;
}