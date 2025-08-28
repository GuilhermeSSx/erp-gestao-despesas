'use client';

import { MdDashboard, MdPersonAdd, MdPointOfSale, MdShoppingBag, MdPostAdd } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
    { name: 'Dashboard', href: '/dashboard', icon: MdDashboard },
    { name: 'Cadastros', href: '/dashboard/cadastros', icon: MdPersonAdd },
    { name: 'Frente De Caixa', href: '/dashboard/frente-de-caixa', icon: MdPointOfSale },
    { name: 'Vendas', href: '/dashboard/vendas', icon: MdShoppingBag },
    { name: 'Lançamentos', href: '/dashboard/lancamentos', icon: MdPostAdd }
];

export default function NavLinks({ isCollapsed }: { isCollapsed: boolean }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex grow md:flex-none items-center justify-center gap-3 rounded-md bg-gray-50 p-3 mx-1 md:mx-0 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                                'md:justify-start': !isCollapsed,
                            }
                        )}
                    >
                        <LinkIcon className="w-6 h-6" />
                        {!isCollapsed && <p className="hidden md:flex whitespace-nowrap overflow-hidden text-ellipsis text-center">{link.name}</p>

                    }
                    </Link>
                );
            })}
        </>
    );
}