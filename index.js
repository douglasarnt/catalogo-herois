const express = require('express');
const app = express();
const PORT = 3030;

// Dados das empresas e seus personagens
const empresas = {
  marvel: {
    nome: 'Marvel',
    descricao:
      'A Marvel Comics é uma das maiores editoras de quadrinhos do mundo, criadora de heróis como Homem de Ferro, Thor e Hulk, que formam os Vingadores.',
    personagens: ['Thor', 'Hulk', 'Spider-Man', 'Wolverine'],
  },
  dc: {
    nome: 'DC',
    descricao:
      'A DC Comics é uma editora de quadrinhos famosa por heróis como Batman, Superman e Flash, que formam a Liga da Justiça.',
    personagens: ['Batman', 'Superman', 'Flash', 'Aquaman'],
  },
};

// Evita que texto digitado na URL seja interpretado como HTML
function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Gera a página de uma empresa (usada por /marvel e /dc)
function paginaEmpresa(chave) {
  const empresa = empresas[chave];
  const itens = empresa.personagens
    .map((p) => `<li><a href="/personagem/${chave}/${p}">${p}</a></li>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${empresa.nome}</title>
    </head>
    <body>
      <h1>${empresa.nome}</h1>
      <p>${empresa.descricao}</p>
      <h2>Personagens</h2>
      <ul>${itens}</ul>
      <p><a href="/">← Voltar à página inicial</a></p>
    </body>
    </html>
  `;
}

// 1. Página inicial
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catálogo de Heróis</title>
    </head>
    <body>
      <h1>Catálogo de Heróis</h1>
      <p>Bem-vindo ao nosso catálogo! Aqui você conhece as empresas Marvel e DC e seus personagens.</p>

      <h2>Empresas</h2>
      <ul>
        <li><a href="/marvel">Marvel</a></li>
        <li><a href="/dc">DC</a></li>
      </ul>

      <hr>

      <h2>Personagens</h2>
      <ul>
        <li><a href="/personagem/marvel/Thor">Thor</a></li>
        <li><a href="/personagem/marvel/Hulk">Hulk</a></li>
        <li><a href="/personagem/dc/Batman">Batman</a></li>
        <li><a href="/personagem/dc/Superman">Superman</a></li>
      </ul>
    </body>
    </html>
  `);
});

// 2. Rotas das empresas
app.get('/marvel', (req, res) => {
  res.send(paginaEmpresa('marvel'));
});

app.get('/dc', (req, res) => {
  res.send(paginaEmpresa('dc'));
});

// 3. Rota com dois parâmetros obrigatórios
app.get('/personagem/:empresa/:nome', (req, res) => {
  const empresa = escapeHtml(req.params.empresa);
  const nome = escapeHtml(req.params.nome);

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${nome}</title>
    </head>
    <body>
      <h1>Personagem: ${nome}</h1>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><a href="/">← Voltar à página inicial</a></p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});