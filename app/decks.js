/* ─────────────────────────────────────────────
   IEG INSIGHT — hub routing between the two decks
   (COMPANY PROFILE / INVESTOR RELATIONS).
   Loaded last; reuses the shared studio engine.
   ───────────────────────────────────────────── */

window.DECKS = {
  ir: {
    data: (typeof DEFAULT_DATA !== 'undefined') ? DEFAULT_DATA : [],
    title: '<span class="t-ieg">IEG</span><br><span class="t-line2">INVESTOR</span><br><span class="t-line3">RELATIONS</span>',
    brand: '<span class="brand-ieg">IEG</span> INVESTOR RELATIONS',
    doc: 'IEG INVESTOR RELATIONS'
  },
  company: {
    data: (typeof COMPANY_DATA !== 'undefined') ? COMPANY_DATA : [],
    title: '<span class="t-ieg">IEG</span><br><span class="t-line2">COMPANY</span><br><span class="t-line3">PROFILE</span>',
    brand: '<span class="brand-ieg">IEG</span> COMPANY PROFILE',
    doc: 'IEG COMPANY PROFILE'
  }
};
window.DECK = 'ir';

function setDeckChrome(id) {
  const t = document.getElementById('lz-title');
  if (t) t.innerHTML = DECKS[id].title;
  const b = document.querySelector('.brand-text');
  if (b) b.innerHTML = DECKS[id].brand;
  document.title = DECKS[id].doc;
}

function chooseDeck(id) {
  if (!DECKS[id]) return;
  window.DECK = id;
  // load the deck's data into the shared engine
  slides = JSON.parse(JSON.stringify(DECKS[id].data));
  cur = 0;
  // reset translation state to original Korean for the new deck
  window.LANG = 'ko';
  window.PENDING_LANG = 'ko';
  if (window.resetTranslationCache) window.resetTranslationCache();
  setDeckChrome(id);
  buildSidebar();
  goTo(0);
  if (window.syncLangUI) window.syncLangUI();

  // hide hub → show this deck's landing (replay entrance)
  const hub = document.getElementById('hub');
  hub.classList.add('hidden');
  setTimeout(() => { hub.style.display = 'none'; }, 520);

  const l = document.getElementById('landing');
  l.classList.remove('settled', 'hidden');
  l.style.display = 'flex';
  void l.offsetWidth;
  // fallback: force final state if entrance animations don't progress
  setTimeout(() => { const ll = document.getElementById('landing'); if (ll) ll.classList.add('settled'); }, 1900);
}
window.chooseDeck = chooseDeck;

function backToHub() {
  // leave studio / presentation if active
  if (typeof fsActive !== 'undefined' && fsActive && typeof endShow === 'function') { try { endShow(); } catch (e) {} }
  document.body.classList.remove('studio-mode');
  window.SHOW_ONLY = false;

  const l = document.getElementById('landing');
  l.classList.add('hidden');
  setTimeout(() => { l.style.display = 'none'; l.classList.remove('settled'); }, 520);

  const hub = document.getElementById('hub');
  hub.style.display = 'flex';
  void hub.offsetWidth;
  hub.classList.remove('hidden');
}
window.backToHub = backToHub;
