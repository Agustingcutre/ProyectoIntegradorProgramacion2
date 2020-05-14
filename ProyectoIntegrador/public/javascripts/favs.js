window.onload = function() {
    var queryString = new URLSearchParams(location.search)
    var idPeli = queryString.get("idPeli")
    var genero = queryString.get("genero")
    var usuario = localStorage.getItem("user")
    if (usuario != null) {
      document.querySelector("button.btn-log").style.display = "none"
      document.querySelector("li.prefes").style.display = "block"
      document.querySelector("li.lg").style.display = "block"
  
    }
    var json = localStorage.getItem("pelisFavs")
  
    if (json != null) {
      var objLit = JSON.parse(json)
      var favoritos = objLit.carac
    } else {
      var favoritos = []
    }
  
    for (var i = 0; i < favoritos.length; i++) {
      var idPeli = favoritos[i]
  
        fetch("https://api.themoviedb.org/3/tv/"+idPeli+"?api_key=3e7db3a288e409d2f1823c536f9d81f0&language=es-ES")
        .then(function(respuesta) {
          return respuesta.json()
        })
        .then(function(informacion) {
          var peliDetalle = informacion
  
          var nombre = peliDetalle.title
          var png = peliDetalle.poster_path
          var fechaestreno = peliDetalle.release_date
          var desc = peliDetalle.overview
          var id = peliDetalle.id
  
          document.querySelector(".ul-fotos").innerHTML += "<li class="+"li-item"+ "tabindex="+"0"+"><a href=/detalleSerie?idPeli=" + id + "><img class="+"img-li"+" src=" + "https://image.tmdb.org/t/p/w185" +png+"></a>"
        })
    }
    //ESTO ES Generos
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=3e7db3a288e409d2f1823c536f9d81f0&language=es-ES")
      .then(function(respuesta) {
        return respuesta.json()
        console.log(respuesta);
      })
      .then(function(informacion) {
        var arrayGeneros = informacion.genres
        for (var i = 0; i < arrayGeneros.length; i++) {
          var nombre = arrayGeneros[i].name
          var id = arrayGeneros[i].id
          var li;
          li = '<li>'
          li += '<a href=/listaGeneros?idGenero=' + id + '&genero='+nombre+'>' + nombre + '</a>'
          li += '</li>'
  
          document.querySelector("ul.gen").innerHTML += li
        }
  
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
                document.querySelector("form.buscar").onsubmit = function(e) {
                var busco = document.buscar.buscador.value;
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
      document.querySelector("li.saludop").style.display = "block"
      document.querySelector("p.saludo").innerHTML = "Hola " + usuario
      document.querySelector(".uk-modal-close-default").click()
      document.querySelector("li.lg").style.display = "block"
      var nombre = document.querySelector("input.name").value
    }
  }
  document.querySelector("a.logout").onclick = function(e) {
    localStorage.clear()
    document.querySelector("li.prefes").style.display = "none"
    document.querySelector("li.saludop").style.display = "none"
    document.querySelector("button.btn-log").style.display = "block"
  }
  }