/* ── PARTICLES ─────────────────────────────────── */
(function(){
  const cv = document.getElementById('pcv');
  const ctx = cv.getContext('2d');
  let W, H, pts = [];
  function resize(){
    W = cv.width = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class P {
    constructor(){this.reset()}
    reset(){
      this.x = Math.random()*W;
      this.y = Math.random()*H;
      this.vx = (Math.random()-.5)*.28;
      this.vy = (Math.random()-.5)*.28;
      this.r = Math.random()*1.2+.4;
      this.a = Math.random()*.35+.08;
      this.c = Math.random()>.55?'201,168,76':'184,192,204';
    }
    tick(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<0||this.x>W) this.vx*=-1;
      if(this.y<0||this.y>H) this.vy*=-1;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.c},${this.a})`;
      ctx.fill();
    }
  }

  for(let i=0;i<72;i++) pts.push(new P());

  function frame(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      pts[i].tick();
      pts[i].draw();
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(201,168,76,${.055*(1-d/130)})`;
          ctx.lineWidth=.5;
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ── NAV SCROLL ────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 40);
}, {passive:true});

/* ── MOBILE MENU ───────────────────────────────── */
const hmb = document.getElementById('hmb');
const mob = document.getElementById('mobMenu');
hmb.addEventListener('click', () => mob.classList.toggle('open'));
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));

