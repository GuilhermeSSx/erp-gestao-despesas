import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import TableUsuarios2 from '@/app/components/tableUsuarios2';
import { getUsuarios, getPerfilAcessos } from '@/app/lib/actions';
import CadastrarUsuario from './cadastrarUsuario';
import { UsuarioProvider } from '@/app/contexts/UsuarioContext';

export default async function Usuarios() {

    const dataUsers = await getUsuarios();
    const usuarios = dataUsers.usuarios;

    const dataPerfilAcessos = await getPerfilAcessos();
    const perfilAcessos = dataPerfilAcessos.perfil_acessos;  // Extraia apenas o array


    return (
        <main className='flex md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex-col justify-center items-center md:p-4 p-1'>
            <Link className='z-10' href={'/modulos'} title="voltar">
                <div className='absolute left-0 md:top-16 top-[74px] group flex items-center md:py-8 py-1 md:px-4 px-4 mx-4 border border-transparent text-base font-medium rounded-md hover:bg-slate-400 md:hover:bg-slate-200 md:text-slate-400 text-black-400'>
                    <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                    <span className='hidden md:block'>Voltar</span>
                </div>
            </Link>

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col w-full h-full md:w-[32%] bg-slate-200 md:min-w-[500px] p-2 md:p-3 rounded-lg md:mt-2'>
                <h1 className='font-bold  text-center mt-2 select-none'>Selecionar Usuarios</h1>
                <div className='flex justify-center mt-4 text-black w-full'>
                    <input
                        // ref={searchInputRef}
                        id='pesquisar'
                        className='appearance-none rounded-none relative block border w-full px-4 py-1 rounded-t-md'
                        type='text'
                        placeholder='Pesquisar Usuarios'
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <UsuarioProvider>
                    <TableUsuarios2 usuarios={usuarios} perfil_acessos={perfilAcessos} />
                    <CadastrarUsuario />
                </UsuarioProvider>

            </div>




        </main>
    )
}
