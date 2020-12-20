import React from 'react'
import Layout from '../components/Layout';
import Producto from '../components/Producto';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';


const OBTENER_PRODUCTOS = gql `
  query obtenerProductos{
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Productos = () => {

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

  if(loading) return 'cargando...'

  return (
    <div>
      <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Productos</h1>

      <Link href='/nuevoproducto'>
          <a className='bg-green-600 px-4 py-1 text-white text-xs rounded hover:bg-green-700 inline-block mt-5'>
            Nuevo Producto
          </a>
        </Link>

      <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'> Nombre </th>
              <th className='w-1/5 py-2'> Existencia </th>
              <th className='w-1/5 py-2'> Precio </th>
              <th className='w-1/5 py-2'> Eliminar </th>
              <th className='w-1/5 py-2'> Editar </th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {
              data.obtenerProductos.map(producto => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              ))
            }
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Productos;