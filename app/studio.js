/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — title screen, AI multi-
   language translation, password gate.
   Loaded after app.js.
   ───────────────────────────────────────────── */

/* LANG === 'ko' → original (no translation).
   Any other code → AI-translated into that language. */
window.LANG = 'ko';

/* Languages offered — full Google Translate coverage, listed in the exact
   alphabetical-by-English-name order used by the Google Translate UI.
   First entry = Korean original (no translation). */
const LANGS = [
  { code: 'ko', label: '한국어 (원본)' },
  { code: 'af', label: 'Afrikaans (아프리칸스어)' },
  { code: 'sq', label: 'Albanian (알바니아어)' },
  { code: 'am', label: 'Amharic (암하라어)' },
  { code: 'ar', label: 'Arabic (아랍어)' },
  { code: 'hy', label: 'Armenian (아르메니아어)' },
  { code: 'as', label: 'Assamese (아삼어)' },
  { code: 'ay', label: 'Aymara (아이마라어)' },
  { code: 'az', label: 'Azerbaijani (아제르바이잔어)' },
  { code: 'bm', label: 'Bambara (밤바라어)' },
  { code: 'eu', label: 'Basque (바스크어)' },
  { code: 'be', label: 'Belarusian (벨라루스어)' },
  { code: 'bn', label: 'Bengali (벵골어)' },
  { code: 'bho', label: 'Bhojpuri (보지푸리어)' },
  { code: 'bs', label: 'Bosnian (보스니아어)' },
  { code: 'bg', label: 'Bulgarian (불가리아어)' },
  { code: 'ca', label: 'Catalan (카탈루냐어)' },
  { code: 'ceb', label: 'Cebuano (세부아노어)' },
  { code: 'ny', label: 'Chichewa (치체와어)' },
  { code: 'zh-CN', label: 'Chinese — Simplified (중국어 간체)' },
  { code: 'zh-TW', label: 'Chinese — Traditional (중국어 번체)' },
  { code: 'co', label: 'Corsican (코르시카어)' },
  { code: 'hr', label: 'Croatian (크로아티아어)' },
  { code: 'cs', label: 'Czech (체코어)' },
  { code: 'da', label: 'Danish (덴마크어)' },
  { code: 'dv', label: 'Dhivehi (디베히어)' },
  { code: 'doi', label: 'Dogri (도그리어)' },
  { code: 'nl', label: 'Dutch (네덜란드어)' },
  { code: 'en', label: 'English (영어)' },
  { code: 'eo', label: 'Esperanto (에스페란토어)' },
  { code: 'et', label: 'Estonian (에스토니아어)' },
  { code: 'ee', label: 'Ewe (에웨어)' },
  { code: 'tl', label: 'Filipino (필리핀어)' },
  { code: 'fi', label: 'Finnish (핀란드어)' },
  { code: 'fr', label: 'French (프랑스어)' },
  { code: 'fy', label: 'Frisian (프리지아어)' },
  { code: 'gl', label: 'Galician (갈리시아어)' },
  { code: 'ka', label: 'Georgian (조지아어)' },
  { code: 'de', label: 'German (독일어)' },
  { code: 'el', label: 'Greek (그리스어)' },
  { code: 'gn', label: 'Guarani (과라니어)' },
  { code: 'gu', label: 'Gujarati (구자라트어)' },
  { code: 'ht', label: 'Haitian Creole (아이티 크리올어)' },
  { code: 'ha', label: 'Hausa (하우사어)' },
  { code: 'haw', label: 'Hawaiian (하와이어)' },
  { code: 'iw', label: 'Hebrew (히브리어)' },
  { code: 'hi', label: 'Hindi (힌디어)' },
  { code: 'hmn', label: 'Hmong (몽어)' },
  { code: 'hu', label: 'Hungarian (헝가리어)' },
  { code: 'is', label: 'Icelandic (아이슬란드어)' },
  { code: 'ig', label: 'Igbo (이그보어)' },
  { code: 'ilo', label: 'Ilocano (일로카노어)' },
  { code: 'id', label: 'Indonesian (인도네시아어)' },
  { code: 'ga', label: 'Irish (아일랜드어)' },
  { code: 'it', label: 'Italian (이탈리아어)' },
  { code: 'ja', label: 'Japanese (일본어)' },
  { code: 'jw', label: 'Javanese (자바어)' },
  { code: 'kn', label: 'Kannada (칸나다어)' },
  { code: 'kk', label: 'Kazakh (카자흐어)' },
  { code: 'km', label: 'Khmer (크메르어)' },
  { code: 'rw', label: 'Kinyarwanda (르완다어)' },
  { code: 'gom', label: 'Konkani (콘칸어)' },
  { code: 'kri', label: 'Krio (크리오어)' },
  { code: 'ku', label: 'Kurdish — Kurmanji (쿠르드어)' },
  { code: 'ckb', label: 'Kurdish — Sorani (쿠르드어 소라니)' },
  { code: 'ky', label: 'Kyrgyz (키르기스어)' },
  { code: 'lo', label: 'Lao (라오어)' },
  { code: 'la', label: 'Latin (라틴어)' },
  { code: 'lv', label: 'Latvian (라트비아어)' },
  { code: 'ln', label: 'Lingala (링갈라어)' },
  { code: 'lt', label: 'Lithuanian (리투아니아어)' },
  { code: 'lg', label: 'Luganda (루간다어)' },
  { code: 'lb', label: 'Luxembourgish (룩셈부르크어)' },
  { code: 'mk', label: 'Macedonian (마케도니아어)' },
  { code: 'mai', label: 'Maithili (마이틸리어)' },
  { code: 'mg', label: 'Malagasy (말라가시어)' },
  { code: 'ms', label: 'Malay (말레이어)' },
  { code: 'ml', label: 'Malayalam (말라얄람어)' },
  { code: 'mt', label: 'Maltese (몰타어)' },
  { code: 'mi', label: 'Maori (마오리어)' },
  { code: 'mr', label: 'Marathi (마라티어)' },
  { code: 'mni-Mtei', label: 'Meiteilon — Manipuri (마니푸르어)' },
  { code: 'lus', label: 'Mizo (미조어)' },
  { code: 'mn', label: 'Mongolian (몽골어)' },
  { code: 'my', label: 'Myanmar — Burmese (미얀마어)' },
  { code: 'ne', label: 'Nepali (네팔어)' },
  { code: 'no', label: 'Norwegian (노르웨이어)' },
  { code: 'or', label: 'Odia — Oriya (오리야어)' },
  { code: 'om', label: 'Oromo (오로모어)' },
  { code: 'ps', label: 'Pashto (파슈토어)' },
  { code: 'fa', label: 'Persian (페르시아어)' },
  { code: 'pl', label: 'Polish (폴란드어)' },
  { code: 'pt', label: 'Portuguese (포르투갈어)' },
  { code: 'pa', label: 'Punjabi (펀자브어)' },
  { code: 'qu', label: 'Quechua (케추아어)' },
  { code: 'ro', label: 'Romanian (루마니아어)' },
  { code: 'ru', label: 'Russian (러시아어)' },
  { code: 'sm', label: 'Samoan (사모아어)' },
  { code: 'sa', label: 'Sanskrit (산스크리트어)' },
  { code: 'gd', label: 'Scots Gaelic (스코틀랜드 게일어)' },
  { code: 'nso', label: 'Sepedi (세페디어)' },
  { code: 'sr', label: 'Serbian (세르비아어)' },
  { code: 'st', label: 'Sesotho (세소토어)' },
  { code: 'sn', label: 'Shona (쇼나어)' },
  { code: 'sd', label: 'Sindhi (신디어)' },
  { code: 'si', label: 'Sinhala (싱할라어)' },
  { code: 'sk', label: 'Slovak (슬로바키아어)' },
  { code: 'sl', label: 'Slovenian (슬로베니아어)' },
  { code: 'so', label: 'Somali (소말리어)' },
  { code: 'es', label: 'Spanish (스페인어)' },
  { code: 'su', label: 'Sundanese (순다어)' },
  { code: 'sw', label: 'Swahili (스와힐리어)' },
  { code: 'sv', label: 'Swedish (스웨덴어)' },
  { code: 'tg', label: 'Tajik (타지크어)' },
  { code: 'ta', label: 'Tamil (타밀어)' },
  { code: 'tt', label: 'Tatar (타타르어)' },
  { code: 'te', label: 'Telugu (텔루구어)' },
  { code: 'th', label: 'Thai (태국어)' },
  { code: 'ti', label: 'Tigrinya (티그리냐어)' },
  { code: 'ts', label: 'Tsonga (총가어)' },
  { code: 'tr', label: 'Turkish (터키어)' },
  { code: 'tk', label: 'Turkmen (투르크멘어)' },
  { code: 'ak', label: 'Twi (트위어)' },
  { code: 'uk', label: 'Ukrainian (우크라이나어)' },
  { code: 'ur', label: 'Urdu (우르두어)' },
  { code: 'ug', label: 'Uyghur (위구르어)' },
  { code: 'uz', label: 'Uzbek (우즈베크어)' },
  { code: 'vi', label: 'Vietnamese (베트남어)' },
  { code: 'cy', label: 'Welsh (웨일스어)' },
  { code: 'xh', label: 'Xhosa (코사어)' },
  { code: 'yi', label: 'Yiddish (이디시어)' },
  { code: 'yo', label: 'Yoruba (요루바어)' },
  { code: 'zu', label: 'Zulu (줄루어)' }
];

