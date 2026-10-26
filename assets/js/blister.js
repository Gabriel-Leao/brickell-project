/* Desenha a cartela de comprimidos do topo da página. */
(function(){
  // Cartela de comprimidos: 14 posições, as 3 últimas vazias
  var s=document.getElementById('blister'),h='';
  for(var i=0;i<14;i++){
    var c=i%7,r=Math.floor(i/7),x=40+c*53,y=55+r*85,empty=i>=11;
    h+='<circle cx="'+x+'" cy="'+y+'" r="21" fill="'+(empty?'none':'var(--pill)')+'" stroke="'+(empty?'var(--mute)':'var(--pill)')+'" stroke-width="'+(empty?2:0)+'" '+(empty?'stroke-dasharray="4 4"':'')+'/>';
    if(!empty)h+='<ellipse cx="'+(x-6)+'" cy="'+(y-7)+'" rx="6" ry="3.5" fill="#fff" opacity=".35"/>';
  }
  s.innerHTML=h;
})();
