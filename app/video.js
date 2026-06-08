/* ─────────────────────────────────────────────
   IEG INSIGHT — Video Hub / Player / Editor
   · Video gallery on the main hub
   · YouTube embed player overlay
   · Full-screen editor (title, description, URL)
   ───────────────────────────────────────────── */
(function () {
  const KEY = 'ieg_video_v1';

  function defaults() { return JSON.parse(JSON.stringify(window.VIDEO_DATA || [])); }
  function load() {
    try { const s = localStorage.getItem(KEY); if (s) { const d = JSON.parse(s); if (Array.isArray(d) && d.length > 0) return d; } } catch (e) {}
    return defaults();
  }
  let VD = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(VD)); } catch (e) {} }
  window.vdResetDefaults = function () { VD = defaults(); save(); renderEditor(); };

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
    if (document.getElementById('video-hub')) return;
    const el = document.createElement('div');
    el.id = 'video-hub';
    el.innerHTML =
      '<div class="lz-bg"></div>'
      + '<div class="lz-grid"></div>'
      + '<div class="lz-beam"></div>'
      + '<div class="lz-scan"></div>'
      + '<div class="lz-top vh-top">'
      + '<button class="lz-home" id="vh-back" title="IEG INSIGHT" aria-label="IEG INSIGHT">⌂</button>'
      + '<span></span>'
      + '</div>'
      + '<div class="vh-body">'
      + '<div class="vh-hero">'
      + '<h1 class="vh-heading"><span class="vh-ieg">IEG</span> VIDEO</h1>'
      + '</div>'
      + '<div class="vh-grid" id="vh-grid"></div>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('#vh-back').onclick = closeVideoHub;
  }

  function openVideoHub() {
    buildHub();
    VD = load();
    renderHub();

    const mainHub = document.getElementById('hub');
    if (mainHub) {
      mainHub.classList.add('hidden');
      setTimeout(() => { mainHub.style.display = 'none'; }, 500);
    }

    const vh = document.getElementById('video-hub');
    vh.style.display = 'flex';
    void vh.offsetWidth;
    vh.classList.remove('hidden');
  }
  window.openVideoHub  = openVideoHub;
  window.closeVideoHub = closeVideoHub;

  function closeVideoHub() {
    const vh = document.getElementById('video-hub');
    if (vh) {
      vh.classList.add('hidden');
      setTimeout(() => { vh.style.display = 'none'; vh.classList.remove('hidden'); }, 500);
    }
    const mainHub = document.getElementById('hub');
    if (mainHub) {
      mainHub.style.display = 'flex';
      void mainHub.offsetWidth;
      mainHub.classList.remove('hidden');
    }
  }

  function renderHub() {
    const grid = document.getElementById('vh-grid');
    if (!grid) return;

    if (!VD.length) {
      grid.innerHTML =
        '<div class="vh-empty">'
        + '<span class="vh-empty-icon">▶</span>'
        + '<div class="vh-empty-title">등록된 영상이 없습니다</div>'
        + '<div class="vh-empty-sub">EDIT → VIDEO에서 영상을 추가하세요</div>'
        + '</div>';
      return;
    }

    grid.innerHTML = VD.map((v, i) => {
      const thumb = thumbUrl(v.url);
      const thumbHtml = thumb
        ? '<img src="' + esc(thumb) + '" alt="" loading="lazy">'
        : '<div class="vh-thumb-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>';
      return '<button class="vh-card" data-i="' + i + '">'
        + '<div class="vh-thumb">' + thumbHtml
        + '<div class="vh-play-layer"><div class="vh-play-ring"><div class="vh-play-tri"></div></div></div>'
        + '</div>'
        + '<div class="vh-info">'
        + '<span class="vh-num">VIDEO ' + String(i + 1).padStart(2, '0') + '</span>'
        + '<div class="vh-card-title">' + esc(v.title || '제목 없음') + '</div>'
        + (v.desc ? '<div class="vh-card-desc">' + esc(v.desc) + '</div>' : '')
        + '</div>'
        + '</button>';
    }).join('');

    grid.querySelectorAll('.vh-card').forEach(btn => {
      btn.onclick = () => openPlayer(+btn.dataset.i);
    });
  }

  /* ── Video Player Overlay ── */
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
      + '<button class="vp-close" id="vp-close" aria-label="닫기">✕</button>'
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
    buildPlayer();
    const v = VD[idx];
    if (!v) return;

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
    if (document.getElementById('vid-studio')) return;
    const el = document.createElement('div');
    el.id = 'vid-studio';
    el.innerHTML =
      '<div class="vs-top">'
      + '<div class="vs-brand">'
      + '<button class="vs-back" id="vs-back">‹ 뒤로</button>'
      + '<div class="vs-brand-text"><span class="brand-ieg">IEG</span> VIDEO</div>'
      + '</div>'
      + '<div class="vs-actions">'
      + '<button class="vs-btn primary" id="vs-add">+ 영상 추가</button>'
      + '<span class="bar-sep"></span>'
      + '<button class="vs-btn" id="vs-export">수정 데이터 내보내기</button>'
      + '<button class="vs-btn" id="vs-reset">초기화</button>'
      + '</div>'
      + '</div>'
      + '<div class="vs-body">'
      + '<div class="vs-meta">'
      + '<span class="vs-meta-count" id="vs-count"></span>'
      + '<span class="vs-meta-note">변경 사항은 자동 저장됩니다</span>'
      + '</div>'
      + '<div class="vs-list" id="vs-list"></div>'
      + '</div>';
    document.body.appendChild(el);
    el.querySelector('#vs-back').onclick = () => { closeEditor(); if (window.showEditHub) window.showEditHub(); };
    el.querySelector('#vs-add').onclick = () => {
      VD.unshift({ title: '', desc: '', url: '' });
      save();
      renderEditor(true);
    };
    el.querySelector('#vs-export').onclick = exportData;
    el.querySelector('#vs-reset').onclick = () => {
      if (confirm('영상 목록을 기본값으로 초기화합니다. 계속하시겠습니까?')) {
        VD = defaults(); save(); renderEditor();
      }
    };
  }

  function exportData() {
    const payload = {
      app: 'IEG VIDEO',
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
    a.download = 'IEG-VIDEO-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function openEditor() {
    buildEditor();
    VD = load();
    document.getElementById('vid-studio').classList.add('show');
    renderEditor();
  }
  function closeEditor() {
    const el = document.getElementById('vid-studio');
    if (el) el.classList.remove('show');
  }
  window.openVideoEditor = openEditor;

  function renderEditor(focusFirst) {
    const el = document.getElementById('vid-studio');
    if (!el) return;
    const cnt = document.getElementById('vs-count');
    if (cnt) cnt.textContent = '영상 ' + VD.length + '개';
    const list = document.getElementById('vs-list');

    list.innerHTML = VD.map((v, i) => {
      const thumb = thumbUrl(v.url);
      const thumbInner = thumb
        ? '<img src="' + esc(thumb) + '" alt="" loading="lazy">'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      return '<div class="vs-item" data-i="' + i + '">'
        + '<div class="vs-item-hdr">'
        + '<span class="vs-idx">VIDEO ' + String(i + 1).padStart(2, '0') + '</span>'
        + '<button class="vs-del" title="삭제">✕</button>'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">제목</label>'
        + '<input class="vs-input" data-f="title" placeholder="영상 제목을 입력하세요" value="' + esc(v.title) + '">'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">설명</label>'
        + '<textarea class="vs-textarea" data-f="desc" placeholder="영상에 대한 설명을 입력하세요" rows="3">' + esc(v.desc) + '</textarea>'
        + '</div>'
        + '<div class="vs-field">'
        + '<label class="vs-label">유튜브 링크</label>'
        + '<div class="vs-yt-row">'
        + '<div class="vs-yt-thumb" data-thumb>' + thumbInner + '</div>'
        + '<input class="vs-input" data-f="url" placeholder="https://www.youtube.com/watch?v=..." value="' + esc(v.url) + '">'
        + '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    list.querySelectorAll('.vs-item').forEach(item => {
      const i = +item.dataset.i;
      item.querySelectorAll('[data-f]').forEach(inp => {
        inp.addEventListener('input', () => {
          VD[i][inp.dataset.f] = inp.value;
          save();
          if (inp.dataset.f === 'url') {
            const wrap = item.querySelector('[data-thumb]');
            const thumb = thumbUrl(inp.value);
            if (wrap) {
              wrap.innerHTML = thumb
                ? '<img src="' + esc(thumb) + '" alt="" loading="lazy">'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
            }
          }
        });
      });
      item.querySelector('.vs-del').onclick = () => { VD.splice(i, 1); save(); renderEditor(); };
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
