"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState, useEffect, useRef } from "react";
import LoginLogo from "../assets/jpnr-login.png";
import Image from "next/image";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { enc, AES } from 'crypto-js'; // Importa as funções necessárias do crypto-js

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const rememberMeCheckboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      // Se "Lembrar-me" estiver marcado, carregue o email e senha criptografados do armazenamento local
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (storedEmail && storedPassword) {
        setEmail(storedEmail);

        // Descriptografa a senha ao recuperá-la do armazenamento local
        const decryptedPassword = AES.decrypt(storedPassword, 'sua-chave-secreta').toString(enc.Utf8);
        setPassword(decryptedPassword);
      }

      // Verifica se a caixa de seleção "Lembrar-me" está marcada
      if (rememberMeCheckboxRef.current) {
        rememberMeCheckboxRef.current.checked = true;
      }
    }
  }, []);

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      console.error(result.error);
      toast.error('Erro ao fazer login. Email ou senha incorretos!', {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Se a caixa "Lembrar-me" estiver marcada, criptografa a senha e armazena no armazenamento local
      if (rememberMeCheckboxRef.current && rememberMeCheckboxRef.current.checked) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);

        // Criptografa a senha antes de armazená-la
        const encryptedPassword = AES.encrypt(password, 'sua-chave-secreta').toString();
        localStorage.setItem('password', encryptedPassword);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      router.replace('/modulos');
      toast.success('Login efetuado com sucesso!', {
        position: "top-center",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setErrorMessage(null);
    }
  }

  return (
    <main className='h-[calc(100vh-60px)] w-full bg-slate-400 flex justify-center items-center overflow-auto sm:p-10 sm-mobile:p-4 p-2'>
      <div className='w-full max-w-[460px] lg-1920:w-[25%] md-1190:w-[40%] md:w-[60%] md-web:w-[90%] h-fit bg-[#ffffff] rounded-xl flex flex-col items-center justify-center sm-mobile:p-4 p-2'>
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
              value={email}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className='flex items-center mt-3 justify-between'>
            <div className='flex items-center'>
              <input
                ref={rememberMeCheckboxRef}
                id='checkbox'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:bg-indigo-500 border-gray-300 rounded'
              />
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
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
