/* buscador */
//todo esto esta explicado en otros javas.
window.onload = function() {
  var queryString = new URLSearchParams(location.search)
  var busco = queryString.get("buscador")
  var usuario = localStorage.getItem("user")
  if (usuario != null) {
    document.querySelector("button.btn-log").style.display = "none"
    document.querySelector("li.prefes").style.display = "block"
    document.querySelector("li.lg").style.display = "block"
  }else {
    document.querySelector("li.prefes").style.display = "none"
    document.querySelector("button.btn-log").style.display = "block"
  }

// esto es para el menu que se desplaza para abajo cuando te paras arriba de generos
//anda y busca en este link las appis y transformalas en json para listearlas
fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES")
  .then(function(respuesta) {
    return respuesta.json()
    console.log(respuesta);
  })
//ahora agarra en especial los generos y traelos como arrays infinitos
  .then(function(informacion) {
    var arrayGeneros = informacion.genres
    for (var i = 0; i < arrayGeneros.length; i++) {
      var nombre = arrayGeneros[i].name
      var id = arrayGeneros[i].id
      var li;
      li = '<li>'
      li += '<a href=/listaGeneros?idGenero=' + id + '&genero='+nombre+'>' + nombre + '</a>'
      li += '</li>'
//estructura que va a linkear donde posicionarlos
      document.querySelector("ul.gen").innerHTML += li
    }

  })
  .catch(function(error) {
    console.log("Error: " + error);
  })
//esto es para que cuando busques, si escribis 2 caracteres, arroje error
  document.querySelector("form.buscar").onsubmit = function(e) {
  var busco = document.buscar.buscador.value;
  console.log(busco);
  // var buscadorInput = document.querySelector("input")
  if (busco.length <= 3) {
    e.preventDefault()
    UIkit.notification({message: 'Ingrese mas de tres caracteres', status: 'warning',  timeout: 2000})
}else {

}
}
//LOGIN
document.querySelector("form.login").onsubmit = function(e) {

  var usuario = document.login.user.value;
  localStorage.setItem('user', usuario);
  var mail = document.login.mail.value;
  var genero= document.login.genero.value;
  var formatEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (usuario== '' || mail== '' && mail.value.match(formatEmail)== null  || genero== '') {
    e.preventDefault()
    UIkit.notification({message: 'Porfavor, complete el formulario', status: 'warning',  timeout: 2000})
  }else {
    e.preventDefault()
    UIkit.notification().close()
    localStorage.setItem("user", usuario)
    document.querySelector("button.btn-log").style.display = "none"
    document.querySelector("li.prefes").style.display = "block"
    document.querySelector(".uk-modal-close-default").click()
    document.querySelector("li.lg").style.display = "block"
    var nombre = document.querySelector("input.name").value
  }
}
document.querySelector("a.logout").onclick = function(e) {
  localStorage.clear()
  document.querySelector("li.prefes").style.display = "none"
  document.querySelector("button.btn-log").style.display = "block"
}
var urlGeneros = "https://api.themoviedb.org/3/genre/tv/list?api_key=c46d596a03200866b9f7e316643a628f"

     fetch(urlGeneros)
      .then(function(respuesta){
         return respuesta.json();
       })
       .then(function(datos){
           var datosFinales = datos.genres;
           var deseados = document.querySelector("#generosDeseados");
           var excluidos = document.querySelector("#generosExcluidos");
           var options = "";
           for (var i = datosFinales.length - 1; i >= 0; i--) {
             options += "<option value='"+datosFinales[i].id+"'>"+datosFinales[i].name+"</option>";
           }
           deseados.innerHTML = options;
           excluidos.innerHTML = options;

       });

var form = document.querySelector(".formularioAvanzado");

form.onsubmit = function(e){

var generosDeseados = document.querySelector('#generosDeseados option:checked');
var generosExcluidos = document.querySelector('#generosExcluidos option:checked');
var orden = document.querySelector('#orden option:checked');
var anio = document.querySelector('input[name="anio"]');

console.log(generosDeseados.value);
console.log(generosExcluidos.value);
console.log(orden.value);
console.log(anio.value);

e.preventDefault();

var tituloResultado = document.querySelector("#tituloResultado");
tituloResultado.removeAttribute("hidden");
var mensaje = document.querySelector("#mensaje");
var destino = document.querySelector(".resultadosBusqueda");

   var urlBuscar = "https://api.themoviedb.org/3/discover/tv?api_key=e31dd59fefbc10e65215ecd077762f57&sort_by="+orden.value+"&first_air_date_year="+anio.value+"&with_genres="+generosDeseados.value+"&without_genres="+generosExcluidos.value;
     fetch(urlBuscar)
      .then(function(respuesta){
         return respuesta.json();
       })
       .then(function(datos){
           var datosFinales = datos.results;
           if(datosFinales.length == 0){
             mensaje.removeAttribute("hidden");
           }else{
             var destino = document.querySelector(".resultadosBusqueda");
             mensaje.setAttribute("hidden", true);
             console.log(datosFinales);
             var div = "";
             for(var i=0; i<datosFinales.length; i++){
               div += "<div class='col-lg-4'>";
               div += "<img style='width:100%' src='https://image.tmdb.org/t/p/original/"+datosFinales[i].poster_path+"'>";
               div += "<p><a class='btn btn-secondary' href='/detalleSerie?idSerie="+datosFinales[i].id+"' role='button'>GO</a></p>";
               div += "</div>";
             }
             destino.innerHTML = div
           }
       });

}

}