import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
  query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {

  const router = useRouter();
  const {data, loading} = useQuery(OBTENER_USUARIO);

  if(loading) return null;

  if(!data) {
    return router.push('/login');
  }

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem('token-crm');
    router.push('/login');
  }

  return (
    <div className='flex justify-between mb-6'>
      <p className='mr-2'>Hola: {nombre} {apellido}</p>

      <button
        className='bg-gray-600 px-4 py-1 text-white text-xs rounded hover:bg-gray-700'
        type='button'
        onClick={()=> cerrarSesion()}
      >Cerrar Sesión</button>
    </div>
  )
}

export default Header;
