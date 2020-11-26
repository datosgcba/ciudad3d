# Plano Abierto-CUR3D
### Uso:
En source/src/appConfig.js se configuran los grupos y las capas que figurarán en el panel lateral y las secciones que se abren al seleccionar cada categoría así como también la visualización de sus capas<br />
Se pueden agregar capas usando directamente las funcionalidades de [mapbox gl js](https://docs.mapbox.com/mapbox-gl-js/style-spec/)


### Nota del autor:

Este proyecto depende fuertemente de src/utils/MapaInteractivoGL.js que es una clase que intenta reemplazar la librería publicada en npm de [mapainteractivo](https://www.npmjs.com/package/@usig-gcba/mapa-interactivo) pero usando mapbox en lugar de leaflet.
En el futuro probablemente sea conveniente usar directamente [react-map-gl](https://uber.github.io/react-map-gl/) o [deck.gl](https://deck.gl/#/), eso es algo que habría que evaluar.

## Stack
- React (frontend)

# Frontend:

Para probarlo simplemente clonar el repositorio y  ejecutar estas dos lineas de código en la consola.
```bash
npm install
npm start
```
Se abre una solapa en [http://localhost:``3000``](http://localhost:3000) el valor ``PORT`` definido en ``.env``

Para poder utilizar el captcha que se encuentra en la categoria *Ayudanos a mejorar* 
se debe cambiar localhost por [http://127.0.0.1:``3000``](http://127.0.0.1:3000)

## Desarrollo

### Entorno
Se ha probado utilizando node 12.18.2 (lts/erbium) con npm 6.14.5, específicamente se ha desarrollado sobre windows 10, Linux Ubuntu y macOS Catalina, es de suponer se puede continuar el desarrollo en cualquier sistema operativo que soporte node 12 o superior.

### IDE

Si bien el proyecto debería poder ser utilizado con cualquier IDE, se recomienda fuertemente utilizar VSCode con las siguientes dos extensiones:

* **ESLint**: Resalta en rojo los errores de ESLint, es importante que procuremos mantener un estilo de código unificado. Este estilo esta definido en ``.eslintrc.json``

* **Debugger for Chrome**:  Útil al momento de depurar código, también se recomienda usar log points en reemplazo de ``console.log`` si se desea hacer console.log por favor no deshabilitar el ESLint en esa linea, para asegurar que se eliminara antes de hacer el commit.

* **Live Share**: Permite un fácil trabajo en equipo, al momento de ver código en el que esta trabajando un compañero.

Otras extensiones útiles:
* **GitLens**: Varias utilidades de git que son más practicas en un entorno visual que por consola, por ejemplo comparar archivos entre versiones o ver el último commit de cada linea de código.
  
* **TODO List**: Cuándo tenemos código que sabemos debemos volver a ver tiempo después. es fácil encontrar los ``// TODO:`` ya que permite tenerlos todos juntos en la barra Explorer.
*  Hay muchísimas otras extensiones que pueden resultar útiles como Prettier, Markdown All in One, vscode-icons, colorize, Spell Right.

### Estructura de la aplicación


* **containers**: Son las páginas, para esta aplicación solo se necesita el container **Home** que sirve de contenedor de los componentes principales **Map**, **SideBar** y **Sections**.

* **components**: Como se dijo en containers hay tres componentes principales que engloban toda la aplicación
  * **Map**: Es un contenedor del mapa generado por mapbox gl js a través de **MapaInteractivoGL**, el mini-mapa sirve para cambiar entre modo claro y oscuro

  * **SideBar**: Es un contenedor de **Categories** las cuales se obtienen desde appConfig

  * **Sections**: Cuando una **Category** es seleccionada este componente despliega el 
  **Section** correspondiente. A su vez cada **Section** permite navegar entre los **SubSection**

  * **theme**: Definiciones sobre los estilos a utilizar, procurando mantener dentro de lo posible los lineamientos de [Material Design](https://material.io/), pero tomando como prioridad el [diseño](https://xd.adobe.com/view/2f060d90-f9de-445c-b939-f8f42d763eec-7a55/)

    ``index.js``: Contiene las modificaciones sobre el tema de estilos material-ui por defecto.

    **Wrappers**: están algunos componentes basados en material-ui para que sean utilizados por los componentes y todos mantengan la estetica.

* **state**: Aquí se encuentra el estado de la aplicación siguiendo la [guía de estilos redux](https://redux.js.org/style-guide/style-guide) la estructura interna de carpetas y archivos está basada en el [patrón ducks](https://github.com/erikras/ducks-modular-redux), si algún duck se volviera muy complejo tal vez sea recomendable utilizar el patrón [re-ducks](https://github.com/alexnm/re-ducks).
  
* **utils**: Por supuesto contiene funciones útiles y transversales a las diferentes partes de la aplicación. Entre ellas las más importante son:
  * **MapaInteractivoGL**: Sin lugar a dudas aquí se encuentran partes vitales de la aplicación, desde aquí se puede acceder a mapbox gl js que es el corazón de la aplicación.
  * **mapBoxUtils**: Principalmente funciones que retornan promesas a ser utilizadas por el middleware. Estas promesas suelen hacer uso de **MapaInteractivoGL** y **Mapbox GL JS**
  * **configQueries**: Sirve para desacoplar los componentes de la configuración de la aplicación.
 
* **appConfig.json**: Actualmente es principalmente un json que contiene toda la información necesaria que la aplicación pueda ser fácilmente adaptada. Se recomienda fuertemente que solo acceda a estas configuraciones a través de **configQueries** con el objetivo de mantener desacoplado la configuración de los componentes y así sea algo relativamente sencillo en un futuro migrar para obtener la configuración desde un api y que esta pueda ser almacenada en memoria o en el sessionStorage según sea conveniente. 


### Sobre la librería **Mapbox GL JS** el componente **Map** y las utilidades **mapboxUtils** y **MapaInteractivoGL**

Como se dijo el corazón de la aplicación es **Mapbox GL JS** esta es una excelente librería para el uso de mapas, lamentablemente está librería está orientada a un paradigma de eventos y objetos donde cada uno mantiene su propia fuente de estado. Mientras por otro lado la aplicación se basa en el principio de redux en mantener una única fuente de datos. Para lograr acoplar estos dos tan diferentes estilos de desarrollo se opta por realizar llamadas a promesas desde el middleware que invoquen los eventos ofrecidos y métodos ofrecidos por mapbox y al terminar el middleware actualizara el estado para que los componentes puedan utilizarlo. Esto se realiza se realiza a través de **mapBoxUtils** y **MapaInteractivoGL**. Claramente esto puede ser una muy posible fuente de bugs, por eso se analizaron las alternativas [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) y [react-map-gl](https://github.com/visgl/react-map-gl) ambas ofrecen un wrapper de mapbox gl js, que en principio parecieran permitir una mejor integración entre ambos mundos, pero al entrar en detalle se puede ver que ambas están lejos de ofrece un wrapper del 100% de la funcionalidad de mapbox gl js y si llegáramos a necesitar algún comportamiento especifico, lo cual es altamente probable, la adaptación podría obligarnos a modificar el wrapper directamente, y mencionar que podríamos tener que llegar a resolver bugs internos que pudiera tener el wrapper. Tomando en cuenta esta importante limitación se opta por una integración en la manera antes mencionada a través de llamadas a promesas desde el middleware.

![Arquitectura de la aplicación](./docs/images/architecture.svg)
---
## Deploy

### El proyecto compilará el código con las variables seteadas en el archivo .env
```bash
npm run build
```

### Docker - deploy local
Para generar la imagen
```bash
docker build -t react-nginx .
```
Para generar el contendor
```bash
docker run -it --name react-nginx -p 8080:80 react-nginx
```
Para inciarlo luego
```bash
docker start react-nginx
```
