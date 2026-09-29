document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('[data-nav]'); const toggle=document.querySelector('[data-nav-toggle]');
  toggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  const theme=document.querySelector('[data-theme-toggle]'); const themeKey='remaxpt-theme';
  if(localStorage.getItem(themeKey)==='dark')document.body.classList.add('theme-dark');
  theme?.addEventListener('click',()=>{document.body.classList.toggle('theme-dark');localStorage.setItem(themeKey,document.body.classList.contains('theme-dark')?'dark':'light')});

  const toast=document.querySelector('[data-toast]'); let tt; const notify=(m)=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2400)};
  const key='remaxpt-saved-menu';
  const getSaved=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
  const saveSaved=a=>{localStorage.setItem(key,JSON.stringify(a));renderSaved()};
  function renderSaved(){const saved=getSaved();document.querySelectorAll('[data-save-product]').forEach(b=>{const n=b.dataset.saveProduct;b.closest('[data-product]')?.classList.toggle('is-saved',saved.includes(n));b.textContent=saved.includes(n)?'Saved':'Save'});const count=document.querySelector('[data-saved-count]');if(count)count.textContent=`${saved.length} saved`;const list=document.querySelector('[data-saved-list]');if(list)list.innerHTML=saved.map(x=>`<li>${x}</li>`).join('');const empty=document.querySelector('[data-saved-empty]');if(empty)empty.hidden=saved.length>0}
  document.querySelectorAll('[data-save-product]').forEach(b=>b.addEventListener('click',()=>{let s=getSaved();const n=b.dataset.saveProduct;s=s.includes(n)?s.filter(x=>x!==n):[...s,n];saveSaved(s);notify(s.includes(n)?`Saved: ${n}`:'Removed from list')}));
  document.querySelector('[data-clear-saved]')?.addEventListener('click',()=>saveSaved([]));
  renderSaved();

  const search=document.querySelector('[data-catalog-search]'); let active='all';
  function applyFilter(){const q=(search?.value||'').toLowerCase().trim();document.querySelectorAll('[data-product]').forEach(c=>{const okCat=active==='all'||c.dataset.category===active;const okQ=!q||(c.dataset.search||'').includes(q);c.classList.toggle('is-hidden',!(okCat&&okQ))})}
  search?.addEventListener('input',applyFilter);
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));applyFilter()}));

  document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status)status.textContent='Demo only — no order or message was transmitted. Connect a real POS/form backend before launch.';notify('Demo prepared — nothing was sent.')}));

  const reveal=[...document.querySelectorAll('main > section')]; reveal.forEach(el=>el.classList.add('reveal'));
  if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.05});reveal.forEach(el=>io.observe(el))}else reveal.forEach(el=>el.classList.add('visible'));
});
