# Brickell

Aplicativo que avisa antes: qual remédio vai acabar, qual receita vai vencer e qual medicamento pode estar disponível de graça no SUS. Este repositório reúne a **lista de espera** e o **MVP 1**, um protótipo clicável com cálculo real de estoque, desenvolvidos para a disciplina de Business Intelligence & Startups da FIAP.

O nome vem do bairro Brickell, em Miami.

---

## Demonstração

| Página | Endereço |
| --- | --- |
| Lista de espera | https://gabriel-leao.github.io/brickell/ |
| MVP 1 (protótipo clicável) | https://gabriel-leao.github.io/brickell/mvp/ |

> Os endereços assumem que o repositório se chama `brickell` na conta `Gabriel-Leao`. Ajuste se o nome for outro.

---

## Membros do Grupo

| Nome | RM |
| --- | --- |
| **Gabriel Leão da Silva** | 552642 |
| **Matheus Farias de Lima** | 554254 |
| **Miguel Mauricio Parrado Patarroyo** | 554007 |
| **Pedro Henrique Nardaci Chaves** | 553988 |
| **Vitor Pinheiro Nascimento** | 553693 |

Turma 4ESPA, FIAP, 2026.

---

## O problema

Quem toma vários remédios por dia, ou cuida do remédio de um pai ou de uma mãe, costuma controlar isso olhando caixa e cartela, e descobre tarde demais que o remédio acabou ou que a receita venceu. Quando a falta aparece à noite ou no fim de semana, repor custa mais caro e dá mais trabalho.

## A proposta

A Brickell avisa antes, com três avisos:

1. **Estoque:** a pessoa cadastra o remédio, quantos comprimidos tem e quantas vezes por dia toma. O app calcula quando acaba e avisa com dias de antecedência.
2. **Receita:** registra a validade e avisa antes de vencer, com mais antecedência para remédio controlado.
3. **SUS:** indica que o medicamento pode estar disponível gratuitamente e orienta onde buscar e o que levar.

O posicionamento escolhido é falar com quem cuida do remédio de um pai ou de uma mãe.

---

## Estágio do projeto

| Entrega | Status |
| --- | --- |
| MVP 0: protótipo clicável no Figma, com 3 telas | Concluído |
| Landing page de lista de espera | Concluída |
| MVP 1: protótipo evoluído, com cálculo real | Concluído, com dados de exemplo |
| Avaliação do protótipo com personas fictícias | Concluída (simulação do grupo) |
| Teste de usabilidade do MVP 1 com 6 participantes | Concluído; meta de tempo do cadastro não atingida (4 de 6 em menos de 2 minutos) |
| Dados reais do SUS e aviso por canal real | Fora desta etapa |

Transparência sobre o que este repositório **não** é: não há back-end, login, notificação real nem integração com dados do SUS. Os remédios do MVP 1 são exemplos e o texto de disponibilidade no SUS é ilustrativo. As personas usadas na análise do protótipo são fictícias, criadas pelo grupo, e não representam pessoas entrevistadas.

---

## Funcionalidades

### Lista de espera

- Cadastro com nome, e-mail (obrigatório) e telefone (opcional)
- Escolha de por onde receber novidades: e-mail, WhatsApp ou SMS, com mais de uma opção possível
- Telefone exigido só quando o canal escolhido depende dele
- Pergunta de qualificação: a pessoa cuida do remédio de alguém?
- Envio dos cadastros para o Formspree
- Link para testar o MVP 1 logo após o cadastro

### MVP 1

- Cadastro de remédio com nome, para quem, quantos comprimidos tem agora (ou caixa nova), vezes por dia e validade da receita
- Lista da casa ordenada pelo que acaba primeiro, com barra de tempo restante e selo de receita
- Detalhe do remédio com previsão de fim e correção do estoque e da receita
- Aviso de estoque (com 7 dias de antecedência) e de receita (com 15 dias)
- "Já comprei" pergunta quantos comprimidos vieram e recalcula a previsão
- Rótulos distintos para estoque e receita na lista e nos avisos
- Mensagem de confirmação com a nova previsão depois de registrar a compra ou corrigir os dados
- Aviso de que a compra é somada ao que resta e de que a previsão é uma estimativa
- Aviso de SUS com orientação de exemplo
- Botão para voltar à lista de espera

Regra de cálculo: dias de estoque = comprimidos que restam ÷ vezes por dia, arredondado para baixo. As antecedências de 7 e 15 dias são hipóteses a validar com pessoas reais.

