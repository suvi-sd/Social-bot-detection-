/* ===== 7. DASHBOARD + HISTORY ===== */
let charts={};
function refresh(){
  const h=load(),n=h.length,bots=h.filter(x=>x.c==='Likely Bot').length;
  countTo($('s1'),n);countTo($('s2'),bots);countTo($('s3'),n-bots);
  countTo($('s4'),n?Math.round(h.reduce((a,x)=>a+x.p,0)/n):0,'%');
  const opt={responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#9ba0c9'}},title:{display:true,color:'#e8eaff'}},scales:{x:{ticks:{color:'#9ba0c9'},grid:{color:'rgba(255,255,255,.06)'}},y:{ticks:{color:'#9ba0c9'},grid:{color:'rgba(255,255,255,.06)'},beginAtZero:true}}};
  const noAxes=JSON.parse(JSON.stringify(opt));delete noAxes.scales;
  const bk=[0,0,0,0,0];h.forEach(x=>bk[Math.min(4,Math.floor(x.p/20))]++);
  const last=h.slice(0,10).reverse();
  const mk=(id,type,data,o,title)=>{if(charts[id])charts[id].destroy();const oo=JSON.parse(JSON.stringify(o));oo.plugins.title.text=title;charts[id]=new Chart($(id),{type,data,options:oo})};
  mk('c1','doughnut',{labels:['Bots','Humans'],datasets:[{data:[bots,n-bots],backgroundColor:['#f43f5e','#34d399'],borderWidth:0}]},noAxes,'Bots vs humans');
  mk('c2','bar',{labels:['0–20','20–40','40–60','60–80','80–100'],datasets:[{label:'Accounts',data:bk,backgroundColor:'#8b5cf6',borderRadius:6}]},opt,'Bot probability distribution');
  mk('c3','line',{labels:last.map((x,i)=>x.u.slice(0,10)),datasets:[{label:'Bot probability %',data:last.map(x=>x.p),borderColor:'#38bdf8',backgroundColor:'rgba(56,189,248,.15)',fill:true,tension:.35}]},opt,'Recent detections');
  renderTable();
}
function renderTable(){
  const q=$('q').value.toLowerCase(),f=$('fl').value;
  const rows=load().filter(x=>x.u.toLowerCase().includes(q)&&(!f||x.c===f));
  $('tb').innerHTML=rows.length?rows.map(x=>`<tr><td>${esc(x.u)}</td><td>${x.p}%</td><td><span class="pill ${x.c==='Likely Bot'?'bot':'hum'}">${x.c}</span></td><td>${x.t}</td></tr>`).join(''):'<tr><td colspan="4" style="color:var(--mute)">No results yet. Run a detection or add demo history.</td></tr>';
}
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('q').oninput=renderTable;$('fl').onchange=renderTable;
function clearHist(){if(confirm('Clear all detection history?')){save([]);refresh()}}
function demoHistory(){ // runs the real model on preset accounts
  const extra=[{username:'news_amplifier',followers:120,following:2500,posts:9000,age:90,ppd:100,rt:80,tags:5,prof:40,eng:0.8,net:30},
   {username:'rahul_codes',followers:310,following:280,posts:640,age:900,ppd:0.7,rt:10,tags:0.5,prof:85,eng:6,net:70},
   {username:'giveaway_hub',followers:60,following:1900,posts:5200,age:25,ppd:200,rt:70,tags:8,prof:20,eng:0.3,net:15},
   {username:'meera_reads',followers:1500,following:400,posts:3200,age:2400,ppd:2,rt:22,tags:1,prof:95,eng:5,net:85},SAMPLES.bot,SAMPLES.human];
  const h=load();extra.forEach(d=>{const r=predict(d);h.unshift({u:d.username,p:r.bot,c:r.bot>=50?'Likely Bot':'Likely Human',t:new Date().toLocaleString()})});
  save(h);refresh();
}
$('wl').innerHTML=FEATURES.map(x=>`<li>${x.name}: up to ${x.w} points</li>`).join('');
