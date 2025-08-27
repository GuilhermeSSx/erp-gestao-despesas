"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { Menu } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

function SideMenu() {
  const { data: session } = useSession()
  const role_id = session?.user?.role_id
  const pathname = usePathname()

  const linkClassName = (href: any) =>
    clsx(
      'font-semibold flex w-full items-center rounded-md p-4 text-sm hover:bg-slate-200',
      { 'bg-selecaoLinha': pathname.startsWith(href) }
    )

  return (
    <div className='md:flex flex-col w-[250px] min-w-[250px] bg-white shadow-lg h-full p-4'>
      <h1 className='my-8 font-extrabold text-center text-black'>Menu lateral</h1>
      <div className='flex flex-col divide-y-4'>
        <Menu as='div' className='relative p-3 bg-[#6964643d]'>
          <Menu.Button className='relative z-24 inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90'>
            <span className='text-black font-bold text-base'>Módulos</span>
            <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-black hover:text-[#CE466F]' aria-hidden='true' />
          </Menu.Button>
          <Menu.Items className='right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <Menu.Item as='div'>
              <Link
                draggable={false}
                className={linkClassName('/dashboard/cadastros')}
                href='/dashboard/cadastros'
              >
                Cadastros
              </Link>
            </Menu.Item>
            <Menu.Item as='div'>
              <Link
                draggable={false}
                className={linkClassName('/dashboard/lancamentos')}
                href='/dashboard/lancamentos'
              >
                Lançamentos
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {role_id === 1 && (
          <Menu as='div' className='relative p-3 bg-[#6964643d]'>
            <Menu.Button className='relative z-24 inline-flex w-full justify-between rounded-md bg-white bg-opacity-30 px-4 py-[10px] text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90'>
              <span className='text-black font-bold text-base'>Configurações</span>
              <ChevronDownIcon className='ml-2 -mr-1 h-5 w-5 text-black hover:text-[#CE466F]' aria-hidden='true' />
            </Menu.Button>
            <Menu.Items className='right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item as='div'>
                <Link
                  draggable={false}
                  className={linkClassName('/configuracoes/usuarios')}
                  href='/configuracoes/usuarios'
                >
                  Usuários
                </Link>
              </Menu.Item>
              <Menu.Item as='div'>
                <Link
                  draggable={false}
                  className={linkClassName('/configuracoes/perfil-acesso')}
                  href='/configuracoes/perfil-acesso'
                >
                  Perfil de Acesso
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </div>
  )
}


export default SideMenu;