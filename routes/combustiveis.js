var controller = require ('../controllers/combustiveisController');

module.exports = function (app) {
    app.get('/combustiveis', controller.todos);
    app.get('/combustiveis/estado/:estado', controller.porEstado);
    app.get('/combustiveis/produto/:produto', controller.porProduto);
    app.get('/combustiveis/resumo', controller.resumoPorEstado);
}