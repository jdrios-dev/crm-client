import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
//Context de Pedidos
import PedidoContext from '../context/pedidos/PedidoContext';


const NuevoPedido = () => {

  const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
      nuevoPedido(input: $input){
        id
      }
    }
  `;

  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);
  //Utilizar context y extraer sus valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const validarPedido = () => {
    return !productos.every(producto=> producto.cantidad > 0 ) || total === 0 || cliente.length == 0 ? 'opacity-50 cursor-not-allowed' : '' ;
  };

  const crearNuevoPedido = async () => {

    const { id } = cliente;

    //quitar prodiedades que no necesito
    const pedido = productos.map( ({__typename, existencia, ...producto}) => producto );

    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }
        }
      });

      Swal.fire(
        'Pedido Creado',
        'El pedido se creo correctamete',
        'success'
      )      
      router.push('/pedidos')
    } catch (error) {
      setMensaje(error.message);

      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    )
  }


  return (
    <Layout>

    { mensaje && mostrarMensaje() }

      <h1 className='text-2xl text-gray-800 font-light'>Crear Nuevo Pedido</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />

          <button
            type='button'
            className={`${validarPedido()} bg-gray-800 w-full mt-5 p-2  text-white uppercase font-bold hover:bg-gray-900`}
            onClick={() => crearNuevoPedido()}
          >
            Crear Pedido
          </button>
        </div> 
      </div> 

    </Layout>
  )
}

export default NuevoPedido;