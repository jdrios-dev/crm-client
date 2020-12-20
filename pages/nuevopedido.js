import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';

//Context de Pedidos
import PedidoContext from '../context/pedidos/PedidoContext';


const NuevoPedido = () => {

  //Utilizar context y extraer sus valores
  const pedidoContext= useContext(PedidoContext);


  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Crear Nuevo Pedido</h1>

      <AsignarCliente />
    </Layout>
  )
}

export default NuevoPedido;