/* per-language translation cache: code -> (sourceString -> translated) */
const transCache = Object.create(null);
function cacheFor(code) { return transCache[code] || (transCache[code] = Object.create(null)); }
function resetTranslationCache() { for (const k in transCache) delete transCache[k]; }
window.resetTranslationCache = resetTranslationCache;

/* ── string helpers ── */
const hasHangul = (s) => /[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/.test(s);

function tr(s) {
  if (window.LANG === 'ko') return s;
  if (typeof s !== 'string' || !s) return s;
  if (!hasHangul(s)) return s;              // user typed non-Korean → leave as-is
  return cacheFor(window.LANG)[s] || s;     // fall back to source until translated
}

/* collect Hangul strings not yet translated for the current language */
function collectStrings(obj, acc) {
  if (obj == null) return;
  if (typeof obj === 'string') {
    if (hasHangul(obj) && !(obj in cacheFor(window.LANG))) acc.add(obj);
    return;
  }
  if (Array.isArray(obj)) { obj.forEach(v => collectStrings(v, acc)); return; }
  if (typeof obj === 'object') { for (const k in obj) collectStrings(obj[k], acc); }
}

/* deep clone, strings mapped through tr() */
function mapClone(obj) {
  if (obj == null) return obj;
  if (typeof obj === 'string') return tr(obj);
  if (Array.isArray(obj)) return obj.map(mapClone);
  if (typeof obj === 'object') {
    const o = {};
    for (const k in obj) o[k] = mapClone(obj[k]);
    return o;
  }
  return obj;
}

/* ── 아이지 → IEG : 회사명은 한국어 원본을 제외한 모든 번역본에서 IEG로 표기 ── */
function preIEG(s) { return String(s).replace(/아이지/g, 'IEG'); }

/* Google 번역 무료 엔드포인트 (sl=ko → tl) */
async function translateWithGoogle(str, tl) {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl='
    + encodeURIComponent(tl) + '&dt=t&q=' + encodeURIComponent(str);
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0].map(item => (Array.isArray(item) ? (item[0] || '') : '')).join('');
  }
  return '';
}

