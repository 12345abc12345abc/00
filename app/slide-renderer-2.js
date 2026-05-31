/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — renderer part 2
   Slides 10-18: trend, charts, market, competition
   ───────────────────────────────────────────── */

/* ──────────────────────────────── 2-1 Trend ──── */
function renderTrend(s, idx, total) {
  const d = s.d;

  const mkPeriod = (t, side) => {
    const isBefore = side === 'before';
    const accent = isBefore ? 'var(--ieg-grey)' : 'var(--ieg-red)';
    const items = (t.items || []).map((it, i) =>
      '<div class="a-up d' + (i + 4) + '" style="background:' + (isBefore ? 'var(--canvas-parchment)' : 'rgba(237,28,36,0.07)') + ';border:1px solid ' + (isBefore ? 'var(--hairline)' : 'var(--ieg-red-line)') + ';border-radius:12px;padding:14px 16px;text-align:center;font-size:14px;color:' + (isBefore ? 'var(--ink-muted-80)' : 'var(--ink)') + ';font-weight:' + (isBefore ? 600 : 700) + ';line-height:1.4;letter-spacing:-0.01em">'
      + esc(it)
      + '</div>'
    ).join('');

    return '<div class="' + (isBefore ? 'a-r' : 'a-l') + ' d3" style="display:flex;flex-direction:column;justify-content:center;gap:14px;min-height:0">'
      + '<div style="text-align:' + (isBefore ? 'right' : 'left') + '">'
        + '<div style="font-size:36px;font-weight:900;letter-spacing:-0.03em;color:' + accent + ';line-height:1">' + esc(t.period) + '</div>'
        + '<div style="display:inline-block;font-size:14px;font-weight:800;color:#fff;background:' + accent + ';padding:9px 20px;border-radius:99px;margin-top:12px;letter-spacing:-0.01em">' + esc(t.label) + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:10px">' + items + '</div>'
    + '</div>';
  };

  // center pivot — arrow circle locked to the exact vertical middle,
  // with the year label balanced above and the theme/momentum below.
  const pivot = '<div class="a-si d5" style="position:relative;display:flex;flex-direction:column;align-items:center;align-self:stretch;padding:0 4px">'
      + '<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding-bottom:14px">'
        + '<div style="font-size:11px;letter-spacing:0.18em;color:var(--ink-muted-48);font-weight:700;white-space:nowrap">2015 &nbsp;→&nbsp; 2016</div>'
      + '</div>'
      + '<div style="width:66px;height:66px;border-radius:50%;background:var(--ieg-red);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 28px -8px rgba(237,28,36,0.5);flex-shrink:0"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" style="display:block"><line x1="4" y1="12" x2="19.5" y2="12"></line><polyline points="13 5.5 20 12 13 18.5"></polyline></svg></div>'
      + '<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:10px;padding-top:14px">'
        + '<div style="background:var(--tile-dark);color:#fff;padding:11px 16px;border-radius:12px;font-size:13.5px;font-weight:800;letter-spacing:-0.014em;line-height:1.2;white-space:nowrap">' + esc(d.anchor) + '</div>'
        + '<div style="display:inline-flex;align-items:center;gap:7px;background:var(--ieg-lime-soft);border:1px solid var(--ieg-lime-line);color:var(--ieg-lime-deep);padding:7px 14px;border-radius:99px;font-size:12.5px;font-weight:800;letter-spacing:-0.01em"><span style="color:var(--ieg-red)">▲</span>' + esc(d.footer) + '</div>'
      + '</div>'
  + '</div>';

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="flex:1;min-height:0;display:grid;grid-template-columns:1fr auto 1fr;gap:32px;align-items:stretch;margin-top:6px">'
      + mkPeriod(d.before, 'before') + pivot + mkPeriod(d.after, 'after')
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 2-2 Chart helpers ──── */
function renderChartSlide(s, idx, total, mode) {
  const d = s.d;
  const yrs = d.years, tot = d.total;
  let ds, lgnd, hlVal, hlLbl, hlSub, hl2Val, hl2Lbl;

  if (mode === 'customer') {
    const eA = tot.map((t, i) => Math.round(t * (d.edu[i] || 0) / 100));
    const cA = tot.map((t, i) => Math.round(t * (d.corp[i] || 0) / 100));
    const gA = tot.map((t, i) => Math.round(t * (d.gov[i] || 0) / 100));
    ds = [
      { label: '교육기관', data: eA, backgroundColor: '#ED1C24', stack: 's', borderRadius: 2, barPercentage: 0.9 },
      { label: '기업', data: cA, backgroundColor: '#333333', stack: 's', borderRadius: 2 },
      { label: '정부기관', data: gA, backgroundColor: '#FFB400', stack: 's', borderRadius: 2 },
      { label: '합계', data: tot, type: 'line', borderColor: '#1d1d1f', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: '#1d1d1f', pointBorderWidth: 2, tension: 0.35, fill: false, yAxisID: 'y2' }
    ];
    lgnd = [['교육기관', '#ED1C24'], ['기업', '#333333'], ['정부기관', '#FFB400']];
    hlVal = (tot[tot.length - 1] || 0).toLocaleString();
    hlLbl = '2026E 매출 (백만)';
    hl2Val = '63%'; hl2Lbl = '2023 교육기관 비중';
  } else if (mode === 'product') {
    const pA = tot.map((t, i) => Math.round(t * (d.product[i] || 0) / 100));
    const goA = tot.map((t, i) => Math.round(t * (d.goods[i] || 0) / 100));
    const oA = tot.map((t, i) => Math.round(t * (d.other[i] || 0) / 100));
    ds = [
      { label: '제품(IEG)', data: pA, backgroundColor: '#ED1C24', stack: 's', borderRadius: 2 },
      { label: '상품(타사)', data: goA, backgroundColor: '#333333', stack: 's', borderRadius: 2 },
      { label: '기타', data: oA, backgroundColor: '#FFB400', stack: 's', borderRadius: 2 },
      { label: '합계', data: tot, type: 'line', borderColor: '#1d1d1f', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: '#1d1d1f', pointBorderWidth: 2, tension: 0.35, fill: false, yAxisID: 'y2' }
    ];
    lgnd = [['제품(IEG)', '#ED1C24'], ['상품(타사)', '#333333'], ['기타', '#FFB400']];
    hlVal = '76.4%'; hlLbl = '2023 IEG 제품 비중';
    hl2Val = '80%+'; hl2Lbl = '24~26E 평균 비중';
  } else {
    const smA = tot.map((t, i) => Math.round(t * (d.smart[i] || 0) / 100));
    const swA = tot.map((t, i) => Math.round(t * (d.sw[i] || 0) / 100));
    const auA = tot.map((t, i) => Math.round(t * (d.auto[i] || 0) / 100));
    const elA = tot.map((t, i) => Math.round(t * (d.elec[i] || 0) / 100));
    const seA = tot.map((t, i) => Math.round(t * (d.semi[i] || 0) / 100));
    ds = [
      { label: '스마트팩토리', data: smA, backgroundColor: '#ED1C24', stack: 's', borderRadius: 2 },
      { label: '소프트웨어', data: swA, backgroundColor: '#FFB200', stack: 's', borderRadius: 2 },
      { label: '자동화', data: auA, backgroundColor: '#5cb85c', stack: 's', borderRadius: 2 },
      { label: '전기전자', data: elA, backgroundColor: '#4a8fd6', stack: 's', borderRadius: 2 },
      { label: '반도체', data: seA, backgroundColor: '#9b59b6', stack: 's', borderRadius: 2 },
      { label: '합계', data: tot, type: 'line', borderColor: '#ED1C24', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: '#ED1C24', pointBorderWidth: 2, tension: 0.35, fill: false, yAxisID: 'y2' }
    ];
    lgnd = [['스마트팩토리', '#ED1C24'], ['소프트웨어', '#FFB200'], ['자동화', '#5cb85c'], ['전기전자', '#4a8fd6'], ['반도체', '#9b59b6']];
    const lastYr = yrs[yrs.length - 1];
    const lastSmart = (d.smart[d.smart.length - 1] || 0);
    hlVal = (tot[tot.length - 1] || 0).toLocaleString();
    hlLbl = lastYr + ' 매출 (백만)';
    hl2Val = lastSmart + '%'; hl2Lbl = lastYr + ' 스마트팩토리 비중';
  }

  const cid = 'ch' + idx;
  const lgndHTML = lgnd.map(([l, c]) =>
    '<div style="display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--ink-muted-80);font-weight:600">'
    + '<span style="width:12px;height:12px;border-radius:3px;background:' + c + ';flex-shrink:0;border:1px solid rgba(0,0,0,0.08)"></span>'
    + esc(l)
    + '</div>'
  ).join('');

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.note)
    + '<div style="display:flex;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div class="card a-up d3" style="flex:1;padding:18px;display:flex;flex-direction:column;min-width:0">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'
          + '<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center">' + lgndHTML + '</div>'
          + '<div style="font-size:10px;color:var(--ink-muted-48);font-weight:600;letter-spacing:0.06em">' + esc(d.unit || '') + '</div>'
        + '</div>'
        + '<div style="flex:1;position:relative;min-height:0"><canvas id="' + cid + '"></canvas></div>'
      + '</div>'
      + '<div style="width:200px;flex-shrink:0;display:flex;flex-direction:column;gap:14px" class="a-l d3">'
        + '<div class="card" style="padding:18px;background:var(--ieg-red);color:#fff;border:none">'
          + '<div style="font-size:10.5px;letter-spacing:0.16em;font-weight:700;opacity:0.85">' + esc(hlLbl) + '</div>'
          + '<div style="font-size:38px;font-weight:900;letter-spacing:-0.035em;line-height:1;margin-top:8px" class="num-display">' + esc(hlVal) + '</div>'
        + '</div>'
        + '<div class="card" style="padding:18px">'
          + '<div class="tag" style="margin-bottom:6px">' + esc(hl2Lbl) + '</div>'
          + '<div style="font-size:32px;font-weight:900;letter-spacing:-0.03em;color:var(--ink);line-height:1" class="num-display">' + esc(hl2Val) + '</div>'
        + '</div>'
        + '<div class="card" style="padding:14px 16px;border-color:var(--ieg-lime-line);background:var(--ieg-lime-soft);flex:1;display:flex;flex-direction:column;justify-content:center">'
          + '<div class="tag" style="color:var(--ieg-lime-deep);margin-bottom:4px">PERIOD</div>'
          + '<div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.012em">' + (yrs[0]) + ' – ' + (yrs[yrs.length - 1]) + '</div>'
          + '<div style="font-size:11px;color:var(--ink-muted-48);margin-top:4px">' + yrs.length + '개 연도</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const dsJ = JSON.stringify(ds), yrJ = JSON.stringify(yrs);
  const chart = 'setTimeout(function(){var cv=document.getElementById("' + cid + '");if(!cv)return;'
    + 'new Chart(cv.getContext("2d"),{type:"bar",data:{labels:' + yrJ + ',datasets:' + dsJ + '},'
    + 'options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},'
    + 'plugins:{legend:{display:false},'
    + 'tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",titleFont:{family:"Pretendard Variable",weight:700},bodyFont:{family:"Pretendard Variable"},padding:10,cornerRadius:8}},'
    + 'scales:{x:{ticks:{font:{size:10,family:"Pretendard Variable",weight:600},color:"#6e6e73",maxRotation:45,autoSkip:false},grid:{display:false}},'
    + 'y:{stacked:true,beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return (v/1000).toFixed(0)+"K";}},grid:{color:"rgba(0,0,0,0.04)",drawBorder:false}},'
    + 'y2:{position:"right",beginAtZero:true,grid:{display:false},ticks:{display:false}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 2-3 Domestic market ──── */
function renderMarketDomestic(s, idx, total) {
  const d = s.d;

  const detailA = '<div class="a-up d4" style="margin-top:14px">'
    + '<div style="font-size:13px;font-weight:800;color:var(--ink);letter-spacing:-0.015em;margin-bottom:4px">' + esc(d.detailA.title) + '</div>'
    + '<div style="font-size:11.5px;color:var(--ink-muted-48);margin-bottom:8px;letter-spacing:-0.005em">' + esc(d.detailA.sub) + '</div>'
    + d.detailA.items.map(it =>
        '<div style="font-size:10.5px;color:var(--ink-muted-80);padding:3px 0;line-height:1.5;letter-spacing:-0.005em;display:flex;gap:6px"><span style="color:var(--ieg-red);font-weight:700;flex-shrink:0">·</span><span>' + esc(it) + '</span></div>'
      ).join('')
    + '</div>';

  const detailB = '<div class="a-up d5" style="margin-top:14px;border-top:1px dashed var(--hairline);padding-top:12px">'
    + '<div style="font-size:13px;font-weight:800;color:var(--ink);letter-spacing:-0.015em;margin-bottom:4px">' + esc(d.detailB.title) + '</div>'
    + '<div style="font-size:11.5px;color:var(--ink-muted-48);margin-bottom:8px;letter-spacing:-0.005em">' + esc(d.detailB.sub) + '</div>'
    + d.detailB.items.map(it =>
        '<div style="font-size:10.5px;color:var(--ink-muted-80);padding:3px 0;line-height:1.5;letter-spacing:-0.005em;display:flex;gap:6px"><span style="color:var(--ieg-red);font-weight:700;flex-shrink:0">·</span><span>' + esc(it) + '</span></div>'
      ).join('')
    + '</div>';

  const bkHTML = (d.breakdown || []).map((b, i) =>
    '<div class="a-up d' + (i + 5) + '" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 12px;background:' + (i % 2 ? 'var(--canvas)' : 'var(--canvas-pearl)') + ';border-radius:8px;margin-bottom:3px;border:1px solid var(--hairline)">'
    + '<span style="font-size:11.5px;color:var(--ink-muted-80);font-weight:500;letter-spacing:-0.005em">' + esc(b.label) + '</span>'
    + '<span style="font-size:13px;color:var(--ieg-red);font-weight:800;letter-spacing:-0.012em;font-variant-numeric:tabular-nums">' + esc(b.val) + '</span>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;flex:1;min-height:0;margin-top:6px">'
      // left
      + '<div class="card a-up d3" style="padding:24px 24px;background:linear-gradient(135deg,rgba(237,28,36,0.04),rgba(237,28,36,0.0));border-color:var(--ieg-red-line);display:flex;flex-direction:column;overflow:hidden;position:relative">'
        + '<div style="position:absolute;top:-30px;right:-20px;font-size:160px;font-weight:900;color:rgba(237,28,36,0.04);line-height:1">시장</div>'
        + '<div class="tag" style="color:var(--ieg-red);position:relative">' + esc(d.headlineHi) + '</div>'
        + '<div style="display:flex;align-items:baseline;gap:10px;position:relative;margin-top:8px">'
          + '<span style="font-size:50px;font-weight:900;letter-spacing:-0.035em;line-height:1;color:var(--ieg-red);font-variant-numeric:tabular-nums" class="a-up d4">' + esc(d.mainValue) + '</span>'
          + '<span style="font-size:24px;font-weight:800;color:var(--ieg-red);letter-spacing:-0.02em" class="a-up d4">' + esc(d.mainUnit) + '</span>'
        + '</div>'
        + '<div style="flex:1;min-height:0;overflow:hidden" data-fit data-fit-min="0.7">' + detailA + detailB + '</div>'
      + '</div>'
      // right
      + '<div class="card a-up d4" style="padding:24px 24px;background:var(--tile-dark);color:#fff;border:none;display:flex;flex-direction:column;overflow:hidden;position:relative">'
        + '<div style="position:absolute;top:-30px;right:-20px;font-size:160px;font-weight:900;color:rgba(255,255,255,0.04);line-height:1">IEG</div>'
        + '<div class="tag" style="color:var(--ieg-lime);position:relative">' + esc(d.targetTitle) + '</div>'
        + '<div style="display:flex;align-items:baseline;gap:10px;position:relative;margin-top:8px">'
          + '<span style="font-size:50px;font-weight:900;letter-spacing:-0.035em;line-height:1;color:var(--ieg-lime);font-variant-numeric:tabular-nums">' + esc(d.targetValue) + '</span>'
          + '<span style="font-size:24px;font-weight:800;color:var(--ieg-lime);letter-spacing:-0.02em">' + esc(d.targetUnit) + '</span>'
        + '</div>'
        + '<div style="flex:1;min-height:0;margin-top:14px;display:flex;flex-direction:column;gap:0" class="scroll-y">'
          + '<div class="tag" style="color:rgba(255,255,255,0.5);margin-bottom:8px">세부 시장</div>'
          + '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:0">'
          + (d.breakdown || []).map((b, i) =>
              '<div class="a-up d' + Math.min(i + 5, 12) + '" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.06)">'
              + '<span style="font-size:11px;color:rgba(255,255,255,0.85);font-weight:500;letter-spacing:-0.005em">' + esc(b.label) + '</span>'
              + '<span style="font-size:13px;color:var(--ieg-lime);font-weight:800;letter-spacing:-0.012em;font-variant-numeric:tabular-nums;flex-shrink:0">' + esc(b.val) + '</span>'
              + '</div>'
            ).join('')
          + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 2-4 Global market ──── */
function renderMarketGlobal(s, idx, total) {
  const d = s.d;
  const cid = 'gl' + idx;
  const legend = [
    ['North America', '#ED1C24'],
    ['Europe', '#333333'],
    ['Asia Pacific', '#FFB400'],
    ['Latin America', '#9b59b6'],
    ['MEA', '#4a8fd6']
  ];
  const lgndHTML = legend.map(([l, c]) =>
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:11.5px;color:var(--ink-muted-80);font-weight:600">'
    + '<span style="width:12px;height:12px;border-radius:3px;background:' + c + ';flex-shrink:0;border:1px solid rgba(0,0,0,0.08)"></span>'
    + esc(l)
    + '</div>'
  ).join('');

  const body = '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.sub)
    + '<div style="display:flex;gap:18px;flex:1;min-height:0;margin-top:6px">'
      + '<div class="card a-up d3" style="flex:1;padding:18px;display:flex;flex-direction:column;min-width:0">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'
          + '<div class="tag">글로벌 기술 / 직업교육 시장 [10억 달러 (B$)]</div>'
          + '<div style="font-size:10px;color:var(--ink-muted-48);font-weight:600">출처: SkyQuest Tech Consulting</div>'
        + '</div>'
        + '<div style="flex:1;position:relative;min-height:0"><canvas id="' + cid + '"></canvas></div>'
      + '</div>'
      + '<div style="width:230px;flex-shrink:0;display:flex;flex-direction:column;gap:14px" class="a-l d3">'
        + '<div class="card" style="padding:18px;background:var(--tile-dark);border:none">'
          + '<div style="font-size:10.5px;letter-spacing:0.16em;font-weight:700;color:var(--ieg-red)">CAGR 2023–2030</div>'
          + '<div style="font-size:54px;font-weight:900;letter-spacing:-0.04em;line-height:1;margin-top:6px;color:#fff">' + esc(d.cagr) + '</div>'
          + '<div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:8px;font-weight:600">연평균 성장률</div>'
        + '</div>'
        + '<div class="card" style="padding:14px 18px">'
          + '<div class="tag" style="margin-bottom:8px">시장 규모</div>'
          + '<div style="display:flex;flex-direction:column;gap:10px">'
            + '<div><div style="font-size:10.5px;color:var(--ink-muted-48)">2021</div><div style="font-size:18px;font-weight:800;color:var(--ink);letter-spacing:-0.018em">6,224억$</div></div>'
            + '<div><div style="font-size:10.5px;color:var(--ink-muted-48)">2022</div><div style="font-size:18px;font-weight:800;color:var(--ink);letter-spacing:-0.018em">6,834억$</div></div>'
            + '<div><div style="font-size:10.5px;color:var(--ieg-red);font-weight:700">2030E</div><div style="font-size:22px;font-weight:900;color:var(--ieg-red);letter-spacing:-0.022em">15,852억$</div></div>'
          + '</div>'
        + '</div>'
        + '<div class="card" style="padding:12px 16px">' + lgndHTML + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>';

  const datasets = [
    { label: 'NA', data: d.na, backgroundColor: '#ED1C24', stack: 's', borderRadius: 3 },
    { label: 'EU', data: d.europe, backgroundColor: '#333333', stack: 's', borderRadius: 3 },
    { label: 'APAC', data: d.asia, backgroundColor: '#FFB400', stack: 's', borderRadius: 3 },
    { label: 'LATAM', data: d.latam, backgroundColor: '#9b59b6', stack: 's', borderRadius: 3 },
    { label: 'MEA', data: d.mea, backgroundColor: '#4a8fd6', stack: 's', borderRadius: 3 }
  ];
  const chart = 'setTimeout(function(){var cv=document.getElementById("' + cid + '");if(!cv)return;'
    + 'new Chart(cv.getContext("2d"),{type:"bar",data:{labels:' + JSON.stringify(d.years) + ',datasets:' + JSON.stringify(datasets) + '},'
    + 'options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000,easing:"easeOutCubic"},'
    + 'plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",titleFont:{family:"Pretendard Variable",weight:700},bodyFont:{family:"Pretendard Variable"},padding:10,cornerRadius:8}},'
    + 'scales:{x:{ticks:{font:{size:11,family:"Pretendard Variable",weight:600},color:"#6e6e73"},grid:{display:false}},'
    + 'y:{stacked:true,beginAtZero:true,ticks:{font:{size:10,family:"Pretendard Variable"},color:"#6e6e73",callback:function(v){return v+"B";}},grid:{color:"rgba(0,0,0,0.04)",drawBorder:false}}}}});'
    + '},250);';

  return mkS(body, chart);
}

/* ──────────────────────────────── 2-5 Competition (5-force) ──── */
function renderCompetition(s, idx, total) {
  const d = s.d;

  const threatColor = m => m === '▲' ? 'var(--ieg-red)' : m === '▼' ? 'var(--ieg-lime-deep)' : 'var(--ink-muted-48)';
  const corner = d.factors;

  const mkItem = (it) =>
    '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;padding:3px 0;font-size:11px;color:var(--ink-muted-80);line-height:1.4;letter-spacing:-0.005em">'
    + '<span>' + esc(it.txt) + '</span>'
    + '<span style="font-weight:800;color:' + threatColor(it.mark) + ';font-size:13px">' + esc(it.mark) + '</span>'
    + '</div>';

  const mkFactor = (f, i, side) => {
    const isRed = f.color === 'red';
    const bg = isRed ? 'rgba(237,28,36,0.06)' : 'var(--canvas-parchment)';
    const border = isRed ? 'var(--ieg-red-line)' : 'var(--hairline)';
    const accent = isRed ? 'var(--ieg-red)' : 'var(--ieg-grey)';

    return '<div class="a-up d' + (i + 3) + '" style="background:' + bg + ';border:1px solid ' + border + ';border-radius:14px;padding:14px 16px;position:relative">'
      + '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">'
        + '<div style="font-size:24px;font-weight:900;color:' + accent + ';letter-spacing:-0.025em;line-height:1">' + esc(f.num) + '</div>'
        + '<div style="font-size:10px;color:var(--ink-muted-48);font-weight:600;letter-spacing:0.12em">' + esc(f.labelEn || '') + '</div>'
      + '</div>'
      + '<div style="font-size:14px;font-weight:800;color:' + accent + ';margin-bottom:8px;letter-spacing:-0.015em">' + esc(f.label) + '</div>'
      + '<div style="border-top:1px dashed ' + border + ';padding-top:8px">' + f.items.map(mkItem).join('') + '</div>'
    + '</div>';
  };

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div class="a-up d3" style="display:flex;align-items:center;gap:14px;margin:6px 0 14px">'
      + '<div class="tag">위협도</div>'
      + '<span style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink-muted-80);font-weight:600">높음 <span style="color:var(--ieg-red);font-weight:800">▲</span></span>'
      + '<span style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink-muted-80);font-weight:600">보통 <span style="color:var(--ink-muted-48);font-weight:800">—</span></span>'
      + '<span style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink-muted-80);font-weight:600">낮음 <span style="color:var(--ieg-lime-deep);font-weight:800">▼</span></span>'
    + '</div>'
    + '<div style="flex:1;display:grid;grid-template-columns:1fr 1.1fr 1fr;gap:18px;min-height:0">'
      // left two
      + '<div style="display:flex;flex-direction:column;gap:14px">'
        + mkFactor(corner[0], 0, 'left')
        + mkFactor(corner[1], 1, 'left')
      + '</div>'
      // center: Competitor
      + '<div class="a-si d4" style="background:var(--tile-dark);border-radius:14px;padding:24px;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;border:3px solid var(--ieg-lime)">'
        + '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.16),transparent 60%);animation:pulse 4s ease-in-out infinite"></div>'
        + '<div style="position:relative">'
          + '<div class="tag" style="color:var(--ieg-lime)">' + esc(d.core.labelEn) + '</div>'
          + '<div style="font-size:36px;font-weight:900;color:#fff;letter-spacing:-0.03em;margin-top:6px">' + esc(d.core.label) + '</div>'
          + '<div style="height:2px;width:48px;background:var(--ieg-lime);margin:14px auto 0;border-radius:1px"></div>'
          + '<div style="margin-top:14px;text-align:left">'
            + d.core.items.map(it =>
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:14px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:rgba(255,255,255,0.85);letter-spacing:-0.005em">'
                + '<span>' + esc(it.txt) + '</span>'
                + '<span style="font-weight:800;color:' + (it.mark === '▲' ? 'var(--ieg-red)' : it.mark === '▼' ? 'var(--ieg-lime)' : 'rgba(255,255,255,0.6)') + ';font-size:14px">' + esc(it.mark) + '</span>'
                + '</div>'
              ).join('')
          + '</div>'
        + '</div>'
      + '</div>'
      // right two
      + '<div style="display:flex;flex-direction:column;gap:14px">'
        + mkFactor(corner[2], 2, 'right')
        + mkFactor(corner[3], 3, 'right')
      + '</div>'
    + '</div>'
    // bottom insights
    + '<div class="a-up d7" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px">'
      + d.insights.map((ins, i) =>
        '<div style="display:flex;gap:10px;align-items:flex-start">'
          + '<div style="background:' + (i === 2 ? 'var(--ieg-red)' : 'var(--canvas-parchment)') + ';color:' + (i === 2 ? '#fff' : 'var(--ink-muted-48)') + ';font-size:9.5px;font-weight:700;padding:3px 9px;border-radius:99px;letter-spacing:0.06em;flex-shrink:0;margin-top:2px">' + esc(ins.title) + '</div>'
          + '<div style="font-size:11px;color:var(--ink-muted-80);line-height:1.55;white-space:pre-line;letter-spacing:-0.005em">' + esc(ins.desc) + '</div>'
        + '</div>'
      ).join('')
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 2-6 Competition DYNAMICS ──── */
function renderCompetitionDynamics(s, idx, total) {
  const d = s.d;
  const cid = 'cd' + idx;
  const maxRev = Math.max(...d.competitors.map(c => c.revenue));
  const maxEmp = Math.max(...d.competitors.map(c => c.employees));

  const compHTML = d.competitors.map((c, i) => {
    const w1 = (c.revenue / maxRev * 100).toFixed(1);
    const w2 = (c.employees / maxEmp * 100).toFixed(1);
    return '<tr class="a-up d' + (i + 3) + '" style="border-bottom:1px solid var(--hairline)' + (c.hi ? ';background:rgba(237,28,36,0.04)' : '') + '">'
      + '<td style="padding:11px 14px;font-size:13px;font-weight:' + (c.hi ? 800 : 600) + ';color:' + (c.hi ? 'var(--ieg-red)' : 'var(--ink)') + ';letter-spacing:-0.012em">' + esc(c.name) + (c.hi ? ' <span style="background:var(--ieg-red);color:#fff;font-size:9px;padding:2px 6px;border-radius:99px;margin-left:6px;font-weight:800;letter-spacing:0.04em">우리</span>' : '') + '</td>'
      + '<td style="padding:11px 14px"><div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:10px;background:var(--canvas-parchment);border-radius:5px;overflow:hidden;max-width:160px"><div style="height:100%;width:' + w1 + '%;background:' + (c.hi ? 'var(--ieg-red)' : 'var(--ieg-grey)') + ';border-radius:5px;transform-origin:left;animation:lineGrow 0.9s ' + (0.4 + i * 0.1) + 's cubic-bezier(.22,.61,.36,1) both"></div></div><span style="font-size:12.5px;font-weight:700;color:' + (c.hi ? 'var(--ieg-red)' : 'var(--ink-muted-80)') + ';letter-spacing:-0.012em;font-variant-numeric:tabular-nums">' + c.revenue.toLocaleString() + '</span></div></td>'
      + '<td style="padding:11px 14px"><div style="display:flex;align-items:center;gap:8px"><div style="flex:1;height:10px;background:var(--canvas-parchment);border-radius:5px;overflow:hidden;max-width:120px"><div style="height:100%;width:' + w2 + '%;background:' + (c.hi ? 'var(--ieg-red)' : 'var(--ieg-grey)') + ';opacity:0.5;border-radius:5px;transform-origin:left;animation:lineGrow 0.9s ' + (0.5 + i * 0.1) + 's cubic-bezier(.22,.61,.36,1) both"></div></div><span style="font-size:12.5px;font-weight:700;color:' + (c.hi ? 'var(--ieg-red)' : 'var(--ink-muted-80)') + ';font-variant-numeric:tabular-nums">' + c.employees + '</span></div></td>'
      + '<td style="padding:11px 8px;text-align:center;font-size:13px;letter-spacing:0.1em;color:' + (c.hi ? 'var(--ieg-red)' : 'var(--ink-muted-48)') + ';font-weight:700">' + esc(c.content) + '</td>'
      + '<td style="padding:11px 8px;text-align:center;font-size:13px;letter-spacing:0.1em;color:' + (c.hi ? 'var(--ieg-red)' : 'var(--ink-muted-48)') + ';font-weight:700">' + esc(c.tech) + '</td>'
      + '<td style="padding:11px 14px;font-size:11.5px;color:var(--ink-muted-80);letter-spacing:-0.005em">' + esc(c.desc) + '</td>'
    + '</tr>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.note)
    + '<div class="card a-up d3" style="flex:1;padding:16px 18px;display:flex;flex-direction:column;min-height:0;overflow:hidden">'
      + '<table style="width:100%;border-collapse:collapse">'
        + '<thead>'
          + '<tr style="background:var(--tile-dark);color:#fff">'
            + '<th style="padding:9px 14px;text-align:left;font-size:10.5px;letter-spacing:0.08em;font-weight:700;width:140px">기업</th>'
            + '<th style="padding:9px 14px;text-align:left;font-size:10.5px;letter-spacing:0.08em;font-weight:700">매출 (백만원, 23년)</th>'
            + '<th style="padding:9px 14px;text-align:left;font-size:10.5px;letter-spacing:0.08em;font-weight:700">임직원 (명)</th>'
            + '<th style="padding:9px 14px;text-align:center;font-size:10.5px;letter-spacing:0.08em;font-weight:700;width:80px">콘텐츠</th>'
            + '<th style="padding:9px 14px;text-align:center;font-size:10.5px;letter-spacing:0.08em;font-weight:700;width:80px">기술력</th>'
            + '<th style="padding:9px 14px;text-align:left;font-size:10.5px;letter-spacing:0.08em;font-weight:700">비고</th>'
          + '</tr>'
        + '</thead>'
        + '<tbody>' + compHTML + '</tbody>'
      + '</table>'
      + '<div style="margin-top:auto;padding-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px">'
        + '<div class="a-up d10" style="background:var(--ieg-red-soft);border:1px solid var(--ieg-red-line);border-radius:10px;padding:10px 14px">'
          + '<div class="tag" style="color:var(--ieg-red)">콘텐츠</div>'
          + '<div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.012em;margin-top:2px">절대적 우위 (1위)</div>'
          + '<div style="font-size:11px;color:var(--ink-muted-80);margin-top:2px">30년 축적 노하우 · 자체 IP 28건</div>'
        + '</div>'
        + '<div class="a-up d11" style="background:var(--ieg-red-soft);border:1px solid var(--ieg-red-line);border-radius:10px;padding:10px 14px">'
          + '<div class="tag" style="color:var(--ieg-red)">기술력</div>'
          + '<div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.012em;margin-top:2px">기술평가인증 TCB T-2</div>'
          + '<div style="font-size:11px;color:var(--ink-muted-80);margin-top:2px">기업부설연구소 · 자체 플랫폼</div>'
        + '</div>'
        + '<div class="a-up d12" style="background:var(--ieg-lime-soft);border:1px solid var(--ieg-lime-line);border-radius:10px;padding:10px 14px">'
          + '<div class="tag" style="color:var(--ieg-lime-deep)">규모의 경제</div>'
          + '<div style="font-size:14px;font-weight:800;color:var(--ink);letter-spacing:-0.012em;margin-top:2px">매출 184억 · 임직원 56명</div>'
          + '<div style="font-size:11px;color:var(--ink-muted-80);margin-top:2px">2위 대비 1.5배 매출 · 안정적 운영</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

window.RENDERERS_2 = {
  trend: renderTrend,
  chart_customer: (s,i,t) => renderChartSlide(s,i,t,'customer'),
  chart_product: (s,i,t) => renderChartSlide(s,i,t,'product'),
  chart_item: (s,i,t) => renderChartSlide(s,i,t,'item'),
  market_domestic: renderMarketDomestic,
  market_global: renderMarketGlobal,
  competition: renderCompetition,
  competition_dynamics: renderCompetitionDynamics
};
