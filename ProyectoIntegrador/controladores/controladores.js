const controlador = {

    generos : function (req,res) {
        res.render('generos')
    },
    favoritos : function (req,res) {
        res.render('favoritos')
    },
    buscadorAvanzado : function (req,res) {
        res.render('buscadorAvanzado')
    },
}

module.exports = controlador;