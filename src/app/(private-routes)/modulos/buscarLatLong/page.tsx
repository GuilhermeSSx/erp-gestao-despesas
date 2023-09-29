"use client"
import React, { useState } from 'react';

export default function BuscarLatLong() {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [resultado, setResultado] = useState('');

    return (
        <main className=' fixed h-[calc(100vh-60px)] w-screen bg-slate-400 flex justify-center items-center px-4'>

            <div className=' px-24 sm:px-28 max-w-[100%] h-[26rem] bg-[#ffffff] rounded-xl flex flex-col items-center'>
                <h2 className=' text-xl font-extrabold mt-10 text-center'>Buscar</h2>
                <p className=' text-[0.9rem] mt-[0.13rem] text-center'>Por Latitude e Longitude</p>

                <form className='w-[150%] flex flex-col justify-center'>
                    <div className=''>
                        <input
                            id='latitude' 
                            type='number' autoComplete='none' required className='appearance-none rounded-none relative
                            block border w-full px-1 py-2 mt-12 rounded-t-md' placeholder='Latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </div>
                    <div>
                        <input
                            id='longitude' 
                            type='number' autoComplete='none' required className='appearance-none rounded-none relative
                            block border w-full px-1 py-2 mt-4 rounded-t-md' placeholder='Longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </div>

                    <div className='mt-4'>
                        <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent
                        text-sm font-medium rounded-md bg-lime-400 hover:bg-lime-500'>Buscar</button>
                    </div>

                </form>
                <p className="mt-5">Resultado</p>

            </div>
        </main>
    )
}
