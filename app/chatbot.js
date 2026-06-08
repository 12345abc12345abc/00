/* ─────────────────────────────────────────────
   IEG INSIGHT — Chatbot (keyword-driven FAQ)
   · Placed on the IEG INSIGHT hub.
   · Type a keyword → ranked questions appear
     (accuracy first, then importance) → tap to answer.
   · One unified question bank (no CP / IR split).
   · 편집(Edit): a full-screen studio editor — add /
     edit / delete questions, import / export JSON
     (so the file can be edited with Claude).
   ───────────────────────────────────────────── */
(function () {
  const KEY = 'ieg_chatbot_v6';

  function defaults() { return JSON.parse(JSON.stringify(window.CHATBOT_DATA || [])); }
  function load() {
    try { const s = localStorage.getItem(KEY); if (s) { const o = JSON.parse(s); if (Array.isArray(o)) return o; } } catch (e) {}
    return defaults();
  }
  let CB = load();
  let cbDragSrc = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(CB)); } catch (e) {} }
  window.cbResetDefaults = function () { CB = defaults(); save(); renderEditor(); };

  /* ── accuracy score (keyword matching) ── */
  function score(item, query) {
    const toks = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return 0;
    const kws = (item.kw || []).map(k => String(k).toLowerCase());
    const qq = (item.q || '').toLowerCase(), aa = (item.a || '').toLowerCase();
    let s = 0;
    toks.forEach(t => {
      if (kws.includes(t)) s += 100;
      else if (kws.some(k => k.includes(t) || t.includes(k))) s += 55;
      if (qq.includes(t)) s += 25;
      if (aa.includes(t)) s += 6;
    });
    return s;
  }
  /* accuracy first → importance (imp) */
  function ranked(query) {
    const all = CB.slice();
    const q = (query || '').trim();
    if (!q) return all.sort((a, b) => (b.imp || 0) - (a.imp || 0));
    return all.map(x => ({ x, sc: score(x, q) }))
      .filter(o => o.sc > 0)
      .sort((a, b) => (b.sc - a.sc) || ((b.x.imp || 0) - (a.x.imp || 0)))
      .map(o => o.x);
  }

  /* ── Hub chat widget ── */
  let panelOpen = false;
  function buildWidget() {
    const hub = document.getElementById('hub');
    if (!hub || document.getElementById('cb-launch')) return;

    const launch = document.createElement('button');
    launch.id = 'cb-launch';
    launch.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.9 8.4 8.5 8.5 0 0 1-3.6-.9L3 20l1.3-4.4A8.5 8.5 0 1 1 21 11.5z"/></svg><span>IEG CHATBOT</span>';
    launch.onclick = () => togglePanel(true);
    hub.appendChild(launch);

    const panel = document.createElement('div');
    panel.id = 'cb-panel';
    panel.innerHTML =
      '<div class="cb-head">'
      + '<div class="cb-head-t"><span class="cb-dot"></span>IEG CHATBOT</div>'
      + '<button class="cb-x" aria-label="닫기">✕</button>'
      + '</div>'
      + '<div class="cb-log" id="cb-log"></div>'
      + '<div class="cb-sug" id="cb-sug"></div>'
      + '<div class="cb-input-row">'
      + '<input id="cb-input" type="text" autocomplete="off" placeholder="키워드를 입력하세요 (예: 매출, 투자, 반도체)">'
      + '</div>'
      + '<div class="cb-hint">키워드를 입력하면 관련 질문이 정확도순으로 표시됩니다.</div>';
    hub.appendChild(panel);

    panel.querySelector('.cb-x').onclick = () => togglePanel(false);
    const input = panel.querySelector('#cb-input');
    input.addEventListener('input', () => renderSuggestions(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = document.querySelector('#cb-sug .cb-sug-item');
        if (first) first.click();
      }
    });

    greet();
    renderSuggestions('');
  }

  function togglePanel(on) {
    const p = document.getElementById('cb-panel');
    const l = document.getElementById('cb-launch');
    if (!p) return;
    panelOpen = (on == null) ? !panelOpen : on;
    p.classList.toggle('open', panelOpen);
    if (l) l.classList.toggle('hidden', panelOpen);
    if (panelOpen) { const i = document.getElementById('cb-input'); if (i) setTimeout(() => i.focus(), 80); }
  }

  function greet() {
    const log = document.getElementById('cb-log');
    if (!log) return;
    log.innerHTML = '';
    addBot('안녕하세요! IEG CHATBOT입니다. 궁금한 내용의 <b>키워드</b>를 입력하시면 관련 질문을 추천해 드립니다. 질문을 누르면 답변을 확인할 수 있습니다.');
  }
  function addUser(text) {
    const log = document.getElementById('cb-log'); if (!log) return;
    const el = document.createElement('div'); el.className = 'cb-msg user'; el.textContent = text;
    log.appendChild(el); log.scrollTop = log.scrollHeight;
  }
  function addBot(html) {
    const log = document.getElementById('cb-log'); if (!log) return;
    const el = document.createElement('div'); el.className = 'cb-msg bot'; el.innerHTML = html;
    log.appendChild(el); log.scrollTop = log.scrollHeight;
  }

  function renderSuggestions(query) {
    const box = document.getElementById('cb-sug'); if (!box) return;
    const list = ranked(query).slice(0, 7);
    const q = (query || '').trim();
    if (!list.length) {
      box.innerHTML = '<div class="cb-sug-empty">관련 질문이 없습니다. 다른 키워드를 입력해 보세요.</div>';
      return;
    }
    box.innerHTML = (q ? '<div class="cb-sug-label">관련 질문 · 정확도순</div>' : '<div class="cb-sug-label">추천 질문 · 중요도순</div>')
      + list.map(it =>
        '<button class="cb-sug-item">'
        + '<span class="cb-sug-dot"></span>'
        + '<span class="cb-sug-q">' + esc(it.q) + '</span>'
        + '</button>'
      ).join('');
    Array.prototype.forEach.call(box.querySelectorAll('.cb-sug-item'), (btn, idx) => {
      btn.onclick = () => answer(list[idx]);
    });
  }

  function answer(it) {
    addUser(it.q);
    setTimeout(() => { addBot(esc(it.a)); }, 180);
    const input = document.getElementById('cb-input');
    if (input) { input.value = ''; renderSuggestions(''); }
  }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ── Edit: full-screen studio (consistent with deck editors) ── */
  function buildStudioChrome() {
    if (document.getElementById('cb-studio')) return;
    const m = document.createElement('div');
    m.id = 'cb-studio';
    m.innerHTML =
      '<div class="cbs-top">'
      + '<div class="cbs-brand">'
      + '<button class="cbs-back" id="cbs-home" title="뒤로" aria-label="뒤로"><span class="cbs-back-ar">‹</span> 뒤로</button>'
      + '<div class="cbs-brand-text"><span class="brand-ieg">IEG</span> CHATBOT</div>'
      + '</div>'
      + '<div class="cbs-actions">'
      + '<button class="cbs-btn primary" id="cbs-add">+ 질문 추가</button>'
      + '<span class="bar-sep"></span>'
      + '<button class="cbs-btn" id="cbs-export">수정 데이터 내보내기</button>'
      + '<button class="cbs-btn" id="cbs-reset">초기화</button>'
      + '</div>'
      + '</div>'
      + '<div class="cbs-body">'
      + '<div class="cbs-inner">'
      + '<div class="cbs-hdr"><span class="cbs-count" id="cbs-count"></span><span class="cbs-note">변경 사항은 자동 저장됩니다 · 중요도 1~5 (높을수록 먼저 노출)</span></div>'
      + '<div class="cbs-list" id="cbs-list"></div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(m);

    m.querySelector('#cbs-home').onclick = () => { closeEditor(); if (window.showEditHub) window.showEditHub(); };
    m.querySelector('#cbs-add').onclick = () => { CB.unshift({ q: '', a: '', kw: [], imp: 3 }); save(); renderEditor(true); };
    m.querySelector('#cbs-reset').onclick = () => {
      if (confirm('챗봇 질문을 기본값으로 초기화합니다. 계속하시겠습니까?')) { CB = defaults(); save(); renderEditor(); }
    };
    m.querySelector('#cbs-export').onclick = exportData;
  }

  function openEditor() {
    buildStudioChrome();
    document.getElementById('cb-studio').classList.add('show');
    renderEditor();
  }
  function closeEditor() {
    const m = document.getElementById('cb-studio');
    if (m) m.classList.remove('show');
  }
  window.openChatbotEditor = openEditor;
  window.closeChatbotPanel = function () { togglePanel(false); };

  function renderEditor(focusFirst) {
    const m = document.getElementById('cb-studio'); if (!m) return;
    const cnt = document.getElementById('cbs-count');
    if (cnt) cnt.textContent = '질문 ' + CB.length + '개';
    const wrap = document.getElementById('cbs-list');
    wrap.innerHTML = CB.map((it, i) =>
      '<div class="cbs-item" data-i="' + i + '">'
      + '<div class="cbs-row1">'
      + '<span class="cbs-drag" title="드래그하여 순서 변경">⠿</span>'
      + '<span class="cbs-idx">' + String(i + 1).padStart(2, '0') + '</span>'
      + '<input class="cbs-q" placeholder="질문" value="' + esc(it.q) + '" data-f="q">'
      + '<label class="cbs-imp">중요도<input type="number" min="1" max="5" value="' + (it.imp || 3) + '" data-f="imp"></label>'
      + '<button class="cbs-del" title="삭제">✕</button>'
      + '</div>'
      + '<textarea class="cbs-a" rows="2" placeholder="답변" data-f="a">' + esc(it.a) + '</textarea>'
      + '<input class="cbs-kw" placeholder="키워드 (쉼표로 구분)" value="' + esc((it.kw || []).join(', ')) + '" data-f="kw">'
      + '</div>'
    ).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.cbs-item'), item => {
      const i = +item.dataset.i;
      item.querySelectorAll('[data-f]').forEach(inp => {
        inp.addEventListener('input', () => {
          const f = inp.dataset.f;
          if (f === 'kw') CB[i].kw = inp.value.split(',').map(s => s.trim()).filter(Boolean);
          else if (f === 'imp') CB[i].imp = Math.max(1, Math.min(5, +inp.value || 3));
          else CB[i][f] = inp.value;
          save();
        });
      });
      item.querySelector('.cbs-del').onclick = () => { CB.splice(i, 1); save(); renderEditor(); };
    });

    // Drag-to-reorder
    Array.prototype.forEach.call(wrap.querySelectorAll('.cbs-item'), item => {
      const handle = item.querySelector('.cbs-drag');
      if (!handle) return;
      handle.addEventListener('mousedown', () => { item.draggable = true; });
      item.addEventListener('dragstart', e => {
        if (!item.draggable) { e.preventDefault(); return; }
        cbDragSrc = item;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => item.classList.add('dragging'), 0);
      });
      item.addEventListener('dragend', () => {
        item.draggable = false;
        item.classList.remove('dragging');
        Array.prototype.forEach.call(wrap.querySelectorAll('.cbs-item'), el => el.classList.remove('drag-over'));
      });
      item.addEventListener('dragover', e => {
        e.preventDefault();
        if (item !== cbDragSrc) {
          Array.prototype.forEach.call(wrap.querySelectorAll('.cbs-item'), el => el.classList.remove('drag-over'));
          item.classList.add('drag-over');
        }
      });
      item.addEventListener('dragleave', e => {
        if (!item.contains(e.relatedTarget)) item.classList.remove('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (!cbDragSrc || cbDragSrc === item) return;
        const from = +cbDragSrc.dataset.i;
        const to = +item.dataset.i;
        const [moved] = CB.splice(from, 1);
        CB.splice(to, 0, moved);
        save();
        renderEditor();
      });
    });

    if (focusFirst) { const f = wrap.querySelector('.cbs-q'); if (f) f.focus(); wrap.scrollTop = 0; }
  }

  /* ── Export (Claude-editable JSON) ── */
  function exportData() {
    const payload = {
      app: 'IEG CHATBOT',
      kind: 'chatbot-content',
      version: 1,
      exportedAt: new Date().toISOString(),
      count: CB.length,
      questions: CB
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'IEG-CHATBOT-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ── boot ── */
  window.addEventListener('load', () => {
    buildWidget();
    buildStudioChrome();
  });
})();
