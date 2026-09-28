/* ===== 5. ANIMATED DETECTION ===== */
const STEPS=['Collecting user features','Processing activity patterns','Analyzing behavioral features','Comparing network patterns','Running AI prediction','Generating final result'];
$('f').onsubmit=e=>{
  e.preventDefault();
  const d={username:$('username').value.trim()||'unknown'};
  ['followers','following','posts','age','ppd','rt','tags','prof','eng','net'].forEach(k=>d[k]=parseFloat($(k).value)||0);
  const th=+$('th').value;
  $('result').classList.remove('show');$('result').style.display='none';
  $('analysis').style.display='block';go('#analysis');netAnim=true;
  let i=0;const total=STEPS.length;
  (function tick(){
    const p=Math.round(((i+1)/total)*100);
    $('stepTxt').textContent=`Step ${i+1}: ${STEPS[i]}`;
    $('prog').style.width=p+'%';countTo($('pct'),p,'%',700);
    i++;
    if(i<total)setTimeout(tick,750);
    else setTimeout(()=>{netAnim=false;$('analysis').style.display='none';show(d,predict(d),th)},800);
  })();
};
