var fs = require ('fs');
var csv = require ('csv-parser');

var resultados = [];

fs.createReadStream('./data/2004-2021.tsv')
    .pipe(csv({separator: '\t'}))
    .on('data', function (linha) {
        resultados.push(linha);
    })
    .on('end', function() {
        console.log('Total de registros: ', resultados.length);
        console.log('Primeiro registro: ', resultados[0]);
    });
