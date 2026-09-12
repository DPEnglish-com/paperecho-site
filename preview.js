const screens={home:'homeScreen',library:'libraryScreen',article:'articleScreen'};
const title={home:'Good morning, Yuki',library:'阅读库',article:'阅读文章'};
function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.add('hidden'));document.getElementById(screens[name]).classList.remove('hidden');document.getElementById('screenTitle').textContent=title[name];document.querySelectorAll('[data-screen]').forEach(x=>x.classList.toggle('active',x.dataset.screen===name));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-screen]').forEach(el=>el.addEventListener('click',()=>show(el.dataset.screen)));
document.querySelectorAll('[data-open="article"]').forEach(el=>el.addEventListener('click',()=>show('article')));
document.getElementById('startReading').addEventListener('click',()=>show('article'));
document.getElementById('backToLibrary').addEventListener('click',()=>show('library'));
document.getElementById('newReading').addEventListener('click',()=>{show('home');const toast=document.getElementById('toast');toast.textContent='生成设置已准备好';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)});
document.querySelectorAll('[data-rating]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-rating]').forEach(x=>x.classList.remove('selected'));button.classList.add('selected');document.getElementById('ratingResult').textContent='已记录：'+button.querySelector('small').textContent+'。下一篇文章会更贴近你的水平。';const toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}));
document.getElementById('mobileMenu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
