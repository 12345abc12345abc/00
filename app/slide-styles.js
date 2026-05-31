/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — shared CSS injected
   into every slide iframe. Built on the Apple
   design system with the IEG brand palette.
   ───────────────────────────────────────────── */

const PRETENDARD_URL = location.href.replace(/[^/]*$/, '') + 'fonts/PretendardVariable.woff2';

const SLIDE_CSS = `
@font-face {
  font-family: 'Pretendard Variable';
  font-weight: 45 920;
  font-style: normal;
  font-display: block;
  src: url('${PRETENDARD_URL}') format('woff2-variations');
}

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --ieg-red: #ED1C24;        /* C0 M100 Y100 K0 */
  --ieg-red-deep: #b81620;
  --ieg-red-soft: rgba(237, 28, 36, 0.08);
  --ieg-red-line: rgba(237, 28, 36, 0.18);

  --ieg-lime: #6e6e73;       /* unified to graphite (single-accent system) */
  --ieg-lime-deep: #48484a;
  --ieg-lime-soft: rgba(110, 110, 115, 0.14);
  --ieg-lime-line: rgba(110, 110, 115, 0.5);

  --ieg-grey: #333333;       /* C0 M0 Y0 K80 */
  --ieg-grey-soft: rgba(51, 51, 51, 0.08);
  --ieg-grey-line: #d2d2d4;

  --canvas: #ffffff;
  --canvas-parchment: #f5f5f7;
  --canvas-pearl: #fafafc;
  --tile-dark: #1d1d1f;
  --tile-dark-2: #272729;

  --ink: #1d1d1f;
  --ink-2: #2d2d30;
  --ink-muted-80: #424245;
  --ink-muted-48: #6e6e73;
  --ink-muted-30: #a1a1a6;

  --hairline: #e8e8ea;
  --hairline-strong: #d2d2d6;
}

html, body {
  width: 1280px; height: 720px;
  overflow: hidden;
  background: var(--canvas);
  font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-feature-settings: 'ss01', 'ss03', 'tnum';
  color: var(--ink);
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.slide {
  width: 1280px; height: 720px; position: relative; overflow: hidden;
}

/* ── Layout & header chrome ── */
.slide-pad {
  position: absolute; inset: 0; padding: 50px 64px 38px;
  display: flex; flex-direction: column;
}

.head-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 24px; margin-bottom: 12px;
}
.badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--ieg-red); color: #fff;
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em;
  padding: 5px 12px 6px; border-radius: 999px;
  white-space: nowrap;
}
.badge::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%; background: #fff;
  display: inline-block;
}
.badge.dark { background: var(--ieg-grey); }
.badge.lime { background: var(--ieg-lime); color: #fff; }
.badge.lime::before { background: #fff; }

.brand-chip {
  display: flex; align-items: center; gap: 10px;
  color: var(--ink-muted-48); font-size: 10.5px;
  letter-spacing: 0.18em; font-weight: 700;
}
.brand-chip .bm {
  display: inline-flex; flex-direction: column; gap: 2px;
  width: 16px; height: 16px; padding: 3px 2px;
  background: var(--ieg-red); border-radius: 3px;
}
.brand-chip .bm i { display: block; height: 1.5px; background: #fff; }
.brand-chip .bm i:nth-child(1) { width: 100%; }
.brand-chip .bm i:nth-child(2) { width: 70%; }
.brand-chip .bm i:nth-child(3) { width: 40%; }

.headline {
  font-size: 26px; font-weight: 600; line-height: 1.2;
  color: var(--ink); letter-spacing: -0.026em;
  text-wrap: pretty;
}
.sub-headline {
  font-size: 14px; color: var(--ink-muted-48); font-weight: 400;
  line-height: 1.55; margin-top: 6px; letter-spacing: -0.008em;
}
.rule {
  display: block; width: 56px; height: 3px; background: var(--ieg-red);
  margin: 14px 0 18px; border-radius: 2px;
}
.rule.lime { background: var(--ieg-red); }

/* ── Card primitives ── */
.card {
  background: var(--canvas); border: 1px solid var(--hairline);
  border-radius: 14px; padding: 18px 20px;
}
.card.parchment { background: var(--canvas-parchment); }
.card.pearl { background: var(--canvas-pearl); }
.card.dark { background: var(--tile-dark); color: #fff; border-color: rgba(255,255,255,0.06); }
.card.bordered-red { border-color: var(--ieg-red-line); }
.card.bordered-lime { border-color: var(--ieg-lime-line); }

.tag {
  display: inline-block;
  font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
  color: var(--ink-muted-48); text-transform: uppercase;
}

.foot {
  position: absolute; left: 64px; right: 64px; bottom: 22px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10.5px; color: var(--ink-muted-30); letter-spacing: 0.12em;
  font-weight: 600; pointer-events: none;
}
.foot .pg-no { font-variant-numeric: tabular-nums; }

/* ── Animations ── Apple-keynote motion: emerge-from-soft-focus reveals,
   expo-out easing, gentle depth (blur + scale + translate). ── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes fadeRight { from { opacity: 0; transform: translateX(-26px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fadeLeft { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: translateX(0); } }
@keyframes riseMask { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes drawIn { to { stroke-dashoffset: 0; } }
@keyframes rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } }
@keyframes ping { 0% { transform: scale(0.7); opacity: 1; } 100% { transform: scale(2.4); opacity: 0; } }
@keyframes bgShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes shine { 0% { background-position: -200px 0; } 100% { background-position: 320px 0; } }
/* whole-slide cinematic settle on every navigation */
@keyframes slideSettle { from { opacity: 0; transform: scale(1.014); } to { opacity: 1; transform: scale(1); } }
/* ambient continuous motion (dark hero surfaces) */
@keyframes kenburns { 0% { transform: scale(1.06); } 50% { transform: scale(1.13) translateX(1.4%); } 100% { transform: scale(1.06); } }
@keyframes drift { 0% { transform: translate(0,0); } 33% { transform: translate(3%,-2.5%); } 66% { transform: translate(-2.5%,2%); } 100% { transform: translate(0,0); } }
@keyframes sheen { 0% { transform: translateX(-130%) skewX(-18deg); } 60%,100% { transform: translateX(260%) skewX(-18deg); } }
@keyframes hairExpand { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }

:root { --ease-expo: cubic-bezier(.16,1,.3,1); --ease-soft: cubic-bezier(.22,.61,.36,1); }

.slide { animation: slideSettle 0.62s var(--ease-expo) both; }

.a-up   { animation: fadeUp 0.72s var(--ease-expo) both; }
.a-in   { animation: fadeIn 0.6s ease both; }
.a-si   { animation: scaleIn 0.74s var(--ease-expo) both; }
.a-r    { animation: fadeRight 0.72s var(--ease-expo) both; }
.a-l    { animation: fadeLeft 0.72s var(--ease-expo) both; }
.a-rise { animation: riseMask 0.85s var(--ease-expo) both; }
.a-line { animation: lineGrow 0.8s var(--ease-expo) both; transform-origin: left center; }
.a-bar  { animation: barGrow 0.8s var(--ease-expo) both; transform-origin: bottom center; }

/* ambient helpers (loop) */
.amb-kenburns { animation: kenburns 22s ease-in-out infinite; will-change: transform; }
.amb-drift { animation: drift 26s ease-in-out infinite; will-change: transform; }
.amb-glow { animation: pulse 6s ease-in-out infinite; }
.sheen-host { position: relative; overflow: hidden; }
.sheen-host::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 38%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
  transform: translateX(-130%) skewX(-18deg);
  animation: sheen 5.5s ease-in-out 1.1s infinite;
  pointer-events: none;
}

.d0  { animation-delay: 0s; }
.d1  { animation-delay: 0.07s; }
.d2  { animation-delay: 0.14s; }
.d3  { animation-delay: 0.22s; }
.d4  { animation-delay: 0.30s; }
.d5  { animation-delay: 0.38s; }
.d6  { animation-delay: 0.46s; }
.d7  { animation-delay: 0.54s; }
.d8  { animation-delay: 0.62s; }
.d9  { animation-delay: 0.70s; }
.d10 { animation-delay: 0.78s; }
.d11 { animation-delay: 0.86s; }
.d12 { animation-delay: 0.94s; }
.d13 { animation-delay: 1.02s; }
.d14 { animation-delay: 1.10s; }
.d15 { animation-delay: 1.18s; }
.d16 { animation-delay: 1.26s; }
.d17 { animation-delay: 1.34s; }
.d18 { animation-delay: 1.42s; }
.d19 { animation-delay: 1.50s; }
.d20 { animation-delay: 1.58s; }

/* ── Number / count utility ── */
.num-display {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
  letter-spacing: -0.04em;
}

/* ── Auto-shrink text helper: container shrinks scale via JS measurement ── */
.shrink-fit { display: block; transform-origin: top left; }

/* ── Bar / Progress primitives ── */
.bar-track {
  position: relative; height: 8px;
  background: var(--hairline); border-radius: 99px; overflow: hidden;
}
.bar-fill {
  position: absolute; left: 0; top: 0; bottom: 0;
  background: var(--ieg-red); border-radius: 99px;
  transform-origin: left center;
  animation: lineGrow 0.85s cubic-bezier(.22,.61,.36,1) both;
}

/* ── Static-mode override (PDF capture) ── */
html[data-static="1"] *,
html[data-static="1"] *::before,
html[data-static="1"] *::after {
  animation-duration: 0.001s !important;
  animation-delay: 0s !important;
  animation-iteration-count: 1 !important;
  transition: none !important;
  filter: none !important;
}
html[data-static="1"] .a-up, html[data-static="1"] .a-si, html[data-static="1"] .a-r,
html[data-static="1"] .a-l, html[data-static="1"] .a-line, html[data-static="1"] .a-bar,
html[data-static="1"] .a-in, html[data-static="1"] .a-rise, html[data-static="1"] .slide {
  opacity: 1 !important; transform: none !important; clip-path: none !important; filter: none !important;
}

/* ── Scroll containers (tables) ── */
.scroll-y { overflow-y: auto; }
.scroll-y::-webkit-scrollbar { width: 6px; }
.scroll-y::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.16); border-radius: 3px; }

/* ── Common typographic helpers ── */
.kicker {
  font-size: 11px; letter-spacing: 0.22em; font-weight: 700;
  color: var(--ink-muted-48); text-transform: uppercase;
}
.text-red { color: var(--ieg-red); }
.text-lime { color: var(--ieg-lime-deep); }
.text-grey { color: var(--ieg-grey); }
.fw-7 { font-weight: 700; } .fw-6 { font-weight: 600; } .fw-5 { font-weight: 500; }

.divider-v {
  display: inline-block; width: 1px; height: 14px;
  background: var(--hairline-strong); margin: 0 8px; vertical-align: middle;
}

/* ── List item w/ dot ── */
.bullet {
  display: flex; gap: 8px; align-items: baseline;
  font-size: 13px; line-height: 1.55; color: var(--ink-muted-80);
  padding: 4px 0;
}
.bullet::before {
  content: ''; flex-shrink: 0; width: 4px; height: 4px; border-radius: 50%;
  background: var(--ieg-red); transform: translateY(-2px);
}
.bullet.lime::before { background: var(--ieg-lime); }
.bullet.grey::before { background: var(--ieg-grey); }
.bullet.bare::before { display: none; }

/* ── Chart canvas: fix aspect inside flex parents ── */
canvas { max-width: 100%; }
`;

