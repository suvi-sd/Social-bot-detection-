/* ===== 8. NEURAL BACKGROUND + ANALYSIS ANIMATION ===== */
let netAnim=false;
function network(cv,n,dist,speed,fixedH){
  const c=cv.getContext('2d');let W,H,pts=[];
  function size(){const r=cv.getBoundingClientRect();W=cv.width=r.width||innerWidth;H=cv.height=fixedH||r.height||innerHeight;
    pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*speed,vy:(Math.random()-.5)*speed}))}
  size();addEventListener('resize',size);
  const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  (function draw(){
    c.clearRect(0,0,W,H);
    pts.forEach(p=>{if(!still){p.x+=p.vx;p.y+=p.vy}if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1});
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<dist){c.strokeStyle=`rgba(139,92,246,${(1-d/dist)*.5})`;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke()}}
      c.fillStyle='#38bdf8';c.beginPath();c.arc(pts[i].x,pts[i].y,2,0,7);c.fill();
    }
    requestAnimationFrame(draw);
  })();
}
network($('bg'),innerWidth<700?35:70,130,.4);
network($('net-anim'),34,90,1.6,190);
/* fade-in on scroll (sections only) */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
