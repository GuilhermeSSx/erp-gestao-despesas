"use client"
import Image from 'next/image';
import saidaIcon from "../../../../../public/saida.svg";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';


export default function Cadastros() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 120 }}

      className="w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col bg-slate-100 items-center select-none fixed">
      <div className='relative w-full '>

        <div className="border-b border-gray-300 flex w-full justify-center items-center md-web:text-sm text-[10px] font-extrabold bg-white md:h-[120px] h-[60px]">

          <Link href={'/modulos'} title="voltar">
            <div className='absolute left-0 top-3 group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
              <ArrowLeftIcon className=" h-7 w-5 text-center mx-4" aria-hidden="true" />
              <span className='hidden md:block'>Voltar</span>
            </div>
          </Link>

          <h2 className='text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent'>Cadastros</h2>
        </div>

      </div>

      <div className='md:mt-8 flex flex-wrap w-full h-full justify-center items-center md:items-stretch overflow-auto'>
        <Link
          draggable={false}
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/saidas'}>
          Classificação de Despesa
          <Image className='ml-2' src={saidaIcon} width={26} alt="Saida" />
        </Link>
        <Link
          draggable={false}
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/centroDeCusto'}>
          Centro De Custo
        </Link>
        <Link
          draggable={false}
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/favorecidos'}>
          Favorecidos
        </Link>
      </div>

    </motion.div>
  )
}
