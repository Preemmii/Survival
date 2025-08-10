
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const W = canvas.width, H = canvas.height;
let player = {x: W/2, y: H/2, size: 16};
let dest = null;
let wood = 0, meat = 0, rice = 0;
const tree = {x: 120, y: 200, hp: 3};
const plot = {x: 520, y: 220, state: 'empty', grow:0};
const deer = {x: 460, y: 100, alive: true};

document.getElementById('btn-chop').addEventListener('click', ()=>{
  if (distance(player, tree) < 40 && tree.hp>0){
    tree.hp--;
    showMsg('You chop the tree. HP=' + tree.hp);
    if (tree.hp<=0){ wood += 3; updateHUD(); showMsg('Tree fell! Collected wood.'); }
  } else showMsg('Get closer to the tree to chop.');
});

document.getElementById('btn-plant').addEventListener('click', ()=>{
  if (distance(player, plot) < 50){
    if (plot.state==='empty'){ plot.state='planted'; plot.grow=0; showMsg('Planted rice.'); }
    else if (plot.state==='grown'){ rice += 2; plot.state='empty'; updateHUD(); showMsg('Harvested rice.'); }
    else showMsg('Plot is growing.');
  } else showMsg('Move closer to the plot.');
});

document.getElementById('btn-hunt').addEventListener('click', ()=>{
  if (distance(player, deer) < 80 && deer.alive){ deer.alive=false; meat += 2; updateHUD(); showMsg('You hunted the deer.'); }
  else showMsg('Get closer to hunt.');
});

canvas.addEventListener('click', (e)=>{
  const rect = canvas.getBoundingClientRect();
  const cx = (e.clientX - rect.left) / rect.width * W;
  const cy = (e.clientY - rect.top) / rect.height * H;
  dest = {x: cx, y: cy};
});

function distance(a,b){ let dx=a.x-b.x, dy=a.y-b.y; return Math.hypot(dx,dy); }
function showMsg(s){ document.getElementById('msg').innerText = s; }
function updateHUD(){ document.getElementById('wood').innerText = wood; document.getElementById('meat').innerText = meat; document.getElementById('rice').innerText = rice; }

function update(dt){
  if (dest){
    let dx = dest.x - player.x, dy = dest.y - player.y;
    let d = Math.hypot(dx,dy);
    if (d > 2){ player.x += dx/d * Math.min(200*dt,d); player.y += dy/d * Math.min(200*dt,d); }
    else dest = null;
  }
  if (plot.state === 'planted'){ plot.grow += dt; if (plot.grow > 6){ plot.state = 'grown'; showMsg('Rice is grown. Harvest!'); } }
}

let last = performance.now();
function loop(t){
  const now = performance.now();
  const dt = (now-last)/1000; last = now;
  update(dt); draw();
  requestAnimationFrame(loop);
}

function draw(){
  ctx.clearRect(0,0,W,H);
  // ground
  ctx.fillStyle = '#6ac24a'; ctx.fillRect(0,0,W,H);
  // tree
  if (tree.hp>0){ ctx.fillStyle='#8b5a2b'; ctx.fillRect(tree.x-8, tree.y-16, 16, 32); ctx.fillStyle='#2e8b2e'; ctx.beginPath(); ctx.arc(tree.x, tree.y-24, 28, 0, Math.PI*2); ctx.fill(); }
  else { ctx.fillStyle='#8b5a2b'; ctx.fillRect(tree.x-20, tree.y+6, 40, 6); }
  // plot
  ctx.fillStyle = '#704214'; ctx.fillRect(plot.x-24, plot.y-8, 48, 24);
  if (plot.state === 'planted'){ ctx.fillStyle='#3d7a27'; ctx.fillRect(plot.x-6, plot.y-12, 12, 24); }
  if (plot.state === 'grown'){ ctx.fillStyle='#e3c06b'; ctx.fillRect(plot.x-18, plot.y-20, 36, 32); }
  // deer
  if (deer.alive){ ctx.fillStyle='#8b5a2b'; ctx.fillRect(deer.x-16, deer.y-8, 32, 16); }
  // player
  ctx.fillStyle='#dca16e'; ctx.fillRect(player.x - 8, player.y - 12, 16, 24);
  // HUD text
  ctx.fillStyle='#000'; ctx.fillRect(6,6,180,26);
  ctx.fillStyle='#fff'; ctx.font='14px Arial'; ctx.fillText('Wood: '+wood+' Meat: '+meat+' Rice: '+rice, 10,24);
}

requestAnimationFrame(loop);
