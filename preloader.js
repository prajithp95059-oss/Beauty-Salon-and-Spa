/* Stackly spa preloader – lotus bloom + water ripples. Add <script src="preloader.js"></script> in <head> */
(function () {
  var css =
    '#pl{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 42%,#FFFaf0 0%,#FBF5EA 55%,#F3E7D3 100%);transition:opacity .6s ease,visibility .6s ease}' +
    '#pl.done{opacity:0;visibility:hidden;pointer-events:none}' +
    '#pl .pl-box{display:flex;flex-direction:column;align-items:center;gap:22px}' +
    '#pl .pl-lotus{position:relative;width:260px;height:208px}' +
    '#pl .pl-lotus svg{position:absolute;left:0;top:0;width:260px;height:190px;overflow:visible}' +
    '#pl .pl-petal{transform-box:view-box;transform-origin:60px 84px;transform:scale(.15);opacity:0;animation:plbloom 3s ease-in-out infinite}' +
    '#pl .p1{animation-delay:0s}#pl .p2{animation-delay:.18s}#pl .p3{animation-delay:.36s}' +
    '#pl .pl-water{position:absolute;left:50%;bottom:0;width:52px;height:14px;margin-left:-26px;border-radius:50%;border:1.5px solid #C98A8F;opacity:0;animation:plripple 3s ease-out infinite}' +
    '#pl .pl-water.r2{animation-delay:.9s;border-color:#B88A44}' +
    '#pl .pl-water.r3{animation-delay:1.8s}' +
    '#pl img{width:120px;height:auto;opacity:.9;background:none;border:0;box-shadow:none}' +
    '#pl .pl-txt{font:500 15px/1 Georgia,"Times New Roman",serif;letter-spacing:.32em;text-transform:uppercase;color:#B88A44;animation:pltxt 3s ease-in-out infinite}' +
    '@keyframes plbloom{0%{transform:scale(.15);opacity:0}45%,70%{transform:scale(1);opacity:1}100%{transform:scale(1.04);opacity:0}}' +
    '@keyframes plripple{0%{transform:scale(.4);opacity:.8}100%{transform:scale(5.5);opacity:0}}' +
    '@keyframes pltxt{0%,100%{opacity:.45}50%{opacity:1}}' +
    'html.pl-lock{overflow:hidden}' +
    '@media(prefers-reduced-motion:reduce){#pl .pl-petal{animation:none;transform:none;opacity:1}#pl .pl-water,#pl .pl-txt{animation:none}#pl .pl-water{display:none}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var P = 'M60 84C47 66 49 40 60 20C71 40 73 66 60 84Z';
  var lotus =
    '<svg viewBox="0 0 120 100" aria-hidden="true">' +
    '<defs><linearGradient id="plg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7B4B8"/><stop offset="1" stop-color="#C98A8F"/></linearGradient>' +
    '<linearGradient id="plg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3D6D2"/><stop offset="1" stop-color="#D9A3A6"/></linearGradient></defs>' +
    '<g transform="rotate(-62 60 84)"><path class="pl-petal p1" d="' + P + '" fill="url(#plg2)" stroke="#B88A44" stroke-width=".8"/></g>' +
    '<g transform="rotate(62 60 84)"><path class="pl-petal p1" d="' + P + '" fill="url(#plg2)" stroke="#B88A44" stroke-width=".8"/></g>' +
    '<g transform="rotate(-31 60 84)"><path class="pl-petal p2" d="' + P + '" fill="url(#plg)" stroke="#B88A44" stroke-width=".8"/></g>' +
    '<g transform="rotate(31 60 84)"><path class="pl-petal p2" d="' + P + '" fill="url(#plg)" stroke="#B88A44" stroke-width=".8"/></g>' +
    '<g><path class="pl-petal p3" d="' + P + '" fill="#E7B4B8" stroke="#B88A44" stroke-width=".8"/></g>' +
    '</svg>' +
    '<span class="pl-water"></span><span class="pl-water r2"></span><span class="pl-water r3"></span>';

  var pl = document.createElement('div');
  pl.id = 'pl';
  pl.setAttribute('role', 'status');
  pl.setAttribute('aria-label', 'Loading');
  pl.innerHTML = '<div class="pl-box"><div class="pl-lotus">' + lotus + '</div><img src="stackly-logo-preloader.webp" alt=""><div class="pl-txt">Relax &middot; Renew</div></div>';
  document.documentElement.appendChild(pl);
  document.documentElement.classList.add('pl-lock');

  var start = Date.now(), hidden = false;
  function hide() {
    if (hidden) return;
    hidden = true;
    var wait = Math.max(0, 900 - (Date.now() - start)); // show at least 0.9s so the bloom is seen
    setTimeout(function () {
      pl.classList.add('done');
      document.documentElement.classList.remove('pl-lock');
      setTimeout(function () { pl.remove(); }, 700);
    }, wait);
  }
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, 6000); // safety fallback
})();
