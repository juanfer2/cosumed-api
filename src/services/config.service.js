import axios from 'axios'

const callFetch = async({
  baseUrl,
  url,
  method,
  data ={},
  headers = {}
}) => {
  debugger
axios({
  baseUrl,
  url,
  method,
  data,
  headers
})
}

export default callFetch
