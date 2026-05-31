/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — renderer part 1
   Slides 1-9: cover, toc, section, company,
   business, history, cornerstone, ceo, biz_model
   ───────────────────────────────────────────── */

/* 챕터 번호를 01·02·03 형식으로 표시 (데이터는 그대로, 표시만 변환) */
function chNum(n) {
  const map = { 'Ⅰ': '01', 'Ⅱ': '02', 'Ⅲ': '03', 'Ⅳ': '04', 'Ⅴ': '05', 'Ⅵ': '06', 'Ⅶ': '07', 'Ⅷ': '08', 'Ⅸ': '09', 'Ⅹ': '10',
    'I': '01', 'II': '02', 'III': '03', 'IV': '04', 'V': '05', 'VI': '06', 'VII': '07', 'VIII': '08', 'IX': '09', 'X': '10' };
  const k = String(n == null ? '' : n).trim();
  if (map[k]) return map[k];
  const dd = parseInt(k, 10);
  return isNaN(dd) ? k : String(dd).padStart(2, '0');
}

function renderCover(s, idx, total) {
  const d = s.d;
  return mkS(
    '<div class="slide" style="background:#fff">'
    + '<div style="position:absolute;inset:0;overflow:hidden">'
      // ambient bg
      + '<div class="amb-drift" style="position:absolute;top:-160px;right:-160px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.16),transparent 60%);animation:pulse 6s ease-in-out infinite;animation-delay:0.6s"></div>'
      + '<div class="amb-drift" style="position:absolute;bottom:-160px;left:-200px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.09),transparent 60%);animation:pulse 7s ease-in-out infinite;animation-delay:1.2s"></div>'
      // grid lines
      + '<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.4" viewBox="0 0 1280 720" preserveAspectRatio="none">'
        + '<g stroke="#e0e0e0" stroke-width="0.5">'
          + '<line x1="0"    y1="160" x2="1280" y2="160" stroke-dasharray="0 6" />'
          + '<line x1="0"    y1="560" x2="1280" y2="560" stroke-dasharray="0 6" />'
        + '</g>'
      + '</svg>'
    + '</div>'
    // left column - text
    + '<div style="position:absolute;left:80px;top:80px;bottom:80px;right:560px;display:flex;flex-direction:column">'
      + '<div class="a-up d0" style="display:flex;align-items:center;gap:14px;margin-bottom:48px">'
        + '<span style="font-size:13px;letter-spacing:0.3em;font-weight:700;color:var(--ink-muted-48)">IEG</span>'
      + '</div>'
      + '<div class="a-up d2" style="font-size:14px;letter-spacing:0.32em;color:var(--ieg-red);font-weight:700;text-transform:uppercase;margin-bottom:20px">' + esc(d.tag) + '</div>'
      + '<div class="a-up d3" style="font-size:60px;font-weight:900;line-height:1.02;color:var(--ink);letter-spacing:-0.035em">' + esc(d.company) + '</div>'
      + '<div class="a-up d4" style="font-size:60px;font-weight:900;line-height:1.02;letter-spacing:-0.035em;margin-top:14px;background:linear-gradient(120deg,var(--ieg-red) 0%,#ff5050 60%,var(--ieg-red) 100%);background-size:240% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fadeUp 0.55s cubic-bezier(.22,.61,.36,1) 0.32s both, bgShift 8s ease-in-out 3s infinite">'
        + esc(d.heading)
      + '</div>'
      + '<span class="a-line d5" style="display:block;width:100px;height:4px;background:var(--ieg-red);margin:36px 0 24px;transform-origin:left center;border-radius:2px"></span>'
      + '<div class="a-up d6" style="font-size:14px;color:var(--ink-muted-80);line-height:1.9;letter-spacing:-0.005em">'
        + esc(d.addr) + '<br>' + esc(d.contact)
      + '</div>'
    + '</div>'
    // right column - dark panel
    + '<div style="position:absolute;right:0;top:0;bottom:0;width:520px;background:var(--tile-dark);overflow:hidden">'
      // diagonal pattern
      + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent,transparent 32px,rgba(237,28,36,0.04) 32px,rgba(237,28,36,0.04) 33px)"></div>'
      // glow
      + '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.22),transparent 65%)" class="amb-glow"></div>'
      // monogram
      + '<div class="a-si d4" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">'
        + '<div style="width:200px;height:200px;border:3px solid var(--ieg-red);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;position:relative">'
          + '<div style="position:absolute;inset:-12px;border:1px solid rgba(255,255,255,0.1);border-radius:50%"></div>'
          + '<div style="position:absolute;inset:-26px;border:1px solid rgba(255,255,255,0.06);border-radius:50%"></div>'
          + '<span style="font-size:88px;font-weight:900;color:#fff;letter-spacing:-0.05em;font-family:Pretendard Variable;line-height:1">IEG</span>'
        + '</div>'
        + '<div style="margin-top:40px;width:48px;height:2px;background:var(--ieg-red);margin:40px auto 0;border-radius:1px"></div>'
      + '</div>'
      // bottom accent
      + '<div style="position:absolute;bottom:0;left:0;right:0;height:6px;background:var(--ieg-red);transform-origin:left;animation:lineGrow 1s 0.5s cubic-bezier(.22,.61,.36,1) both"></div>'
    + '</div>'
    + '</div>'
  );
}

