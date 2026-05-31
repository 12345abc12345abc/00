/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — main app logic
   Navigation, sidebar, full-screen, PDF export
   ───────────────────────────────────────────── */

let slides = JSON.parse(JSON.stringify(DEFAULT_DATA));
let cur = 0, fsIdx = 0;
let fsActive = false, fsControlsTimer = null;

/* ──── 모바일 탭 전환 ──── */
window.mobTab = function(name) {
  if (window.innerWidth > 768) return;
  const idMap = { preview: 'preview-area', list: 'sidebar', edit: 'ep' };
  ['preview-area', 'sidebar', 'ep'].forEach(id => {
    document.getElementById(id).classList.remove('mob-active');
  });
  document.querySelectorAll('.mob-tab').forEach(el => el.classList.remove('active'));
  const panelId = idMap[name];
  if (panelId) document.getElementById(panelId).classList.add('mob-active');
  const tab = document.querySelector('.mob-tab[data-tab="' + name + '"]');
  if (tab) tab.classList.add('active');
  if (name === 'preview') { scalePreview(); }
};

/* ──── Sidebar (titles only) ──── */
function buildSidebar() {
  const list = document.getElementById('slide-list');
  list.innerHTML = '';
  slides.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = (i === cur ? 'active' : '') + (s.type === 'section' ? ' section-row' : '');
    li.innerHTML =
      '<span class="sb-num">' + String(i + 1).padStart(2, '0') + '</span>'
      + '<span class="sb-title">' + esc(s.title) + '</span>';
    li.onclick = () => goTo(i);
    list.appendChild(li);
  });
}

/* ──── Preview scaling ──── */
function scalePreview() {
  const area = document.getElementById('stage');
  const wrap = document.getElementById('slide-wrap');
  if (!area || !wrap) return;
  const mobile = window.innerWidth <= 768;
  const padX = mobile ? 20 : 100;
  const padY = mobile ? 16 : 24;
  const aW = area.clientWidth - padX;
  const aH = area.clientHeight - padY;
  const sc = Math.min(aW / 1280, aH / 720, 1);
  wrap.style.transform = 'scale(' + sc + ')';
}

