import Image from 'next/image'
import Link from 'next/link'

export default function EsqueceuSenha() {
  return (
    <main className=' fixed h-screen w-screen bg-slate-400 flex flex-col justify-center items-center px-4'>
      
      <div className='w-full max-w-[460px] lg-1920:w-[24%] md-1190:w-[40%] md:w-[60%] md-web:w-[90%] h-fit bg-[#ffffff] rounded-xl flex flex-col items-center justify-center sm:p-8 p-4'>
        <p className='flex '>
          Por favor, digite seu endereço de e-mail. 
          Você receberá uma mensagem de email com instruções sobre como redefinir sua senha.
        </p>
      </div>

      <div className='mt-4 w-full max-w-[460px] lg-1920:w-[24%] md-1190:w-[40%] md:w-[60%] md-web:w-[90%] h-fit bg-[#ffffff] rounded-xl flex flex-col items-center justify-center sm:p-4 p-4'>
        <h2 className='text-[1.2rem] font-extrabold mt-4 text-center'>Esqueceu a senha ?</h2>

        <form className='w-full flex flex-col justify-center'>
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
