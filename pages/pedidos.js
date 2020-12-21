import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import Pedido from '../components/Pedido';

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente {
        id
        nombre
        apellido
        empresa
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;


const Pedidos = () => {

  const {data, loading, error} = useQuery(OBTENER_PEDIDOS);
  
  if(loading) return 'Cargando...';

  const { obtenerPedidosVendedor } = data;

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Pedidos</h1>

        <Link href="/nuevopedido">
					<a className="bg-green-600 px-4 py-1 text-white text-xs rounded hover:bg-green-700 inline-block mt-5">Nuevo Pedido</a>
				</Link>

        { obtenerPedidosVendedor.length === 0 ? (
          <p className='mt-5 text-center text-2xl'>No hay OBTENER_PEDIDOS</p>
        ) : (
          obtenerPedidosVendedor.map( pedido => (
            <Pedido
              key={pedido.id}
              pedido={pedido} />
          ))
        )}
      </Layout>
    </div>
  )
}

export default Pedidos;