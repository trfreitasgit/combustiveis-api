var express = require ('express');
var app = express ();
var fs = require ('fs');
var csv = require ('csv-parser');
var routes = require ('./routes/combustiveis');
var controller = require ('./controllers/combustiveisController')
var resultados = []

fs.createReadStream('./data/2004-2021.tsv')
    .pipe (csv({separator: '\t'}))
    .on ('data', function (linha) {
        controller.dados.push(linha);
    })
    .on ('end', function () {
        console.log('Total de registros: ', controller.dados.length);
        routes(app);
        app.listen(process.env.PORT || 3000);
        console.log('Primeiro registro: ', controller.dados[0]);
    })
