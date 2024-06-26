'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchUsuarios({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {

        const params = new URLSearchParams(searchParams);

        //params.set('page', '1');

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 600);

    return (
        <div className="relative flex flex-1 flex-shrink-0 mt-4 select-none">

            <input
                id='search'
                type="text"
                className="peer block w-full rounded-md border-gray-200 py-[9px] pl-10 text-sm outline-slate-300 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('search')?.toString()}
                maxLength={40}
                autoComplete="off"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}