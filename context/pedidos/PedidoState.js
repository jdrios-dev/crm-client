import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
  SELECCIONAR_CANTIDAD,
  SELECCIONAR_PRODUCTO,
  SELECCIONAR_CLIENTE
} from '../../types';

const PedidoState = ({children}) => {

  const initialState = {
    cliente: {},
    produtos: [],
    total: 0
  }

  const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

  //Modifica el Cliente
  const agregarCliente = (cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        agregarCliente
      }}
    > {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState;
