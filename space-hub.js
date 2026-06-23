/* ─────────────────────────────────────────────
   IEG INSIGHT — Immersive 3D space hub
   Three.js deep-space starfield + GSAP scroll
   journey. No planets — open space only.

   • Scroll drives a camera flight through the
     starfield; each section reveals a content
     panel (EN + KO title + description).
   • Clicking an item's "슬라이드 쇼" reveals the
     translation + start controls. They hide on:
     background click · section change · 이전 · ESC.
   ───────────────────────────────────────────── */
(function () {
  'use strict';

  var hub, scroller, canvas;
  var renderer, scene, camera, clock;
  var starGroup, mainStars, accentStars, nebula;
  var rafId = null, running = false;
  var activeSec = 0, lastActiveSec = 0, currentDeck = null;

  /* camera flight bounds */
  var CAM_START_Z = 40;
  var CAM_TRAVEL  = 1150;     // distance flown over full scroll
  var camZ = CAM_START_Z, camTargetZ = CAM_START_Z;
  var camX = 0, camY = 0, camTX = 0, camTY = 0;
  var mouseX = 0, mouseY = 0;
  var scrollProg = 0;

  var BRAND_RED   = [0.929, 0.110, 0.141]; // #ED1C24
  var BRAND_GOLD  = [1.000, 0.706, 0.000]; // #FFB400

  /* ── soft round star sprite ── */
  function makeStarTexture() {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var g = c.getContext('2d');
    var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0.0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.2, 'rgba(255,255,255,0.92)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.32)');
    grd.addColorStop(1.0, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    var t = new THREE.CanvasTexture(c);
    return t;
  }

  /* ── build the whole star field ── */
  function buildStars(tex) {
    starGroup = new THREE.Group();

    /* main field — cool whites + faint blues */
    var N = (window.innerWidth <= 768) ? 4200 : 9000;
    var SPREAD = 1400, DEPTH = 1700;
    var pos = new Float32Array(N * 3);
    var col = new Float32Array(N * 3);
    var siz = new Float32Array(N);
    for (var i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * SPREAD;
      pos[i*3+1] = (Math.random() - 0.5) * SPREAD;
      pos[i*3+2] = -Math.random() * DEPTH + 40;
      var t = Math.random();
      // mostly white, some cool blue, a sprinkle of warm
      var r, gg, b;
      if (t < 0.7)       { r = 1.0;  gg = 1.0;  b = 1.0; }
      else if (t < 0.92) { r = 0.66; gg = 0.78; b = 1.0; }   // blue-white
      else               { r = 1.0;  gg = 0.88; b = 0.72; }  // warm-white
      var dim = 0.55 + Math.random() * 0.45;
      col[i*3] = r*dim; col[i*3+1] = gg*dim; col[i*3+2] = b*dim;
      siz[i] = Math.random() * 5 + 1.4;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(siz, 1));
    var mat = new THREE.PointsMaterial({
      size: 6, map: tex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending,
      sizeAttenuation: true, opacity: 0.95
    });
    mainStars = new THREE.Points(geo, mat);
    starGroup.add(mainStars);

    /* accent stars — brand red + gold, bigger glow */
    var M = (window.innerWidth <= 768) ? 160 : 360;
    var p2 = new Float32Array(M * 3);
    var c2 = new Float32Array(M * 3);
    for (var j = 0; j < M; j++) {
      p2[j*3]   = (Math.random() - 0.5) * SPREAD;
      p2[j*3+1] = (Math.random() - 0.5) * SPREAD;
      p2[j*3+2] = -Math.random() * DEPTH + 40;
      var warm = Math.random() < 0.55 ? BRAND_RED : BRAND_GOLD;
      var d2 = 0.7 + Math.random() * 0.3;
      c2[j*3] = warm[0]*d2; c2[j*3+1] = warm[1]*d2; c2[j*3+2] = warm[2]*d2;
    }
    var geo2 = new THREE.BufferGeometry();
    geo2.setAttribute('position', new THREE.BufferAttribute(p2, 3));
    geo2.setAttribute('color', new THREE.BufferAttribute(c2, 3));
    var mat2 = new THREE.PointsMaterial({
      size: 13, map: tex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending,
      sizeAttenuation: true, opacity: 0.9
    });
    accentStars = new THREE.Points(geo2, mat2);
    starGroup.add(accentStars);

    /* nebula clouds — large, very soft, colored */
    var clouds = [
      { c: [0.50, 0.13, 0.16], z: -420,  s: 760, x: -360, y: 200 },
      { c: [0.14, 0.20, 0.52], z: -760,  s: 920, x: 420,  y: -160 },
      { c: [0.42, 0.16, 0.46], z: -1080, s: 880, x: -240, y: -260 },
      { c: [0.10, 0.30, 0.40], z: -240,  s: 560, x: 300,  y: 280 },
      { c: [0.46, 0.20, 0.10], z: -1380, s: 980, x: 120,  y: 120 }
    ];
    var K = clouds.length;
    var p3 = new Float32Array(K * 3);
    var c3 = new Float32Array(K * 3);
    var s3 = new Float32Array(K);
    for (var k = 0; k < K; k++) {
      p3[k*3] = clouds[k].x; p3[k*3+1] = clouds[k].y; p3[k*3+2] = clouds[k].z;
      c3[k*3] = clouds[k].c[0]; c3[k*3+1] = clouds[k].c[1]; c3[k*3+2] = clouds[k].c[2];
      s3[k] = clouds[k].s;
    }
    var geo3 = new THREE.BufferGeometry();
    geo3.setAttribute('position', new THREE.BufferAttribute(p3, 3));
    geo3.setAttribute('color', new THREE.BufferAttribute(c3, 3));
    geo3.setAttribute('size', new THREE.BufferAttribute(s3, 1));
    var mat3 = new THREE.PointsMaterial({
      size: 800, map: tex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending,
      sizeAttenuation: true, opacity: 0.22
    });
    nebula = new THREE.Points(geo3, mat3);
    starGroup.add(nebula);

    scene.add(starGroup);
  }

  /* ── init three.js ── */
  function initThree() {
    if (!window.THREE) return false;
    canvas = document.getElementById('space-canvas');
    if (!canvas) return false;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060f, 0.00055);

    camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, CAM_START_Z);

    clock = new THREE.Clock();
    buildStars(makeStarTexture());
    return true;
  }

  function resize() {
    if (!renderer) return;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  /* ── render loop ── */
  function tick() {
    if (!running) return;
    rafId = requestAnimationFrame(tick);

    // scroll progress → camera depth
    var max = scroller.scrollHeight - scroller.clientHeight;
    scrollProg = max > 0 ? (scroller.scrollTop / max) : 0;
    camTargetZ = CAM_START_Z - scrollProg * CAM_TRAVEL;

    // gentle parallax from pointer
    camTX = mouseX * 26;
    camTY = -mouseY * 18;

    camZ += (camTargetZ - camZ) * 0.06;
    camX += (camTX - camX) * 0.045;
    camY += (camTY - camY) * 0.045;
    camera.position.set(camX, camY, camZ);
    camera.lookAt(camX * 0.35, camY * 0.35, camZ - 60);

    var t = clock.getElapsedTime();
    if (starGroup) {
      starGroup.rotation.z = t * 0.006;
      starGroup.rotation.y = Math.sin(t * 0.03) * 0.03;
    }
    if (accentStars) {
      // subtle twinkle on accent layer
      accentStars.material.opacity = 0.7 + Math.sin(t * 1.4) * 0.18;
    }
    renderer.render(scene, camera);
  }

  function startLoop() {
    if (running || !renderer) return;
    running = true;
    clock.start();
    tick();
  }
  function stopLoop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  /* ── intro title animation (GSAP) ── */
  function playIntro() {
    if (!window.gsap) return;
    var a = hub.querySelector('.ti-ieg');
    var b = hub.querySelector('.ti-insight');
    var rule = hub.querySelector('.sp-hero-rule');
    gsap.killTweensOf([a, b, rule]);
    gsap.set([a, b, rule], { clearProps: 'opacity,transform' });
    var tl = gsap.timeline();
    tl.fromTo(a, { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' }, 0.2)
      .fromTo(b, { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' }, 0.42)
      .fromTo(rule, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.85);
  }

  /* ── section reveal + active tracking ── */
  function setupObserver() {
    var secs = hub.querySelectorAll('.sp-sec');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && en.intersectionRatio >= 0.5) {
          en.target.classList.add('in');
          var idx = parseInt(en.target.getAttribute('data-sec'), 10);
          if (idx !== activeSec) {
            activeSec = idx;
            updateDots();
            hideAllControls();          // section change → hide controls
            toggleCue(idx === 0);
          }
        }
      });
    }, { root: scroller, threshold: [0.5, 0.6] });
    secs.forEach(function (s) { io.observe(s); });
  }

  function updateDots() {
    hub.querySelectorAll('.sp-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === activeSec);
    });
    hub.querySelectorAll('.sp-menu-link').forEach(function (m) {
      m.classList.toggle('active', parseInt(m.getAttribute('data-go'), 10) === activeSec);
    });
  }
  function toggleCue(on) {
    var cue = document.getElementById('sp-cue');
    if (cue) cue.classList.toggle('show', !!on);
  }

  /* ── reset when the hub (re)appears ── */
  function resetHub() {
    // explicit request wins; otherwise restore whichever item was last selected
    var startSec = (pendingReturnSec != null) ? pendingReturnSec : lastActiveSec;
    pendingReturnSec = null;
    currentDeck = null;
    hideAllControls();

    var secs = hub.querySelectorAll('.sp-sec');
    var target = secs[startSec];
    if (scroller) scroller.scrollTop = target ? target.offsetTop : 0;
    activeSec = startSec;

    // seat the camera at the matching depth so it doesn't fly across on return
    var max = scroller ? (scroller.scrollHeight - scroller.clientHeight) : 0;
    var prog = max > 0 ? (scroller.scrollTop / max) : 0;
    camZ = camTargetZ = CAM_START_Z - prog * CAM_TRAVEL;
    camX = camY = camTX = camTY = 0;

    updateDots();
    toggleCue(startSec === 0);
    startLoop();
    if (startSec === 0) playIntro();
  }
  /* allow other screens (e.g. the video hub) to return to a specific section */
  var pendingReturnSec = null;
  var launchSec = null;
  window.spReturnTo = function (i) { pendingReturnSec = i; };

  /* ─────────── controls ─────────── */
  function actEl(id) { return document.getElementById('act-' + id); }

  /* graceful close: fade out (drop .shown), then remove .open after the transition */
  function closeActions(el) {
    if (!el || !el.classList.contains('open')) return;
    el.classList.remove('shown');
    window.setTimeout(function () {
      // only finish closing if it wasn't re-opened in the meantime
      if (!el.classList.contains('shown')) el.classList.remove('open');
    }, 340);
  }

  function hideAllControls() {
    document.querySelectorAll('.sp-actions.open').forEach(closeActions);
  }

  window.spOpen = function (id) {
    hideAllControls();
    currentDeck = id;
    // preload deck data so translation/slideshow act on the right content
    if (id === 'company' || id === 'ir') loadDeckSilently(id);
    else { window.LANG = 'ko'; window.PENDING_LANG = 'ko'; if (window.syncLangUI) window.syncLangUI(); }
    var act = actEl(id);
    if (!act) return;
    act.classList.add('open');
    // sync this section's lang select + button states
    syncControls(id);
    requestAnimationFrame(function () { act.classList.add('shown'); });
  };

  window.spClose = function (id) {
    closeActions(actEl(id));
    if (currentDeck === id) currentDeck = null;
  };

  window.spStage = function (id, lang) {
    if (window.stageLang) window.stageLang(lang);
    syncControls(id);
  };

  window.spApply = function (id) {
    if (!window.applyLang) return;
    var p = window.applyLang();
    if (p && p.then) p.then(function () { syncControls(id); });
    else syncControls(id);
    syncControls(id);
  };

  window.spStart = function (id) {
    if (id === 'video') {
      hideAllControls();
      if (window.openVideoHub) window.openVideoHub();
      return;
    }
    // company / ir → ensure language applied, then launch slideshow
    var go = function () {
      launchSec = activeSec;            // remember where we launched from
      window.SPACE_PRESENT = true;
      hideAllControls();
      if (window.enterStudio) window.enterStudio(true);
      else if (window.startShow) window.startShow(true);
    };
    if (window.presentationReady && !window.presentationReady()) {
      // a language is staged but not yet applied → apply first
      if (window.applyLang) {
        var p = window.applyLang();
        if (p && p.then) { p.then(go); return; }
      }
    }
    go();
  };

  /* load a deck's data into the shared engine without showing the old landing */
  function loadDeckSilently(id) {
    if (!window.DECKS || !window.DECKS[id]) return;
    window.DECK = id;
    try { slides = JSON.parse(JSON.stringify(window.DECKS[id].data)); } catch (e) {}
    if (typeof cur !== 'undefined') cur = 0;
    window.LANG = 'ko';
    window.PENDING_LANG = 'ko';
    if (window.resetTranslationCache) window.resetTranslationCache();
    if (window.setDeckChrome) window.setDeckChrome(id);
    if (window.buildSidebar) window.buildSidebar();
    if (window.goTo) window.goTo(0);
    if (window.syncLangUI) window.syncLangUI();
  }

  /* reflect translation state on a section's apply/start buttons */
  function syncControls(id) {
    var act = actEl(id);
    if (!act) return;
    var sel = act.querySelector('.sp-lang');
    if (sel && typeof window.PENDING_LANG !== 'undefined') sel.value = window.PENDING_LANG;
    var needApply = (window.PENDING_LANG !== window.LANG);
    var ready = window.presentationReady ? window.presentationReady() : true;
    var applyBtn = act.querySelector('.sp-btn.apply');
    var startBtn = act.querySelector('.sp-btn.start');
    if (applyBtn) {
      applyBtn.classList.toggle('need-apply', needApply && !ready);
      applyBtn.textContent = ready ? '적용' : (needApply ? '적용' : '번역 중…');
    }
    if (startBtn) startBtn.classList.toggle('is-disabled', !ready);
  }

  /* keep all open sections in sync after a global lang change */
  function syncAllControls() {
    ['company', 'ir', 'video'].forEach(syncControls);
  }
  window.spSyncControls = syncAllControls;

  /* ── dismiss interactions ── */
  function onDocClick(e) {
    if (!isHubVisible()) return;
    // clicking anywhere outside an actions block (= background / panel) hides controls
    if (!e.target.closest('.sp-actions')) hideAllControls();
  }
  function onKey(e) {
    if (e.key !== 'Escape') return;
    if (!isHubVisible()) return;
    // defer to modals / other screens layered above the hub
    var pw = document.getElementById('pw-gate');
    if (pw && pw.classList.contains('show')) return;
    var eh = document.getElementById('edit-hub');
    if (eh && eh.style.display !== 'none' && !eh.classList.contains('hidden')) return;
    var vh = document.getElementById('video-hub');
    if (vh && vh.style.display !== 'none' && !vh.classList.contains('hidden')) return;
    var vh2 = document.getElementById('video2-hub');
    if (vh2 && vh2.style.display !== 'none' && !vh2.classList.contains('hidden')) return;

    if (document.querySelector('.sp-actions.open')) {
      // controls open → just close them, staying on the current section
      e.stopPropagation();
      hideAllControls();
    }
    // otherwise: keep the current section position (no jump to top)
  }

  /* ── arrow / page key section navigation ── */
  function goToSection(i) {
    var secs = hub.querySelectorAll('.sp-sec');
    i = Math.max(0, Math.min(secs.length - 1, i));
    var target = secs[i];
    if (target) scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }
  function onNavKey(e) {
    if (!isHubVisible()) return;
    // don't hijack when the user is inside a form control (e.g. language <select>)
    var t = e.target;
    if (t && (t.tagName === 'SELECT' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    var k = e.key;
    var next;
    if (k === 'ArrowDown' || k === 'PageDown' || k === ' ' || k === 'Spacebar') next = activeSec + 1;
    else if (k === 'ArrowUp' || k === 'PageUp') next = activeSec - 1;
    else if (k === 'Home') next = 0;
    else if (k === 'End') next = hub.querySelectorAll('.sp-sec').length - 1;
    else return;
    e.preventDefault();
    goToSection(next);
  }

  /* ── Enter: pick the active item (reveal controls), Enter again → 시작 ── */
  function onEnterKey(e) {
    if (e.key !== 'Enter') return;
    if (!isHubVisible()) return;
    // ignore while a modal/other screen is on top, or focus is in a field
    if (e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) return;
    var pw = document.getElementById('pw-gate');
    if (pw && pw.classList.contains('show')) return;
    var eh = document.getElementById('edit-hub');
    if (eh && eh.style.display !== 'none' && !eh.classList.contains('hidden')) return;
    var sec = hub.querySelectorAll('.sp-sec')[activeSec];
    if (!sec) return;
    var act = sec.querySelector('.sp-actions');
    if (!act) { e.preventDefault(); goToSection(activeSec + 1); return; }  // hero → advance
    e.preventDefault();
    var id = sec.getAttribute('data-id');
    if (act.querySelector('.sp-controls')) {
      // company / ir: first Enter opens controls, second Enter starts
      if (!act.classList.contains('open')) { if (id) window.spOpen(id); }
      else { if (id) window.spStart(id); }
    } else {
      // single-CTA sections (video / admin) → trigger the button
      var cta = act.querySelector('.sp-cta');
      if (cta) cta.click();
    }
  }

  function isHubVisible() {
    return hub && hub.style.display !== 'none' && !hub.classList.contains('hidden');
  }

  /* ── boot ── */
  window.addEventListener('load', function () {
    hub = document.getElementById('hub');
    scroller = document.getElementById('space-scroll');
    if (!hub || !scroller) return;

    var ok = initThree();
    if (ok) startLoop();

    setupObserver();
    updateDots();
    toggleCue(true);
    playIntro();

    // pointer parallax
    hub.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    hub.addEventListener('mouseleave', function () { mouseX = 0; mouseY = 0; });

    // dots → jump to section
    hub.querySelectorAll('.sp-dot').forEach(function (d) {
      d.addEventListener('click', function () {
        var i = parseInt(d.getAttribute('data-go'), 10);
        var target = hub.querySelector('.sp-sec[data-sec="' + i + '"]');
        if (target) scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
    });

    // top menu → jump to section
    hub.querySelectorAll('.sp-menu-link, .sp-menu-brand').forEach(function (m) {
      m.addEventListener('click', function () {
        var i = parseInt(m.getAttribute('data-go'), 10);
        var target = hub.querySelector('.sp-sec[data-sec="' + i + '"]');
        if (target) scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
    });

    // dismiss controls
    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onKey, true);
    // arrow / page key section navigation
    document.addEventListener('keydown', onNavKey);
    document.addEventListener('keydown', onEnterKey);

    window.addEventListener('resize', resize);

    // pause / resume + reset when hub visibility toggles
    new MutationObserver(function () {
      if (isHubVisible()) { if (!running) resetHub(); }
      else { lastActiveSec = activeSec; stopLoop(); }
    }).observe(hub, { attributes: true, attributeFilter: ['style', 'class'] });
  });

  /* ── return to the space hub when a slideshow ends (override landing) ── */
  var _origBackToTitle = window.backToTitle;
  window.backToTitle = function () {
    window.SHOW_ONLY = false;
    document.body.classList.remove('studio-mode');
    var landing = document.getElementById('landing');
    if (landing) { landing.classList.add('hidden'); landing.style.display = 'none'; landing.classList.remove('settled'); }
    window.SPACE_PRESENT = false;
    // restore the section the deck was launched from
    if (launchSec != null) { pendingReturnSec = launchSec; launchSec = null; }
    if (hub) { hub.style.display = 'flex'; void hub.offsetWidth; hub.classList.remove('hidden'); }
  };
})();
