"use client";
import React, { useState, useLayoutEffect, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const usuarioParams = useSearchParams();
    const id_perfil_acesso = usuarioParams.get('id');
    const tab = usuarioParams.get('tab'); // Lendo o parâmetro 'tab'

    const buttonVariants = {
        initial: { borderBottom: '2px solid transparent' },
        animate: { borderBottom: '2px solid blue' },
    };

    const isPerfilAcessoAvailable = !!id_perfil_acesso;

    useLayoutEffect(() => {
        // Definindo o valor com base no parâmetro 'tab' da URL
        switch (tab) {
            case 'perfil-acesso':
                setValue(0);
                break;
            case 'modulos':
                setValue(1);
                break;
            case 'funcionalidades':
                setValue(2);
                break;
            default:
                setValue(0); // Caso padrão
                break;
        }
    }, [tab]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Detecta se Shift e Tab estão sendo pressionados simultaneamente
            if (event.shiftKey && event.key === 'Tab') {
                // Impede a ação padrão do navegador
                event.preventDefault();
            }
        };

        // Adiciona o evento ao documento
        document.addEventListener('keydown', handleKeyDown);

        // Limpa o evento ao desmontar o componente
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div className='border-b border-gray-300 flex w-full justify-center box-content md:text-sm text-[10px] font-extrabold select-none mt-4'>
            <Link className='h-fit' draggable={false} href={{ pathname: "/configuracoes/perfil-acesso", query: { id: id_perfil_acesso, tab: 'perfil-acesso' } }}>
                <motion.button
                    onClick={() => setValue(0)}
                    className={`select-none tab-button p-4 hover:bg-slate-100 ${value === 0 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 0 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                >
                    PERFIL DE ACESSO
                </motion.button>
            </Link>
            <Link className='h-fit' draggable={false} href={{ pathname: "/configuracoes/modulos", query: { id: id_perfil_acesso, tab: 'modulos' } }}>
                <motion.button
                    onSelect={() => setValue(1)}
                    onClick={() => isPerfilAcessoAvailable && setValue(1)}
                    className={`select-none tab-button p-4 hover:bg-slate-100 ${!isPerfilAcessoAvailable ? ' cursor-not-allowed text-gray-400' : ''} ${value === 1 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 1 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                    disabled={!isPerfilAcessoAvailable}
                >
                    MODULOS
                </motion.button>
            </Link>
            <Link className='h-fit' draggable={false} href={{ pathname: "/configuracoes/funcionalidades", query: { id: id_perfil_acesso, tab: 'funcionalidades' } }}>
                <motion.button
                    onClick={() => isPerfilAcessoAvailable && setValue(2)}
                    className={`select-none tab-button p-4 hover:bg-slate-100 ${!isPerfilAcessoAvailable ? ' cursor-not-allowed text-gray-400' : ''} ${value === 2 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 2 ? 'animate' : 'initial'}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                    disabled={!isPerfilAcessoAvailable}
                >
                    FUNCIONALIDADES
                </motion.button>
            </Link>
        </div>
    );
}
