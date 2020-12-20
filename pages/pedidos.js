import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';


const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Pedidos</h1>

        <Link href="/nuevopedido">
					<a className="bg-green-600 px-4 py-1 text-white text-xs rounded hover:bg-green-700 inline-block mt-5">Nuevo Pedido</a>
				</Link>
      </Layout>
    </div>
  )
}

export default Pedidos;