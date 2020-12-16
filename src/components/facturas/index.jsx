import React,{useEffect} from 'react'

/**Services */
import {getFacturas} from '../../services/facturas.service'

function Facturas() {

  useEffect(() => {
    getFacturas()
  }, [])

  return (
    <div>
      <h1>Facturas</h1>
      
    </div>
  )
}

export default Facturas
