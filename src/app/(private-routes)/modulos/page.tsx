"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  nome: string;
  rota: string;
}

const modulos: Option[] = [
  { nome: 'Cadastro', rota: 'cadastros' },
  { nome: 'Lançamentos', rota: 'lancamentos' },
  { nome: 'Buscar CAR por LAT/LONG', rota: 'buscarLatLong' },
  // Adicione mais opções conforme necessário
];

const Modulos: React.FC = () => {

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  const [filteredModules, setFilteredModules] = useState<Option[]>(modulos);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filtered = modulos.filter((module) =>
      module.nome.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredModules(filtered);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {(
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          className="fixed w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center text-white px-6">
          <div className='p-8 md:w-[60%] w-full h-[80%] bg-[#4b4b4b2d] rounded-xl flex flex-col items-center shadow-2xl'>
            <h1 className='text-[1.5rem] font-extrabold text-black select-none'>Lista de Módulos</h1>
            <div className='flex justify-center mt-[0.7rem] text-black w-full'>
              <input
                id='pesquisar'
                ref={searchInputRef}
                className='appearance-none rounded-none relative block border w-full px-4 py-2 rounded-t-md'
                type='text'
                placeholder='Pesquisar Módulos'
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <div className="border mt-2 w-full " />
            <div className='mt-4 w-full h-full overflow-y-scroll flex justify-center my-2 divide-y bg-[#69646410] rounded-lg'>
              <ul className=' w-full px-2 '>
                {filteredModules.map((module) => (
                  <li key={module.rota} className='w-full mt-2'>
                    <Link href={`/modulos/${module.rota}`} legacyBehavior>

                      <button className="w-full relative inline-flex items-center justify-center p-[1px] mb-[3.5px] overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-800 to-blue-500 group-hover:from-purple-600 group-hover:to-white hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-600 hover:scale-[1.01] duration-200">
                        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
                          {module.nome}
                        </span>
                      </button>
                      {/* <a className='text-base'>{module.nome}</a> */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modulos;