/* 한 문자열 번역: 아이지→IEG 선처리 후 대상 언어로 번역.
   결과에 한글이 남으면(번역 누락) 영어로 대체해 한글이 절대 남지 않게 함. */
async function translateOne(src, code) {
  const pre = preIEG(src);
  let out = await translateWithGoogle(pre, code);
  if ((!out || hasHangul(out)) && code !== 'en') {
    const en = await translateWithGoogle(pre, 'en');
    if (en) out = en;
  }
  // 영어 번역에도 한글이 남으면 한글만 제거한 원문(IEG 치환본) 사용
  if (out && hasHangul(out)) out = pre.replace(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]+/g, '').replace(/\s+/g, ' ').trim() || out;
  return out;
}

/* 배치 번역 (동시성 제한 + 재시도). onEach(done,total) 진행 콜백. */
async function translateBatch(strings, onEach) {
  if (!strings.length || window.LANG === 'ko') return;
  const code = window.LANG;
  const c = cacheFor(code);
  const todo = strings.filter(s => !(s in c));
  const total = todo.length;
  let done = 0, idx = 0;
  const tick = () => { done++; if (onEach) onEach(done, total); };
  async function worker() {
    while (idx < todo.length) {
      const s = todo[idx++];
      try { const out = await translateOne(s, code); if (out) c[s] = out; }
      catch (e) { /* 아래에서 재시도 */ }
      tick();
    }
  }
  const CONC = 6;
  await Promise.all(Array.from({ length: Math.min(CONC, todo.length) }, worker));
  // 실패한 항목 순차 재시도 (한글 잔존 방지)
  const missed = todo.filter(s => !(s in c));
  for (const s of missed) {
    try { const out = await translateOne(s, code); if (out) c[s] = out; } catch (e) {}
  }
}

