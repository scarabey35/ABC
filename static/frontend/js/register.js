// register.js — theme toggle logic (moved from inline script)
(function(){
  const root = document.documentElement;
  const toggleId = 'themeToggle';

  // safe accessor for localStorage
  const storage = (function(){
    try{ return window.localStorage }catch(e){ return null }
  })();

  function init(){
    const toggle = document.getElementById(toggleId);

    // initialize from localStorage or system preference
    try{
      const stored = storage ? storage.getItem('site-theme') : null;
      if(stored === 'dark') root.classList.add('dark');
      else if(stored === 'light') root.classList.remove('dark');
      else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
    }catch(e){ /* ignore */ }

    if(!toggle) return;

    toggle.addEventListener('click', ()=>{
      const isDark = root.classList.toggle('dark');
      try{ if(storage) storage.setItem('site-theme', isDark ? 'dark' : 'light') }catch(e){}
    });
  }

  // If script is loaded with defer or at end of body, we can init immediately
  // Otherwise, ensure DOM is ready before accessing elements
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
