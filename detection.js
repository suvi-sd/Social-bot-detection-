/* ===== 2. DETECTION LOGIC (explainable weighted scoring) ===== */
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
// Each feature: weight (max points) + a function returning suspicion 0..1
const FEATURES=[
 {k:'freq',name:'High posting frequency',w:22,f:d=>clamp(d.ppd/80),why:d=>`${d.ppd} posts/day (bots often exceed 50)`},
 {k:'ratio',name:'Unusual following/follower ratio',w:16,f:d=>clamp((d.following/Math.max(d.followers,1))/20),why:d=>`Following ${(d.following/Math.max(d.followers,1)).toFixed(1)}× more than followers`},
 {k:'newact',name:'New account with high activity',w:14,f:d=>clamp((d.ppd/(1+d.age/30))/30),why:d=>`${(d.posts/d.age).toFixed(1)} posts/day over ${d.age} days`},
 {k:'rep',name:'Repetitive posting behaviour',w:12,f:d=>clamp(d.rt/100),why:d=>`${d.rt}% retweets and shared content`},
 {k:'tags',name:'Heavy hashtag usage',w:8,f:d=>clamp(d.tags/8),why:d=>`${d.tags} hashtags per post`},
 {k:'prof',name:'Incomplete profile',w:12,f:d=>1-clamp(d.prof/100),why:d=>`Profile ${d.prof}% complete`},
 {k:'eng',name:'Abnormal engagement pattern',w:8,f:d=>d.eng<1?1:d.eng>25?.8:clamp((5-d.eng)/10),why:d=>`Engagement ${d.eng}% (typical humans: 1–10%)`},
 {k:'net',name:'Weak network / activity score',w:8,f:d=>1-clamp(d.net/100),why:d=>`Network score ${d.net}/100`}
];
function predict(d){
  const parts=FEATURES.map(x=>{const s=x.f(d);return{name:x.name,max:x.w,pts:+(s*x.w).toFixed(1),why:x.why(d)}});
  const raw=parts.reduce((a,p)=>a+p.pts,0);                 // 0..100
  const bot=Math.round(100/(1+Math.exp(-(raw-45)/9)));        // sigmoid
  return{parts,raw,bot,human:100-bot};
}
