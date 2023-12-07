"use client";
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function DeniedPage() {

    const { data: session, update } = useSession()

    async function updateSession() {
        console.log({ session })
        console.log({ user: session?.user })
        await update({
            ...session,
            user: {
                ...session?.user,
                name: 'Guilherme'
            }
        });
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-6">Acesso restrito</h1>
            <p className="text-base text-slate-600 mb-10">Você não tem permissão para prosseguir.</p>
            <Link href="/modulos" className="p-4 bg-jpnrAzul hover:bg-blue-300 text-slate-50">Voltar</Link>

            <div className="flex flex-wrap gap-5">
                <button
                    className="border bg-violet-600 text-white rounded px-4 py-2"
                    onClick={updateSession}
                >
                    Update Session
                </button>
                <button
                    className="border bg-violet-600 text-white rounded px-4 py-2"
                    onClick={() => console.log({ session })}
                >
                    Log Session
                </button>
            </div>
        </div>
    )
}