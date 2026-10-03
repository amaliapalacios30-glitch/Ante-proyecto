const slides=[...document.querySelectorAll('.slide')];
const counter=document.querySelector('#counter'),bar=document.querySelector('#progressBar');
const menu=document.querySelector('#menu'),list=document.querySelector('#menuList');
let current=0,touchX=0;
function show(n){
  current=(n+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active',i===current));
  counter.textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  bar.style.width=`${((current+1)/slides.length)*100}%`;
  document.title=`${slides[current].dataset.title} | Colaboración humano–IA`;
  history.replaceState(null,'',`#${current+1}`);
}
slides.forEach((s,i)=>{const li=document.createElement('li');li.textContent=s.dataset.title;li.onclick=()=>{show(i);menu.classList.remove('open')};list.appendChild(li)});
document.querySelector('#nextBtn').onclick=()=>show(current+1);
document.querySelector('#prevBtn').onclick=()=>show(current-1);
document.querySelector('#menuBtn').onclick=()=>menu.classList.add('open');
document.querySelector('#closeMenu').onclick=()=>menu.classList.remove('open');
document.querySelector('#fullBtn').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)}if(e.key==='Escape')menu.classList.remove('open');if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1)});
document.addEventListener('touchstart',e=>touchX=e.changedTouches[0].screenX,{passive:true});
document.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-touchX;if(Math.abs(d)>55)show(current+(d<0?1:-1))},{passive:true});
const start=Math.max(0,Math.min(slides.length-1,(parseInt(location.hash.slice(1))||1)-1));show(start);
