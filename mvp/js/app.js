/* Regras de aviso e telas do protótipo. */
var v=document.getElementById('v'),quem='Eu',novaCaixa=false,msg='';
function nav(i){for(var k=0;k<3;k++)document.getElementById('n'+k).className=(k===i?'on':'')}
function find(i){return items.filter(function(x){return x.id===i})[0]}
function alertas(){var a=[];items.forEach(function(x){
  if(dias(x.fim)<=7)a.push({t:'e',x:x,d:dias(x.fim)});
  if(x.rec&&dias(x.rec)<=15)a.push({t:'r',x:x,d:dias(x.rec)})});
  return a.sort(function(p,q){return p.d-q.d})}
function casa(){nav(0);var a=alertas();
  var h='<h1>Em casa</h1>';
  if(a.length)h+='<div class="row hot" tabindex="0" onclick="avisos()"><b>'+a.length+' '+pl(a.length,'aviso','avisos')+' agora</b><small>Toque para ver</small></div>';
  items.slice().sort(function(p,q){return p.fim-q.fim}).forEach(function(x){
    var d=dias(x.fim),r=x.rec&&dias(x.rec)<=15;
    h+='<div class="row'+(d<=7?' hot':'')+'" tabindex="0" onclick="det('+x.id+')"><b>'+esc(x.nome)+' · '+esc(x.quem)+'</b><small><span class="k e">Estoque</span>Acaba em '+d+' '+pl(d,'dia','dias')+' ('+fmt(x.fim)+')</small><span class="bar"><i style="width:'+Math.max(4,Math.min(100,d/30*100))+'%"></i></span>'+(r?'<small style="display:block;margin-top:6px"><span class="k r">Receita</span>vence em '+dias(x.rec)+' dias</small>':'')+'</div>'});
  h+='<button class="btn p sp" onclick="novo()">+ Adicionar remédio</button>';v.innerHTML=h}
function det(i){nav(0);var x=find(i),d=dias(x.fim),rest=Math.max(0,d*x.porDia);
  var ok=msg?'<div class="ok" role="status">'+esc(msg)+'</div>':'';msg='';
  v.innerHTML='<button class="back" onclick="casa()">‹ Em casa</button>'+ok+'<h2>'+esc(x.nome)+'</h2><small style="color:var(--mute)">Para '+esc(x.quem)+', '+x.porDia+' por dia</small>'+
  '<div class="big">'+(d<=0?'Acabou':'Acaba em '+d+' '+pl(d,'dia','dias'))+'</div><div>'+(d>0?sem(x.fim)+', '+fmt(x.fim):'')+'</div><small style="color:var(--mute)">Estimativa com base no que resta e nas vezes por dia cadastradas.</small>'+
  '<label for="re">Comprimidos que restam hoje (corrija se errou)</label><input id="re" type="number" min="0" value="'+rest+'">'+
  '<label for="rc">Receita vence em</label><input id="rc" type="date" value="'+(x.rec?x.rec.toISOString().slice(0,10):'')+'">'+
  '<button class="btn p sp" onclick="salvar('+i+')">Salvar</button>'}
function salvar(i){var x=find(i),r=parseInt(document.getElementById('re').value,10),rc=document.getElementById('rc').value;
  if(!isNaN(r)&&r>=0)x.fim=add(hoje(),Math.floor(r/x.porDia));
  x.rec=rc?new Date(rc+'T00:00:00'):null;var n=Math.max(0,dias(x.fim));msg='Dados atualizados. Nova previsão: '+n+' '+pl(n,'dia','dias')+'.';det(i)}
function novo(){nav(2);quem='Eu';
  v.innerHTML='<h1>Novo remédio</h1><label for="nm">Nome</label><input id="nm" placeholder="remédio da pressão">'+
  '<label>Para quem</label><div class="chips"><button class="chip on" id="q0" onclick="setq(\'Eu\')">Eu</button><button class="chip" id="q1" onclick="setq(\'Minha mãe\')">Minha mãe</button><button class="chip" id="q2" onclick="setq(\'+\')">+</button></div><input id="ou" placeholder="Quem? Ex.: meu pai" style="display:none;margin-top:8px">'+
  '<label for="qt">Quantos comprimidos tem agora</label><input id="qt" type="number" min="1" placeholder="30"><label><input type="checkbox" id="cx" style="width:auto;margin-right:6px">É uma caixa nova, fechada</label>'+
  '<div class="two"><div><label for="pd">Vezes por dia</label><input id="pd" type="number" min="1" value="1"></div><div><label for="rc">Receita vence em (opcional)</label><input id="rc" type="date"></div></div>'+
  '<div id="er" style="color:#c0392b;font-size:14px"></div><button class="btn p sp" onclick="criar()">Salvar</button>'}
