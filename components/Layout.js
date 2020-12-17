import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/router';

const Layout = ({children}) => {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM - Clients Admin</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      {router.pathname == '/login' || router.pathname == '/registro' ? (

        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
          {children}
        </div>

      ) : (
        <div className='bg-gray-200 min-h-screen '>
          <div className='flex min-h-screen'>
            <Sidebar />

            <main className='w-full sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout;