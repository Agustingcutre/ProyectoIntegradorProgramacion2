/* buscador */
//todo esto esta explicado en otros javascripts.
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
    var cont= 2;
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          fetch("https://api.themoviedb.org/3/search/tv?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES&query="+busco+"&page="+ cont+"&include_adult=false")
            .then(function(respuesta) {
              return respuesta.json()
              console.log(respuesta);
            })
            .then(function(informacion) {
                  var arrayBusqueda = informacion.results
                  for (var i = 0; i < arrayBusqueda.length; i++) {
                    var png = arrayBusqueda[i].poster_path;
                    var id = arrayBusqueda[i].id
                    document.querySelector(".ul-fotos").innerHTML += "<li class="+"li-item"+ "tabindex="+"0"+"><a href=/detalleSerie?idPeli=" + id + "><img class="+"img-li"+" src=" + "https://image.tmdb.org/t/p/w185" +png+"></a>"
                  }
            })
            .catch(function(error) {
              console.log("Error: " + error);
            })
        }
    };
  
  // esto es el fetch par el buscador. va a traerme lo que busque en buscador.
  fetch("https://api.themoviedb.org/3/search/tv?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES&query="+busco+"&page=1&include_adult=false")
    .then(function(respuesta) {
      return respuesta.json()
      console.log(respuesta);
    })
    .then(function(informacion) {
          var arrayBusqueda = informacion.results
          console.log(arrayBusqueda.length);
          if (arrayBusqueda.length < 1) {
            alert("No se han encontrado resultados");
            window.location = "/buscadorAvanzado"
          }
          for (var i = 0; i < arrayBusqueda.length; i++) {
            var png = arrayBusqueda[i].poster_path;
            var id = arrayBusqueda[i].id
            document.querySelector(".ul-fotos").innerHTML += "<li class="+"li-item"+ "tabindex="+"0"+"><a href=/detalleSerie?idPeli=" + id + "><img class="+"img-li"+" src=" + "https://image.tmdb.org/t/p/w185" +png+"></a>"
          }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })
  
    //carrousel
    fetch("https://api.themoviedb.org/3/search/tv?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES&query="+busco+"&page=1&include_adult=false")
      .then(function(respuesta) {
        return respuesta.json()
        console.log(respuesta);
      })
      .then(function(informacion) {
        var arrayDeMovies = informacion.results
        for (var i = 0; i < 8; i++) {
          var id = arrayDeMovies[i].id
          var png = arrayDeMovies[i].poster_path
          document.querySelector("ul.uk-slider-items").innerHTML += "<li class="+"uk-transition-toggle"+ "tabindex="+"0"+"><a href=/detalleSerie?idPeli=" + id + "><img src=" + "https://image.tmdb.org/t/p/w500" +png+"></a><div class="+"uk-position-center uk-panel"+"><h1 class=" + "uk-transition-slide-bottom-small"+">1</h1></div></li>"
        }
  
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
  
  
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
    //estructura que va a linkear donde posicionarlos
          li = '<li>'
          li += '<a href=/buscador?idGenero=' + id + '&genero='+nombre+'>' + nombre + '</a>'
          li += '</li>'
    //estilo selector para los genros
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
  }