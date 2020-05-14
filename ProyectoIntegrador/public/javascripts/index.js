window.onload = function() {
    loadPopular();
    loadMostRated();
    loadLiveToday();
   }
   
   function loadPopular() {
     const carrousel = document.getElementById("carrousel-popular");
   
     fetch("https://api.themoviedb.org/3/tv/popular?api_key=e31dd59fefbc10e65215ecd077762f57&language=en-US&page=1")
     .then(function(res) {
         return res.json()
     })
     .then(function(res) {
         const shows = res.results;
         shows.forEach(function(show) {
   
             const li = document.createElement("a");
             li.href = `/detalleSerie?idPeli=${show.id}`
   
             const panel = document.createElement("div");
             panel.classList.add("uk-panel");
   
             const img = document.createElement("img");
              // abro signo de pesos para poner variable = poster path
             img.src = `https://image.tmdb.org/t/p/original${show.poster_path}`;
   
             const titlePanel = document.createElement("div");
             titlePanel.classList.add("uk-position-center", "uk-panel");
             titlePanel.style.background = 'rgba(133, 11, 11, 0.6)'
             titlePanel.style.padding = 5;
   
   
             const title = document.createElement("h1");
             title.innerHTML = show.name;
   
             // los compongo
             titlePanel.appendChild(title);
   
             panel.appendChild(titlePanel);
             panel.appendChild(img);
             li.appendChild(panel);
   
             carrousel.appendChild(li);
   
         })
     })
   
   }
   
   
   function loadMostRated() {
     const carrousel = document.getElementById("carrousel-mayorpuntaje");
   
     fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=e31dd59fefbc10e65215ecd077762f57&language=en-US&page=1")
     .then(function(res) {
         return res.json()
     })
     .then(function(res) {
         const shows = res.results;
         shows.forEach(function(show) {
   
             const li = document.createElement("a");
             li.href = `/detalleSerie?idPeli=${show.id}`
   
             const panel = document.createElement("div");
             panel.classList.add("uk-panel");
   
             const img = document.createElement("img");
              // abro signo de pesos para poner variable = poster path
             img.src = `https://image.tmdb.org/t/p/original${show.poster_path}`;
   
             const titlePanel = document.createElement("div");
             titlePanel.classList.add("uk-position-center", "uk-panel");
             titlePanel.style.background = 'rgba(133, 11, 11, 0.6)'
             titlePanel.style.padding = 5;
   
   
             const title = document.createElement("h1");
             title.innerHTML = show.name;
   
             // los compongo
             titlePanel.appendChild(title);
   
             panel.appendChild(titlePanel);
             panel.appendChild(img);
             li.appendChild(panel);
   
             carrousel.appendChild(li);
   
         })
     })
   
   }
   
   function loadLiveToday() {
     const carrousel = document.getElementById("carrousel-alairehoy");
   
     fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=e31dd59fefbc10e65215ecd077762f57&language=en-US&page=1")
     .then(function(res) {
         return res.json()
     })
     .then(function(res) {
         const shows = res.results;
         shows.forEach(function(show) {
   
             const li = document.createElement("a");
             li.href = `/detalleSerie?idPeli=${show.id}`
   
             const panel = document.createElement("div");
             panel.classList.add("uk-panel");
   
             const img = document.createElement("img");
              // abro signo de pesos para poner variable = poster path
             img.src = `https://image.tmdb.org/t/p/original${show.poster_path}`;
   
             const titlePanel = document.createElement("div");
             titlePanel.classList.add("uk-position-center", "uk-panel");
             titlePanel.style.background = 'rgba(133, 11, 11, 0.6)'
             titlePanel.style.padding = 5;
   
   
             const title = document.createElement("h1");
             title.innerHTML = show.name;
   
             // los compongo
             titlePanel.appendChild(title);
   
             panel.appendChild(titlePanel);
             panel.appendChild(img);
             li.appendChild(panel);
   
             carrousel.appendChild(li);
   
         })
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
   
   
   }