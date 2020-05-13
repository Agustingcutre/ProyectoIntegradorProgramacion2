/* Este asterico abarca absolutamente todo ene sta pagina */

* {
    margin: 0;
    padding: 0;
  }
  
  /* Header */
  
  img.nav-logo{
    width: 13vh;
    height: 6vh;
  }
  
  div.contenedorTitulos{
    background-color:rgba(133, 11, 11, 0.863);
    display: flex;
    width: 100%;
    text-align: center;
  }
  
  .li-line:hover{
    color: white;
    background-color:rgba(133, 11, 11, 0.6);
    text-decoration: none;
  }
  .li-a{
    font-family: sans-serif;
  }
  
  .uk-navbar-container:not(.uk-navbar-transparent) {
      background: #333;
      border-bottom: 1px solid #bbb;
  }
  
  /* boton login */
  .botonLogin{
    width: 100px;
    height: 25px;
    background-color: black;
    color: white;
    border-radius: 20px;
    position: absolute;
    top: 4vh;
    left: 75vh;
    cursor: pointer;
  }
  
  /*buscador*/
  
  .contenedorBuscador{
  position: absolute;
  right: 4vh;
  top: 3vh;
  }
  
  .buscar{
   border-radius: 40px;
   height: 4vh;
   justify-content: center;
   display: flex;
  }
  
  .iconoBuscador{
   color:white;
     height: 8vh;
  }
  
  body {
    margin:0;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size:17px;
    color: rgba(133, 11, 11, 0.863);
    line-height: 1.6;
     background-image:url("../img/colorFondo.png");
  }
  
  /* aca va el estilo del buscador avanzado */
  
  #formularioBusquedaAvanzada {
    background-image: url("../img/pochoclos.jpeg");
    border-radius: 20px;
    width: 65%;
    height: 60%;
    color:white;
    transition: 2320ms;
    position: relative;
    left: 30vh;
  }
  
  #formularioBusquedaAvanzada2{
    border: 0px solid black;
    padding: 20px;
  }
  
  textarea{
    width: 60vh;
    height: 15vh;
    border-radius: 20px;
  }
  
  input.datos{
    width: 60vh;
    height: 3vh;
    border: 1px solid black;
    border-radius: 80px;
  }
  
  #botonBusquedaAvanzada{
    background-color: black;
    color: white;
    border: 1px solid black;
    border-radius: 80px;
    width: 10vh;
    height: 6vh;
    cursor:pointer;
  }
  
  /* Footer */
  
  #section-a {
  
    padding: 20px;
    background-color:rgba(133, 11, 11, 0.863);
    text-align: center;
  }
  
  
  ol.containerapellidos {
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-decoration: none;
  }
  
  .apellidos {
    padding-left: 9px;
    padding-top: 4px;
    color: white;
    text-decoration: none;
  }
  
  .subfooter {
    padding: 10px;
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .loguito {
    margin-top: 10px;
  }
  
  a {
    color: white;
  }
  
  a:hover {
    color: black;
  }
  