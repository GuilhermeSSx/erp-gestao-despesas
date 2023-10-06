"use client"
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrigido de next/navigation
import { SyntheticEvent, useState } from "react";
import LoginLogo from "../assets/jpnr-login.png";
import Image from "next/image";


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Rastreia o estado de carregamento
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Rastreia as mensagens de erro

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    // Inicia o carregamento
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // Finaliza o carregamento
    setIsLoading(false);

    if (result?.error) {
      setErrorMessage('Email ou senha incorretos'); // Define a mensagem de erro
    } else {
      setErrorMessage(null); // Reseta a mensagem de erro se não houver erro
      router.replace('/modulos');
      window.location.reload();
    }
  }

  return (
    <main className='h-[calc(100vh-60px)] w-full bg-slate-400 flex justify-center items-center overflow-auto sm:p-10 sm-mobile:p-4 p-2'>

      <div className='w-full lg-1920:w-[30%] md-1190:w-[40%] md:w-[60%] md-web:w-[90%] h-fit bg-[#ffffff] rounded-xl flex flex-col items-center justify-center sm-mobile:p-4 p-2'>

        <Image
          className='flex relative justify-center items-center my-2'
          priority={true}
          alt=""
          src={LoginLogo}
          width={240}
        />
        <h1 className='font-extrabold my-2 text-center text-black'>Entrar na sua conta</h1>

        <form className='w-[100%] flex flex-col justify-center sm:px-14 px-4' onSubmit={handleSubmit}>
          <div>
            <input
              id='email'
              type='email'
              autoComplete='login-email'
              required
              className='appearance-none rounded-none relative
              block border w-full px-2 py-2 mt-6 rounded-t-md'
              placeholder='Email'
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              id='password'
              type='password'
              autoComplete='login-password'
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

          <div className='my-8'>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500 hover:scale-[1.02] transition duration-300'
              disabled={isLoading} // Desativa o botão durante o carregamento
            >
              {isLoading ? 'Carregando...' : 'Entrar'} {/* Mostra "Carregando" durante o carregamento */}
            </button>
          </div>
        </form>

        {/* Exibe a mensagem de erro, se houver */}
        {errorMessage && <p className='text-red-500 text-sm flex justify-center mt-2'>{errorMessage}</p>}

      </div>
    </main>
  );
}

