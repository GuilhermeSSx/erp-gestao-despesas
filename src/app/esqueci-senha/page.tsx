import Image from 'next/image'
import Link from 'next/link'

export default function EsqueceuSenha() {
  return (
    <main className=' fixed h-[calc(100vh-60px)] w-screen bg-slate-400 flex flex-col justify-center items-center px-4'>
      
      <div className='border-s-indigo-500 sm:w-[26.5rem] sm:p-3 p-3 w-[100%] h-[7rem] bg-white rounded-xl flex flex-col items-center '>
        <p className='flex '>
          Por favor, digite seu endereço de e-mail. 
          Você receberá uma mensagem de email com instruções sobre como redefinir sua senha.
        </p>
      </div>

      <div className='mt-4 px-24 max-w-[100%] h-[16rem] bg-[#ffffff] rounded-xl flex flex-col items-center'>
        <h2 className='text-[1.2rem] font-extrabold mt-8 text-center'>Esqueceu a senha ?</h2>

        <form className='w-[150%] flex flex-col justify-center'>
          <div className=''>
            <input id='email' type='email' autoComplete='none' required className='appearance-none rounded-none relative
            block border w-full px-1 py-2 mt-8 rounded-t-md' placeholder='Email' />
          </div>


          <div className='mt-5'>
            <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent
            text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500'>Redefinir senha</button>
          </div>
        </form>

      </div>
    </main>
  )
}