/* ── COUNTERS ──────────────────────────────────── */
function animCtr(el){
  const target = parseFloat(el.dataset.target);
  const dec = parseInt(el.dataset.dec||'0');
  const dur = 1800;
  const start = performance.now();
  function step(now){
    const p = Math.min((now-start)/dur,1);
    const e = 1-Math.pow(1-p,3);
    const v = target*e;
    el.textContent = dec>0 ? v.toFixed(dec) : Math.floor(v).toLocaleString();
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
let ctrsRun = false;
const ctrEls = document.querySelectorAll('.ctr');

/* ── SCROLL REVEAL ─────────────────────────────── */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('vis');
      ro.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

const ctrObs = new IntersectionObserver((entries) => {
  if(!ctrsRun && entries.some(e=>e.isIntersecting)){
    ctrsRun=true;
    ctrEls.forEach(el => animCtr(el));
  }
},{threshold:.3});
const hsStats = document.querySelector('.hero-stats');
if(hsStats) ctrObs.observe(hsStats);

/* ── CANVAS CHARTS ─────────────────────────────── */
function dpr(){return Math.min(window.devicePixelRatio||1,2)}

function setupCanvas(cv){
  const r = dpr();
  cv.width = cv.offsetWidth * r;
  cv.height = cv.offsetHeight * r;
  const ctx = cv.getContext('2d');
  ctx.scale(r,r);
  return {ctx, W:cv.offsetWidth, H:cv.offsetHeight};
}

function smoothLine(ctx, pts, W, H){
  const minY=Math.min(...pts), maxY=Math.max(...pts), range=maxY-minY||1;
  const pad=14;
  const xs = pts.map((_,i)=>(i/(pts.length-1))*W);
  const ys = pts.map(v=>H-pad-((v-minY)/range)*(H-pad*2));
  ctx.beginPath();
  ctx.moveTo(xs[0],ys[0]);
  for(let i=1;i<xs.length-1;i++){
    const mx=(xs[i]+xs[i+1])/2, my=(ys[i]+ys[i+1])/2;
    ctx.quadraticCurveTo(xs[i],ys[i],mx,my);
  }
  ctx.lineTo(xs[xs.length-1],ys[ys.length-1]);
  return {xs,ys};
}

/* Showcase area chart */
function drawShowcase(){
  const cv = document.getElementById('showcaseChart');
  if(!cv) return;
  const {ctx,W,H} = setupCanvas(cv);
  const data=[88,92,86,94,90,97,93,101,96,108,104,116];
  const pts=smoothLine(ctx,data,W,H);
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'rgba(201,168,76,0.2)'); g.addColorStop(1,'rgba(201,168,76,0.01)');
  ctx.lineTo(pts.xs[pts.xs.length-1],H);
  ctx.lineTo(pts.xs[0],H);
  ctx.closePath();
  ctx.fillStyle=g; ctx.fill();
  smoothLine(ctx,data,W,H);
  ctx.strokeStyle='#C9A84C'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke();
  // X labels
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  ctx.fillStyle='rgba(82,93,120,0.9)'; ctx.font=`500 10px 'Space Grotesk',sans-serif`; ctx.textAlign='center';
  pts.xs.forEach((x,i)=>{if(i%2===0||i===11) ctx.fillText(months[i],x,H-1)});
}

/* Donut chart */
function drawDonut(){
  const cv = document.getElementById('donutChart');
  if(!cv) return;
  const {ctx,W,H} = setupCanvas(cv);
  const cx=W/2, cy=H/2, ro=Math.min(W,H)/2-12, ri=ro-20;
  const segs=[
    {v:.45,c:'#C9A84C',l:'Equities'},
    {v:.30,c:'#3B7DD8',l:'Fixed Inc.'},
    {v:.15,c:'#10B981',l:'Real Est.'},
    {v:.10,c:'#6C63FF',l:'Alts'},
  ];
  let ang=-Math.PI/2;
  segs.forEach(s=>{
    const end=ang+s.v*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,ro,ang,end);
    ctx.closePath();
    ctx.fillStyle=s.c+'33'; ctx.fill();
    ctx.beginPath();
    ctx.arc(cx,cy,ro,ang,end);
    ctx.arc(cx,cy,ri,end,ang,true);
    ctx.closePath();
    ctx.fillStyle=s.c; ctx.fill();
    // label
    const mid=ang+(end-ang)/2;
    if(s.v>.12){
      const lx=cx+Math.cos(mid)*(ri+ro)/2, ly=cy+Math.sin(mid)*(ri+ro)/2;
      ctx.fillStyle='rgba(5,8,22,0.85)'; ctx.font=`600 9px 'Space Grotesk',sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText((s.v*100)+'%',lx,ly);
    }
    ang=end;
  });
  // legend
  const lx=8, ly=H-48;
  segs.forEach((s,i)=>{
    const x2=lx+(i>1?(W/2):0), y2=ly+(i%2)*16;
    ctx.fillStyle=s.c; ctx.fillRect(x2,y2,10,10);
    ctx.fillStyle='rgba(138,147,168,0.9)'; ctx.font=`500 9.5px 'Space Grotesk',sans-serif`; ctx.textAlign='left'; ctx.textBaseline='middle';
    ctx.fillText(s.l,x2+14,y2+5);
  });
}

/* Bar chart */
function drawBar(){
  const cv = document.getElementById('barChart');
  if(!cv) return;
  const {ctx,W,H} = setupCanvas(cv);
  const rev=[58,62,55,70,68,75,72,81,78,88,84,96];
  const exp=[38,41,36,44,42,48,45,52,49,55,51,60];
  const months=['J','F','M','A','M','J','J','A','S','O','N','D'];
  const pad={l:8,r:8,t:10,b:22};
  const n=rev.length, maxV=Math.max(...rev)+10;
  const bW=(W-pad.l-pad.r)/n, gap=bW*.22, bw=(bW-gap*3)*.5;
  rev.forEach((rv,i)=>{
    const ex=exp[i];
    const x=pad.l+i*bW+gap;
    const rh=((rv/maxV)*(H-pad.t-pad.b));
    const eh=((ex/maxV)*(H-pad.t-pad.b));
    // Revenue
    const gy=ctx.createLinearGradient(0,0,0,H);
    gy.addColorStop(0,'rgba(201,168,76,0.7)'); gy.addColorStop(1,'rgba(201,168,76,0.25)');
    ctx.fillStyle=gy;
    ctx.beginPath(); ctx.roundRect(x,H-pad.b-rh,bw,rh,2); ctx.fill();
    // Expenses
    const gy2=ctx.createLinearGradient(0,0,0,H);
    gy2.addColorStop(0,'rgba(59,125,216,0.55)'); gy2.addColorStop(1,'rgba(59,125,216,0.15)');
    ctx.fillStyle=gy2;
    ctx.beginPath(); ctx.roundRect(x+bw+gap*.5,H-pad.b-eh,bw,eh,2); ctx.fill();
    // Label
    ctx.fillStyle='rgba(82,93,120,0.9)'; ctx.font=`500 9px 'Space Grotesk',sans-serif`; ctx.textAlign='center';
    ctx.fillText(months[i], x+bw, H-4);
  });
  // legend
  ctx.fillStyle='rgba(201,168,76,0.8)'; ctx.fillRect(W-110,8,10,10);
  ctx.fillStyle='rgba(82,93,120,0.9)'; ctx.font=`500 10px 'Space Grotesk',sans-serif`; ctx.textAlign='left';
  ctx.fillText('Revenue',W-96,14);
  ctx.fillStyle='rgba(59,125,216,0.7)'; ctx.fillRect(W-46,8,10,10);
  ctx.fillStyle='rgba(82,93,120,0.9)';
  ctx.fillText('Exp.',W-32,14);
}

/* Line projection chart */
function drawLine(){
  const cv = document.getElementById('lineChart');
  if(!cv) return;
  const {ctx,W,H} = setupCanvas(cv);
  const actual=[100,108,104,113,111,119,116,124,121,130,128,136];
  const proj=[136,142,139,148,145,154,151,160,157,166,163,172];
  function drawSeries(data, col, dashed){
    const minY=95, maxY=180, pad=14;
    const xs=data.map((_,i)=>(i/(data.length-1))*W);
    const ys=data.map(v=>H-pad-((v-minY)/(maxY-minY))*(H-pad*2));
    if(dashed){ctx.setLineDash([4,4])}else{ctx.setLineDash([])}
    ctx.beginPath();
    ctx.moveTo(xs[0],ys[0]);
    for(let i=1;i<xs.length-1;i++){
      const mx=(xs[i]+xs[i+1])/2, my=(ys[i]+ys[i+1])/2;
      ctx.quadraticCurveTo(xs[i],ys[i],mx,my);
    }
    ctx.lineTo(xs[xs.length-1],ys[xs.length-1]);
    ctx.strokeStyle=col; ctx.lineWidth=1.8; ctx.stroke();
    if(!dashed){
      const g=ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,col.replace(')',',0.15)').replace('rgb','rgba'));
      g.addColorStop(1,col.replace(')',',0.01)').replace('rgb','rgba'));
      ctx.lineTo(xs[xs.length-1],H);ctx.lineTo(xs[0],H);ctx.closePath();
      ctx.fillStyle=g;ctx.fill();
    }
    ctx.setLineDash([]);
  }
  drawSeries(actual,'rgba(201,168,76,1)',false);
  drawSeries(proj,'rgba(96,165,250,0.8)',true);
  // legend
  ctx.fillStyle='rgba(201,168,76,0.9)'; ctx.fillRect(6,6,18,2);
  ctx.fillStyle='rgba(82,93,120,0.9)'; ctx.font=`500 9.5px 'Space Grotesk',sans-serif`; ctx.textAlign='left';
  ctx.fillText('Actual',28,11);
  ctx.setLineDash([4,4]); ctx.strokeStyle='rgba(96,165,250,0.8)'; ctx.lineWidth=1.8;
  ctx.beginPath(); ctx.moveTo(W-80,9); ctx.lineTo(W-58,9); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle='rgba(82,93,120,0.9)';
  ctx.fillText('Forecast',W-54,11);
}

/* Init charts after a beat */
setTimeout(()=>{
  try{drawShowcase()}catch(e){}
  try{drawDonut()}catch(e){}
  try{drawBar()}catch(e){}
  try{drawLine()}catch(e){}
},400);

window.addEventListener('resize', ()=>{
  setTimeout(()=>{
    try{drawShowcase()}catch(e){}
    try{drawDonut()}catch(e){}
    try{drawBar()}catch(e){}
    try{drawLine()}catch(e){}
  },100);
});

/* ── PRICING TOGGLE ────────────────────────────── */
let isYearly = false;
const togSw = document.getElementById('togSw');
if(togSw){
  togSw.addEventListener('click', () => {
    isYearly = !isYearly;
    togSw.classList.toggle('yr', isYearly);
    document.querySelectorAll('.pr-num').forEach(el => {
      const val = isYearly ? parseInt(el.dataset.y) : parseInt(el.dataset.m);
      el.textContent = val;
    });
    document.querySelectorAll('.per-label').forEach(el => {
      el.textContent = isYearly ? 'annually' : 'monthly';
    });
  });
}
