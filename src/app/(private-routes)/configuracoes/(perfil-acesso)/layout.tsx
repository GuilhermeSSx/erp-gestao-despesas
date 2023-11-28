import BasicTabs from "@/app/components/basicTabs";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-[calc(100dvh-70px)] md:overflow-hidden">
            <div className="w-full h-fit">
                <Link className='z-10' href={'/modulos'} title="voltar">
                    <div className='absolute left-0 top-[66px] md:top-[68px] group flex items-center py-3 md:px-4 px-2 md:mx-3 ml-1 border border-transparent text-base font-medium rounded-md hover:bg-slate-200 text-slate-400'>
                        <ArrowLeftIcon className=" h-7 w-5 text-center mx-3" aria-hidden="true" />
                        <span className='hidden md:block'>Voltar</span>
                    </div>
                </Link>
                <BasicTabs />
            </div>
            <div className="w-full h-full flex-none bg-slate-50">
                {children}
            </div>

        </div>
    );
}