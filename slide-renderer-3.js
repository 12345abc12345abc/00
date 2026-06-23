/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — renderer part 3
   Slides 19-37: strategy, competency, experts,
   growth, success, financials, P&L, investment
   ───────────────────────────────────────────── */

/* ──────────────────────────────── 3-1 Strategy overview ──── */
function renderStrategyOverview(s, idx, total) {
  const d = s.d;
  const cats = [
    { label: '핵심 경쟁력', en: 'CORE COMPETENCY', items: d.core, color: 'var(--ieg-grey)', bg: 'var(--canvas-parchment)', border: 'var(--hairline)' },
    { label: '확장 전략 — 국내', en: 'GROWTH · DOMESTIC', items: d.domestic, color: 'var(--ieg-red)', bg: 'rgba(237,28,36,0.05)', border: 'var(--ieg-red-line)' },
    { label: '확장 전략 — 해외', en: 'GROWTH · GLOBAL', items: d.overseas, color: 'var(--ieg-lime-deep)', bg: 'rgba(110,110,115,0.10)', border: 'var(--ieg-lime-line)' }
  ];

  const rows = cats.map((cat, si) => {
    const itemsHTML = (cat.items || []).map((it, j) =>
      '<div class="a-up d' + (si + j + 4) + '" style="display:flex;align-items:center;gap:14px;background:#fff;border-radius:10px;padding:12px 16px;border:1px solid var(--hairline)">'
      + '<span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:' + cat.color + ';color:#fff;font-size:12px;font-weight:900;letter-spacing:-0.02em;flex-shrink:0">' + esc(it.tag) + '</span>'
      + '<span style="font-size:13.5px;color:var(--ink);font-weight:600;letter-spacing:-0.012em;line-height:1.35">' + esc(it.label) + '</span>'
      + '</div>'
    ).join('');

    return '<div class="a-up d' + (si + 3) + '" style="background:' + cat.bg + ';border:1px solid ' + cat.border + ';border-left:4px solid ' + cat.color + ';border-radius:14px;padding:18px 22px">'
      + '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px">'
        + '<div style="font-size:14px;font-weight:800;color:' + cat.color + ';letter-spacing:-0.012em">' + esc(cat.label) + '</div>'
        + '<div class="tag" style="color:' + cat.color + '">' + esc(cat.en) + '</div>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">' + itemsHTML + '</div>'
    + '</div>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;gap:14px;flex:1;min-height:0;align-content:start;margin-top:4px">' + rows + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-1 Competency (낙찰률 + 대형 프로젝트) ──── */
function renderCompetency(s, idx, total) {
  const d = s.d;
  const cid = 'bp' + idx;

  const wrHTML = (d.winRate || []).map((r, i) =>
    '<div class="a-up d' + (i + 4) + '" style="flex:1;text-align:center;background:' + (r.year === '총평균' ? 'var(--ieg-red)' : 'var(--canvas-parchment)') + ';border:1px solid ' + (r.year === '총평균' ? 'var(--ieg-red)' : 'var(--hairline)') + ';border-radius:10px;padding:12px 8px">'
    + '<div style="font-size:11px;color:' + (r.year === '총평균' ? 'rgba(255,255,255,0.85)' : 'var(--ink-muted-48)') + ';font-weight:600;letter-spacing:0.04em">' + esc(r.year) + '</div>'
    + '<div style="font-size:24px;font-weight:900;color:' + (r.year === '총평균' ? '#fff' : 'var(--ink)') + ';letter-spacing:-0.025em;margin-top:4px;font-variant-numeric:tabular-nums">' + r.rate + '<span style="font-size:14px;font-weight:700;margin-left:2px">%</span></div>'
    + '</div>'
  ).join('');

  const bulletList = (arr, accent, startDelay) => (arr || []).map((b, i) =>
    '<div class="a-up d' + (startDelay + i) + '" style="display:flex;gap:8px;align-items:flex-start;font-size:11.5px;color:var(--ink-muted-80);line-height:1.5;letter-spacing:-0.008em;margin-bottom:7px">'
    + '<span style="color:' + accent + ';font-weight:900;flex-shrink:0;margin-top:1px">·</span>'
    + '<span style="font-weight:600">' + esc(b) + '</span>'
    + '</div>'
  ).join('');

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      // left: win rate + bullets
      + '<div class="card a-up d3" style="padding:18px;display:flex;flex-direction:column">'
        + '<div class="tag" style="margin-bottom:10px">2020 ~ 2023년 조달청 입찰 기준 평균 낙찰률</div>'
        + '<div style="display:flex;gap:8px;margin-bottom:18px">' + wrHTML + '</div>'
        + '<div style="border-top:1px solid var(--hairline);padding-top:14px;margin-top:auto">'
          + bulletList(d.leftBullets, 'var(--ieg-red)', 9)
        + '</div>'
      + '</div>'
      // right: big projects + bullets
      + '<div class="card a-up d4" style="padding:18px;display:flex;flex-direction:column;min-height:0">'
        + '<div class="tag" style="margin-bottom:8px">2020 ~ 2023년 단일 프로젝트 5억원 이상 계약 건</div>'
        + '<div style="flex:1;min-height:120px;position:relative"><canvas id="' + cid + '"></canvas></div>'
        + '<div style="border-top:1px solid var(--hairline);padding-top:12px;margin-top:14px">'
          + bulletList(d.rightBullets, 'var(--ieg-lime-deep)', 12)
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const bpJ = JSON.stringify((d.bigProjects || []).map(p => p.amount));
  const bpY = JSON.stringify((d.bigProjects || []).map(p => p.year));
  const bpC = JSON.stringify((d.bigProjects || []).map(p => p.count));
  const colors = JSON.stringify((d.bigProjects || []).map((p, i, a) => i === a.length - 1 ? '#ED1C24' : '#cccccc'));
  const chart = 'setTimeout(function(){var cv=document.getElementById("' + cid + '");if(!cv)return;var cnts=' + bpC + ';'
    + 'new Chart(cv.getContext("2d"),{type:"bar",data:{labels:' + bpY + ',datasets:['
      + '{label:"금액(백만)",data:' + bpJ + ',backgroundColor:' + colors + ',borderRadius:6,yAxisID:"y"},'
      + '{label:"건수",data:cnts,type:"line",borderColor:"#1d1d1f",borderWidth:2.5,pointRadius:5,pointBackgroundColor:"#fff",pointBorderColor:"#1d1d1f",pointBorderWidth:2,tension:0.3,yAxisID:"y2",fill:false}'
    + ']},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},'
    + 'plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",titleFont:{family:"Pretendard Variable",weight:700},bodyFont:{family:"Pretendard Variable"},padding:10,cornerRadius:8,callbacks:{label:function(c){if(c.dataset.label==="건수")return "건수: "+c.raw+"건";return "금액: ₩"+c.raw.toLocaleString()+"M";}}}},'
    + 'scales:{x:{ticks:{font:{size:12,family:"Pretendard Variable",weight:600},color:"#6e6e73"},grid:{display:false}},'
    + 'y:{beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return (v/1000).toFixed(0)+"K";}},grid:{color:"rgba(0,0,0,0.04)"}},'
    + 'y2:{position:"right",beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#1d1d1f",stepSize:4,callback:function(v){return v+"건";}},grid:{display:false}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 3-1 Experts — executive roster ──── */
function renderExperts(s, idx, total) {
  const d = s.d;

  // compact person card
  const personBox = (p, accent, delay) =>
    '<div class="a-up d' + delay + '" style="background:var(--canvas);border:1px solid var(--hairline);border-top:3px solid ' + accent + ';border-radius:9px;padding:9px 11px 10px">'
    + '<div style="display:flex;align-items:baseline;gap:7px;border-bottom:1px solid var(--hairline);padding-bottom:5px;margin-bottom:5px">'
      + '<span style="font-size:14px;font-weight:900;color:var(--ink);letter-spacing:-0.01em">' + esc(p.name) + '</span>'
      + '<span style="font-size:9.5px;color:var(--ink-muted-48);font-weight:600;letter-spacing:-0.005em">' + esc(p.role) + '</span>'
    + '</div>'
    + p.history.map(h => '<div style="font-size:9px;color:var(--ink-muted-80);line-height:1.5;letter-spacing:-0.012em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">· ' + esc(h) + '</div>').join('')
    + '</div>';

  const colStack = (arr, accent, base) =>
    '<div style="display:flex;flex-direction:column;gap:10px;justify-content:space-between">'
    + arr.map((p, i) => personBox(p, accent, base + i)).join('')
    + '</div>';

  // CEO emphasized card
  const ceoBox =
    '<div class="a-si d4" style="background:var(--tile-dark);border-radius:12px;padding:16px 16px 14px;text-align:center;position:relative;overflow:hidden;box-shadow:0 14px 34px -12px rgba(0,0,0,0.4)">'
    + '<div style="position:absolute;top:-30px;right:-20px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.3),transparent 65%)"></div>'
    + '<div style="position:relative">'
      + '<div style="font-size:26px;font-weight:900;color:#fff;letter-spacing:-0.02em;line-height:1">' + esc(d.ceo.name) + '</div>'
      + '<div style="font-size:13px;font-weight:800;color:var(--ieg-lime);letter-spacing:0.02em;margin-top:5px">' + esc(d.ceo.role) + '</div>'
      + '<div style="border-top:1px solid rgba(255,255,255,0.15);margin-top:11px;padding-top:10px;text-align:left">'
        + d.ceo.history.map(h => '<div style="font-size:9.5px;color:rgba(255,255,255,0.78);line-height:1.55;letter-spacing:-0.012em;margin-bottom:3px">· ' + esc(h) + '</div>').join('')
      + '</div>'
    + '</div>'
    + '</div>';

  const centerCol =
    '<div style="display:flex;flex-direction:column;gap:10px;justify-content:space-between">'
    + personBox(d.centerTop, 'var(--ieg-grey)', 3)
    + ceoBox
    + personBox(d.centerBottom, 'var(--ieg-grey)', 5)
    + '</div>';

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div class="a-up d2" style="display:flex;justify-content:flex-end;margin:2px 0 8px">'
      + '<span style="font-size:13px;font-weight:800;color:var(--ieg-red);letter-spacing:-0.01em">' + esc(d.note) + '</span>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1.04fr 1fr;gap:14px;flex:1;min-height:0">'
      + colStack(d.left, 'var(--ieg-red)', 3)
      + centerCol
      + colStack(d.right, 'var(--ieg-red)', 3)
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-2 Growth Domestic ──── */
function renderGrowthDomestic(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)'];

  const tgts = (d.targets || []).map((t, i) =>
    '<div class="a-up d' + (i + 3) + '" style="background:var(--canvas);border:1px solid var(--hairline);border-left:4px solid ' + cols[i] + ';border-radius:12px;padding:20px 24px;display:flex;gap:24px;align-items:flex-start;position:relative;overflow:hidden">'
    + '<div style="position:absolute;top:-20px;right:-10px;font-size:160px;font-weight:900;color:rgba(0,0,0,0.025);line-height:1;letter-spacing:-0.04em">' + esc(t.num) + '</div>'
    + '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0;width:80px;position:relative">'
      + '<div style="font-size:56px;font-weight:900;color:' + cols[i] + ';line-height:1;letter-spacing:-0.04em;font-variant-numeric:tabular-nums">' + esc(t.num) + '</div>'
      + '<div style="width:32px;height:2px;background:' + cols[i] + ';border-radius:1px"></div>'
    + '</div>'
    + '<div style="flex:1;position:relative">'
      + '<div style="font-size:18px;font-weight:900;color:' + cols[i] + ';margin-bottom:8px;letter-spacing:-0.02em;line-height:1.25">' + esc(t.label) + '</div>'
      + '<div style="font-size:13px;color:var(--ink-muted-80);line-height:1.7;white-space:pre-line;letter-spacing:-0.008em">' + esc(t.detail) + '</div>'
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;flex-direction:column;gap:12px;flex:1;min-height:0;margin-top:6px">' + tgts + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-3 Overseas — Agents ──── */
function renderOverseasAgents(s, idx, total) {
  const d = s.d;
  const maxC = Math.max(...d.agents.map(a => a.count));

  const agHTML = (d.agents || []).map((a, i) => {
    const w = (a.count / maxC * 100).toFixed(1);
    return '<div class="a-up d' + (i + 4) + '" style="display:flex;align-items:center;gap:14px;padding:9px 14px;background:' + (i % 2 ? 'var(--canvas)' : 'var(--canvas-parchment)') + ';border-radius:10px;margin-bottom:6px;border:1px solid var(--hairline)">'
      + '<div style="width:80px;flex-shrink:0;font-size:13px;font-weight:800;color:var(--ink);letter-spacing:-0.012em">' + esc(a.region) + '</div>'
      + '<div style="flex:1;height:14px;background:var(--canvas-parchment);border-radius:7px;overflow:hidden;position:relative">'
        + '<div style="position:absolute;left:0;top:0;bottom:0;width:' + w + '%;background:linear-gradient(90deg,var(--ieg-red),#ff5050);border-radius:7px;transform-origin:left;animation:lineGrow 0.9s ' + (0.5 + i * 0.08) + 's cubic-bezier(.22,.61,.36,1) both"></div>'
      + '</div>'
      + '<div style="width:48px;flex-shrink:0;text-align:right"><span style="font-size:18px;font-weight:900;color:var(--ieg-red);letter-spacing:-0.02em;font-variant-numeric:tabular-nums">' + a.count + '</span></div>'
      + '<div style="width:240px;flex-shrink:0;font-size:10.5px;color:var(--ink-muted-48);letter-spacing:-0.005em;line-height:1.4">' + esc(a.countries || '') + '</div>'
    + '</div>';
  }).join('');

  const strategiesHTML = (d.strategy || []).map((st, i) =>
    '<div class="bullet a-up d' + (i + 8) + '" style="font-size:12px;padding:5px 0;line-height:1.55">' + esc(st) + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.sub)
    + '<div style="display:grid;grid-template-columns:2fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div class="card a-up d3" style="padding:18px;display:flex;flex-direction:column">'
        + '<div class="tag" style="margin-bottom:8px">대륙별 해외 에이전트 현황</div>'
        + '<div style="flex:1;min-height:0;overflow:hidden">' + agHTML + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:12px">'
        + '<div class="a-up d3 card" style="padding:22px;background:linear-gradient(135deg,var(--ieg-red),#ff3030);color:#fff;border:none;text-align:center">'
          + '<div class="tag" style="color:rgba(255,255,255,0.8);margin-bottom:6px">GLOBAL NETWORK</div>'
          + '<div style="font-size:36px;font-weight:900;letter-spacing:-0.035em;line-height:1;font-variant-numeric:tabular-nums">92</div>'
          + '<div style="font-size:13px;font-weight:700;margin-top:2px;letter-spacing:0.04em">Agents</div>'
          + '<div style="height:1px;background:rgba(255,255,255,0.2);margin:14px 0"></div>'
          + '<div style="font-size:14px;font-weight:700;letter-spacing:-0.012em">' + esc(d.total) + '</div>'
        + '</div>'
        + '<div class="a-up d6 card" style="padding:16px 18px;flex:1">'
          + '<div class="tag" style="color:var(--ieg-red);margin-bottom:8px">전략</div>'
          + strategiesHTML
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-3 Overseas — ODA (NEW) ──── */
function renderOverseasOda(s, idx, total) {
  const d = s.d;
  const statColor = (st) => {
    if (st === '수주 완료') return 'var(--ieg-lime-deep)';
    if (st === '입찰 준비') return 'var(--ieg-red)';
    if (st === '영업 활동') return 'var(--ieg-grey)';
    return '#9b59b6';
  };

  const proj = (d.projects || []).map((p, i) =>
    '<div class="a-up d' + (i + 3) + ' card" style="padding:18px 20px;display:flex;flex-direction:column;gap:8px;position:relative;border-left:4px solid ' + statColor(p.status) + ';overflow:hidden">'
    + '<div style="position:absolute;top:-12px;right:-8px;font-size:80px;font-weight:900;color:rgba(0,0,0,0.04);line-height:1;letter-spacing:-0.04em">' + esc(p.year) + '</div>'
    + '<div style="display:flex;align-items:center;gap:8px;position:relative">'
      + '<span style="font-size:10px;font-weight:800;padding:3px 9px;border-radius:99px;background:' + statColor(p.status) + ';color:#fff;letter-spacing:0.08em">' + esc(p.status) + '</span>'
      + '<span style="font-size:11px;color:var(--ink-muted-48);font-weight:600;letter-spacing:0.06em">' + esc(p.year) + '</span>'
    + '</div>'
    + '<div style="font-size:15px;font-weight:800;color:var(--ink);letter-spacing:-0.018em;line-height:1.3;position:relative">' + esc(p.name) + '</div>'
    + '<div style="font-size:11.5px;color:var(--ink-muted-80);line-height:1.55;letter-spacing:-0.005em;position:relative">' + esc(p.desc) + '</div>'
    + '<div style="display:flex;gap:14px;padding-top:8px;border-top:1px dashed var(--hairline);position:relative">'
      + '<div style="flex:1"><div class="tag">금액</div><div style="font-size:14px;font-weight:900;color:var(--ieg-red);letter-spacing:-0.015em;line-height:1;margin-top:2px">' + esc(p.amount) + '</div></div>'
      + '<div style="flex:1"><div class="tag">스케줄</div><div style="font-size:11.5px;font-weight:700;color:var(--ink);letter-spacing:-0.008em;margin-top:2px">' + esc(p.schedule) + '</div></div>'
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;flex:1;min-height:0;margin-top:6px">' + proj + '</div>'
    + '<div class="a-up d8 card" style="padding:14px 18px;margin-top:12px;background:var(--ieg-red-soft);border-color:var(--ieg-red-line);display:flex;align-items:center;gap:14px">'
      + '<div style="background:var(--ieg-red);color:#fff;font-size:10px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:0.08em">CUMULATIVE</div>'
      + '<div style="font-size:14px;font-weight:700;color:var(--ink);letter-spacing:-0.012em;line-height:1.5">' + esc(d.hl) + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-3 Overseas — Corp branches (NEW) ──── */
function renderOverseasCorp(s, idx, total) {
  const d = s.d;
  const totalC = (d.regions || []).reduce((a, b) => a + b.count, 0);
  const colors = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', '#9b59b6', '#4a8fd6', '#f59e0b'];

  const regionsHTML = (d.regions || []).map((r, i) =>
    '<div class="a-up d' + (i + 3) + ' card" style="padding:14px 16px;display:flex;flex-direction:column;gap:6px;border-top:3px solid ' + colors[i % colors.length] + ';">'
    + '<div style="display:flex;justify-content:space-between;align-items:baseline">'
      + '<div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.015em">' + esc(r.region) + '</div>'
      + '<div style="display:flex;align-items:baseline;gap:2px"><span style="font-size:26px;font-weight:900;color:' + colors[i % colors.length] + ';line-height:1;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">' + r.count + '</span><span style="font-size:12px;font-weight:700;color:' + colors[i % colors.length] + '">개</span></div>'
    + '</div>'
    + '<div style="font-size:10.5px;color:var(--ink-muted-80);line-height:1.55;letter-spacing:-0.005em;border-top:1px dashed var(--hairline);padding-top:6px">' + (r.samples || []).map(s2 => esc(s2)).join(' · ') + '</div>'
    + '</div>'
  ).join('');

  const pipHTML = (d.pipeline || []).map((p, i) =>
    '<div class="a-up d' + (i + 9) + '" style="display:flex;justify-content:space-between;align-items:center;padding:7px 12px;background:#fff;border:1px solid var(--hairline);border-radius:8px;margin-bottom:5px">'
    + '<span style="font-size:11.5px;font-weight:700;color:var(--ink);letter-spacing:-0.008em">' + esc(p.name) + '</span>'
    + '<span style="font-size:10px;color:var(--ieg-red);font-weight:700;background:var(--ieg-red-soft);padding:3px 9px;border-radius:99px;letter-spacing:0.04em">' + esc(p.status) + '</span>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:2fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div>'
        + '<div class="tag a-up d2" style="margin-bottom:8px">대륙별 거점 (총 ' + totalC + '개)</div>'
        + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">' + regionsHTML + '</div>'
      + '</div>'
      + '<div>'
        + '<div class="tag a-up d2" style="margin-bottom:8px;color:var(--ieg-red)">신규 영업 파이프라인</div>'
        + '<div class="card a-up d3" style="padding:14px">' + pipHTML + '</div>'
      + '</div>'
    + '</div>'
    + '<div class="a-up d14 card" style="padding:14px 18px;margin-top:12px;background:var(--tile-dark);color:#fff;border:none;display:flex;align-items:center;gap:14px">'
      + '<div style="background:var(--ieg-red);color:#fff;font-size:10px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:0.08em">EXPANSION</div>'
      + '<div style="font-size:14px;font-weight:700;letter-spacing:-0.012em;line-height:1.5;color:rgba(255,255,255,0.92)">' + esc(d.hl) + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 3-4 Success Strategy (NEW) ──── */
function renderSuccessStrategy(s, idx, total) {
  const d = s.d;
  const cycle = d.cycle || [];

  // arrange cycle items in a 2x2 grid with arrows
  const colors = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)', '#9b59b6'];
  const cycleHTML = cycle.map((c, i) =>
    '<div class="a-si d' + (i + 3) + '" style="position:relative">'
      + '<div style="background:#fff;border:1px solid var(--hairline);border-top:4px solid ' + colors[i] + ';border-radius:14px;padding:18px 18px;position:relative;overflow:hidden">'
        + '<div style="position:absolute;top:-8px;right:-8px;font-size:80px;font-weight:900;color:rgba(0,0,0,0.03);line-height:1;letter-spacing:-0.04em">0' + (i + 1) + '</div>'
        + '<div style="display:flex;align-items:center;gap:10px;position:relative">'
          + '<span style="background:' + colors[i] + ';color:#fff;width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:800;letter-spacing:0.04em">' + esc(c.tag) + '</span>'
          + '<div style="font-size:16px;font-weight:900;color:var(--ink);letter-spacing:-0.018em">' + esc(c.title) + '</div>'
        + '</div>'
        + '<div style="font-size:11.5px;color:var(--ink-muted-80);line-height:1.6;margin-top:8px;letter-spacing:-0.005em;position:relative">' + esc(c.desc) + '</div>'
      + '</div>'
    + '</div>'
  ).join('');

  const principlesHTML = (d.principles || []).map((p, i) =>
    '<div class="a-up d' + (i + 8) + '" style="background:var(--canvas);border:1px solid var(--hairline);border-radius:12px;padding:14px 18px;display:flex;gap:14px;align-items:flex-start">'
    + '<div style="background:var(--ieg-red);color:#fff;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;letter-spacing:-0.01em;flex-shrink:0">' + esc(p.num) + '</div>'
    + '<div>'
      + '<div style="font-size:13.5px;font-weight:800;color:var(--ink);letter-spacing:-0.012em;line-height:1.25">' + esc(p.title) + '</div>'
      + '<div style="font-size:11px;color:var(--ink-muted-80);line-height:1.55;margin-top:3px;letter-spacing:-0.005em">' + esc(p.desc) + '</div>'
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      // left: cycle diagram
      + '<div class="card a-up d3" style="padding:18px;background:var(--canvas-parchment);position:relative;overflow:hidden">'
        + '<div class="tag" style="margin-bottom:10px">팬덤 형성 사이클</div>'
        + '<div style="position:relative;display:grid;grid-template-columns:1fr 1fr;gap:10px;height:calc(100% - 30px)">'
          + cycleHTML
        + '</div>'
      + '</div>'
      // right: principles
      + '<div style="display:flex;flex-direction:column;gap:10px">' + principlesHTML + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-1 Financial Results ──── */
function renderFinancialResults(s, idx, total) {
  const d = s.d;
  const c1 = 'fr1_' + idx, c2 = 'fr2_' + idx;

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div class="card a-up d3" style="padding:18px;display:flex;flex-direction:column;min-height:0">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
          + '<div class="tag">매출액 추이 (2014~2026)</div>'
          + '<div style="font-size:10px;color:var(--ink-muted-48);font-weight:600">[ 단위: 백만원 ]</div>'
        + '</div>'
        + '<div style="flex:1;position:relative;min-height:0"><canvas id="' + c1 + '"></canvas></div>'
      + '</div>'
      + '<div class="card a-up d4" style="padding:18px;display:flex;flex-direction:column;min-height:0">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
          + '<div class="tag" style="color:var(--ieg-red)">영업이익 / 영업이익률 (2019~2023)</div>'
          + '<div style="display:flex;gap:10px"><span style="display:flex;align-items:center;gap:5px;font-size:10.5px;color:var(--ink-muted-80);font-weight:600"><span style="width:10px;height:10px;border-radius:2px;background:var(--ieg-red)"></span>영업이익</span><span style="display:flex;align-items:center;gap:5px;font-size:10.5px;color:var(--ink-muted-80);font-weight:600"><span style="width:18px;height:2.5px;background:var(--ieg-lime-deep);display:inline-block"></span>이익률</span></div>'
        + '</div>'
        + '<div style="flex:1;position:relative;min-height:0"><canvas id="' + c2 + '"></canvas></div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const rY = JSON.stringify(d.revYears), rV = JSON.stringify(d.revenue);
  const oY = JSON.stringify(d.opYears), oV = JSON.stringify(d.opinc), oR = JSON.stringify(d.oprate);
  const chart = 'setTimeout(function(){'
    + 'var r=document.getElementById("' + c1 + '"),o=document.getElementById("' + c2 + '");if(!r||!o)return;'
    + 'var rv=' + rV + ';'
    + 'new Chart(r.getContext("2d"),{type:"bar",data:{labels:' + rY + ',datasets:[{label:"매출",data:rv,backgroundColor:rv.map(function(_,i){return i>=rv.length-3?"#ED1C24":"#cccccc";}),borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",padding:10,cornerRadius:8,callbacks:{label:function(c){return "₩"+c.raw.toLocaleString()+"M";}}}},scales:{x:{ticks:{font:{size:10,family:"Pretendard Variable",weight:600},color:"#6e6e73"},grid:{display:false}},y:{beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return (v/1000).toFixed(0)+"K";}},grid:{color:"rgba(0,0,0,0.04)"}}}}});'
    + 'var ov=' + oV + ';'
    + 'new Chart(o.getContext("2d"),{type:"bar",data:{labels:' + oY + ',datasets:[{label:"영업이익",data:ov,backgroundColor:ov.map(function(_,i){return i===ov.length-1?"#ED1C24":"#cccccc";}),borderRadius:5,yAxisID:"y"},{label:"이익률",data:' + oR + ',type:"line",borderColor:"#6fa300",borderWidth:3,pointBackgroundColor:"#6fa300",pointRadius:6,pointBorderColor:"#fff",pointBorderWidth:2,tension:0.3,yAxisID:"y2",fill:false}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",padding:10,cornerRadius:8}},scales:{x:{ticks:{font:{size:12,family:"Pretendard Variable",weight:600},color:"#6e6e73"},grid:{display:false}},y:{beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return v.toLocaleString()+"M";}},grid:{color:"rgba(0,0,0,0.04)"}},y2:{position:"right",beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable",weight:600},color:"#6fa300",callback:function(v){return v.toFixed(1)+"%";}},grid:{display:false}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 4-2 Sales breakdown ──── */
function renderSalesBreakdown(s, idx, total) {
  const d = s.d;

  const catH = (d.cats || []).map((cat, i) => {
    const color = cat.color === 'red' ? 'var(--ieg-red)' : cat.color === 'lime' ? 'var(--ieg-lime-deep)' : 'var(--ieg-grey)';
    return '<div class="a-up d' + (i + 3) + ' card" style="padding:14px 16px;display:flex;flex-direction:column;gap:8px;border-top:4px solid ' + color + ';position:relative;overflow:hidden">'
      + '<div style="position:absolute;top:-15px;right:-8px;font-size:80px;font-weight:900;color:rgba(0,0,0,0.03);line-height:1;letter-spacing:-0.04em">0' + (i + 1) + '</div>'
      + '<div style="font-size:11.5px;font-weight:800;color:' + color + ';letter-spacing:-0.012em;line-height:1.25;position:relative">' + esc(cat.label) + '</div>'
      + '<div style="display:flex;align-items:baseline;gap:2px;position:relative">'
        + '<span style="font-size:32px;font-weight:900;color:' + color + ';letter-spacing:-0.035em;line-height:1;font-variant-numeric:tabular-nums">' + esc(cat.amount) + '</span>'
        + '<span style="font-size:14px;font-weight:800;color:' + color + ';letter-spacing:-0.015em">' + esc(cat.unit) + '</span>'
      + '</div>'
      + '<div style="border-top:1px dashed var(--hairline);padding-top:6px;flex:1;position:relative">'
      + (cat.items || []).map(it => '<div style="font-size:9.5px;color:var(--ink-muted-80);padding:1.5px 0;line-height:1.4;letter-spacing:-0.003em;display:flex;gap:5px"><span style="color:' + color + ';flex-shrink:0;font-weight:700">·</span><span>' + esc(it) + '</span></div>').join('')
      + '</div>'
    + '</div>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;flex:1;min-height:0;margin-top:6px">' + catH + '</div>'
    + (d.total ? '<div class="a-up d10" style="margin-top:12px;display:flex;align-items:center;justify-content:center;gap:14px;background:var(--tile-dark);color:#fff;padding:12px 24px;border-radius:12px">'
      + '<span style="font-size:11px;color:rgba(255,255,255,0.6);font-weight:700;letter-spacing:0.16em">' + esc(d.total.label) + '</span>'
      + '<span style="display:flex;align-items:baseline;gap:3px"><span style="font-size:32px;font-weight:900;color:var(--ieg-red);letter-spacing:-0.03em;font-variant-numeric:tabular-nums">' + esc(d.total.val) + '</span><span style="font-size:16px;font-weight:800;color:var(--ieg-red)">' + esc(d.total.unit) + '</span></span>'
    + '</div>' : '')
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-3 Semi-annual ──── */
function renderSemiAnnual(s, idx, total) {
  const d = s.d;
  const cid = 'sa' + idx;
  const n = (d.values || []).length;

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div class="card a-up d3" style="flex:1;padding:22px;display:flex;flex-direction:column;min-height:0;margin-top:6px">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'
        + '<div class="tag">반기 매출 추이</div>'
        + '<div style="display:flex;gap:14px">'
          + '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink-muted-80);font-weight:600"><span style="width:12px;height:12px;border-radius:3px;background:#cccccc"></span>실적</span>'
          + '<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink-muted-80);font-weight:600"><span style="width:12px;height:12px;border-radius:3px;background:var(--ieg-red)"></span>예측 (E)</span>'
        + '</div>'
      + '</div>'
      + '<div style="flex:1;min-height:0;position:relative"><canvas id="' + cid + '"></canvas></div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const pJ = JSON.stringify(d.periods), vJ = JSON.stringify(d.values);
  const chart = 'setTimeout(function(){var cv=document.getElementById("' + cid + '");if(!cv)return;var v=' + vJ + ';'
    + 'new Chart(cv.getContext("2d"),{type:"bar",data:{labels:' + pJ + ',datasets:[{data:v,backgroundColor:v.map(function(_,i){return i>=' + (n - 2) + '?"#ED1C24":"#cccccc";}),borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",padding:10,cornerRadius:8,callbacks:{label:function(c){return "₩"+c.raw.toLocaleString()+"M";}}}},scales:{x:{ticks:{font:{size:14,family:"Pretendard Variable",weight:700},color:"#1d1d1f"},grid:{display:false}},y:{beginAtZero:true,ticks:{font:{size:11,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return v.toLocaleString()+"M";}},grid:{color:"rgba(0,0,0,0.04)"}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 4-4 Backlog ──── */
function renderBacklog(s, idx, total) {
  const d = s.d;
  const rows = (d.items || []).map((it, i) =>
    '<tr class="a-up d' + Math.min(i + 3, 20) + '" style="border-bottom:1px solid var(--hairline)">'
    + '<td style="padding:7px 10px;color:var(--ink-muted-48);font-weight:700;font-variant-numeric:tabular-nums;font-size:11px">' + String(it.no).padStart(2, '0') + '</td>'
    + '<td style="padding:7px 10px;color:var(--ink);font-weight:700;font-size:11.5px;letter-spacing:-0.008em">' + esc(it.client) + '</td>'
    + '<td style="padding:7px 10px;color:var(--ieg-red);font-weight:800;font-variant-numeric:tabular-nums;font-size:11.5px;text-align:right;letter-spacing:-0.005em">' + esc(it.amount) + '</td>'
    + '<td style="padding:7px 10px;color:var(--ink-muted-48);font-size:10.5px">' + esc(it.date) + '</td>'
    + '<td style="padding:7px 10px;color:var(--ieg-lime-deep);font-size:10.5px;font-weight:700;letter-spacing:-0.005em">' + esc(it.target) + '</td>'
    + '<td style="padding:7px 10px;color:var(--ink-muted-80);font-size:10.5px;letter-spacing:-0.005em">' + esc(it.biz) + '</td>'
    + '<td style="padding:7px 10px;color:var(--ink-muted-48);font-size:9.5px;letter-spacing:-0.003em">' + esc(it.status || '') + '</td>'
    + '</tr>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0 10px" class="a-up d3">'
      + '<div class="tag">23년 수주 잔고 내역</div>'
      + '<div style="background:var(--ieg-red);color:#fff;padding:7px 18px;border-radius:99px;font-size:14px;font-weight:800;letter-spacing:-0.012em">총 ' + esc(d.totalAmt) + '</div>'
    + '</div>'
    + '<div class="card a-up d3 scroll-y" style="flex:1;padding:0;overflow:hidden;display:flex;flex-direction:column;min-height:0">'
      + '<div class="scroll-y" style="flex:1;min-height:0"><table style="width:100%;border-collapse:collapse">'
        + '<thead><tr style="background:var(--tile-dark);position:sticky;top:0;z-index:1;color:#fff">'
        + ['No', '거래처', '계약금액 (원)', '계약일', '납품예정', '사업내용', '진행사항'].map((h, i) =>
            '<th style="padding:9px 10px;text-align:' + (i === 2 ? 'right' : 'left') + ';font-size:10px;letter-spacing:0.08em;font-weight:700">' + h + '</th>'
          ).join('')
        + '</tr></thead><tbody>' + rows + '</tbody>'
      + '</table></div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-4 Sales projection (NEW) ──── */
function renderSalesProjection(s, idx, total) {
  const d = s.d;

  const mkSection = (sec, side) => {
    const rows = (sec.items || []).map((it, i) =>
      '<tr style="border-bottom:1px solid var(--hairline)">'
      + '<td style="padding:5px 8px;color:var(--ink-muted-48);font-weight:700;font-size:10px;font-variant-numeric:tabular-nums">' + String(it.no).padStart(2, '0') + '</td>'
      + '<td style="padding:5px 8px;color:var(--ink);font-weight:700;font-size:10.5px;letter-spacing:-0.008em">' + esc(it.client) + '</td>'
      + '<td style="padding:5px 8px;color:var(--ieg-red);font-weight:800;text-align:right;font-size:11px;letter-spacing:-0.005em;font-variant-numeric:tabular-nums">' + esc(it.amount) + '</td>'
      + '<td style="padding:5px 8px;color:var(--ink-muted-80);font-size:10px;letter-spacing:-0.003em">' + esc(it.biz) + '</td>'
      + '</tr>'
    ).join('');

    return '<div class="' + side + ' d3" style="display:flex;flex-direction:column;min-height:0">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
        + '<div><span style="background:' + (sec.year === '2024' ? 'var(--ieg-red)' : 'var(--ieg-lime-deep)') + ';color:#fff;font-size:14px;font-weight:900;padding:5px 12px;border-radius:8px;letter-spacing:-0.012em">' + esc(sec.year) + '</span><span style="font-size:12.5px;color:var(--ink);font-weight:700;margin-left:8px;letter-spacing:-0.012em">' + esc(sec.title) + '</span></div>'
        + '<div style="display:flex;align-items:baseline;gap:3px"><span style="font-size:24px;font-weight:900;color:' + (sec.year === '2024' ? 'var(--ieg-red)' : 'var(--ieg-lime-deep)') + ';letter-spacing:-0.03em;line-height:1;font-variant-numeric:tabular-nums">' + esc(sec.total) + '</span></div>'
      + '</div>'
      + '<div class="card scroll-y" style="flex:1;padding:0;min-height:0;overflow:hidden;display:flex;flex-direction:column">'
        + '<div class="scroll-y" style="flex:1;min-height:0"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:var(--canvas-parchment);position:sticky;top:0">'
        + ['No', '거래처', '금액', '사업내용'].map((h, i) =>
            '<th style="padding:7px 8px;text-align:' + (i === 2 ? 'right' : 'left') + ';font-size:9.5px;letter-spacing:0.06em;font-weight:700;color:var(--ink-muted-48)">' + h + '</th>'
          ).join('')
        + '</tr></thead><tbody>' + rows + '</tbody></table></div>'
      + '</div>'
    + '</div>';
  };

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + mkSection(d.sections[0], 'a-r')
      + mkSection(d.sections[1], 'a-l')
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-5 KPI 3-year (NEW) ──── */
function renderKpi3yr(s, idx, total) {
  const d = s.d;
  const yrs = d.years || [];

  const kpiHTML = (d.kpis || []).map((k, i) => {
    const cells = yrs.map((y, j) => {
      const isLast = j === yrs.length - 1;
      return '<td style="padding:8px 10px;text-align:right;font-size:14px;font-weight:' + (isLast ? 800 : 600) + ';color:' + (isLast ? 'var(--ieg-red)' : 'var(--ink)') + ';font-variant-numeric:tabular-nums;letter-spacing:-0.015em">' + k.vals[j].toLocaleString() + '<span style="font-size:10.5px;color:' + (isLast ? 'var(--ieg-red)' : 'var(--ink-muted-48)') + ';font-weight:700;margin-left:2px">' + esc(k.unit) + '</span></td>';
    }).join('');
    return '<tr class="a-up d' + (i + 3) + '" style="border-bottom:1px solid var(--hairline)">'
      + '<td style="padding:8px 10px;font-size:12px;font-weight:700;color:var(--ink);letter-spacing:-0.008em">' + esc(k.name) + '</td>'
      + cells
    + '</tr>';
  }).join('');

  const goalsHTML = (d.goals || []).map((g, i) =>
    '<div class="a-up d' + (i + 8) + ' card" style="padding:16px 18px;display:flex;flex-direction:column;gap:6px;border-top:4px solid ' + (i === 0 ? 'var(--ieg-grey)' : i === 1 ? 'var(--ieg-red)' : 'var(--ieg-lime-deep)') + '">'
    + '<div style="display:flex;align-items:center;gap:8px"><span style="background:' + (i === 0 ? 'var(--ieg-grey)' : i === 1 ? 'var(--ieg-red)' : 'var(--ieg-lime-deep)') + ';color:#fff;width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800">' + esc(g.tag) + '</span><div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.012em">' + esc(g.title) + '</div></div>'
    + '<div style="font-size:11px;color:var(--ink-muted-80);line-height:1.55;letter-spacing:-0.005em">' + esc(g.desc) + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div class="card a-up d3" style="padding:18px;display:flex;flex-direction:column">'
        + '<div class="tag" style="margin-bottom:10px">3개년 주요 지표 추정</div>'
        + '<div style="flex:1;min-height:0;overflow:hidden">'
          + '<table style="width:100%;border-collapse:collapse"><thead><tr style="background:var(--tile-dark);color:#fff">'
          + '<th style="padding:8px 10px;text-align:left;font-size:10.5px;letter-spacing:0.08em;font-weight:700;width:130px">지표</th>'
          + yrs.map((y, j) => '<th style="padding:8px 10px;text-align:right;font-size:10.5px;letter-spacing:0.08em;font-weight:700">' + esc(y) + '</th>').join('')
          + '</tr></thead><tbody>' + kpiHTML + '</tbody></table>'
        + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:10px">'
        + '<div class="tag a-up d2">3개년 사업 목표</div>'
        + goalsHTML
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-6 Financial snapshot ──── */
function renderFinancialSnapshot(s, idx, total) {
  const d = s.d;
  const cid = 'fs' + idx;
  const p = (d.years || []).findIndex(y => String(y).includes('E'));

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.note)
    + '<div class="card a-up d3" style="flex:1;padding:22px;display:flex;flex-direction:column;min-height:0;margin-top:6px">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'
        + '<div style="display:flex;gap:14px">'
          + '<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-muted-80);font-weight:600"><span style="width:12px;height:12px;border-radius:3px;background:#ED1C24"></span>매출액</span>'
          + '<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-muted-80);font-weight:600"><span style="width:12px;height:12px;border-radius:3px;background:#FFB400"></span>영업이익</span>'
          + '<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-muted-80);font-weight:600"><span style="width:12px;height:12px;border-radius:3px;background:#333333"></span>순이익</span>'
        + '</div>'
        + '<div style="font-size:10.5px;color:var(--ink-muted-48);font-weight:600">E = 예측치 [단위: 백만원]</div>'
      + '</div>'
      + '<div style="flex:1;min-height:0;position:relative"><canvas id="' + cid + '"></canvas></div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const yJ = JSON.stringify(d.years), rV = JSON.stringify(d.revenue), oV = JSON.stringify(d.opinc), nV = JSON.stringify(d.netinc);
  const chart = 'setTimeout(function(){var cv=document.getElementById("' + cid + '");if(!cv)return;var p=' + p + ',rv=' + rV + ',ov=' + oV + ',nv=' + nV + ';'
    + 'new Chart(cv.getContext("2d"),{type:"bar",data:{labels:' + yJ + ',datasets:['
      + '{label:"매출액",data:rv,backgroundColor:rv.map(function(_,i){return i>=p?"#ED1C24":"rgba(237,28,36,0.35)";}),borderRadius:5},'
      + '{label:"영업이익",data:ov,backgroundColor:ov.map(function(_,i){return i>=p?"#FFB400":"rgba(255,180,0,0.35)";}),borderRadius:5},'
      + '{label:"순이익",data:nv,backgroundColor:nv.map(function(_,i){return i>=p?"#333333":"rgba(102,102,102,0.35)";}),borderRadius:5}'
    + ']},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",padding:10,cornerRadius:8,callbacks:{label:function(c){return c.dataset.label+": "+c.raw.toLocaleString()+"M";}}}},scales:{x:{ticks:{font:{size:13,family:"Pretendard Variable",weight:700},color:"#1d1d1f"},grid:{display:false}},y:{beginAtZero:true,ticks:{font:{size:11,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return v.toLocaleString()+"M";}},grid:{color:"rgba(0,0,0,0.04)"}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 4-7 P&L table ──── */
function renderPL(s, idx, total) {
  const d = s.d;
  const rows = (d.rows || []).map((row, i) => {
    const hi = row.hi, sm = row.sm;
    return '<tr class="a-up d' + Math.min(i + 3, 14) + '" style="background:' + (hi ? 'rgba(237,28,36,0.04)' : 'transparent') + ';border-bottom:1px solid var(--hairline)">'
      + '<td style="padding:' + (sm ? '4px' : '9px') + ' 14px;color:' + (hi ? 'var(--ink)' : sm ? 'var(--ink-muted-48)' : 'var(--ink-muted-80)') + ';font-weight:' + (hi ? 800 : sm ? 500 : 600) + ';font-size:' + (sm ? '10.5px' : '13px') + ';letter-spacing:-0.008em">' + esc(row.label) + '</td>'
      + ['y23', 'y24', 'y25', 'y26'].map(k =>
        '<td style="padding:' + (sm ? '4px' : '9px') + ' 14px;text-align:right;color:' + (hi ? 'var(--ieg-red)' : sm ? 'var(--ink-muted-48)' : 'var(--ink-muted-80)') + ';font-weight:' + (hi ? 800 : sm ? 500 : 600) + ';font-size:' + (sm ? '10.5px' : '13px') + ';font-variant-numeric:tabular-nums;letter-spacing:-0.012em">' + esc(row[k] || '') + '</td>'
      ).join('')
    + '</tr>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div class="card a-up d3" style="flex:1;padding:18px;margin-top:6px;min-height:0;overflow:hidden;display:flex;flex-direction:column">'
      + '<div class="scroll-y" style="flex:1;min-height:0">'
        + '<table style="width:100%;border-collapse:collapse">'
          + '<thead><tr style="background:var(--tile-dark);color:#fff">'
            + '<th style="padding:9px 14px;text-align:left;font-size:11px;letter-spacing:0.08em;font-weight:700">' + esc(d.unit || '단위: 백만원') + '</th>'
            + ['2023E', '2024E', '2025E', '2026E'].map(y => '<th style="padding:9px 14px;text-align:right;font-size:11px;letter-spacing:0.08em;font-weight:700">' + y + '</th>').join('')
          + '</tr></thead>'
          + '<tbody>' + rows + '</tbody>'
        + '</table>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 4-8 Investment ──── */
function renderInvestment(s, idx, total) {
  const d = s.d;
  const tHTML = (d.terms || []).map((t, i) => {
    const hi = i === 1 || i === 5 || i === 2;
    const colorL = hi ? 'var(--ieg-red)' : 'var(--ink-muted-48)';
    const colorR = i === 1 ? 'var(--ieg-red)' : i === 2 ? 'var(--ieg-lime-deep)' : i === 5 ? 'var(--ieg-red)' : 'var(--ink)';
    return '<div class="a-up d' + (i + 4) + '" style="display:flex;gap:18px;align-items:flex-start;padding:13px 18px;background:' + (hi ? 'rgba(237,28,36,0.05)' : 'var(--canvas-parchment)') + ';border:1px solid ' + (hi ? 'var(--ieg-red-line)' : 'var(--hairline)') + ';border-radius:10px;border-left:4px solid ' + (hi ? 'var(--ieg-red)' : 'var(--hairline-strong)') + '">'
      + '<div style="font-size:11.5px;color:' + colorL + ';white-space:normal;overflow-wrap:break-word;word-break:keep-all;width:120px;flex-shrink:0;padding-top:2px;font-weight:800;letter-spacing:0.04em">' + esc(t.label) + '</div>'
      + '<div style="font-size:14px;color:' + colorR + ';font-weight:' + (hi ? 800 : 600) + ';white-space:pre-line;line-height:1.65;letter-spacing:-0.012em">' + esc(t.value) + '</div>'
    + '</div>';
  }).join('');

  const hl = d.hl || {};
  return mkS(
    '<div class="slide">'
    + '<div style="display:flex;height:100%">'
      + '<div style="flex:1;padding:50px 36px 40px 64px;display:flex;flex-direction:column;min-width:0">'
        + HEAD(d.badge, d.headline)
        + '<div style="display:flex;flex-direction:column;gap:8px;flex:1;min-height:0;margin-top:6px">' + tHTML + '</div>'
      + '</div>'
      + '<div style="width:380px;background:var(--tile-dark);position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:50px 30px;color:#fff">'
        // bg
        + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent,transparent 32px,rgba(237,28,36,0.04) 32px,rgba(237,28,36,0.04) 33px)"></div>'
        + '<div style="position:absolute;top:60%;left:50%;transform:translate(-50%,-50%);width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.18),transparent 60%);animation:pulse 4s ease-in-out infinite"></div>'
        + '<div style="position:relative;text-align:center;width:100%">'
          + '<div class="a-up d3" style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.32em;font-weight:700;margin-bottom:10px">투자 금액</div>'
          + '<div class="a-up d4" style="font-size:88px;font-weight:900;color:var(--ieg-red);letter-spacing:-0.04em;line-height:1;font-variant-numeric:tabular-nums">' + esc(hl.invest || '60억') + '</div>'
          + '<div class="a-up d4" style="font-size:13px;color:rgba(255,255,255,0.45);margin-top:6px">원</div>'
          + '<div class="a-up d5" style="height:1px;background:rgba(255,255,255,0.15);margin:28px 0"></div>'
          + '<div class="a-up d5" style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.32em;font-weight:700;margin-bottom:6px">Pre-money 밸류</div>'
          + '<div class="a-up d6" style="font-size:52px;font-weight:900;color:var(--ieg-lime);letter-spacing:-0.04em;line-height:1;font-variant-numeric:tabular-nums">' + esc(hl.value || '300억') + '</div>'
          + '<div class="a-up d6" style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:6px">원 (협의중)</div>'
          + '<div class="a-up d7" style="background:linear-gradient(135deg,var(--ieg-red),#ff5050);color:#fff;padding:14px 18px;border-radius:10px;font-size:14px;font-weight:800;letter-spacing:-0.012em;line-height:1.45;margin-top:28px;box-shadow:0 10px 30px -8px rgba(237,28,36,0.55)">'
            + esc(hl.year || '2026') + '년 ' + esc(hl.goal || 'IPO 상장 목표')
          + '</div>'
        + '</div>'
        + '<div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:var(--ieg-red);transform-origin:left;animation:lineGrow 0.9s 0.7s cubic-bezier(.22,.61,.36,1) both"></div>'
      + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

window.RENDERERS_3 = {
  strategy_overview: renderStrategyOverview,
  competency: renderCompetency,
  experts: renderExperts,
  growth_domestic: renderGrowthDomestic,
  growth_overseas_agents: renderOverseasAgents,
  growth_overseas_oda: renderOverseasOda,
  growth_overseas_corp: renderOverseasCorp,
  success_strategy: renderSuccessStrategy,
  financial_results: renderFinancialResults,
  sales_breakdown: renderSalesBreakdown,
  semi_annual: renderSemiAnnual,
  backlog: renderBacklog,
  sales_projection: renderSalesProjection,
  kpi_3yr: renderKpi3yr,
  financial_snapshot: renderFinancialSnapshot,
  pl: renderPL,
  investment: renderInvestment
};

/* ── Master dispatcher ── */
function renderSlide(idx) {
  const s = (window.slideView ? window.slideView(idx) : slides[idx]);
  if (!s) return '<!DOCTYPE html><html><body></body></html>';
  const total = slides.length;
  const r =
    (window.RENDERERS_1 && window.RENDERERS_1[s.type]) ||
    (window.RENDERERS_2 && window.RENDERERS_2[s.type]) ||
    (window.RENDERERS_3 && window.RENDERERS_3[s.type]) ||
    (window.RENDERERS_COMPANY && window.RENDERERS_COMPANY[s.type]);
  if (!r) {
    return mkS('<div class="slide" style="display:flex;align-items:center;justify-content:center;height:720px;color:#aaa;font-size:24px">' + esc(s.title) + '<br>(' + esc(s.type) + ')</div>');
  }
  try {
    return r(s, idx + 1, total);
  } catch (e) {
    console.error('Render error', s.type, e);
    return mkS('<div class="slide" style="display:flex;align-items:center;justify-content:center;height:720px;color:#c00;font-size:18px;padding:60px;text-align:center">렌더 오류: ' + esc(s.title) + '<br><small style="font-size:12px;color:#888;margin-top:10px;display:block">' + esc(e.message) + '</small></div>');
  }
}
