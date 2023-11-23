import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

function DrawerOpenClose() {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('click', handleClick);
        }

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isOpen]);

    const toggleDrawer = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const linkClassName = (href: string) =>
        clsx(
            'font-semibold flex w-full items-center rounded-md p-4 text-sm hover:bg-slate-200',
            { 'bg-selecaoLinha': pathname.startsWith(href) }
        );

    return (
        <>
            <button onClick={toggleDrawer} className="flex w-fit h-fit justify-center items-center p-2 ml-2 mr-4 rounded-md hover:bg-white hover:bg-opacity-20">
                <Bars3Icon
                    className="h-7 w-7 text-violet-200 hover:text-[#CE466F]"
                    aria-hidden="true"
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-30"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -300 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            className='fixed bg-white shadow-2xl h-full w-full max-w-[250px] min-w-[200px] flex top-0 left-0'
                            ref={drawerRef}
                        >
                            <div className='flex flex-col w-full divide-y-4'>
                                <div className='flex justify-between px-4  items-center'>
                                    <h1 className='my-8 font-extrabold text-center text-black '>Menu lateral</h1>
                                    <button onClick={toggleDrawer} className="z-50 h-fit flex items-center justify-between">
                                        <Bars3Icon
                                            className="h-8 w-8 text-black hover:text-[#CE466F]"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                <Menu as="div" className="relative p-3 bg-[#6964643d]">
                                    <Menu.Button className="relative z-24 inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
                                        <span className="md-web:flex text-black font-bold text-base">Módulos</span>
                                        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-black hover:text-[#CE466F]" aria-hidden="true" />
                                    </Menu.Button>

                                    <Menu.Items className="right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item as="div">
                                            <Link
                                                onClick={toggleDrawer}
                                                className={linkClassName("/modulos/cadastros")}
                                                href="/modulos/cadastros"
                                            >
                                                Cadastros
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item as="div" >
                                            <Link
                                                onClick={toggleDrawer}
                                                className={linkClassName("/modulos/lancamentos")} 
                                                href="/modulos/lancamentos"
                                            >
                                                Lançamentos
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>

                                <Menu as="div" className="relative p-3 bg-[#6964643d]">
                                    <Menu.Button className="relative z-24 inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
                                        <span className="md-web:flex text-black font-bold text-base">Configurações</span>
                                        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-black hover:text-[#CE466F]" aria-hidden="true" />
                                    </Menu.Button>

                                    <Menu.Items className="right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item as="div">
                                            <Link
                                                onClick={toggleDrawer}
                                                className={linkClassName("/configuracoes/usuarios")}
                                                href="/configuracoes/usuarios"
                                            >
                                                Usuários
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item as="div" >
                                            <Link
                                                onClick={toggleDrawer}
                                                className={linkClassName("/configuracoes/perfil-acesso")}
                                                href="/configuracoes/perfil-acesso"
                                            >
                                                Perfil de Acesso
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default DrawerOpenClose;
