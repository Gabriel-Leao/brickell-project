/* Formulário da lista de espera: valida e envia ao Formspree. */
(function(){
  var FORM_URL=(window.BRICKELL||{}).formUrl||'';
  var f=document.getElementById('f'),btn=document.getElementById('btn'),msg=document.getElementById('msg');
  f.addEventListener('submit',async function(e){
    e.preventDefault();
    var canais=[].slice.call(f.querySelectorAll('input[name=canal]:checked')).map(function(c){return c.value});var d={nome:f.nome.value.trim(),email:f.mail.value.trim(),zap:f.zap.value.replace(/\D/g,''),canais:canais.join(', '),perfil:f.perfil.value};
    var okMail=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email),precisaTel=canais.some(function(c){return c!=='E-mail'});if(!d.nome||!okMail||!d.perfil||!canais.length){msg.textContent='Preencha nome, um e-mail válido, como prefere receber novidades e se você cuida do remédio de alguém.';return;}if((d.zap&&d.zap.length<10)||(precisaTel&&d.zap.length<10)){msg.textContent='Para WhatsApp ou SMS, informe o telefone com DDD.';return;}
    btn.disabled=true;msg.textContent='Enviando…';
    try{
      if(FORM_URL.indexOf('formspree.io/f/')<0)throw new Error('sem-endpoint');
      var r=await fetch(FORM_URL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)});
      if(!r.ok)throw new Error('falha');
      f.reset();msg.innerHTML='Pronto, você está na lista. Avisaremos pelo canal que você escolheu.<br><a href="./mvp/" style="color:var(--pill);font-weight:700">Enquanto isso, teste o protótipo ›</a>';
    }catch(err){
      msg.textContent='Não conseguimos registrar agora. Tente de novo em alguns minutos.';
    }
    btn.disabled=false;
  });
})();
