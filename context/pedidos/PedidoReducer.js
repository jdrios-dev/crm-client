import {
  SELECCIONAR_CANTIDAD,
  SELECCIONAR_PRODUCTO,
  SELECCIONAR_CLIENTE
} from '../../types';

export default ( state, action ) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      }

    default:
      return state
  }
}