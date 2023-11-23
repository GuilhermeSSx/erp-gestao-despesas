"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';


export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const usuarioParams = useSearchParams();
    const id_perfil_acesso = usuarioParams.get('id');

    const buttonVariants = {
        initial: { borderBottom: '2px solid transparent' },
        animate: { borderBottom: '2px solid blue' },
    };

    // Disable buttons for tabs 1 and 2 when id_perfil_acesso is not available
    const isPerfilAcessoAvailable = !!id_perfil_acesso;


    return (
        <div className='border-b border-gray-300 flex w-full justify-center box-content md-web:text-sm text-[10px] font-extrabold select-none'>
            <Link href="/configuracoes/perfil-acesso">
                <motion.button
                    onClick={() => setValue(0)}
                    className={`tab-button p-4 hover:bg-slate-100 ${value === 0 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 0 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                >
                    Perfil de Acesso
                </motion.button>
            </Link>
            <Link href="/configuracoes/modulos">
                <motion.button
                    onClick={() => isPerfilAcessoAvailable && setValue(1)}
                    className={`tab-button p-4 ${!isPerfilAcessoAvailable ? ' cursor-not-allowed text-gray-400' : ''} ${value === 1 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 1 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                    disabled={!isPerfilAcessoAvailable}
                >
                    Modulos
                </motion.button>
            </Link>
            <Link href="/configuracoes/funcionalidades">
                <motion.button
                    onClick={() => isPerfilAcessoAvailable && setValue(2)}
                    className={`tab-button p-4 ${!isPerfilAcessoAvailable ? ' cursor-not-allowed text-gray-400' : ''} ${value === 2 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 2 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                    disabled={!isPerfilAcessoAvailable}
                >
                    Funcionalidades
                </motion.button>
            </Link>



        </div>
    )
}