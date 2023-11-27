import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import TableUsuarios2 from '@/app/components/tableUsuarios2';
import { getUsuarios, getPerfilAcessos } from '@/app/lib/actions';

export default async function Usuarios() {

    const dataUsers = await getUsuarios();
    const usuarios = dataUsers.usuarios;

    const dataPerfilAcessos = await getPerfilAcessos();
    const perfilAcessos = dataPerfilAcessos.perfil_acessos;  // Extraia apenas o array
    

    return (
        <main className='flex md-web:min-h-[calc(100vh-60px)] h-[calc(100vh-60px)] flex-col justify-center items-center md:p-4 p-1'>

            {/* Selecionar Usuario, remover, Permissoes */}
            <div className='flex flex-col w-full h-full md:w-[32%] bg-slate-300 md:min-w-[500px] p-2 md:p-4 rounded-lg md:mt-2'>
                <h1 className='font-extrabold  text-center mt-4 select-none'>Selecionar Usuarios</h1>
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


                <TableUsuarios2 usuarios={usuarios} perfil_acessos={perfilAcessos}/>


                <div className='flex justify-center items-center rounded w-full h-fit'>
                    <div className='flex justify-between rounded-lg mt-3 w-full'>
                        {/* {selectedUsuario ? (
                            <button
                                onClick={() => abrirPopupExcluirUsuario(selectedUsuario ? selectedUsuario.id : 0)}
                                className={`group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md ${selectedUsuario && selectedUsuario.name === session?.user?.name ? 'bg-slate-200 text-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-400 text-white hover:scale-[1.01] duration-200'
                                    } `}
                                // disabled={selectedUsuario && selectedUsuario.name === session?.user?.name}
                            >
                                Excluir
                            </button>
                        ) : (
                            <button
                                className='group relative items-center w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-500 text-gray-500 hover:scale-[1.02] duration-200 cursor-not-allowed select-none outline-none'
                            >
                                Excluir
                            </button>
                        )} */}

                        {/* {selectedUsuario && (
                            <PopupExcluirUsuario
                                open={popupAbertoExcluirUsuario}
                                onClose={fecharPopupExcluirUsuario}
                                userId={selectedUsuario.id}
                                userName={selectedUsuario.name}
                                reloadUsers={getData}
                            />
                        )} */}

                    </div>
                </div>

            </div>
            <div className='flex justify-between rounded-lg md:my-4 mt-2 w-full md:w-[32%] md:min-w-[490px]'>
                <div className='group relative flex-1'>
                    <div className='absolute -inset-1 rounded-lg bg-gradient-to-r from-lime-500 via-gray-200 to-gray-400 opacity-30 blur transition duration-500 group-hover:opacity-100'></div>
                    <button
                        // onClick={abrirPopupCriarUsuario}
                        className='shadow-lg w-full relative bg-lime-300 rounded-lg  px-7 py-3 text-black select-none outline-none'
                    >
                        Cadastrar
                    </button>
                </div>
            </div>

            {/* <PopupCriarUsuario
                open={popupAbertoCriarUsuario}
                onClose={fecharPopupCriarUsuario}
                reloadUsers={getData}
            /> */}

        </main>
    )
}
