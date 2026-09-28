/* ===== 6. RESULT + EXPLAINABILITY ===== */
function show(d,r,th){
  const isBot=r.bot>=th;
  const h=load();h.unshift({u:d.username,p:r.bot,c:isBot?'Likely Bot':'Likely Human',t:new Date().toLocaleString()});save(h.slice(0,200));
  $('result').style.display='block';void $('result').offsetWidth;$('result').classList.add('show');
  const b=$('rb');b.textContent=isBot?'LIKELY BOT':'LIKELY HUMAN';b.className='badge '+(isBot?'bot':'hum');
  const risk=r.bot>=75?'High risk: strongly automated behaviour':r.bot>=th?'Elevated risk: several bot-like signals':r.bot>=25?'Low risk: mostly human-like behaviour':'Very low risk: clearly human-like behaviour';
  $('rrisk').textContent=risk;
  $('arc').style.stroke=isBot?'#f43f5e':'#34d399';
  $('arc').style.strokeDashoffset=540.4*(1-r.bot/100);
  countTo($('rp'),r.bot,'%',1400);$('bp').textContent=r.bot+'%';$('hp').textContent=r.human+'%';
  $('bbar').style.width=r.bot+'%';$('hbar').style.width=r.human+'%';
  $('rsum').textContent=`@${d.username}: weighted score ${r.raw.toFixed(1)}/100 → ${r.bot}% bot probability against a ${th}% threshold. Demo prediction only, not a judgment about a real person.`;
  const top=[...r.parts].sort((a,b)=>b.pts-a.pts);
  $('factors').innerHTML=top.map(p=>{const pc=Math.round(p.pts/p.max*100);return`<div class="fac"><span>${p.name}</span><em>+${p.pts}/${p.max}</em><div class="bar"><i data-w="${pc}" style="background:${pc>60?'var(--bot)':pc>30?'var(--p)':'var(--hum)'}"></i></div><small>${p.why}</small></div>`}).join('');
  setTimeout(()=>document.querySelectorAll('#factors .bar i').forEach(i=>i.style.width=i.dataset.w+'%'),100);
  go('#result');refresh();
}
