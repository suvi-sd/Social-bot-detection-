/* ===== 4. UI HELPERS ===== */
const $=id=>document.getElementById(id);
function go(s){document.querySelector(s).scrollIntoView({behavior:'smooth'})}
function countTo(el,to,suf='',ms=900){const t0=performance.now();(function s(t){const p=clamp((t-t0)/ms);el.textContent=Math.round(to*p)+suf;if(p<1)requestAnimationFrame(s)})(t0)}
const SAMPLES={bot:{username:'promo_bot_8841',followers:35,following:4800,posts:26000,age:40,ppd:650,rt:92,tags:7,prof:15,eng:0.2,net:12},
 human:{username:'priya_travels',followers:842,following:610,posts:1450,age:1800,ppd:1.2,rt:18,tags:1.5,prof:90,eng:4.6,net:78}};
function sample(t){const s=SAMPLES[t];for(const k in s)$(k).value=s[k]}
$('th').oninput=e=>$('thv').textContent=e.target.value;
