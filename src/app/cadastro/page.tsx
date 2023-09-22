import Image from 'next/image'

export default function Cadastro() {
    return (
        <main className=' fixed h-[calc(100vh-100px)] w-screen bg-slate-400 flex justify-center items-center px-4'>

            <div className=' px-24 sm:px-28 max-w-[100%] h-[28rem] bg-[#ffffff] rounded-xl flex flex-col items-center'>
                <h2 className='text-[1.3rem] font-extrabold mt-8 text-center'>Criar sua Conta</h2>

                <button
                    className="mt-4 px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span>Cadastro com o Google</span>
                </button>

                <form className='w-[150%] flex flex-col justify-center'>
                    <div className=''>
                        <input id='nome' type='text' autoComplete='none' required className='appearance-none rounded-none relative
                            block border w-full px-3 py-2 mt-6 rounded-t-md' placeholder='Nome' />
                    </div>
                    <div className=''>
                        <input id='email' type='email' autoComplete='none' required className='appearance-none rounded-none relative
                            block border w-full px-3 py-2 mt-4 rounded-t-md' placeholder='Email' />
                    </div>
                    <div>
                        <input id='password' type='password' autoComplete='none' required className='appearance-none rounded-none relative
                            block border w-full px-3 py-2 mt-4 rounded-t-md' placeholder='Senha' />
                    </div>
                    <div className="flex h-fit items-center justify-center mt-10">
                        <div className="group relative flex-1">
                            <div className=" absolute -inset-1 rounded-lg bg-gradient-to-r from-lime-500 via-gray-200 to-gray-400 opacity-30 blur transition duration-500 group-hover:opacity-100"></div>
                            <button className=" shadow-lg w-full relative bg-lime-300 rounded-lg  px-7 py-4 text-black">Cadastrar</button>
                        </div>
                    </div>

                    {/* <div className='mt-10'>
                        <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent
                            text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500'>Cadastrar</button>
                    </div> */}
                </form>



            </div>
        </main>
    )
}
