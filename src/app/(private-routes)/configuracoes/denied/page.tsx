"use client";
import { useSession } from "next-auth/react"
import { consultarRoleIdUsuario } from "@/app/lib/actions";


export default function DeniedPage() {

    

    // const { data: session, update } = useSession()

    // // @ts-ignore
    // const user_id = session?.user?.id as any;

    // async function updateSession() {
    //     const roleId = await consultarRoleIdUsuario(user_id);

    //     await update({
    //         ...session,
    //         user: {
    //             ...session?.user,
    //             role_id: roleId
    //         }
    //     });
    // }

    function reload() {
        window.location.replace("/modulos");
    }

    return (
        <div className="md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-6">Acesso restrito</h1>
            <p className="text-base text-slate-600 mb-10 text-center px-4">Somente usuario administrador, caso sua permissão foi alterada recentemente clique em voltar e tente novamente.</p>
            <button onClick={reload} className="p-4 bg-jpnrAzul hover:bg-blue-300 text-slate-50">Voltar</button>

            {/* <div className="flex flex-wrap gap-5">
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
            </div> */}
        </div>
    )
}