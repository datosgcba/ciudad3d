import React, { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box } from '@material-ui/core'

import { initMap, updateMap } from 'state/ducks/map'
import { useDispatch, useSelector } from 'react-redux'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Buscador from 'components/Buscador/Buscador'
import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
import LogoutButton from 'components/LogoutButton/LogoutButton'

import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'

import useStyles from './styles'

// TODO: !Revisar el tema del token
/*
Por ahora para usar ingresar obtener el token y setear en local storage
curl 'http://seguridad.eastus2.cloudapp.azure.com/rest-auth/login/' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  --data-binary '{"username":"admin","password":"adminusig1234"}'

El token setearlo así
localStorage.setItem("token", '7b3ea1f12563ee390a13ab885884e4590cf6de26')
*/
const transformRequest = (url, resourceType) => {
  const token = localStorage.getItem('token')
  if (token === undefined) {
    console.log('Token is null')
  }
  if (resourceType === 'Tile' && url.endsWith('pbf')) {
    return {
      url,
      headers: { Authorization: `Token ${token}` }
      // credentials: 'include'  // Include cookies for cross-origin requests
    }
  }
}

const Mapa = ({ logged, updateMapAction, initMapAction }) => {
  const map = useSelector((state) => state.map.mapaGL)
  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  const onFeatureClick = (mapGL, lngLat, feature) => {
    mapGL
      .getFeatureProps(feature.properties.Id)
      .then((res) => res.json())
      .then((props) => {
        const { contenido, direccionNormalizada } = props
        const featureInfoString = renderToString(<FeatureInfo contenido={contenido} direccionNormalizada={direccionNormalizada} />)
        mapGL.addPopup(lngLat, featureInfoString)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (map) {
      map.toggleBaseLayer()
    }
  }, [capabasePrincipal])

  useEffect(() => {
    if (!map) {
      const instanciaMap = new MapaInteractivoGL({
        onFeatureClick,
        transformRequest
      })

      // dispatch de la accion para guardar la instancia en el store
      dispatch(updateMap(instanciaMap))

      // agrego las capas prendidas por default
      dispatch(initMap())
    }
  }, [map, dispatch])

  const classes = useStyles()
  return (
    <Container id="map" className={classes.container}>
      <div className={classes.topMenu}>
        <Buscador />
        {logged ? <LogoutButton /> : null}
      </div>
      <Box onClick={() => setCapabasePrincipal(!capabasePrincipal)} className={classes.bottomMenu}>
        <div
          className={classes.minimapLayer}
          style={{
            backgroundImage: !capabasePrincipal
              ? `url(${imgCapaBasePrincipal})`
              : `url(${imgCapaBaseSecundaria})`
          }}
        >
          <div className={classes.minimapTitleContainer}>
            <div className={classes.minimapTitle}>
              {!capabasePrincipal ? 'Modo Oscuro' : 'Modo Claro'}
            </div>
          </div>
        </div>
      </Box>
    </Container>
  )
}
export default Mapa