async function ensureSlideTranslated(idx) {
  const s = slides[idx];
  if (!s) return;
  const acc = new Set();
  collectStrings(s, acc);
  if (acc.size) await translateBatch([...acc]);
}

async function ensureAllTranslated(onProgress) {
  const acc = new Set();
  slides.forEach(s => collectStrings(s, acc));         // 데이터 문자열
  for (let i = 0; i < slides.length; i++) {             // 렌더된 HTML의 하드코딩 라벨까지
    try { collectHtmlHangul(renderSlide(i), acc); } catch (e) {}
  }
  await translateBatch([...acc], onProgress);
  if (onProgress) onProgress(1, 1);
}
window.ensureAllTranslated = ensureAllTranslated;

/* ── 렌더된 HTML의 텍스트 노드 한글까지 번역 (하드코딩 라벨 포함, 슬라이드에 한글 0 보장) ── */
function getHangulTextNodes(doc) {
  const nodes = [];
  const w = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const t = n.parentNode && n.parentNode.nodeName;
      if (t === 'SCRIPT' || t === 'STYLE') return NodeFilter.FILTER_REJECT;
      return (n.nodeValue && hasHangul(n.nodeValue)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  let x; while ((x = w.nextNode())) nodes.push(x);
  return nodes;
}
function collectHtmlHangul(html, acc) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  getHangulTextNodes(doc).forEach(n => acc.add(n.nodeValue));
}
function translateHtmlString(html) {
  if (window.LANG === 'ko') return { html: html, missing: new Set() };
  const c = cacheFor(window.LANG);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const missing = new Set();
  getHangulTextNodes(doc).forEach(n => {
    const k = n.nodeValue;
    if (c[k] != null) n.nodeValue = c[k];
    else missing.add(k);
  });
  return { html: '<!DOCTYPE html>' + doc.documentElement.outerHTML, missing: missing };
}

/* ── render hooks consumed by app.js / renderers ── */
function slideView(idx) {
  if (window.LANG === 'ko') return slides[idx];
  return mapClone(slides[idx]);
}
window.slideView = slideView;

function renderSlideHTML(idx) {
  if (window.LANG === 'ko') return renderSlide(idx);
  return translateHtmlString(renderSlide(idx)).html;
}
window.renderSlideHTML = renderSlideHTML;

/* translating toast (preview 영역 우측 하단) */
function showToast(on, text) {
  const t = document.getElementById('trans-toast');
  if (!t) return;
  if (text != null) { const tx = document.getElementById('ts-text'); if (tx) tx.textContent = text; }
  t.classList.toggle('show', !!on);
}

window.PENDING_LANG = 'ko';
let applying = false;

/* preview-source hook: 텍스트 노드 단위까지 번역해 한글이 남지 않게 렌더 */
window.setPreviewSrc = function (idx) {
  const sf = document.getElementById('sf');
  if (!sf) return;
  if (window.LANG === 'ko') { sf.srcdoc = renderSlide(idx); return; }
  const r = translateHtmlString(renderSlide(idx));
  sf.srcdoc = r.html;                            // 즉시 페인트 (캐시 / 부분 번역)
  if (!r.missing.size) return;
  showToast(true, '번역 중…');
  translateBatch([...r.missing]).then(() => {
    sf.srcdoc = translateHtmlString(renderSlide(idx)).html;
    showToast(false);
  }).catch(() => showToast(false));
};

