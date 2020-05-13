var express = require('express');
var router = express.Router();
var controladores = require('../controladores/controladores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get("/generos", controladores.generos);
router.get("/favs", controladores.favoritos);
router.get("/buscadorAvanzado", controladores.buscadorAvanzado);
router.get("/detalleSerie", controladores.detalleSerie);
router.get("/buscador", controladores.buscador);






module.exports = router;
