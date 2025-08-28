'use client';
import NavLinks from './nav-links';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export default function SideNav({
    isCollapsed,
    setIsCollapsed,
}: {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}) {
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`hidden md:flex h-fit md:h-full flex-col px-3 py-4 md:px-2 border-gray-300 md:border transition-all duration-300 ${isCollapsed ? 'w-full md:w-20' : 'w-full md:w-[13rem]'
                }`}
        >
            <div className="flex grow flex-row justify-between md:flex-col space-y-0 md:space-y-2 mb-2">
                <NavLinks isCollapsed={isCollapsed} />

                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                {!isCollapsed && (
                    <span className="hidden align-bottom justify-center bg-white rounded-md md:flex text-sm p-1 whitespace-nowrap overflow-hidden text-ellipsis">
                        Versão ERP: 0.9.0 🔄
                    </span>
                )}
            </div>
            <button
                onClick={toggleCollapse}
                className="hidden p-2 md:flex justify-evenly items-center bg-white rounded-md hover:bg-gray-300"
            >
                {isCollapsed ? (
                    <ChevronDoubleRightIcon className="w-5 h-5" />
                ) : (
                    <ChevronDoubleLeftIcon className="w-5 h-5" />
                )}
                <span className={` ${isCollapsed ? 'hidden' : 'block'
                    } px-8`}>Encolher</span>
            </button>
        </div>
    );
}