/* ──── Navigation ──── */
function goTo(idx) {
  cur = Math.max(0, Math.min(slides.length - 1, idx));
  document.querySelectorAll('#slide-list li').forEach((el, i) => el.classList.toggle('active', i === cur));
  setPreviewSrc(cur);
  document.getElementById('ep-n').textContent = '#' + String(cur + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  document.getElementById('sctr').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  document.getElementById('stitle').textContent = slides[cur].title;
  buildEditor();
  // Scroll active into view in sidebar
  const active = document.querySelector('#slide-list li.active');
  if (active && active.scrollIntoView) {
    const list = document.getElementById('slide-list');
    const r = active.getBoundingClientRect();
    const lr = list.getBoundingClientRect();
    if (r.top < lr.top || r.bottom > lr.bottom) {
      list.scrollTop = active.offsetTop - lr.height / 2 + r.height / 2;
    }
  }
}
function nav(d) { goTo(cur + d); }

/* Preview source hook — studio.js overrides this for EN translation */
function setPreviewSrc(idx) {
  document.getElementById('sf').srcdoc = renderSlide(idx);
}
window.setPreviewSrc = setPreviewSrc;

/* ──── Full-screen slideshow ──── */
/* Double-buffered iframes: render the next slide into the hidden buffer and
   cross-fade once it has loaded, so navigation never flashes a blank/stale page. */
let fsBuf = 0;
function fsIframes() { return [document.getElementById('fs-fr'), document.getElementById('fs-fr-b')]; }
function styleFsIframe(fi, sc) {
  fi.style.width = '1280px';
  fi.style.height = '720px';
  fi.style.left = '50%';
  fi.style.top = '50%';
  fi.style.transformOrigin = 'center center';
  fi.style.transform = 'translate(-50%, -50%) scale(' + sc + ')';
}
function sizeFsIframe() {
  const ov = document.getElementById('fs-ov');
  const sc = Math.min(ov.clientWidth / 1280, ov.clientHeight / 720);
  fsIframes().forEach(fi => styleFsIframe(fi, sc));
}
function clearFsBuffers() {
  const fr = fsIframes();
  fr.forEach(f => { f.srcdoc = ''; });
  fsBuf = 0;
  fr[0].style.setProperty('opacity', '1', 'important');
  fr[0].style.pointerEvents = 'auto';
  fr[1].style.setProperty('opacity', '0', 'important');
  fr[1].style.pointerEvents = 'none';
}
function renderFs(first) {
  sizeFsIframe();
  const fr = fsIframes();
  if (first) {
    // 프레젠테이션 진입: 보이는 버퍼에 바로 렌더 (이전 슬라이드 잔상 없이)
    const front = fr[fsBuf];
    const back = fr[1 - fsBuf];
    front.style.setProperty('opacity', '1', 'important');
    front.style.pointerEvents = 'auto';
    back.style.setProperty('opacity', '0', 'important');
    back.style.pointerEvents = 'none';
    if (window.renderSlideView) { window.renderSlideView(fsIdx, front); }
    else { front.srcdoc = renderSlide(fsIdx); }
    return;
  }
  // 슬라이드 이동: 숨겨진 버퍼에 렌더 → load 되면 크로스페이드 (깜빡임 제거)
  const front = fr[fsBuf], back = fr[1 - fsBuf];
  let swapped = false;
  const reveal = () => {
    if (swapped) return; swapped = true;
    back.style.setProperty('opacity', '1', 'important');
    back.style.pointerEvents = 'auto';
    front.style.setProperty('opacity', '0', 'important');
    front.style.pointerEvents = 'none';
    fsBuf = 1 - fsBuf;
  };
  back.addEventListener('load', reveal, { once: true });
  setTimeout(reveal, 650); // safety fallback if load doesn't fire
  if (window.renderSlideView) { window.renderSlideView(fsIdx, back); }
  else { back.srcdoc = renderSlide(fsIdx); }
}

/* 전체화면 UI 자동 숨김 (마우스 움직이거나 클릭 시에만 표시) */
function showFsControls() {
  const ov = document.getElementById('fs-ov');
  ov.classList.add('fs-ui');
  clearTimeout(fsControlsTimer);
  fsControlsTimer = setTimeout(function() {
    ov.classList.remove('fs-ui');
  }, 3000);
}

/* 전체화면 터치 스와이프 */
let fsTouchX = null;
function fsTouchStart(e) { fsTouchX = e.touches[0].clientX; showFsControls(); }
function fsTouchEnd(e) {
  if (fsTouchX === null) return;
  const dx = e.changedTouches[0].clientX - fsTouchX;
  fsTouchX = null;
  if (Math.abs(dx) > 48) { dx < 0 ? fsNav(1) : fsNav(-1); }
}

function addFsControlListeners() {
  const ov = document.getElementById('fs-ov');
  ov.addEventListener('mousemove', showFsControls);
  ov.addEventListener('click', showFsControls);
  ov.addEventListener('touchstart', fsTouchStart, { passive: true });
  ov.addEventListener('touchend', fsTouchEnd, { passive: true });
  // 슬라이드 iframe 내부에서 올라오는 클릭/움직임 (차트 hover 를 위해 hit 레이어는 비활성) */
  window.addEventListener('message', fsMsgHandler);
}
function removeFsControlListeners() {
  const ov = document.getElementById('fs-ov');
  ov.removeEventListener('mousemove', showFsControls);
  ov.removeEventListener('click', showFsControls);
  ov.removeEventListener('touchstart', fsTouchStart);
  ov.removeEventListener('touchend', fsTouchEnd);
  window.removeEventListener('message', fsMsgHandler);
  clearTimeout(fsControlsTimer);
  ov.classList.remove('fs-ui');
}

/* 슬라이드 iframe 내부 스크립트가 보낸 메시지 처리 (전체화면일 때만) */
function fsMsgHandler(e) {
  if (!fsActive || !e.data || !e.data.__fs) return;
  if (e.data.__fs === 'move') { showFsControls(); }
  else if (e.data.__fs === 'click') {
    showFsControls();
    if (e.data.r < 0.28) fsNav(-1); else fsNav(1);
  }
}

function startShow(instant) {
  if (fsActive) return;
  // 적용되지 않은 번역 언어 상태에서는 프레젠테이션 차단 (랜딩 진입은 instant로 이미 검증됨)
  if (!instant && window.presentationReady && !window.presentationReady()) {
    if (window.nudgeApply) window.nudgeApply();
    return;
  }
  fsActive = true;
  fsIdx = cur;
  const ov = document.getElementById('fs-ov');
  ov.style.display = 'block';
  if (instant) {
    // 랜딩 → 프레젠테이션: 페이드 없이 즉시 불투명하게 띄워 편집모드가 잠시 보이는 현상 제거
    ov.style.transition = 'none';
    ov.style.opacity = '1';
  } else {
    ov.style.opacity = '0';
  }
  clearFsBuffers();
  renderFs(true);
  addFsControlListeners();
  document.addEventListener('keydown', fsKey);
  void ov.offsetWidth;
  if (!instant) {
    ov.style.opacity = '1';
  } else {
    ov.style.transition = '';
  }
  if (ov.requestFullscreen) { ov.requestFullscreen().catch(function(){}); }
  // 진입 시 컨트롤을 잠깐 보여주고 3초 뒤 자동 숨김
  showFsControls();
}
function endShow() {
  if (!fsActive) return;
  fsActive = false;
  document.removeEventListener('keydown', fsKey);
  removeFsControlListeners();
  const ov = document.getElementById('fs-ov');
  ov.style.opacity = '0';
  if (document.fullscreenElement && document.exitFullscreen) { document.exitFullscreen().catch(function(){}); }
  if (window.SHOW_ONLY && window.backToTitle) {
    window.backToTitle();
  }
  setTimeout(function() { ov.style.display = 'none'; clearFsBuffers(); }, 450);
}
document.addEventListener('fullscreenchange', function(){
  if (!document.fullscreenElement && fsActive) {
    endShow();
  } else if (document.fullscreenElement && fsActive) {
    sizeFsIframe();
  }
});
function fsNav(d) { fsIdx = Math.max(0, Math.min(slides.length - 1, fsIdx + d)); renderFs(); }
function fsKey(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); fsNav(1); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); fsNav(-1); }
  else if (e.key === 'Escape') endShow();
}

