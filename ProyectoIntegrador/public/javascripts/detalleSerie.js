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
    else {
      document.querySelector(".addfav").style.display = "none"

    }
    var json = localStorage.getItem("pelisFavs")

    if (json != null) {
      var objLit = JSON.parse(json)
      var favoritos = objLit.carac
    } else {
      var favoritos = []
    }
    if (favoritos.indexOf(idPeli) == -1) {
      document.querySelector(".addfav").innerHTML += "<button idPeli=" + idPeli + " class='favorito'>Agregar a Favoritos</button><br>"
    } else {
      document.querySelector(".addfav").innerHTML += "<button idPeli=" + idPeli + " class='favorito'>Quitar de Favoritos</button><br>"
    }

  //DATA DE  SERIE
//aca se hizo un fetch para buscar una appi segun el id.
//de este modo segun la pelicula en la que ingresas viene su informacion
  fetch("https://api.themoviedb.org/3/tv/"+idPeli+"?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES")
    .then(function(respuesta) {
      return respuesta.json()
      console.log(respuesta);
    })
    .then(function(informacion) {
      var peliDetalle = informacion
//creo variables con la informacion que voy a esperar obtener
      for (var i = 0; i < 1; i++) {
        var nombre = peliDetalle.title
        var png = peliDetalle.poster_path
        var fechaestreno = peliDetalle.release_date
        var desc = peliDetalle.overview
        var id = peliDetalle.id
        var img;
//traigo la imagen del poster de la pelicula
        img = '<img src='+'https://image.tmdb.org/t/p/w300'+png+'></a>'
//creo los querys que van a ser la herramienta para traer la informacion
        document.querySelector(".img-peli").innerHTML = img
        document.querySelector(".tit").innerHTML = "<span class=titulo>Titulo: </span>"+nombre
        document.querySelector(".genero").innerHTML = "<span class=titulo>Genero/s: </span>"
        document.querySelector(".lng").innerHTML +=  '<span class=titulo>Lenguaje Original: </span>'
        document.querySelector(".fchestreno").innerHTML = "<span class=titulo>Fecha De Estreno: </span>"+fechaestreno
        document.querySelector(".sinopsis").innerHTML ="<span class=titulo>Descripcion: </span>"+ desc


      }

//esta va a ser la seccion para adicionales "favoritos" pero todavia no me sale
      var botones = document.querySelectorAll("button.favorito")
      for (var i = 0; i < botones.length; i++) {
        botones[i].onclick = function() {
          var idPeli = this.getAttribute("idPeli")

          if (favoritos.indexOf(idPeli) == -1) {
            favoritos.push(idPeli)
            this.innerHTML = "Quitar de Favoritos"
          } else {
            var posicion = favoritos.indexOf(idPeli)
            favoritos.splice(posicion,1)
            this.innerHTML = "Agregar a Favoritos"
          }

          obj = {
            carac: favoritos
          }
          json = JSON.stringify(obj)
          localStorage.setItem("pelisFavs", json)
          console.log(localStorage);
        }

      }
      var arrayGenero = peliDetalle.genres
      for (var i = 0; i < arrayGenero.length; i++) {
        var nameGenero = arrayGenero[i].name
        var idGenero = arrayGenero[i].id
        document.querySelector(".genero").innerHTML += '<a href=listaGeneros.html?idGenero=' + idGenero + '&genero='+nameGenero+'>' + '<span class=titulo> </span>'+nameGenero + ',' + '</a>'
      }
      var arrayGenero = peliDetalle.spoken_languages
      for (var i = 0; i < arrayGenero.length; i++) {
        var languaje = arrayGenero[i].name
        document.querySelector(".lng").innerHTML +=  languaje+', '
      }

    })
    .catch(function(error) {
      console.log("Error: " + error);
    })

  //TRAILER
  fetch("https://api.themoviedb.org/3/tv/"+idPeli+"/videos?api_key=e31dd59fefbc10e65215ecd077762f57&language=en-US")
    .then(function(respuesta) {
      return respuesta.json()
      console.log(respuesta);
    })
    .then(function(informacion) {
      console.log(informacion);
      var array = informacion.results
      //nunca poner la variable nombre definida .name dentro de un for.
      //cuando hallan muchos objetos se puede romper
      var nombre = ""
      var li = '';
      for (var i = 0; i < array.length; i++) {
          nombre = array.name
          var id = array[i].key
          var url = 'https://www.youtube.com/embed/' + id
    // aca creo la cadena de videos para que aparezcan mas de uno
          //li += '<li>' //+= es para que agarre y cree un li sin tapar el anterior
          li += '<iframe width="520" height="315" src='+ url+' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
          //li += '</li>'
          console.log(li);
      }
//esto va a cumplir la funcion de agarrar y ejecutar. innerHTML va a ejecutar lo que arme con los "Li"
      document.querySelector(".mov-vid").innerHTML += li

    })
    .catch(function(error) {
      console.log("Error: " + error);
    })

      //RELACIONADAS
//creo el fetch para buscar relacionadas
      fetch("https://api.themoviedb.org/3/tv/"+idPeli+"/similar?api_key=e31dd59fefbc10e65215ecd077762f57&language=es-ES&page=1")
      .then(function(data) {
        return data.json()
        console.log(data);
      })
      .then(function(informacion) {

        var related = informacion.results
        for (var i = 0; i < related.length; i++) {
          var png = related[i].poster_path;
          var id = related[i].id
          var nombre = related[i].title
          li = '<li>'
          li += '<a href=/detalleSerie?idPeli=' + id + '><img src='+'https://image.tmdb.org/t/p/w185'+png+'></a>'
          li += '<div class='+'uk-position-center uk-panel'+'</div>'
          li += '</li>'
//este es el selector que va a ocuparse de traerlas
          document.querySelector(".related").innerHTML += li
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
            li += '<a href=/listaGeneros?idGenero=' + id + '&genero='+nombre+'>' + nombre + '</a>'
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
