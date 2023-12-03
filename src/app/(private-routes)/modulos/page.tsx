"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Option {
  nome: string;
  rota: string;
}

const modulos: Option[] = [
  { nome: 'Cadastros', rota: 'cadastros' },
  { nome: 'Lançamentos', rota: 'lancamentos' }
  // { nome: 'Buscar CAR por LAT/LONG', rota: 'buscarLatLong' },
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

  // useEffect(() => {
  //   if (searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, []);

  return (

    <div
      className="w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center text-white md:px-6 px-1 overflow-hidden">
      <div
        className='md:p-8 py-4 px-3 md:min-w-[500px] lg-1920:w-[30%] md:w-[40%] w-full h-full md:h-[80%] md-web:my-8 my-2 bg-[#4b4b4b2d] rounded-xl flex flex-col items-center shadow-2xl'
      >
        <h1 className='text-lg md:text-[1.2rem] font-extrabold text-black select-none'>Lista de Módulos</h1>
        <div className='relative flex flex-1 flex-shrink-0 mt-[0.8rem] w-full'>
          <input
            id='pesquisar'
            ref={searchInputRef}
            className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black'
            type='text'
            placeholder='Pesquisar Módulos'
            value={searchInput}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div className="border mt-2 w-full " />
        <div className='mt-4 w-full h-full overflow-y-scroll flex justify-center my-2 divide-y bg-[#69646410] rounded-lg'>
          <ul className=' w-full px-2 '>
            {filteredModules.map((module) => (
              <li key={module.rota} className='w-full mt-2'>
                <Link draggable={false} href={`/modulos/${module.rota}`} legacyBehavior>

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
    </div>

  );
};

export default Modulos;
