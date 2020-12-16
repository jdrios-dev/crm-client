import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

  const router = useRouter();

  return (
    <>
      <aside className='bg-gray-800 w-full sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
        <div>
          <p className='text-white text-2xl font-medium'>CRM Clientes</p>
        </div>
        <nav className='mt-5 list-none text-white'>
          <li className={router.pathname === '/' ? 'bg-gray-600 p-2' : 'p-2'}>
            <Link href='/'>
              <a className='m-1 block'>
                Clientes
              </a>
            </Link>
          </li>
          <li className={router.pathname === '/productos' ? 'bg-gray-600 p-2' : 'p-2'}>
            <Link href='/productos'>
              <a className='m-1 block'>
                Productos
              </a>
            </Link>
          </li>
          <li className={router.pathname === '/pedidos' ? 'bg-gray-600 p-2' : 'p-2'}>
            <Link href='/pedidos'>
              <a className='m-1 block'>
                Pedidos
              </a>
            </Link>
          </li>
        </nav>
      </aside>
    </>
  )
}

export  default Sidebar;