/* ────────────────────────────────────────── TOC ──── */
function renderToc(s, idx, total) {
  const d = s.d;
  const items = d.items.map((it, i) =>
    '<div class="a-up d' + (i + 3) + '" style="display:flex;gap:24px;padding:32px 28px;background:var(--canvas-parchment);border-radius:14px;border:1px solid var(--hairline);position:relative;overflow:hidden">'
    + '<div style="position:absolute;top:-30px;right:-30px;font-size:200px;font-weight:900;line-height:1;color:rgba(237,28,36,0.04);letter-spacing:-0.05em;pointer-events:none">' + chNum(it.num) + '</div>'
    + '<div style="display:flex;flex-direction:column;align-items:flex-start;flex-shrink:0;width:74px;position:relative">'
      + '<div style="font-size:11px;letter-spacing:0.3em;color:var(--ieg-red);font-weight:700;margin-bottom:6px">CHAPTER</div>'
      + '<div style="font-size:46px;font-weight:900;color:var(--ink);letter-spacing:-0.04em;line-height:1">' + chNum(it.num) + '</div>'
      + '<div style="width:32px;height:3px;background:var(--ieg-red);margin-top:10px;border-radius:2px"></div>'
    + '</div>'
    + '<div style="flex:1;padding-top:4px;position:relative">'
      + '<div style="font-size:24px;font-weight:800;color:var(--ink);letter-spacing:-0.02em;margin-bottom:8px">' + esc(it.title) + '</div>'
      + '<div style="font-size:12.5px;color:var(--ink-muted-80);line-height:1.7;letter-spacing:-0.005em">' + esc(it.desc) + '</div>'
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide" style="background:#fff">'
    + '<div class="slide-pad">'
      + '<div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px">'
        + '<div>'
          + '<div class="a-up d0 kicker" style="color:var(--ieg-red)">CONTENTS</div>'
          + '<div class="a-up d1" style="font-size:62px;font-weight:900;letter-spacing:-0.04em;line-height:1;margin-top:4px">목 차</div>'
        + '</div>'
        + '<div class="a-up d2 brand-chip">'
          + '<span>IEG INVESTOR RELATIONS</span>'
        + '</div>'
      + '</div>'
      + '<span class="rule a-line d3"></span>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:6px">' + items + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ────────────────────────────────────────── Section ──── */
function renderSection(s, idx, total) {
  const d = s.d;
  return mkS(
    '<div class="slide" style="background:var(--tile-dark);overflow:hidden">'
    // diagonal pattern
    + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent,transparent 40px,rgba(237,28,36,0.03) 40px,rgba(237,28,36,0.03) 41px)"></div>'
    // huge bg numeral
    + '<div class="a-in d0" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:580px;font-weight:900;color:rgba(255,255,255,0.045);letter-spacing:-0.08em;line-height:1;pointer-events:none;animation-duration:1s">' + chNum(d.num) + '</div>'
    // glow circle
    + '<div class="amb-glow" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.2),transparent 60%)"></div>'
    // content
    + '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">'
      + '<div class="a-up d2" style="font-size:13px;letter-spacing:0.4em;color:var(--ieg-red);font-weight:700;margin-bottom:24px">CHAPTER ' + chNum(d.num) + '</div>'
      + '<div class="a-rise d3" style="font-size:120px;font-weight:700;letter-spacing:-0.04em;color:#fff;line-height:1;padding:0 6px">' + esc(d.title) + '</div>'
      + '<span class="a-line d4" style="display:block;width:96px;height:4px;background:var(--ieg-red);margin:36px 0 24px;transform-origin:left center;border-radius:2px"></span>'
      + '<div class="a-up d5" style="font-size:18px;letter-spacing:0.32em;color:rgba(255,255,255,0.5);font-weight:600">' + esc(d.sub) + '</div>'
      + (d.caption ? '<div class="a-up d6" style="font-size:15px;color:rgba(255,255,255,0.4);font-weight:500;margin-top:14px;max-width:660px;letter-spacing:-0.005em">' + esc(d.caption) + '</div>' : '')
    + '</div>'
    // accent rails
    + '<div style="position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--ieg-red);transform-origin:top center;animation:lineGrow 0.9s cubic-bezier(.22,.61,.36,1) 0.2s both"></div>'
    + '<div style="position:absolute;right:0;top:0;bottom:0;width:6px;background:rgba(255,255,255,0.12);transform-origin:bottom center;animation:lineGrow 0.9s cubic-bezier(.22,.61,.36,1) 0.35s both"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--ieg-red);transform-origin:left center;animation:lineGrow 0.9s 0.5s cubic-bezier(.22,.61,.36,1) both"></div>'
    + '<div class="foot" style="color:rgba(255,255,255,0.35)">'
      + '<span style="display:flex;align-items:center;gap:8px">'
        + 'IEG'
      + '</span>'
      + '<span class="pg-no">' + String(idx).padStart(2, '0') + ' / ' + String(total).padStart(2, '0') + '</span>'
    + '</div>'
    + '</div>'
  );
}

/* ──────────────────────────────── 1-1 Company overview ──── */
function renderCompanyOverview(s, idx, total) {
  const d = s.d;
  const stats = [
    { l: '설립일', v: d.founded },
    { l: '대표이사', v: d.ceo },
    { l: '자본금', v: d.capital },
    { l: '임직원 수', v: d.employees },
    { l: '주요 주주', v: d.shareholders, full: true },
    { l: '주요 사업', v: d.biz, full: true }
  ];
  const stHTML = stats.map((st, i) =>
    '<div class="card a-up d' + (i + 3) + '" style="padding:14px 16px;' + (st.full ? 'grid-column: span 2;' : '') + '">'
    + '<div class="tag" style="margin-bottom:6px">' + esc(st.l) + '</div>'
    + '<div style="font-size:14.5px;font-weight:700;white-space:pre-line;line-height:1.55;color:var(--ink);letter-spacing:-0.012em">' + esc(st.v) + '</div>'
    + '</div>'
  ).join('');

  const owHTML = (d.ownership || []).map((o, i) =>
    '<div class="a-up d' + (i + 5) + '" style="display:flex;justify-content:space-between;align-items:center;padding:9px 4px;border-bottom:1px solid var(--hairline);font-size:13px">'
    + '<span style="display:flex;align-items:center;gap:10px;color:var(--ink-muted-80)">'
      + '<span style="width:10px;height:10px;border-radius:50%;background:' + (i === 0 ? 'var(--ieg-red)' : i === 1 ? 'var(--ieg-grey)' : 'var(--ieg-lime-deep)') + ';flex-shrink:0"></span>'
      + '<span style="font-weight:600">' + esc(o.label) + '</span>'
    + '</span>'
    + '<span style="font-weight:700;color:var(--ink);font-size:13.5px">'
      + '<span style="font-size:10.5px;color:var(--ink-muted-48);margin-right:8px;font-weight:500">' + esc(o.shares) + '</span>'
      + o.pct + '%'
    + '</span>'
    + '</div>'
  ).join('');

  const chart = 'setTimeout(function(){'
    + 'var cv=document.getElementById("oc");if(!cv)return;'
    + 'new Chart(cv.getContext("2d"),{type:"doughnut",data:{labels:["대표이사","임직원","파트너사"],datasets:[{data:[52.35,26.25,21.40],backgroundColor:["#ED1C24","#333333","#FFB400"],borderWidth:0,hoverOffset:6}]},options:{cutout:"68%",responsive:false,plugins:{legend:{display:false},tooltip:{mode:"index",intersect:false,backgroundColor:"#1d1d1f",titleFont:{family:"Pretendard Variable",weight:700},bodyFont:{family:"Pretendard Variable"},padding:10,cornerRadius:8,callbacks:{label:function(c){return c.label+": "+c.raw.toFixed(2)+"%";}}}},animation:{animateRotate:true,duration:1200,easing:"easeOutCubic"}}});'
    + '},250);';

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline, d.sub)
    + '<div style="display:flex;gap:24px;flex:1;min-height:0">'
      + '<div style="flex:1.4;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:start">' + stHTML + '</div>'
      + '<div style="width:280px;flex-shrink:0;display:flex">'
        + '<div class="card a-up d4" style="padding:18px;width:100%;display:flex;flex-direction:column">'
          + '<div class="tag" style="text-align:center;margin-bottom:10px">지분율 합계 100%</div>'
          + '<div style="position:relative;width:160px;height:160px;margin:0 auto"><canvas id="oc" width="160" height="160"></canvas>'
            + '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">'
              + '<div style="font-size:11px;color:var(--ink-muted-48);font-weight:600;letter-spacing:0.16em">OWNERSHIP</div>'
              + '<div style="font-size:24px;font-weight:900;color:var(--ink);letter-spacing:-0.02em;line-height:1;margin-top:4px">100%</div>'
            + '</div>'
          + '</div>'
          + '<div style="margin-top:14px">' + owHTML + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '<div class="a-up d10" style="font-size:11.5px;color:var(--ink-muted-48);border-top:1px solid var(--hairline);padding-top:12px;margin-top:14px;font-weight:500">' + esc(d.addr) + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>',
    chart
  );
}

