"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/Energia-JPNR-BRANCO.png";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { useRouter, } from "next/navigation";
import { useSession } from "next-auth/react"
import DrawerOpenClose from "../drawer";
import { motion, AnimatePresence } from "framer-motion"


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
    const user = session?.user?.name;



    return (
        <>
            <AnimatePresence>
                <motion.header
                    initial={{ opacity: 0, y: -300 }}
                    transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}
                    animate={{ opacity: 1, y: 0, }}
                    exit={{ opacity: 0, y: -300 }}
                    className="flex bg-black w-full h-[60px] p-[10px] sticky top-0 z-50 select-none">
                    {session ? (<DrawerOpenClose />) : (<></>)}
                    <div className="flex items-center mx-4">

                        {session ? (
                            <Link href={"/modulos"}>
                                <Image priority={true} alt="" src={Logo} width={60} />
                            </Link>
                        ) : (
                            <Link href={"/"}>
                                <Image priority={true} alt="" src={Logo} width={60} />
                            </Link>
                        )}

                    </div>
                    <div className="flex w-fit justify-end mx-4 absolute right-0">
                        {session ? (
                            <Menu
                                as="div"
                                id="MenuDiv"
                                className="relative"
                            >

                                <Menu.Button
                                    id="MenuButton"
                                    className="z-24 inline-flex w-full justify-center rounded-md bg-white bg-opacity-20 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90"
                                >
                                    <span className=" md-web:flex hidden">{user}</span>
                                    <span className=" md-web:hidden">{user?.substring(0, 3)}...</span>

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
                        ) : null}

                    </div>


                </motion.header>
            </AnimatePresence>
        </>


    );
}
