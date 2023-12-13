"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "#/public/Energia-JPNR-BRANCO.png";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { useRouter, } from "next/navigation";
import { useSession } from "next-auth/react"
import DrawerOpenClose from "../drawer";
import { motion, AnimatePresence } from "framer-motion"
import { Suspense } from "react";


export default function Header() {
    const router = useRouter();
    const { data: session } = useSession(); // Obtenha a sessão do usuário

    async function logout() {
        await signOut({
            redirect: false,
        });

        // Redirecionar para a página de login
        router.replace("/");
        window.location.reload(); // Recarrega a página após o redirecionamento
    }


    // @ts-ignore
    const user = session?.user?.name as any;

    return (
        <>
            <AnimatePresence>
                <motion.header
                    // initial={{ opacity: 0, y: -50 }}
                    // transition={{ type: "tween", duration: 0.2 }}
                    // animate={{ opacity: 1, y: 0, }}
                    // exit={{ opacity: 0, y: -400 }}
                    className="flex bg-black w-full h-[60px] p-[10px] sticky top-0 z-50 select-none">

                    <DrawerOpenClose />

                    <div className="flex items-center mx-4">
                        <button draggable={false} onClick={() => window.location.href = "/modulos"}>
                            <Image draggable={false} priority={true} alt="" src={Logo} width={60} />
                        </button>
                    </div>
                    <div className="flex w-fit justify-end mx-4 absolute right-0">

                        <Menu
                            as="div"
                            id="MenuDiv"
                            className="relative"
                        >

                            <Menu.Button
                                id="MenuButton"
                                className="z-24 inline-flex w-full justify-center rounded-md bg-white bg-opacity-20 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90"
                            >
                                <Suspense fallback={<div>Carregando...</div>}>
                                    {user ? (
                                        <div>
                                            <span className="md-web:flex hidden">{user}</span>
                                            <span className="md-web:hidden">{user?.substring(0, 3)}...</span>
                                        </div>
                                    ) : (
                                        <div className='flex space-x-1 justify-center items-center bg-transparent h-fit dark:invert mt-2'>
                                            <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                            <div className='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                            <div className='h-2 w-2 bg-black rounded-full animate-bounce'></div>
                                        </div>
                                    )}
                                </Suspense>

                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-[#CE466F]"
                                    aria-hidden="true"
                                />
                            </Menu.Button>

                            <Menu.Items className="right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <>
                                                <button
                                                    onClick={logout}
                                                    className={"font-semibold group flex w-full justify-center items-center rounded-md p-4 text-sm hover:bg-selecaoLinha"}
                                                >
                                                    Sair
                                                </button>

                                            </>
                                        )}

                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>


                    </div>


                </motion.header>
            </AnimatePresence>
        </>


    );
}