/* ──── Reset ──── */
function resetAll() {
  if (!confirm('모든 편집 내용이 초기화됩니다. 계속하시겠습니까?')) return;
  const src = (window.DECKS && window.DECK && window.DECKS[window.DECK]) ? window.DECKS[window.DECK].data : DEFAULT_DATA;
  slides = JSON.parse(JSON.stringify(src));
  buildSidebar();
  goTo(0);
}

/* ──── PDF EXPORT ────
   Renders each slide in a hidden iframe at native size,
   waits for animations to finish + charts to settle,
   captures via html2canvas, assembles into landscape PDF.
*/
async function savePDF() {
  const modal = document.getElementById('pdf-modal');
  const bar = document.getElementById('pdf-bar');
  const statusEl = document.getElementById('pdf-status');
  modal.classList.add('active');
  bar.style.width = '0%';
  statusEl.textContent = '준비 중...';

  // Wait a tick for modal to paint
  await new Promise(r => setTimeout(r, 100));

  // If a translation language is active, make sure every slide is translated before capture
  if (window.LANG && window.LANG !== 'ko' && window.ensureAllTranslated) {
    statusEl.textContent = '번역 중...';
    try { await window.ensureAllTranslated(); } catch (e) { console.warn('translate-all', e); }
  }

  const W = 1280, H = 720;
  const scratch = document.getElementById('pdf-scratch');
  scratch.innerHTML = '';

  // Init pdf — landscape, 1280x720 pt -> use mm scale
  const { jsPDF } = window.jspdf;
  // Use px-based units so we match the slide pixel size 1:1
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [W, H], hotfixes: ['px_scaling'] });

  for (let i = 0; i < slides.length; i++) {
    statusEl.textContent = '슬라이드 ' + (i + 1) + ' / ' + slides.length + ' 처리 중...';

    // Build temp iframe at full size
    const tempIf = document.createElement('iframe');
    tempIf.style.cssText = 'position:absolute;left:0;top:0;width:' + W + 'px;height:' + H + 'px;border:none;background:#fff;display:block';
    tempIf.scrolling = 'no';
    scratch.appendChild(tempIf);

    // Inject the slide HTML with static animation override (post-animation final frame)
    const baseHTML = (window.renderSlideHTML ? window.renderSlideHTML(i) : renderSlide(i));
    const html = baseHTML.replace('<html>', '<html data-static="1">');
    tempIf.srcdoc = html;

    // Wait for iframe load
    await new Promise(res => {
      tempIf.addEventListener('load', res, { once: true });
      setTimeout(res, 4000); // safety timeout
    });

    // Wait for chart animations to fully settle + finish CSS animations
    await new Promise(res => setTimeout(res, 700));

    // Force-finish any remaining animations in the iframe doc
    try {
      const doc = tempIf.contentDocument;
      if (doc && doc.getAnimations) {
        doc.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} });
      }
      // Make sure all opacity:0 elements with .a-* classes are forced visible
      doc.querySelectorAll('.a-up,.a-in,.a-si,.a-r,.a-l,.a-line,.a-bar').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    } catch (e) { console.warn('animation finish', e); }

    // Capture using html2canvas
    let canvas;
    try {
      canvas = await html2canvas(tempIf.contentDocument.body, {
        width: W,
        height: H,
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: W,
        windowHeight: H
      });
    } catch (e) {
      console.error('html2canvas failed', e);
      scratch.removeChild(tempIf);
      continue;
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    if (i > 0) pdf.addPage([W, H], 'landscape');
    pdf.addImage(imgData, 'JPEG', 0, 0, W, H, undefined, 'FAST');

    scratch.removeChild(tempIf);
    bar.style.width = ((i + 1) / slides.length * 100) + '%';
    // yield to UI
    await new Promise(r => setTimeout(r, 30));
  }

  statusEl.textContent = '저장 중...';
  pdf.save('IEG IR STUDIO.pdf');

  setTimeout(() => {
    modal.classList.remove('active');
    bar.style.width = '0%';
  }, 600);
}

