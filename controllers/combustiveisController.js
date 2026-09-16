var fs = require ('fs');
var csv = require ('csv-parser');
dados = [];

function todos (req, res) {
    res.json(dados);
};

function porEstado (req, res) {
    var estado = req.params.estado
    var filtrado = dados.filter(function(item) {
        return item['ESTADO'] === estado;
    });
    res.json(filtrado);
};

function porProduto (req, res) {
    var produto = req.params.produto
    var filtrado = dados.filter(function(item){
        return item['PRODUTO'] === produto;
    })
    res.json(filtrado);
};

function resumoPorEstado (req, res) {
    resumo = {};
    dados.forEach(function(item) {    // item é uma linha do TSV, tipo: // { ESTADO: 'GOIAS', 'PREÇO MÉDIO REVENDA': '1.28', ... }
        var estado = item['ESTADO']; //pega o estado da linha
        var preco = parseFloat(item['PREÇO MÉDIO REVENDA'].replace(',', '.'));

        if (!resumo[estado]) {
            resumo[estado] = { total: 0, quantidade: 0};
        }

        resumo[estado].total += preco; //soma o preço
        resumo[estado].quantidade += 1; //conta mais um
    });

    var resultado = Object.keys(resumo).map(function(estado) { //objectkey pega só os nomes das chaves: [SP], [RJ], [MG]
        return {
            estado: estado,
            precoMedio: (resumo[estado].total / resumo[estado].quantidade).toFixed(2)
         };
    });
    res.json(resultado)
    };

module.exports = {dados, todos, porEstado, porProduto, resumoPorEstado};
