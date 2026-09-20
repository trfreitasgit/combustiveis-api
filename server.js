var express = require('express');
var app = express();
var axios = require('axios');
var csv = require('csv-parser');
var routes = require('./routes/combustiveis');
var controller = require('./controllers/combustiveisController');

var URL_DATASET = 'https://github.com/trfreitasgit/combustiveis-api/releases/download/v1.0/2004-2021.tsv';

axios.get(URL_DATASET, { responseType: 'stream'})
    .then (function(resposta) {
        resposta.data
            .pipe(csv({ separator: '\t' }))
            .on('data', function(linha) {
                if (linha['PRODUTO'] === 'OLEO DIESEL') {
                    linha['PRODUTO'] = 'ÓLEO DIESEL';
                };
                if (linha['PRODUTO'] === 'OLEO DIESEL S10') {
                    linha['PRODUTO'] = 'ÓLEO DIESEL S10';
                }
                controller.dados.push(linha);
            })
            .on('end', function() {
                console.log('Total de registros: ', controller.dados.length);
                routes(app);
                app.listen(process.env.PORT || 3000);
                console.log('Servidor no ar!');
        });
    });