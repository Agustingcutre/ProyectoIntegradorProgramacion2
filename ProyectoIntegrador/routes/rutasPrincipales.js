var express = require('express');
var router = express.Router();
var controladores = require('../controladores');


router.get("/generos", controladores.generos);
router.get("/buscador", controladores.buscador);

module.exports = router 