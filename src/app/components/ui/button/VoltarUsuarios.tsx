"use client"
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

export const VoltarUsuarios = () => {

    return (
        <button className='z-10' onClick={() => window.location.href = "/dashboard"} title="voltar">
            <div className='absolute left-0 md:top-16 top-[74px] group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-400 md:hover:bg-slate-200 md:text-slate-400 text-black-400'>
                <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                <span className='hidden md:block'>Voltar</span>
            </div>
        </button>
    )
}
