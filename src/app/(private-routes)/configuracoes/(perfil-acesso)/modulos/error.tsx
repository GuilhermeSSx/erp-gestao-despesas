'use client';
import Link from 'next/link';

export default function Error() {

    return (
        <main className="flex md-web:min-h-[calc(100dvh-131px)] h-[calc(100dvh-131px)] flex-col items-center justify-center pb-[6px]">
            <h2 className="text-center">Não é possivel realizar essa ação sem um ID valido, volte e tente novamente.</h2>
            <Link
                href="/configuracoes/perfil-acesso"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >
                Voltar para seleção de Perfil de Acesso
            </Link>
        </main>
    );
}