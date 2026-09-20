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
    var produto = req.query.produto; //Pega ?produto=GASOLINA da URL
    var ano = req.query.ano; //Pega ?ano=2021 da URL

    var filtrados = dados.filter(function (item) {
        var passaProduto = true;
        var passaAno = true;

        if (produto) {
            passaProduto = item['PRODUTO'] === produto;
        }

        if (ano) {
            passaAno = item['DATA INICIAL'] && item['DATA INICIAL'].startsWith(ano);
        }

        return passaProduto && passaAno;
    });

    var resumo = {};
    filtrados.forEach(function(item) {
        var estado = item['ESTADO'];
        var preco = parseFloat(item['PREÇO MÉDIO REVENDA'].replace(',','.'));

        if (!resumo[estado]) {
            resumo[estado] = { total: 0, quantidade: 0};
        }

        resumo[estado].total += preco; //Soma o preço
        resumo[estado].quantidade += 1; //Conta mais um
    });

    var resultado = Object.keys(resumo).map(function(estado) {
        return {
            estado: estado,
            precoMedio: (resumo[estado].total / resumo[estado].quantidade).toFixed(2)
        };
    });

    res.json(resultado);
};

function resumoPorAno (req, res) {
    var produto = req.query.produto; //retorna produto ?produto=GASOLINA COMUM
    var resumo = {};

    var filtrados = dados.filter(function (item) {
        var passaProduto = true;
        var passaAno = true;

        if(produto) {
            passaProduto = item['PRODUTO'] === produto;
        }

        return passaProduto;
    });

    filtrados.forEach(function(item){
        var ano = item['DATA INICIAL'].substring(0, 4);
        var preco = parseFloat(item['PREÇO MÉDIO REVENDA'].replace(',','.'));
        
        if (!resumo[ano]) {
            resumo[ano] = { total: 0, quantidade: 0};
        }

        resumo[ano].total += preco;
        resumo[ano].quantidade += 1;
    });

    var resultado = Object.keys(resumo).map(function(ano) {
        return {
            ano: ano,
            precoMedio: (resumo[ano].total / resumo[ano].quantidade).toFixed(2)
        };
    });

    res.json(resultado);
}
module.exports = {dados, todos, porEstado, porProduto, resumoPorEstado, resumoPorAno};
