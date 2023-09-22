"use client"
import Image from 'next/image';
import Link from "next/link";
import entradaIcon from "../../../assets/entrada.svg";
import saidaIcon from "../../../assets/saida.svg";
import { motion } from "framer-motion";

export default function Cadastros() {

  return (
    <motion.div
      initial={{opacity: 0, y: 60}}
      animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
      exit={{opacity: 0, y: 60}}
      
      className="fixed w-screen h-[calc(100vh-100px)] flex flex-col bg-white items-center select-none">
      <div className='w-full h-fit flex justify-center items-center p-14'>
        <h2 className='text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent '>Cadastro</h2>  
      </div>

      <div className='mt-5 flex flex-wrap w-full h-full justify-center'>
        <Link
          
          className='flex justify-center items-center w-40 h-24 m-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300 ' 
          href={'/modulos/cadastros/entradas'}>
            Entrada
            <Image className='ml-1' src={entradaIcon} width={27} alt="Entrada"/>
        </Link>
        <Link 
          className='flex justify-center items-center w-40 h-24 m-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300' 
          href={'/modulos/cadastros/saidas'}>
            Despesas
            <Image className='ml-2' src={saidaIcon} width={26} alt="Saida"/>
        </Link>
        <Link 
          className='flex justify-center items-center w-40 h-24 m-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300' 
          href={'/modulos/cadastros/grupos'}>
            Grupos
        </Link> 
        <Link 
          className='flex justify-center items-center w-40 h-24 m-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300' 
          href={'/modulos/cadastros/centroDeCusto'}>
            Centro De Custo
        </Link>
        <Link 
          className='flex justify-center items-center w-40 h-24 m-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-emerald-500 hover:scale-105 duration-300' 
          href={'/modulos/cadastros/favorecidos'}>
            Favorecidos
        </Link>   
      </div>
      
    </motion.div>
  )
}
