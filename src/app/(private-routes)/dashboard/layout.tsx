'use client';

import SideNav from '@/app/components/dashboard/sidenav';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-full flex-col md:flex-row">
            {/* Menu lateral */}
            <div
                className={`transition-all duration-300 ${isCollapsed ? 'w-full md:w-20' : 'w-full md:w-[13rem]'
                    }`}
            >
                <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>

            {/* Conteúdo principal */}
            <div className="flex-grow md:overflow-y-auto">
                {children}
            </div>
        </div>
    );
}