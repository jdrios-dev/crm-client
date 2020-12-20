import React from 'react';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!){
    eliminarProducto(id: $id)
  }
`;

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

const Producto = ({producto}) => {

  const {nombre, existencia, precio, id} = producto;

  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache){
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS
      });

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter( productoActual => productoActual.id !== id)
        }
      })
    }
  });

  

  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then( async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminarProducto({
            variables: {
              id
            }
          });
          Swal.fire(
            'Correcto',
            data.eliminarProducto,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  const editaProducto = () => {
    Router.push({
      pathname: '/editarproducto/[id]',
      query: { id }
    })
  }

  return (
    <tr >
      <td className='border px-4 py-2'>{nombre} </td>
      <td className='border px-4 py-2'>{existencia}</td>
      <td className='border px-4 py-2'>$ {precio}</td>
      <td className='border px-4 py-2'>
        <button
          onClick={() => confirmarEliminarProducto()}
          type='button'
          className='flex items-center bg-red-400 text-white rounded p-1 align-middle hover:bg-red-500 cursor-pointer'>
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className='w-4 h-4 ml-2'
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          onClick={() => editaProducto()}
          type='button'
          className='flex items-center bg-green-400 text-white rounded p-1 align-middle hover:bg-green-500 cursor-pointer'>
          Editar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className='w-4 h-4 ml-2'
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default Producto;