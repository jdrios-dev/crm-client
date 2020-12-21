import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import {gql, useQuery} from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES_USUARIO = gql`
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


const AsignarCliente = () => {

  const [cliente, setCliente] = useState([]);
  const pedidoContext = useContext(PedidoContext);
  const { agregarCliente } = pedidoContext;

  //Consultar DB

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente])

  const seleccionarCliente = sabores => {
    setCliente(sabores)
  }

  if(loading) return null;

  const { obtenerClientesVendedor } = data;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1. - Asigna un Cliente al pedido</p>
        <Select
        className='mt-2'
        options={obtenerClientesVendedor}
        onChange={(clientes)=>{ seleccionarCliente(clientes) }}
        getOptionValue={ (clientes)=> clientes.id }
        getOptionLabel={ (clientes)=> clientes.nombre }
        placeholder='Seleccione un cliente'
        noOptionsMessage={()=>'No hay resultados'}
        //
      />
    </>
  )
}

export default AsignarCliente;
