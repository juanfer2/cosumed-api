import callFetch from './config.service'

const BASE_URL_FACTURAS = 'https://d560f2153731.ngrok.io/api/Devoluciones/'

https://localhost:44361/api/Devoluciones/GetDevolucion

export const getFacturas = async(data_body) => {
  try {
    const rsp = await callFetch({
      baseUrl: BASE_URL_FACTURAS,
      url: 'GetDevolucion',
      method: 'POST',
      data: {
        Cliente: '',
        Orden: ''
      }
    })
    console.log(rsp)
    return rsp
  } catch (error) {
    return error
  }
}
