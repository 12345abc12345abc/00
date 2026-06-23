/* ─────────────────────────────────────────────
   IEG INSIGHT — COMPANY PROFILE renderers
   Reuses mkS / HEAD / FOOT / esc + IEG palette.
   Apple chassis: tight display type, alternating
   surfaces, single-accent rhythm, rich motion.
   ───────────────────────────────────────────── */

/* ── 1-1 일반 현황 ── */
function renderCGeneral(s, idx, total) {
  const d = s.d;
  const pills = (d.pillars || []).map((p, i) =>
    '<span class="a-up d' + (i + 2) + '" style="display:inline-flex;align-items:center;gap:8px;background:var(--ieg-red);color:#fff;padding:9px 16px;border-radius:99px;font-size:12.5px;font-weight:700;letter-spacing:-0.01em;white-space:nowrap"><span style="width:6px;height:6px;border-radius:50%;background:#fff;opacity:0.75"></span>' + esc(p) + '</span>'
  ).join('');

  const stats = (d.stats || []).map((st, i) =>
    '<div class="card a-up d' + (i + 4) + '" style="padding:18px 20px;display:flex;flex-direction:column;gap:4px">'
    + '<div class="tag">' + esc(st.label) + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:8px"><span style="font-size:30px;font-weight:900;letter-spacing:-0.035em;color:var(--ink);line-height:1" class="num-display">' + esc(st.value) + '</span>'
    + (st.note ? '<span style="font-size:11px;color:var(--ink-muted-48);font-weight:600">' + esc(st.note) + '</span>' : '') + '</div>'
    + '</div>'
  ).join('');

  const bizTags = (d.biz || []).map((b, i) =>
    '<div class="a-up d' + (i + 6) + '" style="display:flex;align-items:center;gap:10px;padding:11px 14px;background:#fff;border:1px solid var(--hairline);border-left:3px solid var(--ieg-red);border-radius:10px;font-size:13.5px;font-weight:700;color:var(--ink);letter-spacing:-0.012em"><span style="color:var(--ieg-red);font-weight:900">▸</span>' + esc(b) + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 18px">' + pills + '</div>'
    + '<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:24px;flex:1;min-height:0">'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;align-content:start">' + stats
        + '<div class="card a-up d8" style="grid-column:span 2;padding:16px 20px;display:flex;flex-direction:column;gap:6px">'
          + '<div class="tag">주요 주주</div>'
          + '<div style="font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-0.012em">' + esc(d.shareholders) + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="card a-up d5" style="padding:20px;display:flex;flex-direction:column;gap:10px;background:var(--canvas-parchment)">'
        + '<div class="tag" style="margin-bottom:2px">주요 사업</div>'
        + bizTags
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 1-2 비전 & 미션 ── */
function renderCVision(s, idx, total) {
  const d = s.d;
  const vals = (d.values || []).map((v, i) =>
    '<div class="a-si d' + (i + 3) + '" style="flex:1;text-align:center;background:#fff;border:1px solid var(--hairline);border-top:4px solid var(--ieg-lime);border-radius:14px;padding:18px 14px">'
    + '<div style="font-size:22px;font-weight:900;color:var(--ieg-lime-deep);letter-spacing:-0.02em">' + esc(v.tag) + '</div>'
    + '<div style="font-size:12px;color:var(--ink-muted-48);margin-top:6px;line-height:1.5">' + esc(v.desc) + '</div>'
    + '</div>'
  ).join('');

  const blocks = (d.blocks || []).map((b, i) =>
    '<div class="a-up d' + (i + 5) + '" style="display:flex;gap:20px;align-items:center;background:' + (i === 0 ? 'var(--tile-dark)' : 'var(--canvas-parchment)') + ';color:' + (i === 0 ? '#fff' : 'var(--ink)') + ';border-radius:16px;padding:22px 26px;position:relative;overflow:hidden">'
    + '<div style="font-size:56px;font-weight:900;letter-spacing:-0.04em;line-height:1;color:' + (i === 0 ? 'var(--ieg-lime)' : 'var(--ieg-red)') + ';flex-shrink:0;width:46px">' + esc(b.num) + '</div>'
    + '<div style="flex:1">'
      + '<div style="font-size:12px;font-weight:800;letter-spacing:0.14em;color:' + (i === 0 ? 'var(--ieg-lime)' : 'var(--ieg-red)') + ';margin-bottom:6px">' + esc(b.label).toUpperCase() + '</div>'
      + '<div style="font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.3">' + esc(b.text) + '</div>'
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;gap:14px;margin:6px 0 16px">' + vals + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:12px;flex:1;min-height:0;justify-content:center">' + blocks + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 1-4 조직도 ── */
function renderCOrg(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', 'var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', 'var(--ieg-red)'];
  const mottos = (d.mottos || []).map((m, i) =>
    '<span class="a-up d' + (i + 2) + '" style="font-size:12px;font-weight:800;color:var(--ieg-red);letter-spacing:0.04em">· ' + esc(m) + '</span>'
  ).join('');

  const heads = (d.heads || []).map((h, i) =>
    '<div class="a-si d' + (i + 3) + '" style="background:var(--tile-dark);color:#fff;border-radius:10px;padding:10px 6px;text-align:center;font-size:14px;font-weight:900;letter-spacing:0.04em;border-bottom:3px solid var(--ieg-red)">' + esc(h) + '</div>'
  ).join('');

  const divs = (d.divisions || []).map((dv, i) =>
    '<div class="a-up d' + (i + 4) + '" style="background:#fff;border:1px solid var(--hairline);border-top:3px solid ' + cols[i % cols.length] + ';border-radius:11px;padding:12px 13px;display:flex;flex-direction:column;gap:7px;min-height:0">'
    + '<div style="font-size:13px;font-weight:800;color:' + cols[i % cols.length] + ';letter-spacing:-0.012em">' + esc(dv.name) + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:3px">'
      + (dv.teams || []).map(t => '<div style="font-size:10.5px;color:var(--ink-muted-80);line-height:1.4;display:flex;gap:5px"><span style="color:' + cols[i % cols.length] + ';font-weight:700">·</span>' + esc(t) + '</div>').join('')
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin:4px 0 12px">'
      + '<div style="display:flex;gap:16px;flex-wrap:wrap">' + mottos + '</div>'
      + '<div class="a-up d2" style="background:var(--ieg-red);color:#fff;padding:7px 16px;border-radius:99px;font-size:13px;font-weight:800;letter-spacing:-0.01em">' + esc(d.total) + '</div>'
    + '</div>'
    + '<div style="display:flex;gap:10px;align-items:stretch;margin-bottom:12px">'
      + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;flex:1">' + heads + '</div>'
      + '<div class="a-up d6" style="display:flex;align-items:center;padding:0 16px;background:var(--canvas-parchment);border:1px dashed var(--hairline);border-radius:10px;font-size:11.5px;font-weight:700;color:var(--ink-muted-48);white-space:nowrap">' + esc(d.advisory) + '</div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;flex:1;min-height:0;align-content:start">' + divs + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 1-5 WORKING GROUP (logos → text) ── */
function renderCWorkgroup(s, idx, total) {
  const d = s.d;
  const colMap = { red: 'var(--ieg-red)', grey: 'var(--ieg-grey)', lime: 'var(--ieg-lime-deep)' };
  const groups = (d.groups || []).map((g, i) => {
    const c = colMap[g.color] || 'var(--ieg-red)';
    const chips = (g.items || []).map((it, j) =>
      '<span class="a-up d' + Math.min(j + 4 + i, 14) + '" style="display:inline-flex;align-items:center;background:#fff;border:1px solid var(--hairline);border-radius:8px;padding:7px 11px;font-size:12px;font-weight:700;color:var(--ink);letter-spacing:-0.012em">' + esc(it) + '</span>'
    ).join('');
    return '<div class="a-up d' + (i + 3) + '" style="background:var(--canvas-parchment);border:1px solid var(--hairline);border-top:4px solid ' + c + ';border-radius:16px;padding:18px 18px;display:flex;flex-direction:column;gap:12px;min-height:0">'
      + '<div>'
        + '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px">'
          + '<div style="font-size:16px;font-weight:900;color:' + c + ';letter-spacing:-0.018em">' + esc(g.label) + '</div>'
          + '<div style="font-size:22px;font-weight:900;color:' + c + ';letter-spacing:-0.03em;line-height:1">' + (g.items || []).length + '</div>'
        + '</div>'
        + '<div style="font-size:11.5px;color:var(--ink-muted-48);margin-top:3px">' + esc(g.sub) + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;align-content:flex-start">' + chips + '</div>'
    + '</div>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;flex:1;min-height:0;margin-top:6px">' + groups + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 1-6 신용등급 및 지적재산권 ── */
function renderCIp(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)'];
  const cards = (d.cards || []).map((c, i) =>
    '<div class="a-up d' + (i + 4) + '" style="background:#fff;border:1px solid var(--hairline);border-top:4px solid ' + cols[i] + ';border-radius:14px;padding:18px 18px;display:flex;flex-direction:column;gap:10px;min-height:0">'
    + '<div><div style="font-size:10.5px;font-weight:800;letter-spacing:0.16em;color:' + cols[i] + '">' + esc(c.tag).toUpperCase() + '</div>'
    + '<div style="font-size:16px;font-weight:900;color:var(--ink);letter-spacing:-0.018em;margin-top:3px">' + esc(c.title) + '</div></div>'
    + '<div style="display:flex;flex-direction:column;gap:5px;border-top:1px dashed var(--hairline);padding-top:10px">'
      + (c.items || []).map(it => '<div style="font-size:11.5px;color:var(--ink-muted-80);line-height:1.45;display:flex;gap:6px"><span style="color:' + cols[i] + ';font-weight:700;flex-shrink:0">·</span>' + esc(it) + '</div>').join('')
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.sub)
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;flex:1;min-height:0;margin-top:6px">' + cards + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 2-1 주요 사업모델 ── */
function renderCBizModel(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', 'var(--ieg-red)'];
  const mods = (d.models || []).map((m, i) =>
    '<div class="a-up d' + (i + 3) + '" style="background:#fff;border:1px solid var(--hairline);border-top:4px solid ' + cols[i] + ';border-radius:14px;padding:20px 18px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden;min-height:0">'
    + '<div style="position:absolute;top:-22px;right:-10px;font-size:120px;font-weight:900;color:rgba(0,0,0,0.03);line-height:1">' + String(i + 1).padStart(2, '0') + '</div>'
    + '<div style="position:relative"><div style="font-size:10px;letter-spacing:0.2em;font-weight:800;color:' + cols[i] + '">' + esc(m.tag) + '</div>'
    + '<div style="font-size:18px;font-weight:900;color:var(--ink);letter-spacing:-0.02em;line-height:1.2;margin-top:5px">' + esc(m.title) + '</div></div>'
    + '<div style="font-size:11.5px;color:var(--ink-muted-80);line-height:1.6;position:relative">' + esc(m.sub) + '</div>'
    + '<div style="border-top:1px dashed var(--hairline);padding-top:10px;position:relative;flex:1">'
      + (m.items || []).map(it => '<div style="font-size:11.5px;color:var(--ink-muted-80);padding:3px 0;display:flex;gap:7px"><span style="color:' + cols[i] + ';font-weight:700">▸</span>' + esc(it) + '</div>').join('')
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;flex:1;min-height:0;margin-top:6px">' + mods + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 2-x 컨셉 (첨단기술교육 / 산업용 / 소프트웨어) ── */
function renderCConcept(s, idx, total) {
  const d = s.d;
  const chips = (d.chips || []).map((c, i) =>
    '<span class="a-up d' + Math.min(i + 6, 14) + '" style="display:inline-flex;align-items:center;gap:7px;background:rgba(237,28,36,0.07);border:1px solid var(--ieg-red-line);color:var(--ink);padding:9px 14px;border-radius:99px;font-size:13px;font-weight:700;letter-spacing:-0.01em"><span style="width:6px;height:6px;border-radius:50%;background:var(--ieg-red)"></span>' + esc(c) + '</span>'
  ).join('');

  const metrics = (d.metrics || []).map((m, i) =>
    '<div class="a-si d' + (i + 5) + '" style="background:' + (i === 0 ? 'var(--ieg-red)' : 'var(--tile-dark)') + ';color:#fff;border-radius:16px;padding:20px 22px;position:relative;overflow:hidden">'
    + '<div style="position:absolute;top:-30px;right:-20px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.12),transparent 65%)"></div>'
    + '<div style="display:flex;align-items:baseline;gap:8px;position:relative"><span style="font-size:40px;font-weight:900;letter-spacing:-0.04em;line-height:1" class="num-display">' + esc(m.v) + '</span><span style="font-size:15px;font-weight:800;opacity:0.85">' + esc(m.u) + '</span></div>'
    + '<div style="font-size:11.5px;opacity:0.7;margin-top:8px;line-height:1.5;position:relative">' + esc(m.l) + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + '<div class="a-up d0" style="margin-bottom:8px"><span class="badge">' + esc(d.badge) + '</span></div>'
    + '<div style="display:grid;grid-template-columns:1.35fr 1fr;gap:34px;flex:1;min-height:0;align-items:center">'
      + '<div>'
        + '<div class="a-up d1" style="font-size:13px;font-weight:800;letter-spacing:0.22em;color:var(--ieg-red)">' + esc(d.kicker || '') + '</div>'
        + '<div class="a-up d2" style="font-size:54px;font-weight:900;letter-spacing:-0.04em;line-height:1.02;color:var(--ink);margin-top:10px">' + esc(d.title) + '</div>'
        + '<span class="a-line d3" style="display:block;width:64px;height:4px;background:var(--ieg-red);margin:22px 0 20px;border-radius:2px"></span>'
        + '<div class="a-up d3" style="font-size:19px;font-weight:300;line-height:1.5;color:var(--ink);letter-spacing:-0.01em;text-wrap:pretty">' + esc(d.lead) + '</div>'
        + '<div class="a-up d4" style="font-size:14px;font-weight:400;line-height:1.65;color:var(--ink-muted-48);letter-spacing:-0.008em;margin-top:16px;text-wrap:pretty">' + esc(d.body) + '</div>'
        + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:22px">' + chips + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:14px">' + metrics + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 2-x 세부 사업 (소프트웨어 개발 / 자동화 장비 / 해외 ODA) — 이미지 없는 텍스트형 ── */
function renderCEdu(s, idx, total) {
  const d = s.d;
  const accentMap = { red: 'var(--ieg-red)', lime: 'var(--ieg-lime-deep)', grey: 'var(--ieg-grey)' };
  const ac = accentMap[d.accent] || 'var(--ieg-red)';

  const block = (label, text, dl) =>
    '<div class="a-up ' + dl + '" style="display:flex;flex-direction:column;gap:6px">'
    + '<div style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:2px;background:' + ac + ';border-radius:2px"></span><span style="font-size:11px;font-weight:800;letter-spacing:0.14em;color:' + ac + '">' + esc(label) + '</span></div>'
    + '<div style="font-size:15px;font-weight:400;line-height:1.65;color:var(--ink-muted-80);letter-spacing:-0.008em;text-wrap:pretty">' + esc(text) + '</div>'
    + '</div>';

  /* 우측 핵심 키워드 패널 (이미지 대체) */
  const kwList = (d.chips || []).map((c, i) =>
    '<div class="a-up d' + Math.min(i + 6, 14) + '" style="display:flex;align-items:center;gap:11px;padding:13px 16px;background:#fff;border:1px solid var(--hairline);border-left:3px solid ' + ac + ';border-radius:11px;font-size:14.5px;font-weight:700;color:var(--ink);letter-spacing:-0.012em"><span style="width:7px;height:7px;border-radius:50%;background:' + ac + ';flex-shrink:0"></span>' + esc(c) + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + '<div class="a-up d0" style="margin-bottom:16px"><span class="badge">' + esc(d.badge) + '</span></div>'
    + '<div style="display:grid;grid-template-columns:1.52fr 0.88fr;gap:42px;flex:1;min-height:0;align-items:center">'
      + '<div style="display:flex;flex-direction:column;min-height:0">'
        + '<div class="a-up d1" style="font-size:12px;font-weight:800;letter-spacing:0.2em;color:' + ac + '">' + esc(d.kicker || '') + '</div>'
        + '<div class="a-up d2" style="font-size:48px;font-weight:900;letter-spacing:-0.04em;line-height:1.04;color:var(--ink);margin-top:8px">' + esc(d.cat) + '</div>'
        + '<span class="a-line d3" style="display:block;width:60px;height:4px;background:linear-gradient(90deg,' + ac + ',var(--ieg-lime));margin:20px 0 16px;border-radius:2px"></span>'
        + '<div class="a-up d3" style="font-size:21px;font-weight:700;line-height:1.4;color:var(--ink);letter-spacing:-0.02em;text-wrap:pretty">' + esc(d.tagline) + '</div>'
        + '<div style="display:flex;flex-direction:column;gap:18px;margin-top:22px">'
          + block('시장 흐름', d.lead, 'd4')
          + block('아이지의 접근', d.body, 'd5')
        + '</div>'
      + '</div>'
      + '<div class="a-si d4" style="background:var(--canvas-parchment);border:1px solid var(--hairline);border-top:4px solid ' + ac + ';border-radius:18px;padding:24px 22px;display:flex;flex-direction:column;gap:14px;align-self:stretch;justify-content:center">'
        + '<div style="font-size:10.5px;font-weight:800;letter-spacing:0.18em;color:' + ac + '">핵심 키워드</div>'
        + '<div style="display:flex;flex-direction:column;gap:9px">' + kwList + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 2-2-1 첨단기술교육 5대 핵심 분야 (한 페이지 정리, 이미지 없음) ── */
function renderCEdu5(s, idx, total) {
  const d = s.d;
  const accentMap = { red: 'var(--ieg-red)', lime: 'var(--ieg-lime-deep)', grey: 'var(--ieg-grey)' };
  const cards = (d.areas || []).map((a, i) => {
    const ac = accentMap[a.accent] || 'var(--ieg-red)';
    const chips = (a.chips || []).map(c =>
      '<span style="display:inline-flex;align-items:center;background:var(--canvas-parchment);border:1px solid var(--hairline);color:var(--ink-muted-80);padding:5px 9px;border-radius:7px;font-size:10.5px;font-weight:700;letter-spacing:-0.01em">' + esc(c) + '</span>'
    ).join('');
    return '<div class="a-up d' + (i + 2) + '" style="background:#fff;border:1px solid var(--hairline);border-top:4px solid ' + ac + ';border-radius:14px;padding:18px 16px;display:flex;flex-direction:column;gap:10px;min-height:0;position:relative;overflow:hidden">'
      + '<div style="position:absolute;top:-14px;right:-4px;font-size:64px;font-weight:900;color:rgba(0,0,0,0.035);line-height:1">' + String(i + 1).padStart(2, '0') + '</div>'
      + '<div style="position:relative">'
        + '<div style="font-size:9.5px;font-weight:800;letter-spacing:0.16em;color:' + ac + '">' + esc(a.kicker || '') + '</div>'
        + '<div style="font-size:18px;font-weight:900;color:var(--ink);letter-spacing:-0.022em;line-height:1.16;margin-top:5px">' + esc(a.cat) + '</div>'
      + '</div>'
      + '<div style="font-size:12.5px;font-weight:700;color:var(--ink);letter-spacing:-0.014em;line-height:1.4;position:relative">' + esc(a.tagline) + '</div>'
      + '<div style="font-size:11px;font-weight:400;color:var(--ink-muted-80);line-height:1.55;letter-spacing:-0.006em;border-top:1px dashed var(--hairline);padding-top:9px;position:relative;flex:1;text-wrap:pretty">' + esc(a.desc) + '</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:5px;position:relative">' + chips + '</div>'
    + '</div>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;flex:1;min-height:0;margin-top:8px">' + cards + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── 2-5 해외 사업 (ODA / 글로벌 거점) ── */
function renderCOverseas(s, idx, total) {
  const d = s.d;
  const totalC = (d.regions || []).reduce((a, b) => a + (b.count || 0), 0);
  const colors = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', '#9b59b6', '#4a8fd6', '#f59e0b'];
  const regions = (d.regions || []).map((r, i) =>
    '<div class="a-up d' + (i + 3) + '" style="background:#fff;border:1px solid var(--hairline);border-top:3px solid ' + colors[i % colors.length] + ';border-radius:12px;padding:14px 15px;display:flex;flex-direction:column;gap:6px">'
    + '<div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.015em">' + esc(r.region) + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:2px"><span style="font-size:26px;font-weight:900;color:' + colors[i % colors.length] + ';line-height:1;letter-spacing:-0.025em">' + r.count + '</span><span style="font-size:12px;font-weight:700;color:' + colors[i % colors.length] + '">개</span></div></div>'
    + '<div style="font-size:10.5px;color:var(--ink-muted-80);line-height:1.5;border-top:1px dashed var(--hairline);padding-top:7px">' + (r.samples || []).map(x => esc(x)).join(' · ') + '</div>'
    + '</div>'
  ).join('');

  const notes = (d.notes || []).map((n, i) =>
    '<div class="a-up d' + (i + 9) + '" style="font-size:11.5px;color:var(--ink-muted-80);line-height:1.5;display:flex;gap:7px"><span style="color:var(--ieg-red);font-weight:700">·</span>' + esc(n) + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div class="tag a-up d2" style="margin:4px 0 8px">글로벌 기술교육센터 거점 (총 ' + totalC + '개)</div>'
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;flex:1;min-height:0;align-content:start">' + regions + '</div>'
    + '<div class="a-up d8" style="margin-top:12px;background:var(--tile-dark);color:#fff;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px">'
      + '<div style="background:var(--ieg-red);color:#fff;font-size:10px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:0.08em;white-space:nowrap">GLOBAL ODA</div>'
      + '<div style="font-size:13.5px;font-weight:700;letter-spacing:-0.012em;line-height:1.5;color:rgba(255,255,255,0.92)">' + esc(d.hl) + '</div>'
    + '</div>'
    + (notes ? '<div style="display:flex;flex-direction:column;gap:4px;margin-top:10px">' + notes + '</div>' : '')
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ── Closing (THANK YOU) ── */
function renderCClosing(s, idx, total) {
  const d = s.d;
  return mkS(
    '<div class="slide" style="background:var(--tile-dark);overflow:hidden">'
    + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent,transparent 40px,rgba(237,28,36,0.03) 40px,rgba(237,28,36,0.03) 41px)"></div>'
    + '<div class="amb-glow" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.2),transparent 60%)"></div>'
    + '<div class="amb-drift" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:780px;height:780px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.06),transparent 62%)"></div>'
    + '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px">'
      + '<div class="a-up d1" style="font-size:14px;letter-spacing:0.4em;color:var(--ieg-red);font-weight:700;margin-bottom:22px">IEG</div>'
      + '<div class="a-rise d2" style="font-size:104px;font-weight:700;letter-spacing:-0.04em;color:#fff;line-height:1;padding:0 8px">' + esc(d.heading) + '</div>'
      + '<span class="a-line d3" style="display:block;width:96px;height:4px;background:var(--ieg-red);margin:30px 0 24px;border-radius:2px"></span>'
      + '<div class="a-up d4" style="font-size:16px;letter-spacing:0.3em;color:rgba(255,255,255,0.5);font-weight:600">' + esc(d.sub) + '</div>'
      + '<div class="a-up d5" style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:26px;line-height:1.9;letter-spacing:-0.005em">' + esc(d.contact) + '<br>' + esc(d.addr) + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--ieg-red);transform-origin:left;animation:lineGrow 0.9s 0.5s cubic-bezier(.22,.61,.36,1) both"></div>'
    + '</div>'
  );
}

window.RENDERERS_COMPANY = {
  c_general: renderCGeneral,
  c_vision: renderCVision,
  c_org: renderCOrg,
  c_workgroup: renderCWorkgroup,
  c_ip: renderCIp,
  c_bizmodel: renderCBizModel,
  c_concept: renderCConcept,
  c_edu: renderCEdu,
  c_edu5: renderCEdu5,
  c_overseas: renderCOverseas,
  c_closing: renderCClosing
};
