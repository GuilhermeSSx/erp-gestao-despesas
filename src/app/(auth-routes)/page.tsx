"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState, useEffect, useRef } from "react";
import LoginLogo from "../../../public/login-logo.png";
import Image from "next/image";
import { Slide, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { motion } from "framer-motion";
// import { enc, AES } from 'crypto-js'; // Importa as funções necessárias do crypto-js

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    passwordInputRef.current?.focus();
    setTimeout(focusAndMoveCursorToEnd, 0);
  };

  const focusAndMoveCursorToEnd = () => {
    const input = passwordInputRef.current;
    if (input) {
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  };

  const rememberMeCheckboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }

      if (rememberMeCheckboxRef.current) {
        rememberMeCheckboxRef.current.checked = true;
      }
    }
  }, []);

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const timeout = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 7000)
    );

    const loginRequest = signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    try {
      const result = await Promise.race([loginRequest, timeout]);

      setIsLoading(false);

      if (result?.error) {
        console.error(result.error);
        setEmailError(true);
        setPasswordError(true);
        toast.error('Erro ao fazer login. Email ou senha incorretos!', {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setEmailError(false);
          setPasswordError(false);
        }, 1500);
      } else {
        setIsAuthorized(true);
        if (rememberMeCheckboxRef.current && rememberMeCheckboxRef.current.checked) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('email');
        }

        router.replace('/dashboard');
        toast.success('Login efetuado com sucesso!', {
          position: "top-center",
          transition: Slide,
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          className: "mt-[52px]"
        });
        setErrorMessage(null);
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error && error.message === 'timeout') {
        toast.error('Sem resposta do servidor, tente novamente ou mais tarde.', {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",  
        });

      } else {
        console.error('Erro desconhecido:', error);
        toast.error('Ocorreu um erro inesperado. Tente novamente.', {
          position: "bottom-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return (
    <main className='h-[100dvh] w-full bg-slate-400 flex justify-center items-center overflow-auto sm:p-10 sm-mobile:p-2 p-2'>
      <div className='w-full max-w-[460px] lg-1920:w-[24%] md-1190:w-[40%] md:w-[60%] md-web:w-[90%] h-fit bg-[#ffffff] rounded-xl flex flex-col items-center justifycenter sm-mobile:p-2 p-2'>
        <Image
          className='flex relative justify-center items-center my-2'
          priority={true}
          alt=""
          src={LoginLogo}
          width={260}
          draggable={false}
        />
        <h1 className='font-extrabold my-2 text-center text-black'>Entrar na sua conta</h1>
        <form className='w-[100%] flex flex-col justifycenter sm:px-14 sm-mobile:px-4 px-1' onSubmit={handleSubmit}>
          <div>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              className={`appearance-none rounded-none relative block border w-full px-2 py-2 mt-6 rounded-t-md ${emailError ? 'border-red-500 animate-pulse' : 'border-gray-300'}`}
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              ref={emailInputRef}
            />
          </div>
          <div className="relative select-none">
            <input
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete='current-password'
              required
              className={`appearance-none rounded-none relative block border w-full px-2 py-2 mt-4 rounded-t-md ${passwordError ? 'border-red-500 animate-pulse' : 'border-gray-300'}`}
              placeholder='Senha'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              ref={passwordInputRef}
            />
            {password && (
              <button
                title={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                type="button"
                onClick={togglePasswordVisibility}
                className="select-none absolute inset-y-0 top-4 right-2 flex items-center text-slate-400 px-2"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            )}
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
              className='group relative w-full flex items-center justify-center py-4 px-6 border border-transparent
              text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500 hover:scale-[1.02] transition duration-300'
              disabled={isLoading || isAuthorized}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-full text-center">
                    <div className="w-5 h-5 border-[2px] border-dashed rounded-full animate-spin dark:border-white" />
                  </div>
                </div>
              ) : isAuthorized ? (
                <motion.div 
                  className="flex items-center "
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-sm text-slate-500 px-2">Autenticado</span>
                  <div className="w-full text-center">
                    <FcOk size={22}/>
                  </div>
                </motion.div>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