/* ──── CONTENT EXPORT ────
   Exports ONLY the presentation content (slide data) as JSON — not the
   program itself. Lets you capture edited content for safekeeping or to
   hand back changed copy, without duplicating the application.
*/
function exportStructure() {
  const payload = {
    app: 'IEG IR STUDIO',
    kind: 'presentation-content',
    version: 1,
    exportedAt: new Date().toISOString(),
    lang: (window.LANG || 'ko'),
    slideCount: slides.length,
    slides: slides
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'IEG-IR-콘텐츠.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ──── Boot ──── */
window.addEventListener('load', () => {
  buildSidebar();
  goTo(0);
  scalePreview();

  window.addEventListener('resize', () => {
    scalePreview();
    if (fsActive) sizeFsIframe();
  });

  // Use ResizeObserver on the stage for accurate scaling
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(scalePreview);
    ro.observe(document.getElementById('stage'));
  }

  document.addEventListener('keydown', (e) => {
    if (fsActive) return;
    if (e.target.matches('input,textarea,select')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') nav(1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') nav(-1);
  });

  /* 편집 모드 미리보기 터치 스와이프 */
  let stageTouchX = null;
  const stage = document.getElementById('stage');
  stage.addEventListener('touchstart', e => { stageTouchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (stageTouchX === null) return;
    const dx = e.changedTouches[0].clientX - stageTouchX;
    stageTouchX = null;
    if (Math.abs(dx) > 48) { nav(dx < 0 ? 1 : -1); }
  }, { passive: true });
});
