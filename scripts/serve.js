/* Servidor estático simples para ver o site localmente. Sem dependências. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const porta = process.env.PORT || 3000;
const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

if (!fs.existsSync(dist)) {
  console.error('A pasta dist/ não existe. Rode "npm run build" primeiro.');
  process.exit(1);
}

http.createServer((req, res) => {
  let caminho = decodeURIComponent(req.url.split('?')[0]);
  let arquivo = path.normalize(path.join(dist, caminho));
  if (!arquivo.startsWith(dist)) { res.writeHead(403); return res.end('Proibido'); }
  if (fs.existsSync(arquivo) && fs.statSync(arquivo).isDirectory()) {
    if (!caminho.endsWith('/')) { res.writeHead(301, { Location: caminho + '/' }); return res.end(); }
    arquivo = path.join(arquivo, 'index.html');
  }
  fs.readFile(arquivo, (erro, dados) => {
    if (erro) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Não encontrado'); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(arquivo)] || 'application/octet-stream' });
    res.end(dados);
  });
}).listen(porta, () => {
  console.log('Lista de espera: http://localhost:' + porta + '/');
  console.log('MVP 1:           http://localhost:' + porta + '/mvp/');
});
