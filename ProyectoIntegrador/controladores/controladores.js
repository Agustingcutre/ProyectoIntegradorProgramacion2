const controlador = {

    listaGeneros : function (req,res) {
        res.render('listaGeneros')
    },
    favoritos : function (req,res) {
        res.render('favs')
    },
    buscadorAvanzado : function (req,res) {
        res.render('buscadorAvanzado')
    },
    detalleSerie : function (req,res) {
        res.render('detalleSerie')
    },
    buscador : function (req,res) {
        res.render('buscador')
    },
}

module.exports = controlador;