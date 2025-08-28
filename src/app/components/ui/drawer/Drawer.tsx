import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from "next-auth/react";

// Variants para a animação do backdrop (fundo escuro)
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

// Variants para a animação do painel do drawer
const drawerVariants = {
  visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 150 } },
  hidden: { x: '-100%', transition: { type: "spring", damping: 20, stiffness: 120 } },
} as const;

// Estrutura de dados para os links do menu, facilitando a manutenção
const modulosLinks = [
  { href: '/dashboard/cadastros', label: 'Cadastros' },
  { href: '/dashboard/lancamentos', label: 'Lançamentos' },
];

const configuracoesLinks = [
  { href: '/configuracoes/usuarios', label: 'Usuários' },
  { href: '/configuracoes/perfil-acesso', label: 'Perfil de Acesso' },
];

function Drawer() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeDrawer = () => setIsOpen(false);
  const openDrawer = () => setIsOpen(true);

  const linkClassName = (href: string) =>
    clsx(
      'font-semibold flex w-full items-center rounded-md p-4 text-sm hover:bg-slate-200',
      { 'bg-selecaoLinha': pathname.startsWith(href) }
    );

  const renderMenuItems = (links: typeof modulosLinks) => (
    links.map((link) => (
      <Menu.Item key={link.href} as="div">
        <Link
          href={link.href}
          className={linkClassName(link.href)}
          onClick={closeDrawer} // Fecha o drawer ao navegar
          draggable={false}
        >
          {link.label}
        </Link>
      </Menu.Item>
    ))
  );

  return (
    <>
      {/* Botão para abrir o Drawer */}
      <button
        onClick={openDrawer}
        className="flex w-fit h-fit justify-center items-center p-2 ml-2 mr-4 rounded-md hover:bg-white hover:bg-opacity-20"
        aria-label="Abrir menu"
      >
        <Bars3Icon className="h-7 w-7 text-violet-200 hover:text-[#CE466F]" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (Fundo escurecido) */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={closeDrawer}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
            />

            {/* Painel do Drawer */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 left-0 bg-white shadow-2xl h-full w-full max-w-[210px] min-w-[200px] z-50"
            >
              <div className='flex flex-col w-full divide-y-4'>
                <div className='flex justify-between px-4 items-center'>
                  <h1 className='my-8 font-extrabold text-black'>Menu lateral</h1>
                  <button onClick={closeDrawer} aria-label="Fechar menu">
                    <Bars3Icon className="h-8 w-8 text-black hover:text-[#CE466F]" aria-hidden="true" />
                  </button>
                </div>

                {/* Seção Módulos */}
                <Menu as="div" className="relative p-3 bg-[#6964643d]">
                  <Menu.Button className="relative inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-black hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
                    <span className="font-bold text-responsive">Módulos</span>
                    <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {renderMenuItems(modulosLinks)}
                  </Menu.Items>
                </Menu>

                {/* Seção Configurações (Condicional) */}
                {session?.user?.role_id === 1 && (
                  <Menu as="div" className="relative p-3 bg-[#6964643d]">
                    <Menu.Button className="relative inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-black hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
                      <span className="font-bold text-responsive">Configurações</span>
                      <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="text-responsive right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {renderMenuItems(configuracoesLinks)}
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Drawer;