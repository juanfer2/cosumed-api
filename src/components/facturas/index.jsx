import React,{useEffect} from 'react'

/**Services */
import {getFacturas} from '../../services/facturas.service'
import ListaFacturas from './defaults/listaFacturas'

function Facturas() {

  useEffect(() => {
    getFacturas()
  }, [])

  return (
    <div>
      <h1>Facturas</h1>
      <p>Hola Dani</p>
      <p>Hola Albe</p>
      <ListaFacturas/>
    </div>
  )
}

export default Facturas
