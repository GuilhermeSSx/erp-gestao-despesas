"use client"
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const VoltarButton = () => {
    const pathname = usePathname();
    
    // Obtenha o caminho atual a partir da localização da janela do navegador
    const rotaAtual = pathname;

    // console.log(rotaAtual)

    // Separa a rota por /
    const partesRota = rotaAtual.split('/');

    // Remove a última parte da rota para voltar
    partesRota.pop();

    // Recria a rota com as partes restantes
    const rotaVoltar = partesRota.join('/');

    return (
        <Link href={rotaVoltar} title="voltar">
            <div className='select-none absolute top-[13px] z-10 left-3 group flex justify-center items-center py-8 px-4 border border-transparent text-base rounded-md hover:bg-slate-200 text-slate-400'>
                <ArrowLeftIcon className="mr-4 h-7 w-5 text-center" aria-hidden="true" />
                <span className='hidden md:block'>Voltar</span>
            </div>
        </Link>
    )
}
