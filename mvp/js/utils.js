/* Funções de data e texto usadas no protótipo. */
var D=864e5;
function hoje(){var d=new Date();d.setHours(0,0,0,0);return d}
function add(d,n){return new Date(d.getTime()+n*D)}
function dias(d){return Math.round((d-hoje())/D)}
function fmt(d){return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}
function sem(d){return d.toLocaleDateString('pt-BR',{weekday:'long'})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pl(n,a,b){return n===1?a:b}