/* full-screen render hook (used by app.js renderFs) */
window.renderSlideView = function (idx, frame) {
  if (window.LANG === 'ko') { frame.srcdoc = renderSlide(idx); return; }
  const r = translateHtmlString(renderSlide(idx));
  frame.srcdoc = r.html;
  if (!r.missing.size) return;
  translateBatch([...r.missing]).then(() => { frame.srcdoc = translateHtmlString(renderSlide(idx)).html; });
};

/* ── 언어 선택(스테이징) — 적용 전까지는 언어가 바뀌지 않음 ── */
function stageLang(lang) {
  window.PENDING_LANG = lang;
  syncLangUI();
}
window.stageLang = stageLang;

/* ── 적용: 선택 언어로 전체 번역 후 프레젠테이션 활성화 ── */
async function applyLang() {
  if (applying) return;
  const target = window.PENDING_LANG || 'ko';
  if (target === 'ko') {
    window.LANG = 'ko';
    document.documentElement.lang = 'ko';
    syncLangUI();
    if (typeof cur === 'number') setPreviewSrc(cur);
    return;
  }
  applying = true;
  window.LANG = target;            // 캐시 조회 대상 언어
  document.documentElement.lang = target;
  syncLangUI();                    // 번역 중 프레젠테이션 비활성
  showToast(true, '번역 중… 0%');
  try {
    await ensureAllTranslated((done, total) => {
      const pct = total ? Math.round(done / total * 100) : 100;
      showToast(true, '번역 중… ' + pct + '%');
    });
  } catch (e) { console.warn('translate-all', e); }
  showToast(false);
  applying = false;
  syncLangUI();
  if (typeof cur === 'number') setPreviewSrc(cur);
}
window.applyLang = applyLang;

/* presentation 버튼은 (선택 언어 === 적용 언어) && !applying 일 때만 활성 */
function presentationReady() {
  return !applying && window.PENDING_LANG === window.LANG;
}
window.presentationReady = presentationReady;

function nudgeApply() {
  ['lz-apply', 'bar-apply'].forEach(id => {
    const b = document.getElementById(id);
    if (!b || b.offsetParent === null) return;
    b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
  });
}
window.nudgeApply = nudgeApply;

function populateLangSelects() {
  const opts = LANGS.map(l => '<option value="' + l.code + '">' + l.label + '</option>').join('');
  document.querySelectorAll('.lz-lang-select, .lang-select').forEach(sel => {
    sel.innerHTML = opts;
    sel.value = window.PENDING_LANG;
  });
}

function syncLangUI() {
  document.querySelectorAll('.lz-lang-select, .lang-select').forEach(sel => { sel.value = window.PENDING_LANG; });
  const ready = presentationReady();
  const needApply = window.PENDING_LANG !== window.LANG;
  ['lz-present', 'present-btn'].forEach(id => {
    const b = document.getElementById(id);
    if (!b) return;
    b.classList.toggle('is-disabled', !ready);
    b.setAttribute('aria-disabled', ready ? 'false' : 'true');
  });
  ['lz-apply', 'bar-apply'].forEach(id => {
    const b = document.getElementById(id);
    if (!b) return;
    b.classList.toggle('need-apply', needApply && !applying);
    b.textContent = applying ? '번역 중…' : '적용';
    b.disabled = applying;
  });
}
window.syncLangUI = syncLangUI;

/* ── Title (landing) screen ── */
function enterStudio(thenShow) {
  // Track entry mode: slide-show entry must NOT expose the editor afterwards.
  if (thenShow && !presentationReady()) { nudgeApply(); return; }
  window.SHOW_ONLY = !!thenShow;
  const l = document.getElementById('landing');
  if (thenShow) {
    startShow(true);
    l.classList.add('hidden');
    setTimeout(() => { l.style.display = 'none'; }, 600);
    return;
  }
  document.body.classList.add('studio-mode');
  if (window.mobTab) window.mobTab('preview');
  l.classList.add('hidden');
  setTimeout(() => { l.style.display = 'none'; }, 600);
}
window.enterStudio = enterStudio;

function backToTitle() {
  window.SHOW_ONLY = false;
  document.body.classList.remove('studio-mode');
  const l = document.getElementById('landing');
  l.style.display = 'flex';
  void l.offsetWidth;
  l.classList.remove('hidden');
}
window.backToTitle = backToTitle;

