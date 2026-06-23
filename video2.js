/* ─────────────────────────────────────────────
   IEG INSIGHT — Video Hub 2 (second video item)
   · Identical to the Video Hub; separate data store.
   · Reuses the shared video player overlay (#vp-ov).
   ───────────────────────────────────────────── */
(function () {
  const KEY = 'ieg_video2_v1';

  function defaults() { return JSON.parse(JSON.stringify(window.VIDEO2_DATA || [])); }
  function load() {
    try { const s = localStorage.getItem(KEY); if (s) { const d = JSON.parse(s); if (Array.isArray(d) && d.length > 0) return d; } } catch (e) {}
    return defaults();
  }
  let VD = load();
  let vsDragSrc = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(VD)); } catch (e) {} }
  window.vd2ResetDefaults = function () { VD = defaults(); save(); renderEditor(); };

  /* ── YouTube utilities ── */
  function getYTId(url) {
    if (!url || !url.trim()) return '';
    const m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
  }
  function thumbUrl(url) {
    const id = getYTId(url);
    return id ? 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg' : '';
  }
  function embedUrl(url) {
    const id = getYTId(url);
    return id ? 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1' : '';
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Video Hub Screen ── */
  function buildHub() {
    if (document.getElementById('video2-hub')) return;
    const el = document.createElement('div');
    el.id = 'video2-hub';
    el.innerHTML =
      '<div class="lz-bg"></div>'
      + '<div class="lz-grid"></div>'
      + '<div class="lz-beam"></div>'
      + '<div class="lz-scan"></div>'
      + '<div class="lz-top vh-top">'
      + '<button class="lz-home" id="v2h-back" title="IEG INSIGHT" aria-label="IEG INSIGHT"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></button>'
      + '<span></span>'
      + '</div>'
      + '<div class="vh-body">'
      + '<div class="vh-head">'
      + '<div class="vh-kicker"><span class="kk-bar"></span>IEG INSIGHT</div>'
      + '<h1 class="vh-title">LIBRARY</h1>'
      + '<div class="vh-sub">자료실</div>'
      + '</div>'
      + '<div class="vh-grid" id="v2h-grid"></div>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('#v2h-back').onclick = function () { closeHub(false); };

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      const vh = document.getElementById('video2-hub');
      if (!vh || vh.style.display === 'none' || vh.classList.contains('hidden')) return;
      const ov = document.getElementById('vp-ov');
      if (ov && ov.style.display !== 'none' && parseFloat(ov.style.opacity || '0') > 0) return;
      closeHub(true);
    });
  }

  function openHub() {
    buildHub();
    VD = load();
    renderHub();

    const mainHub = document.getElementById('hub');
    if (mainHub) {
      mainHub.classList.add('hidden');
      setTimeout(() => { mainHub.style.display = 'none'; }, 500);
    }

    const vh = document.getElementById('video2-hub');
    vh.style.display = 'flex';
    void vh.offsetWidth;
    vh.classList.remove('hidden');
  }
  window.openVideo2Hub  = openHub;
  window.closeVideo2Hub = closeHub;

  function closeHub(toSec) {
    const vh = document.getElementById('video2-hub');
    if (vh) {
      vh.classList.add('hidden');
      setTimeout(() => { vh.style.display = 'none'; vh.classList.remove('hidden'); }, 500);
    }
    if (toSec && window.spReturnTo) window.spReturnTo(4);
    const mainHub = document.getElementById('hub');
    if (mainHub) {
      mainHub.style.display = 'flex';
      void mainHub.offsetWidth;
      mainHub.classList.remove('hidden');
    }
  }

  function renderHub() {
    const grid = document.getElementById('v2h-grid');
    if (!grid) return;

    if (!VD.length) {
      grid.innerHTML =
        '<div class="vh-empty">'
        + '<span class="vh-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg></span>'
        + '<div class="vh-empty-title">등록된 콘텐츠가 없습니다</div>'
        + '<div class="vh-empty-sub">EDIT → 자료실에서 콘텐츠를 추가하세요</div>'
        + '</div>';
      return;
    }

    grid.innerHTML = VD.map((v, i) => {
      const thumb = thumbUrl(v.url);
      const isYT = !!getYTId(v.url);
      const thumbHtml = (isYT && thumb)
        ? '<img src="' + esc(thumb) + '" alt="" loading="lazy">'
        : '<div class="vh-thumb-ph ph-thumb-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none"/><rect x="2" y="6" width="20" height="12" rx="4"/></svg></div>';
      // YouTube items keep the play button; external links get a launch affordance.
      const overlay = isYT
        ? '<div class="vh-play-layer"><div class="vh-play-ring"><div class="vh-play-tri"></div></div></div>'
        : '<div class="vh-play-layer ph-launch-layer"><div class="vh-play-ring ph-launch-ring"><svg class="ph-launch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg></div></div>';
      return '<button class="vh-card ph-card" data-i="' + i + '">'
        + '<div class="vh-thumb">' + thumbHtml
        + overlay
        + '</div>'
        + '<div class="vh-info">'
        + '<span class="vh-num">CONTENT ' + String(i + 1).padStart(2, '0') + '</span>'
        + '<div class="vh-card-title">' + esc(v.title || '제목 없음') + '</div>'
        + (v.desc ? '<div class="vh-card-desc">' + esc(v.desc) + '</div>' : '')
        + '</div>'
        + '</button>';
    }).join('');

    grid.querySelectorAll('.vh-card').forEach(btn => {
      btn.onclick = () => openPlayer(+btn.dataset.i);
    });
  }

  /* ── Video Player Overlay (shared #vp-ov, built by video.js) ── */
  function buildPlayer() {
    if (document.getElementById('vp-ov')) return;
    const el = document.createElement('div');
    el.id = 'vp-ov';
    el.innerHTML =
      '<div class="vp-inner">'
      + '<div class="vp-header">'
      + '<div class="vp-title-block">'
      + '<div class="vp-eyebrow">IEG VIDEO</div>'
      + '<div class="vp-main-title" id="vp-title"></div>'
      + '</div>'
      + '<button class="vp-close" id="vp-close" aria-label="닫기"></button>'
      + '</div>'
      + '<div class="vp-frame-wrap" id="vp-frame-wrap"></div>'
      + '<div class="vp-footer"><div class="vp-desc-text" id="vp-desc"></div></div>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('#vp-close').onclick = closePlayer;
    document.addEventListener('keydown', e => {
      const ov = document.getElementById('vp-ov');
      if (e.key === 'Escape' && ov && ov.style.display !== 'none' && parseFloat(ov.style.opacity) > 0) closePlayer();
    });
  }

  function openPlayer(idx) {
    const v = VD[idx];
    if (!v) return;

    // Non-YouTube links (e.g. web games) open in a new tab instead of embedding.
    if (!getYTId(v.url)) {
      if (v.url) window.open(v.url, '_blank', 'noopener');
      return;
    }

    buildPlayer();
    const titleEl = document.getElementById('vp-title');
    const descEl = document.getElementById('vp-desc');
    const frameWrap = document.getElementById('vp-frame-wrap');
    const ov = document.getElementById('vp-ov');

    if (titleEl) titleEl.textContent = v.title || '제목 없음';
    if (descEl) descEl.textContent = v.desc || '';

    const embed = embedUrl(v.url);
    if (frameWrap) {
      if (embed) {
        frameWrap.innerHTML = '<iframe allowfullscreen allow="autoplay; encrypted-media; picture-in-picture" title="' + esc(v.title) + '" src="' + esc(embed) + '"></iframe>';
      } else {
        frameWrap.innerHTML = '<div class="vp-no-url">YouTube URL을 등록하면 영상이 표시됩니다</div>';
      }
    }

    ov.style.display = 'flex';
    void ov.offsetWidth;
    ov.style.opacity = '1';
  }

  function closePlayer() {
    const ov = document.getElementById('vp-ov');
    if (!ov || ov.style.display === 'none') return;
    ov.style.opacity = '0';
    setTimeout(() => {
      ov.style.display = 'none';
      const fw = document.getElementById('vp-frame-wrap');
      if (fw) fw.innerHTML = '';
    }, 300);
  }

  /* ── Video Editor ── */
  function buildEditor() {
    if (document.getElementById('vid2-studio')) return;
    const el = document.createElement('div');
    el.id = 'vid2-studio';
    el.innerHTML =
      '<div class="vs-top">'
      + '<div class="vs-brand">'
      + '<button class="vs-back" id="vs2-back"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 1 1 6 6 11"/></svg> 뒤로</button>'
      + '<div class="vs-brand-text"><span class="brand-ieg">IEG</span> LIBRARY</div>'
      + '</div>'
      + '<div class="vs-actions">'
      + '<button class="vs-btn primary" id="vs2-add">+ 콘텐츠 추가</button>'
      + '<span class="bar-sep"></span>'
      + '<button class="vs-btn" id="vs2-export">수정 데이터 내보내기</button>'
      + '<button class="vs-btn" id="vs2-reset">초기화</button>'
      + '</div>'
      + '</div>'
      + '<div class="vs-body">'
      + '<div class="vs-meta">'
      + '<span class="vs-meta-count" id="vs2-count"></span>'
      + '</div>'
      + '<div class="vs-list" id="vs2-list"></div>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('#vs2-back').onclick = () => { closeEditor(); if (window.showEditHub) window.showEditHub(); };
    el.querySelector('#vs2-add').onclick = () => {
      VD.unshift({ title: '', desc: '', url: '' });
      save();
      renderEditor(true);
    };
    el.querySelector('#vs2-export').onclick = exportData;
    el.querySelector('#vs2-reset').onclick = () => {
      if (confirm('콘텐츠 목록을 기본값으로 초기화합니다. 계속하시겠습니까?')) {
        VD = defaults(); save(); renderEditor();
      }
    };
  }

  function exportData() {
    const payload = {
      app: 'IEG PLAY CONTENT',
      kind: 'video-content',
      version: 1,
      exportedAt: new Date().toISOString(),
      count: VD.length,
      videos: VD
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IEG-PLAY-CONTENT.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function openEditor() {
    buildEditor();
    VD = load();
    document.getElementById('vid2-studio').classList.add('show');
    renderEditor();
  }
  function closeEditor() {
    const el = document.getElementById('vid2-studio');
    if (el) el.classList.remove('show');
  }
  window.openVideo2Editor = openEditor;

  function renderEditor(focusFirst) {
    const el = document.getElementById('vid2-studio');
    if (!el) return;
    const cnt = document.getElementById('vs2-count');
    if (cnt) cnt.textContent = '콘텐츠 ' + VD.length + '개';
    const list = document.getElementById('vs2-list');

    list.innerHTML = VD.map((v, i) => {
      return '<div class="vs-item" data-i="' + i + '">'
        + '<div class="vs-item-hdr">'
        + '<span class="vs-drag" title="드래그하여 순서 변경"><svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><circle cx="3" cy="2.5" r="1.2"/><circle cx="7" cy="2.5" r="1.2"/><circle cx="3" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="3" cy="11.5" r="1.2"/><circle cx="7" cy="11.5" r="1.2"/></svg></span>'
        + '<span class="vs-idx">CONTENT ' + String(i + 1).padStart(2, '0') + '</span>'
        + '<button class="vs-del" title="삭제"></button>'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">제목</label>'
        + '<input class="vs-input" data-f="title" placeholder="콘텐츠 제목을 입력하세요" value="' + esc(v.title) + '">'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">설명</label>'
        + '<textarea class="vs-textarea" data-f="desc" placeholder="콘텐츠에 대한 설명을 입력하세요" rows="3">' + esc(v.desc) + '</textarea>'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">링크</label>'
        + '<input class="vs-input" data-f="url" placeholder="https://www.youtube.com/watch?v=..." value="' + esc(v.url) + '">'
        + '</div>'
        + '</div>';
    }).join('');

    list.querySelectorAll('.vs-item').forEach(item => {
      const i = +item.dataset.i;
      item.querySelectorAll('[data-f]').forEach(inp => {
        inp.addEventListener('input', () => {
          VD[i][inp.dataset.f] = inp.value;
          save();
        });
      });
      item.querySelector('.vs-del').onclick = () => { VD.splice(i, 1); save(); renderEditor(); };
    });

    // Drag-to-reorder
    list.querySelectorAll('.vs-item').forEach(item => {
      const handle = item.querySelector('.vs-drag');
      if (!handle) return;
      handle.addEventListener('mousedown', () => { item.draggable = true; });
      item.addEventListener('dragstart', e => {
        if (!item.draggable) { e.preventDefault(); return; }
        vsDragSrc = item;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => item.classList.add('dragging'), 0);
      });
      item.addEventListener('dragend', () => {
        item.draggable = false;
        item.classList.remove('dragging');
        list.querySelectorAll('.vs-item').forEach(el => el.classList.remove('drag-over'));
      });
      item.addEventListener('dragover', e => {
        e.preventDefault();
        if (item !== vsDragSrc) {
          list.querySelectorAll('.vs-item').forEach(el => el.classList.remove('drag-over'));
          item.classList.add('drag-over');
        }
      });
      item.addEventListener('dragleave', e => {
        if (!item.contains(e.relatedTarget)) item.classList.remove('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (!vsDragSrc || vsDragSrc === item) return;
        const from = +vsDragSrc.dataset.i;
        const to = +item.dataset.i;
        const [moved] = VD.splice(from, 1);
        VD.splice(to, 0, moved);
        save();
        renderEditor();
      });
    });

    if (focusFirst) {
      const f = list.querySelector('.vs-input[data-f="title"]');
      if (f) { f.focus(); list.parentNode.scrollTop = 0; }
    }
  }

  /* ── boot ── */
  window.addEventListener('load', () => {
    buildHub();
    buildPlayer();
    buildEditor();
  });
})();