/* HTML envelope */
/* ─────────────────────────────────────────────
   SLIDE_FIT — 번역 슬라이드 전용 텍스트 자동 맞춤
   · 원본(ko)에는 절대 실행되지 않음 (mkS 의 fitOn 게이트)
   · 슬라이드/레이아웃은 건드리지 않고, "넘치는 텍스트 박스" 만 조정
   · 순서: 가로 넘침 → 줄바꿈 우선 → 행간/자간 미세조정 → 최소 글자 축소(하한 0.70)
   · 장식용 absolute/fixed 요소는 측정에서 제외
   ───────────────────────────────────────────── */
function SLIDE_FIT(FIT) {
  function hasText(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var c = el.childNodes[i];
      if (c.nodeType === 3 && c.nodeValue.trim()) return true;
    }
    return false;
  }
  /* [data-fit] 스케일러 (원본 포함 항상 동작) */
  function dataFit() {
    var list = document.querySelectorAll('[data-fit]');
    for (var i = 0; i < list.length; i++) {
      var el = list[i], p = el.parentElement; if (!p) continue;
      var max = parseFloat(el.dataset.fitMax || '1'), min = parseFloat(el.dataset.fitMin || '0.55');
      el.style.transform = 'none'; el.style.transformOrigin = 'top left';
      var s = Math.min(max, p.clientHeight / el.scrollHeight, p.clientWidth / el.scrollWidth);
      if (s < min) s = min;
      if (s < 1) el.style.transform = 'scale(' + s + ')';
    }
  }
  function px(v) { var n = parseFloat(v); return isNaN(n) ? 0 : n; }
  function contentBox(el) {
    var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return {
      bottom: r.bottom - px(cs.borderBottomWidth) - px(cs.paddingBottom),
      right: r.right - px(cs.borderRightWidth) - px(cs.paddingRight)
    };
  }
  /* bounded(overflow가 hidden/auto/scroll)인 박스에서, 흐름(비-absolute) 자식이 콘텐츠 박스를 넘는가 */
  function boxClips(el) {
    var cs = getComputedStyle(el), oy = cs.overflowY, ox = cs.overflowX;
    if (oy !== 'hidden' && oy !== 'auto' && oy !== 'scroll' && ox !== 'hidden' && ox !== 'auto' && ox !== 'scroll') return false;
    var cb = contentBox(el), k = el.children;
    for (var i = 0; i < k.length; i++) {
      var kc = getComputedStyle(k[i]); if (kc.position === 'absolute' || kc.position === 'fixed') continue;
      var kr = k[i].getBoundingClientRect();
      if (kr.height && (kr.bottom > cb.bottom + 2 || kr.right > cb.right + 2)) return true;
    }
    return false;
  }
  function autoFitTranslated() {
    /* 루트 후보: .slide-pad 가 있으면 그것, 없으면 .slide 전체.
       (renderInvestment 등 .slide-pad 를 쓰지 않는 커스텀 레이아웃 슬라이드도
        번역 시 nowrap→줄바꿈 완화 + 자동 맞춤 대상에 포함되도록 일반화) */
    var pad = document.querySelector('.slide-pad') || document.querySelector('.slide'); if (!pad) return;
    var all = [].slice.call(pad.querySelectorAll('*'));
    var padCB = (function () {
      var r = pad.getBoundingClientRect(), cs = getComputedStyle(pad);
      return { bottom: r.bottom - px(cs.paddingBottom), right: r.right - px(cs.paddingRight) };
    })();
    /* 흐름 텍스트가 슬라이드(.slide-pad) 콘텐츠 영역을 넘는가 (absolute 장식 제외) */
    function padOverflow() {
      for (var i = 0; i < all.length; i++) {
        var el = all[i], cs = getComputedStyle(el);
        if (cs.position === 'absolute' || cs.position === 'fixed') continue;
        if (!hasText(el)) continue;
        var r = el.getBoundingClientRect();
        if (r.height && (r.bottom > padCB.bottom + 3 || r.right > padCB.right + 3)) return true;
      }
      return false;
    }
    /* 1) 가로 넘침/겹침 방지 — 번역 모드에서는 nowrap 텍스트를 줄바꿈 허용으로 전환
       (한 줄에 들어가면 그대로, 넘칠 때만 자연스럽게 줄바꿈되어 옆 글자와 겹치지 않음) */
    all.forEach(function (el) {
      if (!hasText(el)) return;
      var cs = getComputedStyle(el);
      if (cs.whiteSpace === 'nowrap') {
        el.style.whiteSpace = 'normal'; el.style.overflowWrap = 'break-word'; el.style.wordBreak = 'break-word';
      }
    });
    /* 2) 넘치는 박스(scope) 수집 — 내부 클리핑 박스들 + (필요시) 슬라이드 전체 */
    var scopes = [];
    all.forEach(function (el) { var cs = getComputedStyle(el); if (cs.position === 'fixed') return; if (boxClips(el)) scopes.push(el); });
    var padOver = padOverflow();
    if (padOver) scopes.push(pad);
    if (!scopes.length) return;
    function depth(el) { var d = 0; while (el && el !== pad) { d++; el = el.parentElement; } return d; }
    scopes.sort(function (a, b) { return depth(b) - depth(a); }); /* 안쪽(깊은) 박스부터 */
    scopes.forEach(function (s, i) { s.__fitIdx = i; });
    /* 각 텍스트를 '가장 가까운 scope 조상'에 배정 */
    var groups = scopes.map(function () { return []; });
    all.forEach(function (el) {
      if (!hasText(el)) return;
      var cs = getComputedStyle(el); if (cs.position === 'fixed') return;
      var p = el;
      while (p && p !== pad.parentElement) {
        if (p.__fitIdx !== undefined) { groups[p.__fitIdx].push({ el: el, fs: px(getComputedStyle(el).fontSize), lh: getComputedStyle(el).lineHeight }); break; }
        p = p.parentElement;
      }
    });
    function clips(s) { return s === pad ? padOverflow() : boxClips(s); }
    scopes.forEach(function (s) {
      var grp = groups[s.__fitIdx]; if (!grp.length || !clips(s)) return;
      /* 3) 행간 미세조정 먼저 (글자 축소 최소화) */
      grp.forEach(function (o) {
        var r = parseFloat(o.lh);
        if (!isNaN(r) && o.fs) { var ratio = r / o.fs; if (ratio > 1.3) o.el.style.lineHeight = Math.max(1.22, ratio * 0.9).toFixed(3); }
      });
      /* 4) 그래도 넘치면 해당 박스 텍스트만 균일 축소 (하한 0.70, 작은 폭 0.03) */
      var f = 1;
      for (var k = 0; k < 24 && clips(s); k++) {
        f -= 0.03; if (f < 0.7) f = 0.7;
        grp.forEach(function (o) { o.el.style.fontSize = (o.fs * f).toFixed(2) + 'px'; });
        if (f <= 0.7) break;
      }
      if (f < 1 && s.setAttribute) s.setAttribute('data-autofit', f.toFixed(2));
    });
  }
  var ran = false;
  function go() { if (ran) return; ran = true; try { dataFit(); } catch (e) {} if (FIT) { try { autoFitTranslated(); } catch (e) {} } }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(go, 520); } else { setTimeout(go, 280); }
}

