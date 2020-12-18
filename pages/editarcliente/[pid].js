import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_CLIENTE = gql`
query obtenerCliente($id: ID!){
  obtenerCliente(id: $id){
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`;

const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id: $id, input: $input){
      nombre
      email
    }
  }
`;

export  const EditarCliente = () => {

  const router = useRouter();
  const { query: { id } } = router;

  const {data, loading} = useQuery(OBTENER_CLIENTE, {
    variables: {
      id
    }
  });

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)

  const schemaValidacion = Yup.object({
    nombre: Yup.string()
      .required('El nombre del cliente es obligatorio'),
    apellido: Yup.string()
      .required('El apellido del cliente es obligatorio'),
    email: Yup.string()
      .email('El email no es valido')
      .required('El email del cliente es obligatorio'),
    empresa: Yup.string()
      .required('La empresa del cliente es obligatorio')
  })

  if(loading) return 'Cargando...';

  const { obtenerCliente } = data;

  const actualizarInfoCliente = async valores => {
    const { nombre, apellido, empresa, email, telefono } = valores;
    try {
      const {data} = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono
          }
        }
      });
      Swal.fire(
        'Cliente Actualizado',
        'El cliente se actualizó correctamente',
        'success'
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Editar Cliente</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues= { obtenerCliente }
            onSubmit={(valores)=>{
              actualizarInfoCliente(valores);
            }}
          >

            {props => {

              return (
              <form
                onSubmit={props.handleSubmit}
                className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                    Nombre
                  </label>
                  <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.nombre}
                    id='nombre'
                    type='text'
                    placeholder='Nombre Cliente'
                    className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                {
                    props.touched.nombre && props.errors.nombre ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.nombre}</p>
                      </div> )
                      : null
                  }
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                    Apellido
                  </label>
                  <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.apellido}
                    id='apellido'
                    type='text'
                    placeholder='Apellido Cliente'
                    className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                  {
                    props.touched.apellido && props.errors.apellido ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.apellido}</p>
                      </div> )
                      : null
                  }
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                    Email
                  </label>
                  <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    id='email'
                    type='email'
                    placeholder='Email Cliente'
                    className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                  {
                    props.touched.email && props.errors.email ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.email}</p>
                      </div> )
                      : null
                  }
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                    Empresa
                  </label>
                  <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.empresa}
                    id='empresa'
                    type='text'
                    placeholder='Empresa Cliente'
                    className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                {
                    props.touched.empresa && props.errors.empresa ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.empresa}</p>
                      </div> )
                      : null
                  }
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                    Telefono
                  </label>
                  <input
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.telefono}
                    id='telefono'
                    type='tel'
                    placeholder='Telefono Cliente'
                    className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
                <input
                  type='submit'
                  value='Editar Cliente'
                  className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer hover:bg-gray-600 rounded'
                />
              </form>
            )
          }}
          </Formik>
        </div>
      </div>
      </Layout>
    </div>
  )
}

export default EditarCliente;
