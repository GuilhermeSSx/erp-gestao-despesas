import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import TableUsuarios from '@/app/components/tableUsuarios';
import { carregarSelecaoPerfilAcesso, getPerfilAcessos, getUsuariosFiltrados, updateUsuarioRoleId } from '@/app/lib/actions';
import CadastrarUsuario from './cadastrarUsuario';
import { UsuarioProvider } from '@/app/contexts/UsuarioContext';
import SearchUsuarios from './searchUsuarios';
import { VoltarUsuarios } from '@/app/components/voltarUsuarios';

export default async function Usuarios( {searchParams}: {searchParams: {search: string}} ) {

    const usuariosFiltrados = await getUsuariosFiltrados(searchParams.search? searchParams.search : '');
    const usuarios = usuariosFiltrados.usuarios_filtrados;

    const dataPerfilAcessos = await carregarSelecaoPerfilAcesso();
    const perfilAcessos = dataPerfilAcessos;

    return (
        <main className='flex md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex-col justify-center items-center md:p-4 p-1'>
            <VoltarUsuarios />

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col w-full h-full md:w-[32%] bg-slate-200 md:min-w-[500px] p-2 md:p-3 rounded-lg md:mt-2'>
                <h1 className='font-bold  text-center mt-2 select-none'>Usuarios e Permissões</h1>

                <SearchUsuarios placeholder='Pesquisar usuarios [nome e email]...' />

                <UsuarioProvider>
                    <TableUsuarios usuarios={usuarios} perfil_acessos={perfilAcessos} />
                    <CadastrarUsuario />
                </UsuarioProvider>

            </div>




        </main>
    )
}