function setq(s){quem=s;['Eu','Minha mãe','+'].forEach(function(n,k){document.getElementById('q'+k).className='chip'+(n===s?' on':'')});document.getElementById('ou').style.display=s==='+'?'block':'none'}
function criar(){var nm=document.getElementById('nm').value.trim(),qt=parseInt(document.getElementById('qt').value,10),pd=parseInt(document.getElementById('pd').value,10),rc=document.getElementById('rc').value;
  if(!nm||!(qt>0)||!(pd>0)){document.getElementById('er').textContent='Preencha nome, quantos comprimidos tem e quantas vezes por dia.';return}
  var x={id:id++,nome:nm,quem:(quem==='+'?(document.getElementById('ou').value.trim()||'Outro'):quem).replace('Minha ','').replace('Meu ',''),porDia:pd,fim:add(hoje(),Math.floor(qt/pd)),rec:rc?new Date(rc+'T00:00:00'):null};
  items.push(x);det(x.id)}
function avisos(){nav(1);var a=alertas();
  if(!a.length){v.innerHTML='<h1>Avisos</h1><div class="dash">Nenhum aviso agora. Você será avisado 7 dias antes de acabar e 15 dias antes de a receita vencer.</div>';return}
  var z=a[0],x=z.x,h='<h1>Aviso</h1>';
  if(z.t==='e'){h+='<div class="row hot"><span class="k e">Estoque</span><b style="font-size:19px">O '+esc(x.nome.toLowerCase())+' de '+esc(x.quem.toLowerCase())+' acaba '+(z.d<=0?'hoje':'em '+z.d+' '+pl(z.d,'dia','dias')+', '+sem(x.fim))+'.</b></div>'+
    '<div class="dash">Este remédio pode estar disponível de graça na UBS mais perto de você. <a href="#" onclick="sus();return false" style="color:var(--pill);font-weight:700">Ver onde e o que levar</a><div id="su"></div></div>'+
    '<div id="ac" class="sp"><button class="btn p" onclick="comprei('+x.id+')">Já comprei</button><button class="btn g" style="margin-top:8px" onclick="amanha()">Lembrar amanhã</button></div>'}
  else{h+='<div class="row hot"><span class="k r">Receita</span><b style="font-size:19px">A receita de '+esc(x.nome.toLowerCase())+' vence em '+z.d+' '+pl(z.d,'dia','dias')+'.</b></div><div class="sp"><label for="rn">Nova validade</label><input id="rn" type="date"><button class="btn p" style="margin-top:8px" onclick="renovei('+x.id+')">Já renovei</button><button class="btn g" style="margin-top:8px" onclick="amanha()">Lembrar amanhã</button></div>'}
  if(a.length>1)h+='<small style="color:var(--mute)">Mais '+(a.length-1)+' '+pl(a.length-1,'aviso','avisos')+' depois deste.</small>';
  v.innerHTML=h}
function sus(){document.getElementById('su').innerHTML='<p>Confirme no posto se o remédio está disponível antes de ir. Leve a receita e um documento com foto. Esta informação ainda é de exemplo.</p>'}
function comprei(i){document.getElementById('ac').innerHTML='<label for="cp">Quantos comprimidos vieram? Eles serão somados ao que ainda resta.</label><input id="cp" type="number" min="1" value="30"><button class="btn p" style="margin-top:8px" onclick="confCompra('+i+')">Confirmar</button>'}
function confCompra(i){var x=find(i),c=parseInt(document.getElementById('cp').value,10);if(!(c>0))return;
  var rest=Math.max(0,dias(x.fim)*x.porDia)+c;x.fim=add(hoje(),Math.floor(rest/x.porDia));var n=Math.floor(rest/x.porDia);msg='Estoque atualizado. Nova previsão: '+n+' '+pl(n,'dia','dias')+'.';det(i)}
function renovei(i){var x=find(i),r=document.getElementById('rn').value;if(!r)return;x.rec=new Date(r+'T00:00:00');casa()}
function amanha(){v.innerHTML='<h1>Certo</h1><div class="dash">Você será lembrado amanhã.</div><button class="btn p sp" onclick="casa()">Voltar para Em casa</button>'}
document.getElementById('n0').onclick=casa;document.getElementById('n1').onclick=avisos;document.getElementById('n2').onclick=novo;
casa();