function mkS(bodyHTML, chartJS, opts) {
  opts = opts || {};
  const chartScript = (typeof Chart !== 'undefined') ? '' : ''; // chart provided via inline below
  const fitOn = (typeof window !== 'undefined' && window.LANG && window.LANG !== 'ko');
  return '<!DOCTYPE html><html><head>'
    + '<meta charset="UTF-8">'
    + '<style>' + SLIDE_CSS + '</style>'
    + '</head><body>'
    + bodyHTML
    + '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>'
    + '<script>if(window.Chart){Chart.defaults.devicePixelRatio=3;Chart.defaults.font.family="Pretendard Variable, sans-serif";}<\/script>'
    + (chartJS ? '<script>' + chartJS + '<\/script>' : '')
    + '<script>window.addEventListener("load",function(){(' + SLIDE_FIT.toString() + ')(' + (fitOn ? 'true' : 'false') + ');});<\/script>'
    + '<script>(function(){'
      + 'function post(o){try{parent.postMessage(o,"*");}catch(e){}}'
      + 'document.addEventListener("click",function(e){post({__fs:"click",r:(e.clientX/(window.innerWidth||1))});},true);'
      + 'var lastMove=0;document.addEventListener("mousemove",function(){var t=Date.now();if(t-lastMove>300){lastMove=t;post({__fs:"move"});}},{passive:true});'
    + '})();<\/script>'
    + '</body></html>';
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Foot helper */
function FOOT(idx, total) {
  return '<div class="foot">'
    + '<span style="display:flex;align-items:center;gap:8px">'
      + 'IEG'
    + '</span>'
    + '<span class="pg-no">' + String(idx).padStart(2, '0') + ' / ' + String(total).padStart(2, '0') + '</span>'
  + '</div>';
}

function HEAD(badge, headline, sub, opts) {
  opts = opts || {};
  const ruleCls = opts.lime ? 'rule lime' : 'rule';
  const subHTML = sub ? '<div class="sub-headline a-up d2">' + esc(sub) + '</div>' : '';
  return '<div class="head-row">'
    + '<div>'
      + '<div class="a-up d0" style="margin-bottom:8px"><span class="badge">' + esc(badge) + '</span></div>'
      + '<div class="headline a-rise d1">' + esc(headline) + '</div>'
      + subHTML
    + '</div>'
    + '</div>'
    + '<span class="' + ruleCls + ' a-line d3" style="transform-origin:left center"></span>';
}
