// Basic interactive behaviors: mobile nav toggle, project modal, form handling
(function(){
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  navToggle && navToggle.addEventListener('click', ()=> {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if(primaryNav){
      primaryNav.style.display = expanded ? 'none' : 'block';
    }
  });

  // Project modal data (replace links with real demos / repos)
  const projects = {
    1:{title:'Portfolio', desc:'This portfolio (refactored). Responsive design, accessible markup.', tech:'HTML • CSS • JS', live:'#', code:'https://github.com/TheMaverick2000/portfolio'},
    2:{title:'Weather App', desc:'Simple weather dashboard using public APIs and friendly UI.', tech:'HTML • CSS • JS • Fetch API', live:'#', code:'#'},
    3:{title:'Task Manager', desc:'Lightweight task manager with localStorage persistence.', tech:'HTML • CSS • JS', live:'#', code:'#'}
  };

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLive = document.getElementById('modalLive');
  const modalCode = document.getElementById('modalCode');
  const modalClose = document.getElementById('modalClose');

  function openModal(id){
    const p = projects[id];
    if(!p) return;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalLive.href = p.live;
    modalCode.href = p.code;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.open-project').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = btn.dataset.id;
      openModal(id);
    });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal();});

  // Simple form submission UX (non-production)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      status.textContent = 'Sending…';
      fetch(form.action, {
        method:form.method,
        body:data,
        headers: { 'Accept': 'application/json' }
      }).then(res=>{
        if(res.ok){
          status.textContent = 'Message sent — thank you!';
          form.reset();
        } else {
          status.textContent = 'There was an issue sending the message.';
        }
      }).catch(()=> status.textContent = 'Network error — try again later.');
    });
  }
})();
