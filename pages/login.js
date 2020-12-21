import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const LOGIN_CUENTA = gql`
  mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input: $input){
      token
    }
  }
`;

const login = () => {

  const [ autenticarUsuario ] = useMutation(LOGIN_CUENTA);

  const [mensaje, setMensaje] = useState(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es valido')
        .required('El email no puede ir vacio'),
      password: Yup.string()
        .required('el password es obligatorio')
    }),
    onSubmit: async valores => {
      const { email, password } = valores;
      try {
        const {data} = await autenticarUsuario({
          variables: {
            input: {
              email,
              password 
            }
          }
        });
        setTimeout(() => {
          const {token} = data.autenticarUsuario;
          localStorage.setItem('token-crm', token);
        }, 1000);
        router.push('/');
      } catch (error) {
        setMensaje(error.message);
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    }
  })

  const mostrarMensaje = () => {
    return(
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded'>
        <p>{mensaje}</p>
      </div>
    )
  };

  return (
    <>
      <Layout>
        { mensaje && mostrarMensaje() }
        <h1 className='text-center text-2xl text-white'>Login</h1>

        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form
              onSubmit={formik.handleSubmit}
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  id='email'
                  type='email'
                  placeholder='Email Usuario'
                  className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div> 
              {
                formik.touched.email && formik.errors.email ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.email}</p>
                  </div> )
                  : null
              }
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  id='password'
                  type='password'
                  placeholder='Password'
                  className='shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div> 
              {
                formik.touched.password && formik.errors.password ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.password}</p>
                  </div> )
                  : null
              }
              <input 
                type='submit'
                value='Iniciar Sesión'
                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded hover:bg-gray-600 cursor-pointer'            
              />

            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default login
