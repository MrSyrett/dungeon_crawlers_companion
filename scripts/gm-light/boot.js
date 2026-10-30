/* Light / dark (account setting). The site writes localStorage.dd_theme = "light" | "dark";
   anything else is dark. Stamped on <html data-mode> before first paint; every light style in
   this file is keyed off :root[data-mode="light"], so dark is the page exactly as authored.
   A change from another tab (the account page) flips it live, including the Adventure prep
   sheet, whose own light/dark class follows the same setting (sheetDark()). */
(function(){var d=document.documentElement;function g(){var v=null;try{v=localStorage.getItem('dd_theme')}catch(e){}return v==='light'?'light':'dark'}d.dataset.mode=g();addEventListener('storage',function(e){if(e.key!==null&&e.key!=='dd_theme')return;var m=g();d.dataset.mode=m;var v=null;try{v=localStorage.getItem('dd_theme')}catch(x){}if(v==='light'||v==='dark'){try{document.querySelectorAll('.adv-hub.advh-sheet').forEach(function(n){n.classList.toggle('dark-mode',v==='dark')})}catch(x){}}})})();
