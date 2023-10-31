"use client"
import Image from 'next/image';
import Link from "next/link";
import saidaIcon from "../../../assets/saida.svg";
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { motion } from "framer-motion";

export default function Cadastros() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 120 }}

      className="fixed w-screen h-[calc(100vh-60px)] flex flex-col bg-slate-100 items-center select-none">
      <div className="border-b border-gray-300 flex w-full justify-center md-web:text-sm text-[10px] font-extrabold pt-11 bg-white">
        <button
          onClick={() => window.history.back()}
          title="voltar" className='absolute top-3 left-2 group flex justify-center items-center py-8 px-4 border border-transparent
          text-base rounded-md hover:bg-slate-200 text-slate-400'>
          <ArrowLeftIcon
            onClick={() => window.history.back()}
            className="mr-4 h-7 w-5 text-center"
            aria-hidden="true"
          />
          Voltar

        </button>
        <h2 className='text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent pb-10'>Cadastros</h2>
      </div>

      <div className='mt-8 flex flex-wrap w-full h-full justify-center'>
        <Link
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/saidas'}>
          Classificação de Despesa
          <Image className='ml-2' src={saidaIcon} width={26} alt="Saida" />
        </Link>
        <Link
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/centroDeCusto'}>
          Centro De Custo
        </Link>
        <Link
          className='flex justify-center items-center w-60 h-32 mx-4 my-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300'
          href={'/modulos/cadastros/favorecidos'}>
          Favorecidos
        </Link>
      </div>

    </motion.div>
  )
}
