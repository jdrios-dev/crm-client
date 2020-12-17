import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_CLIENTE =  gql`
  mutation eliminarCliente($id: ID!){
    eliminarCliente(id: $id)
  }
`;
const OBTENER_CLIENTES_USUARIO = gql `
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Cliente = ({cliente}) => {

  const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
    update(cache){
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor : obtenerClientesVendedor.filter(
            clienteActual => clienteActual.id !== id)
        }
      })
    }
  });

  const {
    id,
    apellido,
    nombre,
    empresa,
    email} = cliente;

  const confirmarEliminarCliente = id => {
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
      if (result.isConfirmed) {
        try {
          const {data} = await eliminarCliente({
            variables: {
              id
            }
          });
          Swal.fire(
            'Eliminado!',
            data.eliminarCliente,
            'success'
          )
        } catch (error) {
          Swal.fire(
            'Error!',
            'No se pudo eliminar el cliente',
            'error'
          )
        }
      }
    })
  }

  return (
      <tr >
        <td className='border px-4 py-2'>{nombre} {apellido}</td>
        <td className='border px-4 py-2'>{empresa}</td>
        <td className='border px-4 py-2'>{email}</td>
        <td className='border px-4 py-2'>
          <button
            onClick={() => confirmarEliminarCliente(id)}
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
      </tr>
  )
}

export default Cliente;
