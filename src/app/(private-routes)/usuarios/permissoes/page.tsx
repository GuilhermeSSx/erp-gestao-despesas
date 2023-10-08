"use client"
import { useSearchParams } from 'next/navigation'

const Permissoes = () => {

    const usuarioParams = useSearchParams();
    const id = usuarioParams.get('id')

    
    return (
        <main className='md-web:w-screen md-web:h-[calc(100vh-60px)] flex justify-center items-center p-2 md-web:flex-row flex-col overflow-auto'>
            <p>ID: {id}</p>
            

        </main>
    );
};

export default Permissoes;