---

## Estrutura do Projeto

```
brickell/
├── index.html                  # Lista de espera
├── assets/
│   ├── css/style.css           # Estilos da lista de espera
│   └── js/
│       ├── blister.js          # Desenho da cartela de comprimidos do topo
│       └── waitlist.js         # Validação e envio do formulário
├── mvp/
│   ├── index.html              # MVP 1
│   ├── css/style.css           # Estilos do protótipo
│   └── js/
│       ├── utils.js            # Funções de data e texto
│       ├── dados.js            # Dados de exemplo
│       └── app.js              # Regras de aviso e telas
├── scripts/
│   ├── build.js                # Gera dist/ e injeta FORMSPREE_URL
│   └── serve.js                # Servidor local para ver dist/
├── .github/workflows/
│   └── pages.yml               # Publica no GitHub Pages
├── .env.example                # Modelo da variável de ambiente
├── .gitignore
├── package.json
└── README.md
```

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 20+
- Uma conta gratuita no [Formspree](https://formspree.io) com um formulário criado

### 1. Clonar o repositório

```bash
git clone https://github.com/Gabriel-Leao/brickell.git
cd brickell
```

### 2. Configurar a variável de ambiente

```bash
cp .env.example .env
```

Abra o `.env` e troque o valor pelo endereço do seu formulário:

```
FORMSPREE_URL=https://formspree.io/f/seu_id
```

### 3. Gerar o site e abrir

```bash
npm start
```

O comando faz o build (cria a pasta `dist/`) e sobe um servidor local em `http://localhost:3000/`. O MVP 1 fica em `http://localhost:3000/mvp/`.

Se quiser separar os passos:

```bash
npm run build   # gera dist/
npm run serve   # serve dist/ na porta 3000
```

> Sem `FORMSPREE_URL` válida, o build avisa e o formulário mostra erro ao enviar. O MVP 1 não precisa da variável.

---

## Deploy no GitHub Pages

1. No repositório, vá em **Settings, Pages** e escolha **Source: GitHub Actions**.
2. Em **Settings, Secrets and variables, Actions, aba Variables**, crie `FORMSPREE_URL` com o endereço do formulário.
3. Faça push na branch `main`. O workflow `pages.yml` roda o build e publica o `dist/`.

As rotas publicadas são `/` (lista de espera) e `/mvp/` (protótipo).

O endereço do Formspree fica visível no JavaScript do site publicado, então não é um segredo. O `.env` fica fora do Git só para não espalhar o valor no repositório.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
| --- | --- |
| HTML, CSS e JavaScript | Páginas estáticas, sem framework |
| Node.js | Script de build e injeção da variável de ambiente |
| GitHub Pages e GitHub Actions | Hospedagem e publicação automática |
| Formspree | Recebimento dos cadastros da lista de espera |
| Figma | MVP 0, protótipo de média fidelidade |
| Google Fonts | Bricolage Grotesque e DM Sans |

---

## Privacidade

Lista de medicamentos é dado de saúde, considerado sensível pela LGPD. A lista de espera coleta só nome, e-mail e, se a pessoa quiser, telefone, e informa que os dados são usados apenas para falar sobre a Brickell. Qualquer teste com pessoas deve pedir consentimento e coletar o mínimo necessário.

---

## Resultado do teste de usabilidade

Seis participantes, familiares e amigos do grupo, executaram cinco tarefas no MVP 1 em 25/10/2026: 6 de 6 concluíram o cadastro, 5 de 6 sem ajuda e 4 de 6 em menos de 2 minutos; 6 de 6 identificaram o remédio prioritário; 5 de 6 entenderam a previsão; 4 de 6 registraram a compra sem ajuda. A amostra é pequena e próxima do grupo, então o resultado indica direção, não prova. O relatório completo está em `docs/RESULTADOS-TESTE-USABILIDADE`.

---

## Próximos passos

- Tornar mais evidente o caminho até "Já comprei" e melhorar a rolagem do cadastro no celular
- Repetir o teste com os ajustes e uma amostra maior, incluindo pessoas fora do círculo do grupo
- Levantar como a lista de medicamentos gratuitos é publicada em um município para o primeiro teste de SUS
- Definir o canal real de aviso: e-mail, push ou WhatsApp
- Avaliar o compartilhamento de um perfil entre duas contas, como filho e mãe

---

## Licença

Projeto desenvolvido para fins acadêmicos, Licença MIT.
