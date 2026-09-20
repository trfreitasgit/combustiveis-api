# 🛢️ API de Preços de Combustíveis no Brasil

API REST construída com Node.js que serve dados históricos de preços de combustíveis no Brasil de 2004 a 2021, com base nos dados públicos da ANP (Agência Nacional do Petróleo).

## 🚀 Demo

API em produção: https://combustiveis-api-production.up.railway.app

## 📊 Dashboard

Dashboard interativo no Power BI com evolução histórica e comparativo por estado.
[adicionar print do dashboard aqui depois]

## 🔗 Rotas disponíveis

| Rota | Descrição |
|------|-----------|
| `/combustiveis` | Todos os registros |
| `/combustiveis/estado/:estado` | Filtra por estado |
| `/combustiveis/produto/:produto` | Filtra por produto |
| `/combustiveis/resumo` | Preço médio por estado |
| `/combustiveis/resumo?produto=GASOLINA COMUM&ano=2021` | Resumo com filtros |
| `/combustiveis/ano?produto=GASOLINA COMUM` | Evolução por ano |

## 🛠️ Tecnologias

- Node.js
- Express
- csv-parser
- axios
- Railway (deploy)

## 📦 Como rodar localmente

```bash
git clone https://github.com/trfreitasgit/combustiveis-api.git
cd combustiveis-api
npm install
node server.js
```

## 📁 Estrutura do projeto

combustiveis-api/
├── controllers/
│ └── combustiveisController.js
├── routes/
│ └── combustiveis.js
├── server.js
└── package.json


## 📌 Fonte dos dados

Dados públicos da ANP disponíveis no Kaggle — preços de combustíveis por estado e produto de 2004 a 2021.

## 👨‍💻 Autor

Tiago Freitas — Linkedin: https://www.linkedin.com/in/tiagofreitas/