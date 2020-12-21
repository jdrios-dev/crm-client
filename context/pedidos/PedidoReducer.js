import {
  SELECCIONAR_CANTIDAD,
  SELECCIONAR_PRODUCTO,
  SELECCIONAR_CLIENTE,
  ACTUALIZAR_TOTAL
} from '../../types';

export default ( state, action ) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      }
    case SELECCIONAR_PRODUCTO: 
      return {
        ...state,
        productos: action.payload
      }
    case SELECCIONAR_CANTIDAD:
      return {
        ...state,
        productos: state.productos.map( producto => producto.id === action.payload.id ? producto = action.payload : producto )
      }

    case ACTUALIZAR_TOTAL:
      return {
        ...state,
        total: state.productos.reduce( (nuevoTotal, articulo) => nuevoTotal+= articulo.precio * articulo.cantidad, 0 )
      }

    default:
      return state
  }
}