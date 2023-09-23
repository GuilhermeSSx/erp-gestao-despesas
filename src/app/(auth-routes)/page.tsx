"use client"
import Link from 'next/link'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Login() {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace('/modulos')
    window.location.reload(); // Recarrega a página após o redirecionamento
  }




  return (
    <main className=' fixed h-[calc(100vh-100px)] w-screen bg-slate-400 flex justify-center items-center px-4'>

      <div className=' px-24 sm:px-28 max-w-[100%] h-[28rem] bg-[#ffffff] rounded-xl flex flex-col items-center'>
        <h2 className='text-[1.3rem] font-extrabold mt-10 text-center bg-black bg-clip-text text-transparent'>Entrar na sua conta</h2>
        <p className=' text-[0.9rem] mt-[0.13rem] text-center'>Ou
          <Link className='ml-1 text-blue-500 hover:text-black underline' href={'/cadastro'}>
            Cadastrar Nova Conta
          </Link>
        </p>

        <form className='w-[150%] flex flex-col justify-center' onSubmit={handleSubmit}>
          <div className=''>
            <input 
              id='email' 
              type='email'
              autoComplete='none'
              required 
              className='appearance-none rounded-none relative
              block border w-full px-2 py-2 mt-12 rounded-t-md' 
              placeholder='Email'
              onChange={(event) => setEmail(event.target.value)}
              />
          </div>
          <div>
            <input 
              id='password' 
              type='password' 
              autoComplete='none' 
              required 
              className='appearance-none rounded-none relative
              block border w-full px-2 py-2 mt-4 rounded-t-md' 
              placeholder='Senha'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className='flex items-center mt-3 justify-between'>
            <div className='flex items-center'>
              <input id='checkbox' type='checkbox' className='h-4 w-4 text-indigo-600 focus:bg-indigo-500 border-gray-300 rounded' />
              <label htmlFor='checkbox' className='ml-2 block text-sm text-gray-900 select-none'>Lembrar-me</label>
            </div>

            <div className='text-sm'>
              <a href='/esqueci-senha' className='font-medium text-indigo-600 hover:text-indigo-500'>Esqueceu a senha?</a>
            </div>
          </div>

          <div className='mt-10'>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent
            text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500 hover:scale-[1.02] transition duration-300'>Entrar</button>
          </div>
        </form>

        <button
          className="mt-5 px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Login com o Google</span>
        </button>


      </div>
    </main>
  )
}