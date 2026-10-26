/* Gera a pasta dist/ com o site e injeta FORMSPREE_URL em assets/js/config.js.
   A variável vem do ambiente (GitHub Actions) ou do arquivo .env (uso local). */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

function lerEnv() {
  const arquivo = path.join(root, '.env');
  if (!fs.existsSync(arquivo)) return {};
  const vars = {};
  fs.readFileSync(arquivo, 'utf8').split(/\r?\n/).forEach((linha) => {
    const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) vars[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
  return vars;
}

const bruto = process.env.FORMSPREE_URL || lerEnv().FORMSPREE_URL || '';
const valida = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(bruto);
if (!valida) {
  console.warn('Aviso: FORMSPREE_URL ausente ou inválida. O formulário vai mostrar erro ao enviar.');
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
['index.html', 'assets', 'mvp'].forEach((item) => {
  fs.cpSync(path.join(root, item), path.join(dist, item), { recursive: true });
});
fs.writeFileSync(
  path.join(dist, 'assets', 'js', 'config.js'),
  'window.BRICKELL = { formUrl: ' + JSON.stringify(valida ? bruto : '') + ' };\n'
);
console.log('dist/ gerado' + (valida ? '' : ' (sem endereço do Formspree)'));