/* ── 편집 화면(스튜디오) → 편집 선택 허브로 뒤로가기 ── */
function backToEditHub() {
  if (typeof fsActive !== 'undefined' && fsActive && typeof endShow === 'function') { try { endShow(); } catch (e) {} }
  document.body.classList.remove('studio-mode');
  window.SHOW_ONLY = false;
  const l = document.getElementById('landing');
  if (l) { l.classList.add('hidden'); l.style.display = 'none'; }
  if (window.showEditHub) window.showEditHub();
}
window.backToEditHub = backToEditHub;

/* ── password gate (편집 모드) ── */
function openPwGate() {
  const g = document.getElementById('pw-gate');
  const inp = document.getElementById('pw-input');
  const err = document.getElementById('pw-err');
  err.textContent = '';
  inp.value = '';
  g.classList.add('show');
  setTimeout(() => inp.focus(), 50);
}
window.openPwGate = openPwGate;

function closePwGate() {
  document.getElementById('pw-gate').classList.remove('show');
}
window.closePwGate = closePwGate;

function submitPw() {
  const inp = document.getElementById('pw-input');
  const err = document.getElementById('pw-err');
  if (inp.value.trim() === '0') {
    closePwGate();
    showEditHub();
  } else {
    err.textContent = '비밀번호가 올바르지 않습니다.';
    err.classList.remove('shake'); void err.offsetWidth; err.classList.add('shake');
    inp.value = '';
    inp.focus();
  }
}
window.submitPw = submitPw;

/* ── 편집 모드 선택 화면 (COMPANY / IR / 챗봇) ── */
function showEditHub() {
  const e = document.getElementById('edit-hub');
  if (!e) return;
  e.style.display = 'flex';
  e.classList.remove('hidden');
  void e.offsetWidth;
}
window.showEditHub = showEditHub;

function closeEditHub() {
  const e = document.getElementById('edit-hub');
  if (!e) return;
  // IEG INSIGHT 허브를 확실히 복원 (편집기 진입 시 #hub 가 숨겨졌을 수 있음)
  if (typeof fsActive !== 'undefined' && fsActive && typeof endShow === 'function') { try { endShow(); } catch (err) {} }
  document.body.classList.remove('studio-mode');
  window.SHOW_ONLY = false;
  const l = document.getElementById('landing');
  if (l) { l.classList.add('hidden'); l.style.display = 'none'; l.classList.remove('settled'); }
  const hub = document.getElementById('hub');
  if (hub) { hub.style.display = 'flex'; hub.classList.remove('hidden'); }
  e.classList.add('hidden');
  setTimeout(() => { e.style.display = 'none'; e.classList.remove('hidden'); }, 420);
}
window.closeEditHub = closeEditHub;

/* 편집 대상 선택 — 덱이면 스튜디오 편집기로, 챗봇이면 챗봇 편집기 모달 */
function editChoose(id) {
  if (id === 'chatbot') {
    const e = document.getElementById('edit-hub'); if (e) { e.style.display = 'none'; e.classList.remove('hidden'); }
    if (window.openChatbotEditor) window.openChatbotEditor();
    return;
  }
  if (!window.DECKS || !window.DECKS[id]) return;
  window.DECK = id;
  slides = JSON.parse(JSON.stringify(window.DECKS[id].data));
  cur = 0;
  window.LANG = 'ko';
  window.PENDING_LANG = 'ko';
  if (window.resetTranslationCache) window.resetTranslationCache();
  if (window.setDeckChrome) window.setDeckChrome(id);
  buildSidebar();
  goTo(0);
  if (window.syncLangUI) window.syncLangUI();
  // hide hubs, open studio editor
  const e = document.getElementById('edit-hub'); if (e) { e.style.display = 'none'; }
  const hub = document.getElementById('hub'); if (hub) { hub.style.display = 'none'; }
  enterStudio(false);
}
window.editChoose = editChoose;

window.addEventListener('load', () => {
  populateLangSelects();
  syncLangUI();
  // Guarantee title content is visible even if entrance animations don't
  // progress (background tab / reduced motion). Animations finish by ~1.7s.
  setTimeout(() => {
    const l = document.getElementById('landing');
    if (l) l.classList.add('settled');
  }, 1900);
  // Enter key submits the password gate
  const inp = document.getElementById('pw-input');
  if (inp) inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitPw();
    if (e.key === 'Escape') closePwGate();
  });
});
