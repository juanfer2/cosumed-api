import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Collapse, CardBody, Card, CardHeader, Accordion, Button, Table } from 'react-bootstrap'

import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
import {theme, useStyles} from './StylesDevoluciones'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  Select,
  Fab,
  TextField,
} from '@material-ui/core'


function DatosApi(props) {
  const url = ('https://localhost:44361/api/Devoluciones/GetDevolucion');
  const urlpost = ('https://localhost:44361/api/Devoluciones/GetDetalle');

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [detal, setDetal] = useState([]);
  const [ordend, setOrdend] = useState('');

  const peticionPost = () => {
    let Documento = {
      Cliente: props.Client,
      Orden: props.Orde
    };

     axios.post(url, Documento)
      .then(response => {
        setData(data.concat(response.data))
      })
  }

  const peticionPostId = (orden) => {
    const document = {
      Orden: orden
    }
    axios.post(urlpost, document)
      .then(res => {
        setDetal(res.data)
      }, error => console.log(error))
  }

  const detalleFactura = factura => {
    setOrdend(factura);
    peticionPostId();
    console.log(factura)
  }

  useEffect( () => {
    peticionPost();
  }, [])

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
  return (
    <div>

      <Accordion>
        {data.map(factura => (
          <Card>
            <Card.Header Key={factura.Orden}>
              <Accordion.Toggle as={Button} variant="link" Key={factura.Orden} eventKey={factura.Orden} onClick={ () => detalleFactura(factura.Orden)} >
                <ul><li>{factura.Orden + '                             ' + factura.Cliente + '                          ' + factura.Fecha} </li></ul>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={factura.Orden}>

              <Card.Body >

                <div className="table-responsive">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th className="text-center">Sku</th>
                        <th className="text-center">Referencia</th>
                        <th className="text-center">Descripcion</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center">Precio</th>
                      </tr>
                    </thead>
                    {detal.map(item => (
                      <tbody>
                        <tr>
                          <td> <input
                            type="checkbox"
                            defaultChecked={false}
                          /></td>                         
                          <th className="text-center" >{item.SkuId}</th>
                          <td className="text-center">{item.Referencia}</td>
                          <td className="text-center">{item.Descripcion}</td>
                          <td className="text-center">
                            <TextField
                              id="standard-number"
                              type="number"
                              style={{ width: 35, fontsize: 5 + 'px' }}
                              placeholder={item.Cantidad}
                              min={1} max={item.Cantidad}
                              InputLabelProps={{
                                shrink: true,
                                readOnly: true,
                              }}
                            />
                          </td>
                          <td className="text-center">{formatterPeso.format(item.Precio)}</td>
                        </tr>

                      </tbody>
                    ))}
                  </Table>

                </div>
                <div className="pull-right">
                  <Fab
                    variant="extended"
                    size="medium"
                    aria-label="add"
                    className={classes.margin}
                    theme={theme}
                    style={{ background: "#ffa726" }}
                  >
                    <PlaylistAddCheckIcon />
                &nbsp; Generar Devolución
              </Fab>
                </div>
              </Card.Body>

            </Accordion.Collapse>

          </Card>
        ))
        }
      </Accordion>



    </div>
  )
};


export default DatosApi
