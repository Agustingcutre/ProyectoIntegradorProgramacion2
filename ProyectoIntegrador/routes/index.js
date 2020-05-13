var express = require('express');
var router = express.Router();
var controladores = require('../controladores/controladores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get("/generos", controladores.generos);
router.get("/favoritos", controladores.favoritos);
router.get("/buscadorAvanzado", controladores.buscadorAvanzado);




module.exports = router;