/* ──────────────────────────────── 1-2 Business overview ──── */
function renderBusinessOverview(s, idx, total) {
  const d = s.d;

  // Unified flow color (per user note)
  const flowHTML = (d.flow || []).map((f, i, a) =>
    (i > 0 ? '<span style="color:var(--ieg-red);font-size:18px;font-weight:300;align-self:center">›</span>' : '')
    + '<span class="a-up d' + (i + 3) + '" style="background:var(--ieg-red);color:#fff;padding:10px 18px;border-radius:99px;font-size:13.5px;font-weight:700;white-space:nowrap;letter-spacing:-0.012em;display:inline-flex;align-items:center;gap:8px">'
      + '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;opacity:0.7"></span>'
      + esc(f)
    + '</span>'
  ).join('');

  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)'];
  const segHTML = (d.segments || []).map((seg, i) =>
    '<div class="card a-up d' + (i + 5) + '" style="padding:24px 22px;border-top:4px solid ' + cols[i] + ';position:relative;overflow:hidden;display:flex;flex-direction:column;gap:14px">'
    + '<div style="position:absolute;top:-12px;right:-8px;font-size:120px;font-weight:900;color:rgba(0,0,0,0.04);letter-spacing:-0.04em;line-height:1">' + String(i + 1).padStart(2, '0') + '</div>'
    + '<div style="position:relative">'
      + '<div style="font-size:14.5px;font-weight:800;color:' + cols[i] + ';letter-spacing:-0.015em;margin-bottom:6px">' + esc(seg.title) + '</div>'
      + '<div style="display:flex;align-items:baseline;gap:4px">'
        + '<span style="font-size:48px;font-weight:900;letter-spacing:-0.04em;color:' + cols[i] + ';line-height:1" class="num-display">' + esc(seg.num) + '</span>'
        + '<span style="font-size:18px;font-weight:700;color:' + cols[i] + ';opacity:0.7">' + esc(seg.unit) + '</span>'
      + '</div>'
    + '</div>'
    + '<div style="flex:1;padding-top:8px;border-top:1px dashed var(--hairline)">'
      + (seg.items || []).map((it, j) =>
        '<div class="bullet" style="font-size:12px;padding:5px 0">'
          + '<span style="color:' + cols[i] + ';flex-shrink:0;margin-right:2px;font-weight:700">·</span>'
          + esc(it)
        + '</div>'
      ).join('')
    + '</div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin:8px 0 26px">' + flowHTML + '</div>'
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;flex:1;min-height:0">' + segHTML + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 1-3 History ──── */
function renderHistory(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-grey)', 'var(--ieg-grey)', 'var(--ieg-red)', 'var(--ieg-red)'];

  const perHTML = (d.periods || []).map((p, i) => {
    const itemsHTML = (p.items || []).map((it) =>
      '<div style="font-size:10px;color:var(--ink-muted-80);padding:2.5px 0;line-height:1.4;display:flex;gap:5px;border-bottom:1px solid var(--hairline)"><span style="color:' + cols[i] + ';flex-shrink:0;font-weight:700">·</span><span>' + esc(it) + '</span></div>'
    ).join('');
    return '<div class="a-up d' + (i + 2) + '" style="background:var(--canvas);border:1px solid var(--hairline);border-top:4px solid ' + cols[i] + ';border-radius:12px;padding:12px 12px;display:flex;flex-direction:column;min-height:0;overflow:hidden">'
      + '<div style="font-size:17px;font-weight:900;color:' + cols[i] + ';letter-spacing:-0.02em;line-height:1;margin-bottom:8px;flex-shrink:0">' + esc(p.period) + '</div>'
      + '<div style="flex:1;min-height:0;overflow:hidden"><div data-fit data-fit-min="0.58" style="display:block">' + itemsHTML + '</div></div>'
    + '</div>';
  }).join('');

  // 4 cert groups bottom (per image 1)
  const allCerts = [d.certs, d.certs2, d.certs3, d.certs4];
  const certHTML = allCerts.map((g, i) =>
    '<div class="a-up d8" style="flex:1;padding:8px 14px' + (i ? ';border-left:1px solid var(--hairline)' : '') + '">'
    + (g || []).map((c) =>
        '<div style="font-size:9px;color:var(--ink-muted-80);padding:1.5px 0;line-height:1.35;display:flex;gap:4px"><span style="color:' + (i >= 2 ? 'var(--ieg-red)' : 'var(--ieg-grey)') + ';flex-shrink:0;font-weight:700">·</span><span>' + esc(c) + '</span></div>'
      ).join('')
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:minmax(0,1fr);gap:10px;margin-top:6px;flex:1;min-height:0">' + perHTML + '</div>'
    + '<div class="a-up d6" style="margin-top:12px;flex-shrink:0;background:var(--canvas-parchment);border-radius:12px;border:1px solid var(--hairline);overflow:hidden">'
      + '<div style="display:flex;align-items:center;gap:10px;padding:7px 14px;background:var(--ieg-red);color:#fff"><span style="font-size:11px;font-weight:700;letter-spacing:0.18em">인증 · 수상</span></div>'
      + '<div style="display:flex;gap:0;align-items:stretch">' + certHTML + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 1-3 Cornerstone ──── */
function renderCornerstone(s, idx, total) {
  const d = s.d;
  // arrange 8 branches evenly on a circle (square coordinate space → undistorted)
  const n = (d.branches || []).length;
  const ORB = 42; // orbit radius in % of the square
  const branches = (d.branches || []).map((b, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const cx = 50 + Math.cos(angle) * ORB;
    const cy = 50 + Math.sin(angle) * ORB;
    return '<div style="position:absolute;left:' + cx + '%;top:' + cy + '%;transform:translate(-50%,-50%);width:122px;text-align:center;z-index:1">'
      + '<div class="a-si d' + (i + 4) + '" style="background:var(--canvas);border:1px solid var(--hairline);border-radius:10px;padding:7px 9px;box-shadow:0 6px 16px -6px rgba(0,0,0,0.1)">'
        + '<div style="font-size:10.5px;font-weight:800;color:var(--ink);letter-spacing:-0.012em;margin-bottom:1px;line-height:1.2">' + esc(b.label) + '</div>'
        + '<div style="font-size:8.5px;color:var(--ink-muted-48);line-height:1.35">' + esc(b.desc) + '</div>'
      + '</div>'
    + '</div>';
  }).join('');

  // connector lines from hub to each branch (square viewBox → real radial spokes)
  const lines = (d.branches || []).map((b, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x2 = 50 + Math.cos(angle) * ORB;
    const y2 = 50 + Math.sin(angle) * ORB;
    return '<line x1="50" y1="50" x2="' + x2 + '" y2="' + y2 + '" stroke="rgba(237,28,36,0.28)" stroke-width="0.3" stroke-dasharray="1 1" style="stroke-dashoffset:60;animation:drawIn 1s ' + (0.5 + i * 0.08) + 's both"/>';
  }).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="flex:1;display:flex;gap:30px;min-height:0;align-items:stretch">'
      // left: huge anchor card
      + '<div class="a-r d3 card dark" style="width:340px;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding:32px 28px;position:relative;overflow:hidden;border:none">'
        + '<div style="position:absolute;top:-50px;right:-50px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.25),transparent 60%);animation:pulse 4s ease-in-out infinite"></div>'
        + '<div class="kicker" style="color:var(--ieg-red);position:relative">CORNERSTONE</div>'
        + '<div style="font-size:32px;font-weight:900;color:#fff;letter-spacing:-0.025em;margin-top:8px;line-height:1.15;position:relative">' + esc(d.anchor.title) + '</div>'
        + '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:6px;letter-spacing:0.14em;font-weight:600;position:relative">' + esc(d.anchor.sub) + '</div>'
        + '<div style="margin-top:18px;font-size:12px;line-height:1.7;color:rgba(255,255,255,0.85);position:relative">' + esc(d.anchor.desc) + '</div>'
        + '<div style="margin-top:24px;display:flex;gap:8px;position:relative"><span style="background:var(--ieg-red);color:#fff;padding:5px 12px;border-radius:99px;font-size:10.5px;font-weight:700;letter-spacing:0.08em;white-space:nowrap">8개 그룹사 확장</span></div>'
      + '</div>'
      // right: orbit diagram — square stage keeps the rings circular & balanced
      + '<div style="flex:1;display:flex;align-items:center;justify-content:center;position:relative;min-height:0">'
        + '<div style="position:relative;width:430px;height:430px;flex-shrink:0">'
          // concentric rings (real circles)
          + '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:84%;height:84%;border:1px dashed rgba(237,28,36,0.18);border-radius:50%"></div>'
          + '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60%;height:60%;border:1px dashed rgba(237,28,36,0.12);border-radius:50%"></div>'
          // svg spokes
          + '<svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 100 100">' + lines + '</svg>'
          // center hub
          + '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2">'
            + '<div class="a-si d3" style="width:108px;height:108px;border-radius:50%;background:var(--ieg-red);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;box-shadow:0 10px 30px -8px rgba(237,28,36,0.45)">'
              + '<div style="font-size:10px;letter-spacing:0.2em;font-weight:700;opacity:0.85">EXPAND</div>'
              + '<div style="font-size:20px;font-weight:900;letter-spacing:-0.03em;line-height:1;margin-top:2px">IEG</div>'
            + '</div>'
          + '</div>'
          + branches
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 1-4 CEO ──── */
function renderCeo(s, idx, total) {
  const d = s.d;

  const carHTML = (d.career || []).map((c, i) => {
    const hi = c.includes('KOSDAQ') || c.includes('이디');
    return '<div class="a-up d' + Math.min(i + 3, 9) + '" style="font-size:11.5px;color:' + (hi ? 'var(--ieg-red)' : 'var(--ink-muted-80)') + ';padding:5px 0;border-bottom:1px solid var(--hairline);font-weight:' + (hi ? 700 : 500) + ';display:flex;gap:8px;line-height:1.45;letter-spacing:-0.005em"><span style="color:var(--ieg-red);flex-shrink:0;font-weight:700">·</span><span>' + esc(c) + '</span></div>';
  }).join('');

  const awHTML = (d.awards || []).map((a, i) =>
    '<div class="a-up d' + Math.min(i + 4, 10) + '" style="font-size:11px;color:var(--ink-muted-80);padding:5px 0;display:flex;gap:8px;border-bottom:1px solid var(--hairline);line-height:1.45"><span style="color:var(--ieg-lime-deep);flex-shrink:0;font-weight:700">▸</span><span>' + esc(a) + '</span></div>'
  ).join('');

  const ipHTML = (d.ip || []).map((i2, i) =>
    '<div class="a-up d' + Math.min(i + 5, 11) + '" style="font-size:11px;color:var(--ink-muted-80);padding:5px 0;display:flex;gap:8px;border-bottom:1px solid var(--hairline);line-height:1.45"><span style="color:var(--ieg-red);flex-shrink:0;font-weight:700">◆</span><span>' + esc(i2) + '</span></div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, '')
    + '<div style="display:grid;grid-template-columns:280px 1fr 1fr;gap:24px;flex:1;min-height:0">'
      // identity panel (photo removed per request)
      + '<div class="a-r d1" style="background:var(--tile-dark);border-radius:14px;overflow:hidden;position:relative;display:flex;flex-direction:column;justify-content:center;padding:34px 28px">'
        + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,transparent,transparent 12px,rgba(255,255,255,0.018) 12px,rgba(255,255,255,0.018) 13px)"></div>'
        + '<div style="position:absolute;top:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,0.22),transparent 60%);animation:pulse 5s ease-in-out infinite"></div>'
        + '<div style="position:relative;color:#fff">'
          + '<div style="font-size:11px;letter-spacing:0.24em;color:var(--ieg-red);font-weight:700;margin-bottom:12px">' + esc(d.title) + '</div>'
          + '<div style="font-size:46px;font-weight:900;letter-spacing:-0.03em;line-height:1.04;margin-bottom:18px">' + esc(d.name) + '</div>'
          + '<div style="width:48px;height:3px;background:var(--ieg-red);border-radius:2px;margin-bottom:18px"></div>'
          + '<div style="font-size:12.5px;color:rgba(255,255,255,0.72);line-height:1.7;letter-spacing:-0.005em">' + esc(d.sub) + '</div>'
        + '</div>'
        + '<div style="position:absolute;left:0;bottom:0;right:0;height:4px;background:var(--ieg-red);animation:lineGrow 0.9s 0.5s cubic-bezier(.22,.61,.36,1) both;transform-origin:left center"></div>'
      + '</div>'
      // career column
      + '<div style="display:flex;flex-direction:column;min-height:0">'
        + '<div class="kicker a-up d2" style="margin-bottom:6px">주요 경력 / 수행이력</div>'
        + '<div class="scroll-y" style="flex:1;min-height:0">' + carHTML + '</div>'
      + '</div>'
      // awards + IP column
      + '<div style="display:flex;flex-direction:column;gap:10px;min-height:0">'
        + '<div style="display:flex;flex-direction:column;flex:1;min-height:0">'
          + '<div class="kicker a-up d3" style="color:var(--ieg-lime-deep);margin-bottom:6px">수상 이력</div>'
          + '<div class="scroll-y" style="flex:1">' + awHTML + '</div>'
        + '</div>'
        + '<div style="display:flex;flex-direction:column;flex:1;min-height:0">'
          + '<div class="kicker a-up d4" style="margin-bottom:6px">지식재산권 취득 이력</div>'
          + '<div class="scroll-y" style="flex:1">' + ipHTML + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* ──────────────────────────────── 1-5 Biz model ──── */
function renderBizModel(s, idx, total) {
  const d = s.d;
  const cols = ['var(--ieg-red)', 'var(--ieg-grey)', 'var(--ieg-lime-deep)'];
  const bgs = ['rgba(237,28,36,0.05)', 'rgba(102,102,102,0.05)', 'rgba(255,180,0,0.1)'];

  const modHTML = (d.models || []).map((m, i) =>
    '<div class="a-up d' + (i + 3) + ' card" style="padding:24px 24px;position:relative;overflow:hidden;border-top:4px solid ' + cols[i] + ';display:flex;flex-direction:column;gap:14px">'
    + '<div style="position:absolute;top:-30px;right:-30px;font-size:160px;font-weight:900;color:' + bgs[i] + ';line-height:1;letter-spacing:-0.05em;pointer-events:none">' + String(i + 1).padStart(2, '0') + '</div>'
    + '<div style="position:relative">'
      + '<div style="font-size:10.5px;letter-spacing:0.22em;font-weight:800;color:' + cols[i] + ';margin-bottom:6px">' + esc(m.tag) + '</div>'
      + '<div style="font-size:22px;font-weight:900;letter-spacing:-0.025em;color:var(--ink);line-height:1.2">' + esc(m.title) + '</div>'
    + '</div>'
    + '<div style="font-size:12px;color:var(--ink-muted-80);line-height:1.65;white-space:pre-line;letter-spacing:-0.008em;position:relative">' + esc(m.sub) + '</div>'
    + '<div style="border-top:1px dashed var(--hairline);padding-top:12px;position:relative;flex:1">'
      + (m.items || []).map(it =>
        '<div class="bullet" style="font-size:12px;padding:5px 0"><span style="color:' + cols[i] + ';flex-shrink:0;font-weight:700">▸</span>' + esc(it) + '</div>'
      ).join('')
    + '</div>'
    + '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:' + cols[i] + ';transform-origin:left;animation:lineGrow 0.9s ' + (0.4 + i * 0.15) + 's cubic-bezier(.22,.61,.36,1) both"></div>'
    + '</div>'
  ).join('');

  return mkS(
    '<div class="slide">'
    + '<div class="slide-pad">'
    + HEAD(d.badge, d.headline)
    + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;flex:1;min-height:0;margin-top:6px">' + modHTML + '</div>'
    + '</div>'
    + FOOT(idx, total)
    + '</div>'
  );
}

/* dispatcher for part 1 */
window.RENDERERS_1 = {
  cover: renderCover,
  toc: renderToc,
  section: renderSection,
  company_overview: renderCompanyOverview,
  business_overview: renderBusinessOverview,
  history: renderHistory,
  cornerstone: renderCornerstone,
  ceo: renderCeo,
  biz_model: renderBizModel
};
