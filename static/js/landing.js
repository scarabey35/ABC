(function(){
  const bodyEl = document.body;
  const toggleId = 'themeToggle';

  const storage = (function(){
    try{ return window.localStorage }catch(e){ return null }
  })();

  function applyStoredTheme(){
    try{
      const stored = storage ? storage.getItem('site-theme') : null;
      if(stored === 'dark') bodyEl.classList.add('dark');
      else if(stored === 'light') bodyEl.classList.remove('dark');
      else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) bodyEl.classList.add('dark');
    }catch(e){ /*иди нахуй */ }
  }

  function init(){
    applyStoredTheme();
    const toggle = document.getElementById(toggleId);
    if(!toggle) return;

    toggle.addEventListener('click', ()=>{
      const isDark = bodyEl.classList.toggle('dark');
      try{ if(storage) storage.setItem('site-theme', isDark ? 'dark' : 'light') }catch(e){}
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
