"use client"
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

export const VoltarPerfilAcesso = () => {

    function pushModulos() {
        window.location.href = "/modulos";
    }

    return (
        <button className='z-20 h-fit bg-red-500' onClick={pushModulos} title="voltar">
            <div className='absolute left-0 top-[66px] md:top-[68px] group flex items-center py-3 md:px-4 px-2 md:mx-3 ml-1 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                <span className='hidden md:block'>Voltar</span>
            </div>
        </button>
    )
}
