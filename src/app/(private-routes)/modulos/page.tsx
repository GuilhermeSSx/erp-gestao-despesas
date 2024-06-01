"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React from 'react';

const Modulos: React.FC = () => {
  return (
    <div className='w-full h-full flex flex-col md-1190:flex items-center justify-center 720p:scale-80 720p:h-[calc(125vh-60px)]'>
      <div className="w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center text-white md:px-6 px-2 overflow-hidden">
        <div className='md:p-8 py-4 px-3 md:min-w-[560px] lg-1920:w-[30%] md:w-[40%] w-full h-full md:h-[80%] md-web:my-8 my-2 bg-[#4b4b4b2d] rounded-xl flex flex-col items-center shadow-2xl'>
          <h1 className='text-lg md:text-[1.2rem] font-extrabold text-black select-none'>Chamados em aberto</h1>
          <div className="border mt-2 w-full" />
          <div className='mt-4 w-full h-full overflow-y-scroll flex justify-center my-2 divide-y bg-[#69646410] rounded-lg'>
            <ul className='w-full px-2'>
              {/* Conteúdo da lista */}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center text-white md:px-6 px-2 overflow-hidden">
        <div className='md:p-8 py-4 px-3 md:min-w-[560px] lg-1920:w-[30%] md:w-[40%] w-full h-full md:h-[80%] md-web:my-8 my-2 bg-[#4b4b4b2d] rounded-xl flex flex-col items-center shadow-2xl'>
          <h1 className='text-lg md:text-[1.2rem] font-extrabold text-black select-none'>Despesas em aberto</h1>
          <h2 className='text-lg md:text-[1.2rem] font-extrabold text-black select-none'>Vencimento próximo</h2>
          <div className="border mt-2 w-full" />
          <div className='mt-4 w-full h-full overflow-y-scroll flex justify-center my-2 divide-y bg-[#69646410] rounded-lg'>
            <ul className='w-full px-2'>
              {/* Conteúdo da lista */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modulos;
