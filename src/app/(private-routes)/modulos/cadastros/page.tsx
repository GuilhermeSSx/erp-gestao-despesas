"use client"
import Image from 'next/image';
import saidaIcon from "../../../../../public/saida.svg";
import { motion } from "framer-motion";
import Link from 'next/link';
import { VoltarButton } from '@/app/components/voltarButton';


export default function Cadastros() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 120 }}

      className="w-full h-[calc(100vh-60px)] flex flex-col bg-slate-100 items-center select-none fixed">
      <div className='relative w-full'>
        <VoltarButton />
        <div className="border-b border-gray-300 flex w-full justify-center md-web:text-sm text-[10px] font-extrabold pt-11 bg-white">
          <h2 className='text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent pb-10'>Cadastros</h2>
        </div>

      </div>

      <div className='mt-8 flex flex-wrap w-full h-full justify-center'>
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
