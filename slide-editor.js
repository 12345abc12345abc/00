/* ─────────────────────────────────────────────
   IEG INVESTOR RELATIONS — slide editor panel
   Generates the per-slide form for editing
   ───────────────────────────────────────────── */

function fg(label, key, val) {
  return '<div class="fg"><div class="fl">' + label + '</div>'
    + '<input class="fi fi-sm" value="' + esc(String(val || '')) + '" oninput="slides[cur].' + key + '=this.value"/></div>';
}
function fgTA(label, key, val, rows) {
  return '<div class="fg"><div class="fl">' + label + '</div>'
    + '<textarea class="fi fi-sm" rows="' + (rows || 2) + '" oninput="slides[cur].' + key + '=this.value">' + esc(String(val || '')) + '</textarea></div>';
}

/* set a newline-separated string array at a dotted path under slides[cur].d */
function setArr(path, value) {
  const keys = path.split('.');
  let o = slides[cur].d;
  for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
  o[keys[keys.length - 1]] = value.split('\n');
}
function fgArr(label, path, arr, rows) {
  return '<div class="fg"><div class="fl">' + esc(label) + '</div>'
    + '<textarea class="fi fi-sm" rows="' + (rows || 3) + '" oninput="setArr(\'' + path + '\',this.value)">' + esc((arr || []).join('\n')) + '</textarea></div>';
}

function buildEditor() {
  const s = slides[cur], d = s.d || {};
  let h = '';

  // Always: title
  h += '<div class="fg"><div class="fl">슬라이드 제목</div>'
    + '<input class="fi fi-sm" value="' + esc(s.title) + '" oninput="slides[cur].title=this.value;buildSidebar()"/></div>';

  // Common single fields
  const single = [
    ['badge', 'Badge'], ['headline', '헤드라인'], ['sub', '서브 텍스트'],
    ['note', '노트'], ['company', '회사명'], ['heading', '타이틀'],
    ['tag', '태그라인'], ['addr', '주소'], ['contact', '연락처'],
    ['headlineHi', '하이라이트 헤드라인'], ['mainValue', '메인 값'], ['mainUnit', '메인 단위'],
    ['targetTitle', '타깃 타이틀'], ['targetValue', '타깃 값'], ['targetUnit', '타깃 단위'],
    ['cagr', 'CAGR'], ['source', '출처'], ['unit', '단위'],
    ['name', '이름'], ['title', '직함'], ['legend', '범례'],
    ['totalAmt', '합계 금액'], ['anchor', '앵커 문구'], ['footer', '하단 문구'],
    ['note1Title', '노트1 제목'], ['note2Title', '노트2 제목'], ['note2Sub', '노트2 서브'],
    ['hl', '하이라이트'], ['total', '합계 문구'],
    ['kicker', '키커 (영문 소제목)'], ['lead', '리드 문장'], ['body', '본문'], ['advisory', '자문']
  ];

  for (const [k, lbl] of single) {
    if (typeof d[k] === 'string') {
      if (k === 'biz' || k === 'shareholders' || k === 'addr' || (d[k] || '').length > 60) {
        h += fgTA(lbl, "d['" + k + "']", d[k]);
      } else {
        h += fg(lbl, "d['" + k + "']", d[k]);
      }
    }
  }

  // Section slide
  if (s.type === 'section') {
    h += fg('섹션 번호', "d['num']", d.num);
    h += fg('섹션 제목', "d['title']", d.title);
    h += fg('서브', "d['sub']", d.sub);
    h += fg('캡션', "d['caption']", d.caption);
  }

  // Cover
  if (s.type === 'cover') {
    // already handled by single fields
  }

  // Company overview
  if (s.type === 'company_overview') {
    ['founded','ceo','capital','employees','biz','shareholders'].forEach(k => {
      if (d[k] !== undefined) {
        h += (k === 'biz' || k === 'shareholders')
          ? fgTA(k, "d['" + k + "']", d[k], 3)
          : fg(k, "d['" + k + "']", d[k]);
      }
    });
    if (d.ownership) {
      h += '<div class="fg"><div class="fl">지분율</div><table class="dt"><thead><tr><th>주주</th><th>%</th><th>주식수</th></tr></thead><tbody>'
        + d.ownership.map((o,i) =>
            '<tr><td><input value="' + esc(o.label) + '" oninput="slides[cur].d.ownership[' + i + '].label=this.value"/></td>'
            + '<td><input type="number" step="0.01" value="' + o.pct + '" oninput="slides[cur].d.ownership[' + i + '].pct=+this.value"/></td>'
            + '<td><input value="' + esc(o.shares) + '" oninput="slides[cur].d.ownership[' + i + '].shares=this.value"/></td></tr>'
          ).join('')
        + '</tbody></table></div>';
    }
  }

  // Business overview
  if (s.type === 'business_overview') {
    if (d.flow) h += fgTA('Flow (한 줄에 하나)', "d['flow'].join('\\n')", (d.flow||[]).join('\n'), 5).replace('oninput="slides[cur].d[\'flow\'].join(\'\\n\')', "oninput=\"slides[cur].d.flow=this.value.split('\\n')");
    if (d.segments) {
      h += '<div class="fg"><div class="fl">세그먼트</div>';
      d.segments.forEach((seg,i) => {
        h += '<div class="sub-card"><div class="sc-hdr"><span>SEG ' + (i+1) + '</span></div>'
          + '<input class="fi fi-sm" style="margin-bottom:5px" value="' + esc(seg.title) + '" oninput="slides[cur].d.segments[' + i + '].title=this.value"/>'
          + '<div style="display:flex;gap:6px;margin-bottom:5px"><input class="fi fi-sm" style="flex:1" value="' + esc(seg.num) + '" oninput="slides[cur].d.segments[' + i + '].num=this.value" placeholder="숫자"/><input class="fi fi-sm" style="width:60px" value="' + esc(seg.unit||'') + '" oninput="slides[cur].d.segments[' + i + '].unit=this.value" placeholder="단위"/></div>'
          + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.segments[' + i + '].items=this.value.split(\'\\n\')">' + esc((seg.items||[]).join('\n')) + '</textarea>'
          + '</div>';
      });
      h += '</div>';
    }
  }

  // History
  if (s.type === 'history') {
    if (d.periods) {
      h += '<div class="fg"><div class="fl">연혁 기간</div>';
      d.periods.forEach((p, i) => {
        h += '<div class="sub-card"><div class="sc-hdr"><span>PERIOD ' + (i+1) + '</span></div>'
          + '<input class="fi fi-sm" style="margin-bottom:5px" value="' + esc(p.period) + '" oninput="slides[cur].d.periods[' + i + '].period=this.value"/>'
          + '<textarea class="fi fi-sm" rows="5" oninput="slides[cur].d.periods[' + i + '].items=this.value.split(\'\\n\')">' + esc((p.items||[]).join('\n')) + '</textarea>'
          + '</div>';
      });
      h += '</div>';
    }
    ['certs','certs2','certs3','certs4'].forEach((k, i) => {
      if (d[k]) {
        h += '<div class="fg"><div class="fl">인증/수상 그룹 ' + (i+1) + '</div>'
          + '<textarea class="fi fi-sm" rows="4" oninput="slides[cur].d[\'' + k + '\']=this.value.split(\'\\n\')">' + esc(d[k].join('\n')) + '</textarea></div>';
      }
    });
  }

  // Cornerstone
  if (s.type === 'cornerstone') {
    if (d.anchor) {
      h += '<div class="sub-card"><div class="sc-hdr">ANCHOR</div>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d.anchor.title) + '" oninput="slides[cur].d.anchor.title=this.value"/>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d.anchor.sub) + '" oninput="slides[cur].d.anchor.sub=this.value"/>'
        + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.anchor.desc=this.value">' + esc(d.anchor.desc) + '</textarea>'
        + '</div>';
    }
    if (d.branches) {
      h += '<div class="fg"><div class="fl">확장 그룹</div>';
      d.branches.forEach((b,i) => {
        h += '<div class="sub-card"><div class="sc-hdr"><span>BRANCH ' + (i+1) + '</span></div>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(b.label) + '" oninput="slides[cur].d.branches[' + i + '].label=this.value" placeholder="이름"/>'
          + '<input class="fi fi-sm" value="' + esc(b.desc) + '" oninput="slides[cur].d.branches[' + i + '].desc=this.value" placeholder="설명"/>'
          + '</div>';
      });
      h += '</div>';
    }
  }

  // CEO
  if (s.type === 'ceo') {
    if (d.career) h += '<div class="fg"><div class="fl">주요 경력 (한 줄에 하나)</div><textarea class="fi fi-sm" rows="8" oninput="slides[cur].d.career=this.value.split(\'\\n\')">' + esc(d.career.join('\n')) + '</textarea></div>';
    if (d.awards) h += '<div class="fg"><div class="fl">수상 이력</div><textarea class="fi fi-sm" rows="5" oninput="slides[cur].d.awards=this.value.split(\'\\n\')">' + esc(d.awards.join('\n')) + '</textarea></div>';
    if (d.ip) h += '<div class="fg"><div class="fl">지식재산권</div><textarea class="fi fi-sm" rows="4" oninput="slides[cur].d.ip=this.value.split(\'\\n\')">' + esc(d.ip.join('\n')) + '</textarea></div>';
  }

  // Biz model
  if (s.type === 'biz_model' && d.models) {
    h += '<div class="fg"><div class="fl">사업 모델</div>';
    d.models.forEach((m,i) => {
      h += '<div class="sub-card"><div class="sc-hdr"><span>MODEL ' + (i+1) + '</span></div>'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:80px" value="' + esc(m.tag) + '" oninput="slides[cur].d.models[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(m.title) + '" oninput="slides[cur].d.models[' + i + '].title=this.value"/></div>'
        + '<textarea class="fi fi-sm" rows="2" style="margin-bottom:4px" oninput="slides[cur].d.models[' + i + '].sub=this.value">' + esc(m.sub) + '</textarea>'
        + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.models[' + i + '].items=this.value.split(\'\\n\')">' + esc((m.items||[]).join('\n')) + '</textarea>'
        + '</div>';
    });
    h += '</div>';
  }

  // Trend
  if (s.type === 'trend') {
    ['before','after'].forEach(side => {
      if (d[side]) {
        h += '<div class="sub-card"><div class="sc-hdr">' + side.toUpperCase() + '</div>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d[side].period) + '" oninput="slides[cur].d.' + side + '.period=this.value" placeholder="기간"/>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d[side].label) + '" oninput="slides[cur].d.' + side + '.label=this.value" placeholder="라벨"/>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d[side].sub) + '" oninput="slides[cur].d.' + side + '.sub=this.value" placeholder="서브"/>'
          + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.' + side + '.items=this.value.split(\'\\n\')">' + esc((d[side].items||[]).join('\n')) + '</textarea>'
          + '</div>';
      }
    });
  }

  // Charts (customer/product/item)
  if (d.years && d.total !== undefined) {
    const keys = Object.keys(d).filter(k => k !== 'years' && k !== 'total' && Array.isArray(d[k]) && d[k].length === d.years.length && typeof d[k][0] === 'number');
    const chCols = [{path:'years',def:''},{path:'total',def:0}].concat(keys.map(k => ({path:k,def:0})));
    h += '<div class="fg">' + secHead('연도별 데이터', chCols, '연도 추가')
      + '<div class="scroll-y" style="max-height:240px"><table class="dt"><thead><tr><th>년</th><th>합계</th>' + keys.map(k => '<th>' + k + '(%)</th>').join('') + '<th></th></tr></thead><tbody>'
      + d.years.map((y,i) => '<tr><td><input value="' + esc(String(y)) + '" oninput="slides[cur].d.years[' + i + ']=isNaN(+this.value)?this.value:+this.value"/></td>'
        + '<td><input type="number" value="' + d.total[i] + '" oninput="slides[cur].d.total[' + i + ']=+this.value"/></td>'
        + keys.map(k => '<td><input type="number" step="0.1" value="' + d[k][i] + '" oninput="slides[cur].d[\'' + k + '\'][' + i + ']=+this.value"/></td>').join('')
        + '<td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(chCols) + ',' + i + ')\'>×</span></td>'
        + '</tr>').join('')
      + '</tbody></table></div></div>';
  }

  // Market domestic
  if (s.type === 'market_domestic') {
    ['detailA','detailB'].forEach(k => {
      if (d[k]) {
        h += '<div class="sub-card"><div class="sc-hdr">' + k + '</div>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d[k].title) + '" oninput="slides[cur].d.' + k + '.title=this.value"/>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d[k].sub) + '" oninput="slides[cur].d.' + k + '.sub=this.value"/>'
          + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.' + k + '.items=this.value.split(\'\\n\')">' + esc((d[k].items||[]).join('\n')) + '</textarea>'
          + '</div>';
      }
    });
    if (d.breakdown) {
      h += '<div class="fg"><div class="fl">시장 세부 (Label / Value)</div><table class="dt"><thead><tr><th>항목</th><th>금액</th></tr></thead><tbody>'
        + d.breakdown.map((b,i) => '<tr><td><input value="' + esc(b.label) + '" oninput="slides[cur].d.breakdown[' + i + '].label=this.value"/></td><td><input value="' + esc(b.val) + '" oninput="slides[cur].d.breakdown[' + i + '].val=this.value"/></td></tr>').join('')
        + '</tbody></table></div>';
    }
  }

  // Market global
  if (s.type === 'market_global') {
    const mgCols = [{path:'years',def:2027},{path:'na',def:0},{path:'europe',def:0},{path:'asia',def:0},{path:'latam',def:0},{path:'mea',def:0}];
    h += '<div class="fg">' + secHead('글로벌 시장 데이터', mgCols, '연도 추가') + '<div class="scroll-y" style="max-height:240px"><table class="dt"><thead><tr><th>년</th><th>북미</th><th>유럽</th><th>APAC</th><th>남미</th><th>MEA</th><th></th></tr></thead><tbody>'
      + d.years.map((y,i) => '<tr>'
        + '<td><input value="' + y + '" oninput="slides[cur].d.years[' + i + ']=+this.value"/></td>'
        + '<td><input type="number" value="' + d.na[i] + '" oninput="slides[cur].d.na[' + i + ']=+this.value"/></td>'
        + '<td><input type="number" value="' + d.europe[i] + '" oninput="slides[cur].d.europe[' + i + ']=+this.value"/></td>'
        + '<td><input type="number" value="' + d.asia[i] + '" oninput="slides[cur].d.asia[' + i + ']=+this.value"/></td>'
        + '<td><input type="number" value="' + d.latam[i] + '" oninput="slides[cur].d.latam[' + i + ']=+this.value"/></td>'
        + '<td><input type="number" value="' + d.mea[i] + '" oninput="slides[cur].d.mea[' + i + ']=+this.value"/></td>'
        + '<td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(mgCols) + ',' + i + ')\'>×</span></td>'
        + '</tr>').join('')
      + '</tbody></table></div></div>';
  }

  // market_global END

  // Competition
  if (s.type === 'competition') {
    if (d.core) {
      h += '<div class="sub-card"><div class="sc-hdr">중앙 (경쟁자)</div>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d.core.label) + '" oninput="slides[cur].d.core.label=this.value"/>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(d.core.labelEn) + '" oninput="slides[cur].d.core.labelEn=this.value"/>'
        + d.core.items.map((it,j) => '<div style="display:flex;gap:6px;margin-bottom:3px"><input class="fi fi-sm" style="flex:1" value="' + esc(it.txt) + '" oninput="slides[cur].d.core.items[' + j + '].txt=this.value"/><input class="fi fi-sm" style="width:50px" value="' + esc(it.mark) + '" oninput="slides[cur].d.core.items[' + j + '].mark=this.value"/></div>').join('')
        + '</div>';
    }
    if (d.factors) {
      h += '<div class="fg"><div class="fl">경쟁요인</div>';
      d.factors.forEach((f,i) => {
        h += '<div class="sub-card"><div class="sc-hdr"><span>FACTOR ' + (i+1) + '</span></div>'
          + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:60px" value="' + esc(f.num) + '" oninput="slides[cur].d.factors[' + i + '].num=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(f.label) + '" oninput="slides[cur].d.factors[' + i + '].label=this.value"/></div>'
          + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(f.labelEn) + '" oninput="slides[cur].d.factors[' + i + '].labelEn=this.value" placeholder="English label"/>'
          + f.items.map((it,j) => '<div style="display:flex;gap:6px;margin-bottom:3px"><input class="fi fi-sm" style="flex:1" value="' + esc(it.txt) + '" oninput="slides[cur].d.factors[' + i + '].items[' + j + '].txt=this.value"/><input class="fi fi-sm" style="width:50px" value="' + esc(it.mark) + '" oninput="slides[cur].d.factors[' + i + '].items[' + j + '].mark=this.value"/></div>').join('')
          + '</div>';
      });
      h += '</div>';
    }
    if (d.insights) {
      h += '<div class="fg"><div class="fl">인사이트</div>';
      d.insights.forEach((ins,i) => {
        h += '<div class="sub-card"><input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(ins.title) + '" oninput="slides[cur].d.insights[' + i + '].title=this.value"/><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.insights[' + i + '].desc=this.value">' + esc(ins.desc) + '</textarea></div>';
      });
      h += '</div>';
    }
  }

  // Competition dynamics
  if (s.type === 'competition_dynamics' && d.competitors) {
    h += '<div class="fg"><div class="fl">경쟁사</div>';
    d.competitors.forEach((c,i) => {
      h += '<div class="sub-card"><div class="sc-hdr"><span>COMP ' + (i+1) + (c.hi ? ' (우리)' : '') + '</span></div>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(c.name) + '" oninput="slides[cur].d.competitors[' + i + '].name=this.value"/>'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" type="number" value="' + c.revenue + '" oninput="slides[cur].d.competitors[' + i + '].revenue=+this.value" placeholder="매출"/><input class="fi fi-sm" type="number" value="' + c.employees + '" oninput="slides[cur].d.competitors[' + i + '].employees=+this.value" placeholder="임직원"/></div>'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(c.content) + '" oninput="slides[cur].d.competitors[' + i + '].content=this.value" placeholder="콘텐츠"/><input class="fi fi-sm" style="flex:1" value="' + esc(c.tech) + '" oninput="slides[cur].d.competitors[' + i + '].tech=this.value" placeholder="기술"/></div>'
        + '<input class="fi fi-sm" value="' + esc(c.desc) + '" oninput="slides[cur].d.competitors[' + i + '].desc=this.value" placeholder="비고"/>'
        + '</div>';
    });
    h += '</div>';
  }

  // Strategy overview
  if (s.type === 'strategy_overview') {
    ['core','domestic','overseas'].forEach(cat => {
      if (d[cat]) {
        h += '<div class="fg"><div class="fl">' + cat + '</div>';
        d[cat].forEach((it,i) => {
          h += '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:50px" value="' + esc(it.tag) + '" oninput="slides[cur].d.' + cat + '[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(it.label) + '" oninput="slides[cur].d.' + cat + '[' + i + '].label=this.value"/></div>';
        });
        h += '</div>';
      }
    });
  }

  // Competency
  if (s.type === 'competency') {
    if (d.winRate) {
      h += '<div class="fg"><div class="fl">낙찰률</div><table class="dt"><thead><tr><th>구분</th><th>%</th></tr></thead><tbody>'
        + d.winRate.map((r,i) => '<tr><td><input value="' + esc(r.year) + '" oninput="slides[cur].d.winRate[' + i + '].year=this.value"/></td><td><input type="number" step="0.1" value="' + r.rate + '" oninput="slides[cur].d.winRate[' + i + '].rate=+this.value"/></td></tr>').join('')
        + '</tbody></table></div>';
    }
    if (d.bigProjects) {
      h += '<div class="fg"><div class="fl">대형 프로젝트</div><table class="dt"><thead><tr><th>년</th><th>금액</th><th>건수</th></tr></thead><tbody>'
        + d.bigProjects.map((p,i) => '<tr><td><input value="' + esc(p.year) + '" oninput="slides[cur].d.bigProjects[' + i + '].year=this.value"/></td><td><input type="number" value="' + p.amount + '" oninput="slides[cur].d.bigProjects[' + i + '].amount=+this.value"/></td><td><input type="number" value="' + p.count + '" oninput="slides[cur].d.bigProjects[' + i + '].count=+this.value"/></td></tr>').join('')
        + '</tbody></table></div>';
    }
    if (d.flow1) h += '<div class="fg"><div class="fl">Flow 1</div><textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.flow1=this.value.split(\'\\n\')">' + esc(d.flow1.join('\n')) + '</textarea></div>';
    if (d.flow2) h += '<div class="fg"><div class="fl">Flow 2</div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.flow2=this.value.split(\'\\n\')">' + esc(d.flow2.join('\n')) + '</textarea></div>';
  }

  // Experts
  if (s.type === 'experts' && d.pillars) {
    h += '<div class="fg"><div class="fl">기둥</div>';
    d.pillars.forEach((p,i) => {
      h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:80px" value="' + esc(p.tag) + '" oninput="slides[cur].d.pillars[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(p.title) + '" oninput="slides[cur].d.pillars[' + i + '].title=this.value"/><input class="fi fi-sm" style="width:70px" value="' + esc(p.count) + '" oninput="slides[cur].d.pillars[' + i + '].count=this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.pillars[' + i + '].desc=this.value">' + esc(p.desc) + '</textarea></div>';
    });
    h += '</div>';
    if (d.total) {
      h += '<div class="sub-card"><div class="sc-hdr">합계</div><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:60px" value="' + esc(d.total.num) + '" oninput="slides[cur].d.total.num=this.value"/><input class="fi fi-sm" style="width:60px" value="' + esc(d.total.unit) + '" oninput="slides[cur].d.total.unit=this.value"/></div><input class="fi fi-sm" value="' + esc(d.total.label) + '" oninput="slides[cur].d.total.label=this.value"/></div>';
    }
  }

  // Growth domestic
  if (s.type === 'growth_domestic' && d.targets) {
    h += '<div class="fg"><div class="fl">타깃</div>';
    d.targets.forEach((t,i) => {
      h += '<div class="sub-card"><input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(t.label) + '" oninput="slides[cur].d.targets[' + i + '].label=this.value"/><textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.targets[' + i + '].detail=this.value">' + esc(t.detail) + '</textarea></div>';
    });
    h += '</div>';
  }

  // Overseas agents
  if (s.type === 'growth_overseas_agents' && d.agents) {
    h += '<div class="fg"><div class="fl">에이전트</div><table class="dt"><thead><tr><th>지역</th><th>수</th><th>국가</th></tr></thead><tbody>'
      + d.agents.map((a,i) => '<tr><td><input value="' + esc(a.region) + '" oninput="slides[cur].d.agents[' + i + '].region=this.value"/></td><td><input type="number" value="' + a.count + '" oninput="slides[cur].d.agents[' + i + '].count=+this.value"/></td><td><input value="' + esc(a.countries || '') + '" oninput="slides[cur].d.agents[' + i + '].countries=this.value"/></td></tr>').join('')
      + '</tbody></table></div>';
    if (d.strategy) h += '<div class="fg"><div class="fl">전략</div><textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.strategy=this.value.split(\'\\n\')">' + esc(d.strategy.join('\n')) + '</textarea></div>';
  }

  // Overseas ODA
  if (s.type === 'growth_overseas_oda' && d.projects) {
    h += '<div class="fg"><div class="fl">ODA 프로젝트</div>';
    d.projects.forEach((p,i) => {
      h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(p.status) + '" oninput="slides[cur].d.projects[' + i + '].status=this.value" placeholder="상태"/><input class="fi fi-sm" style="width:80px" value="' + esc(p.year) + '" oninput="slides[cur].d.projects[' + i + '].year=this.value"/></div>'
        + '<input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(p.name) + '" oninput="slides[cur].d.projects[' + i + '].name=this.value" placeholder="이름"/>'
        + '<textarea class="fi fi-sm" rows="2" style="margin-bottom:4px" oninput="slides[cur].d.projects[' + i + '].desc=this.value">' + esc(p.desc) + '</textarea>'
        + '<div style="display:flex;gap:6px"><input class="fi fi-sm" style="flex:1" value="' + esc(p.amount) + '" oninput="slides[cur].d.projects[' + i + '].amount=this.value" placeholder="금액"/><input class="fi fi-sm" style="flex:1" value="' + esc(p.schedule) + '" oninput="slides[cur].d.projects[' + i + '].schedule=this.value" placeholder="스케줄"/></div>'
        + '</div>';
    });
    h += '</div>';
  }

  // Overseas corp
  if (s.type === 'growth_overseas_corp') {
    if (d.regions) {
      h += '<div class="fg"><div class="fl">대륙별 거점</div>';
      d.regions.forEach((r,i) => {
        h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(r.region) + '" oninput="slides[cur].d.regions[' + i + '].region=this.value"/><input class="fi fi-sm" type="number" style="width:80px" value="' + r.count + '" oninput="slides[cur].d.regions[' + i + '].count=+this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.regions[' + i + '].samples=this.value.split(\'\\n\')">' + esc((r.samples||[]).join('\n')) + '</textarea></div>';
      });
      h += '</div>';
    }
    if (d.pipeline) {
      h += '<div class="fg"><div class="fl">파이프라인</div>';
      d.pipeline.forEach((p,i) => {
        h += '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(p.name) + '" oninput="slides[cur].d.pipeline[' + i + '].name=this.value"/><input class="fi fi-sm" style="width:120px" value="' + esc(p.status) + '" oninput="slides[cur].d.pipeline[' + i + '].status=this.value"/></div>';
      });
      h += '</div>';
    }
  }

  // Success strategy
  if (s.type === 'success_strategy') {
    if (d.cycle) {
      h += '<div class="fg"><div class="fl">사이클</div>';
      d.cycle.forEach((c,i) => {
        h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:80px" value="' + esc(c.tag) + '" oninput="slides[cur].d.cycle[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(c.title) + '" oninput="slides[cur].d.cycle[' + i + '].title=this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.cycle[' + i + '].desc=this.value">' + esc(c.desc) + '</textarea></div>';
      });
      h += '</div>';
    }
    if (d.principles) {
      h += '<div class="fg"><div class="fl">원칙</div>';
      d.principles.forEach((p,i) => {
        h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:50px" value="' + esc(p.num) + '" oninput="slides[cur].d.principles[' + i + '].num=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(p.title) + '" oninput="slides[cur].d.principles[' + i + '].title=this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.principles[' + i + '].desc=this.value">' + esc(p.desc) + '</textarea></div>';
      });
      h += '</div>';
    }
  }

  // Financial results
  if (s.type === 'financial_results') {
    const revCols = [{path:'revYears',def:2027},{path:'revenue',def:0}];
    h += '<div class="fg">' + secHead('매출액 (연도별)', revCols, '연도 추가') + '<table class="dt"><thead><tr><th>년</th><th>매출</th><th></th></tr></thead><tbody>'
      + d.revYears.map((y,i) => '<tr><td><input value="' + y + '" oninput="slides[cur].d.revYears[' + i + ']=+this.value"/></td><td><input type="number" value="' + d.revenue[i] + '" oninput="slides[cur].d.revenue[' + i + ']=+this.value"/></td><td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(revCols) + ',' + i + ')\'>×</span></td></tr>').join('')
      + '</tbody></table></div>';
    const opCols = [{path:'opYears',def:2027},{path:'opinc',def:0},{path:'oprate',def:0}];
    h += '<div class="fg">' + secHead('영업이익 / 이익률', opCols, '연도 추가') + '<table class="dt"><thead><tr><th>년</th><th>이익</th><th>%</th><th></th></tr></thead><tbody>'
      + d.opYears.map((y,i) => '<tr><td><input value="' + y + '" oninput="slides[cur].d.opYears[' + i + ']=+this.value"/></td><td><input type="number" value="' + d.opinc[i] + '" oninput="slides[cur].d.opinc[' + i + ']=+this.value"/></td><td><input type="number" step="0.01" value="' + d.oprate[i] + '" oninput="slides[cur].d.oprate[' + i + ']=+this.value"/></td><td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(opCols) + ',' + i + ')\'>×</span></td></tr>').join('')
      + '</tbody></table></div>';
  }

  // financial_results END

  // Sales breakdown
  if (s.type === 'sales_breakdown') {
    if (d.cats) {
      h += '<div class="fg"><div class="fl">카테고리</div>';
      d.cats.forEach((c,i) => {
        h += '<div class="sub-card"><input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(c.label) + '" oninput="slides[cur].d.cats[' + i + '].label=this.value"/>'
          + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" value="' + esc(c.amount) + '" oninput="slides[cur].d.cats[' + i + '].amount=this.value" placeholder="금액"/><input class="fi fi-sm" style="width:60px" value="' + esc(c.unit) + '" oninput="slides[cur].d.cats[' + i + '].unit=this.value" placeholder="단위"/><select class="fi fi-sm" style="width:80px" onchange="slides[cur].d.cats[' + i + '].color=this.value"><option value="red"' + (c.color==='red' ? ' selected':'') + '>red</option><option value="grey"' + (c.color==='grey' ? ' selected':'') + '>grey</option><option value="lime"' + (c.color==='lime' ? ' selected':'') + '>lime</option></select></div>'
          + '<textarea class="fi fi-sm" rows="3" oninput="slides[cur].d.cats[' + i + '].items=this.value.split(\'\\n\')">' + esc((c.items||[]).join('\n')) + '</textarea>'
          + '</div>';
      });
      h += '</div>';
    }
    if (d.total) {
      h += '<div class="sub-card"><div class="sc-hdr">합계</div><div style="display:flex;gap:6px"><input class="fi fi-sm" value="' + esc(d.total.val) + '" oninput="slides[cur].d.total.val=this.value" placeholder="값"/><input class="fi fi-sm" style="width:60px" value="' + esc(d.total.unit) + '" oninput="slides[cur].d.total.unit=this.value" placeholder="단위"/><input class="fi fi-sm" style="flex:2" value="' + esc(d.total.label) + '" oninput="slides[cur].d.total.label=this.value" placeholder="라벨"/></div></div>';
    }
  }

  // Semi annual
  if (s.type === 'semi_annual') {
    const saCols = [{path:'periods',def:''},{path:'values',def:0}];
    h += '<div class="fg">' + secHead('반기 매출', saCols, '기간 추가') + '<table class="dt"><thead><tr><th>기간</th><th>금액</th><th></th></tr></thead><tbody>'
      + d.periods.map((p,i) => '<tr><td><input value="' + esc(p) + '" oninput="slides[cur].d.periods[' + i + ']=this.value"/></td><td><input type="number" value="' + d.values[i] + '" oninput="slides[cur].d.values[' + i + ']=+this.value"/></td><td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(saCols) + ',' + i + ')\'>×</span></td></tr>').join('')
      + '</tbody></table></div>';
  }

  // semi_annual END

  // Backlog
  if (s.type === 'backlog' && d.items) {
    const blCols = [{path:'items',def:{client:'',amount:'',biz:''}}];
    h += '<div class="fg">' + secHead('수주잔고 (' + d.items.length + '건)', blCols, '거래처 추가') + '<div class="scroll-y" style="max-height:300px"><table class="dt"><thead><tr><th>거래처</th><th>금액</th><th>사업</th><th></th></tr></thead><tbody>'
      + d.items.map((it,i) => '<tr><td><input value="' + esc(it.client) + '" oninput="slides[cur].d.items[' + i + '].client=this.value"/></td><td><input value="' + esc(it.amount) + '" oninput="slides[cur].d.items[' + i + '].amount=this.value"/></td><td><input value="' + esc(it.biz) + '" oninput="slides[cur].d.items[' + i + '].biz=this.value"/></td><td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(blCols) + ',' + i + ')\'>×</span></td></tr>').join('')
      + '</tbody></table></div></div>';
  }

  // backlog END

  // Sales projection
  if (s.type === 'sales_projection' && d.sections) {
    d.sections.forEach((sec, si) => {
      h += '<div class="sub-card"><div class="sc-hdr">' + esc(sec.year) + ' (' + esc(sec.total) + ')</div>'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(sec.title) + '" oninput="slides[cur].d.sections[' + si + '].title=this.value"/><input class="fi fi-sm" style="width:80px" value="' + esc(sec.total) + '" oninput="slides[cur].d.sections[' + si + '].total=this.value"/></div>'
        + '<div class="scroll-y" style="max-height:240px"><table class="dt"><thead><tr><th>거래처</th><th>금액</th><th>사업</th></tr></thead><tbody>'
        + sec.items.map((it,i) => '<tr><td><input value="' + esc(it.client) + '" oninput="slides[cur].d.sections[' + si + '].items[' + i + '].client=this.value"/></td><td><input value="' + esc(it.amount) + '" oninput="slides[cur].d.sections[' + si + '].items[' + i + '].amount=this.value"/></td><td><input value="' + esc(it.biz) + '" oninput="slides[cur].d.sections[' + si + '].items[' + i + '].biz=this.value"/></td></tr>').join('')
        + '</tbody></table></div></div>';
    });
  }

  // KPI 3-year
  if (s.type === 'kpi_3yr') {
    if (d.kpis) {
      h += '<div class="fg"><div class="fl">KPI</div><table class="dt"><thead><tr><th>지표</th><th>단위</th>'
        + (d.years||[]).map(y => '<th>' + esc(y) + '</th>').join('')
        + '</tr></thead><tbody>'
        + d.kpis.map((k,i) => '<tr><td><input value="' + esc(k.name) + '" oninput="slides[cur].d.kpis[' + i + '].name=this.value"/></td><td><input value="' + esc(k.unit) + '" oninput="slides[cur].d.kpis[' + i + '].unit=this.value"/></td>'
          + (k.vals||[]).map((v,j) => '<td><input type="number" step="0.1" value="' + v + '" oninput="slides[cur].d.kpis[' + i + '].vals[' + j + ']=+this.value"/></td>').join('')
          + '</tr>').join('')
        + '</tbody></table></div>';
    }
    if (d.goals) {
      h += '<div class="fg"><div class="fl">목표</div>';
      d.goals.forEach((g,i) => {
        h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:50px" value="' + esc(g.tag) + '" oninput="slides[cur].d.goals[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(g.title) + '" oninput="slides[cur].d.goals[' + i + '].title=this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.goals[' + i + '].desc=this.value">' + esc(g.desc) + '</textarea></div>';
      });
      h += '</div>';
    }
  }

  // Financial snapshot
  if (s.type === 'financial_snapshot') {
    const snCols = [{path:'years',def:''},{path:'revenue',def:0},{path:'opinc',def:0},{path:'netinc',def:0}];
    h += '<div class="fg">' + secHead('연도별 데이터', snCols, '연도 추가') + '<table class="dt"><thead><tr><th>년</th><th>매출</th><th>영업이익</th><th>순이익</th><th></th></tr></thead><tbody>'
      + d.years.map((y,i) => '<tr><td><input value="' + esc(String(y)) + '" oninput="slides[cur].d.years[' + i + ']=this.value"/></td><td><input type="number" value="' + d.revenue[i] + '" oninput="slides[cur].d.revenue[' + i + ']=+this.value"/></td><td><input type="number" value="' + d.opinc[i] + '" oninput="slides[cur].d.opinc[' + i + ']=+this.value"/></td><td><input type="number" value="' + d.netinc[i] + '" oninput="slides[cur].d.netinc[' + i + ']=+this.value"/></td><td style="text-align:center"><span class="del-btn" onclick=\'rowDel(' + JSON.stringify(snCols) + ',' + i + ')\'>×</span></td></tr>').join('')
      + '</tbody></table></div>';
  }

  // financial_snapshot END

  // P&L
  if (s.type === 'pl' && d.rows) {
    h += '<div class="fg"><div class="fl">손익 계정</div><div class="scroll-y" style="max-height:340px"><table class="dt"><thead><tr><th>항목</th><th>23E</th><th>24E</th><th>25E</th><th>26E</th></tr></thead><tbody>'
      + d.rows.map((row,i) => '<tr><td><input value="' + esc(row.label) + '" oninput="slides[cur].d.rows[' + i + '].label=this.value"/></td>'
        + ['y23','y24','y25','y26'].map(k => '<td><input value="' + esc(row[k]||'') + '" oninput="slides[cur].d.rows[' + i + '][\'' + k + '\']=this.value"/></td>').join('')
        + '</tr>').join('')
      + '</tbody></table></div></div>';
  }

  // Investment
  if (s.type === 'investment') {
    if (d.terms) {
      h += '<div class="fg"><div class="fl">투자 조건</div>';
      d.terms.forEach((t,i) => {
        h += '<div class="sub-card"><div style="font-size:9.5px;color:var(--ink-muted-48);font-weight:700;letter-spacing:0.08em;margin-bottom:4px">' + esc(t.label) + '</div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.terms[' + i + '].value=this.value">' + esc(t.value) + '</textarea></div>';
      });
      h += '</div>';
    }
    if (d.hl) {
      h += '<div class="sub-card"><div class="sc-hdr">하이라이트</div>'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" value="' + esc(d.hl.invest) + '" oninput="slides[cur].d.hl.invest=this.value" placeholder="투자금"/><input class="fi fi-sm" value="' + esc(d.hl.value) + '" oninput="slides[cur].d.hl.value=this.value" placeholder="밸류"/></div>'
        + '<div style="display:flex;gap:6px"><input class="fi fi-sm" value="' + esc(d.hl.year) + '" oninput="slides[cur].d.hl.year=this.value" placeholder="연도"/><input class="fi fi-sm" style="flex:2" value="' + esc(d.hl.goal) + '" oninput="slides[cur].d.hl.goal=this.value" placeholder="목표"/></div>'
        + '</div>';
    }
  }

  // TOC
  if (s.type === 'toc' && d.items) {
    h += '<div class="fg"><div class="fl">목차 항목</div>';
    d.items.forEach((it,i) => {
      h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:50px" value="' + esc(it.num) + '" oninput="slides[cur].d.items[' + i + '].num=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(it.title) + '" oninput="slides[cur].d.items[' + i + '].title=this.value"/></div><input class="fi fi-sm" value="' + esc(it.desc) + '" oninput="slides[cur].d.items[' + i + '].desc=this.value"/></div>';
    });
    h += '</div>';
  }

  // ── COMPANY PROFILE deck types ──
  if (s.type === 'c_general') {
    if (d.pillars) h += fgArr('핵심 가치 (한 줄에 하나)', 'pillars', d.pillars, 4);
    if (d.stats) {
      h += '<div class="fg"><div class="fl">주요 지표</div>';
      d.stats.forEach((st, i) => {
        h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:90px" value="' + esc(st.label) + '" oninput="slides[cur].d.stats[' + i + '].label=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(st.value) + '" oninput="slides[cur].d.stats[' + i + '].value=this.value"/></div><input class="fi fi-sm" value="' + esc(st.note || '') + '" oninput="slides[cur].d.stats[' + i + '].note=this.value" placeholder="비고"/></div>';
      });
      h += '</div>';
    }
    if (d.biz) h += fgArr('주요 사업 (한 줄에 하나)', 'biz', d.biz, 4);
  }
  if (s.type === 'c_vision') {
    if (d.values) { h += '<div class="fg"><div class="fl">핵심 가치</div>'; d.values.forEach((v, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px"><input class="fi fi-sm" style="width:80px" value="' + esc(v.tag) + '" oninput="slides[cur].d.values[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(v.desc) + '" oninput="slides[cur].d.values[' + i + '].desc=this.value"/></div></div>'; }); h += '</div>'; }
    if (d.blocks) { h += '<div class="fg"><div class="fl">비전 / 미션 블록</div>'; d.blocks.forEach((b, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:50px" value="' + esc(b.num) + '" oninput="slides[cur].d.blocks[' + i + '].num=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(b.label) + '" oninput="slides[cur].d.blocks[' + i + '].label=this.value"/></div><textarea class="fi fi-sm" rows="2" oninput="slides[cur].d.blocks[' + i + '].text=this.value">' + esc(b.text) + '</textarea></div>'; }); h += '</div>'; }
  }
  if (s.type === 'c_org') {
    if (d.mottos) h += fgArr('경영 모토 (한 줄에 하나)', 'mottos', d.mottos, 2);
    if (d.heads) h += fgArr('리더십 (한 줄에 하나)', 'heads', d.heads, 2);
    if (d.divisions) { h += '<div class="fg"><div class="fl">부문 / 팀</div>'; d.divisions.forEach((dv, i) => { h += '<div class="sub-card"><input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(dv.name) + '" oninput="slides[cur].d.divisions[' + i + '].name=this.value"/>' + fgArr('팀 (한 줄에 하나)', 'divisions.' + i + '.teams', dv.teams, 3) + '</div>'; }); h += '</div>'; }
  }
  if (s.type === 'c_workgroup' && d.groups) {
    h += '<div class="fg"><div class="fl">그룹</div>'; d.groups.forEach((g, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(g.label) + '" oninput="slides[cur].d.groups[' + i + '].label=this.value"/><select class="fi fi-sm" style="width:70px" onchange="slides[cur].d.groups[' + i + '].color=this.value"><option value="red"' + (g.color === 'red' ? ' selected' : '') + '>red</option><option value="grey"' + (g.color === 'grey' ? ' selected' : '') + '>grey</option><option value="lime"' + (g.color === 'lime' ? ' selected' : '') + '>lime</option></select></div><input class="fi fi-sm" style="margin-bottom:4px" value="' + esc(g.sub) + '" oninput="slides[cur].d.groups[' + i + '].sub=this.value" placeholder="서브"/>' + fgArr('업체 (한 줄에 하나)', 'groups.' + i + '.items', g.items, 5) + '</div>'; }); h += '</div>';
  }
  if (s.type === 'c_ip' && d.cards) {
    h += '<div class="fg"><div class="fl">카드</div>'; d.cards.forEach((c, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:90px" value="' + esc(c.tag) + '" oninput="slides[cur].d.cards[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(c.title) + '" oninput="slides[cur].d.cards[' + i + '].title=this.value"/></div>' + fgArr('항목 (한 줄에 하나)', 'cards.' + i + '.items', c.items, 5) + '</div>'; }); h += '</div>';
  }
  if (s.type === 'c_bizmodel' && d.models) {
    h += '<div class="fg"><div class="fl">사업 모델</div>'; d.models.forEach((m, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:90px" value="' + esc(m.tag) + '" oninput="slides[cur].d.models[' + i + '].tag=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(m.title) + '" oninput="slides[cur].d.models[' + i + '].title=this.value"/></div><textarea class="fi fi-sm" rows="2" style="margin-bottom:4px" oninput="slides[cur].d.models[' + i + '].sub=this.value">' + esc(m.sub) + '</textarea>' + fgArr('항목 (한 줄에 하나)', 'models.' + i + '.items', m.items, 3) + '</div>'; }); h += '</div>';
  }
  if (s.type === 'c_concept') {
    if (d.chips) h += fgArr('칩 (한 줄에 하나)', 'chips', d.chips, 5);
    if (d.metrics) { h += '<div class="fg"><div class="fl">지표</div>'; d.metrics.forEach((m, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:80px" value="' + esc(m.v) + '" oninput="slides[cur].d.metrics[' + i + '].v=this.value"/><input class="fi fi-sm" style="flex:1" value="' + esc(m.u) + '" oninput="slides[cur].d.metrics[' + i + '].u=this.value"/></div><input class="fi fi-sm" value="' + esc(m.l) + '" oninput="slides[cur].d.metrics[' + i + '].l=this.value" placeholder="설명"/></div>'; }); h += '</div>'; }
  }
  if (s.type === 'c_edu') {
    h += fg('분야명', "d['cat']", d.cat);
    h += fg('강조 문구 (태그라인)', "d['tagline']", d.tagline);
    if (!d.noImage && d.imgLabel !== undefined) h += fg('이미지 라벨', "d['imgLabel']", d.imgLabel);
    if (d.chips) h += fgArr('핵심 키워드 (한 줄에 하나)', 'chips', d.chips, 6);
  }
  if (s.type === 'c_edu5' && d.areas) {
    h += '<div class="fg"><div class="fl">5대 핵심 분야</div>';
    d.areas.forEach((a, i) => {
      h += '<div class="sub-card">'
        + '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="width:120px" value="' + esc(a.kicker || '') + '" oninput="slides[cur].d.areas[' + i + '].kicker=this.value" placeholder="영문 소제목"/><input class="fi fi-sm" style="flex:1" value="' + esc(a.cat || '') + '" oninput="slides[cur].d.areas[' + i + '].cat=this.value" placeholder="분야명"/></div>'
        + '<input class="fi fi-sm" style="width:100%;margin-bottom:4px" value="' + esc(a.tagline || '') + '" oninput="slides[cur].d.areas[' + i + '].tagline=this.value" placeholder="태그라인"/>'
        + '<textarea class="fi fi-sm" rows="3" style="margin-bottom:4px" oninput="slides[cur].d.areas[' + i + '].desc=this.value" placeholder="설명">' + esc(a.desc || '') + '</textarea>'
        + fgArr('키워드 (한 줄에 하나)', 'areas.' + i + '.chips', a.chips, 3)
        + '</div>';
    });
    h += '</div>';
  }
  if (s.type === 'c_overseas') {
    if (d.regions) { h += '<div class="fg"><div class="fl">대륙별 거점</div>'; d.regions.forEach((r, i) => { h += '<div class="sub-card"><div style="display:flex;gap:6px;margin-bottom:4px"><input class="fi fi-sm" style="flex:1" value="' + esc(r.region) + '" oninput="slides[cur].d.regions[' + i + '].region=this.value"/><input class="fi fi-sm" type="number" style="width:70px" value="' + r.count + '" oninput="slides[cur].d.regions[' + i + '].count=+this.value"/></div>' + fgArr('샘플 (한 줄에 하나)', 'regions.' + i + '.samples', r.samples, 3) + '</div>'; }); h += '</div>'; }
    if (d.notes) h += fgArr('비고 (한 줄에 하나)', 'notes', d.notes, 3);
  }

  h += '<div style="height:1px;background:var(--hairline);margin:14px 0"></div>';

  document.getElementById('ep-body').innerHTML = h;
}

/* ── Row add / remove helpers for tables & charts ──
   `cols` is a list of {path, def} describing each parallel array on slides[cur].d
   so revenue charts (year + value arrays) stay in sync.
*/
function dref(path) { return path.split('.').reduce((o, k) => o && o[k], slides[cur].d); }
function rowAdd(cols) {
  cols.forEach(c => {
    const a = dref(c.path);
    if (!Array.isArray(a)) return;
    const last = a[a.length - 1];
    // \uc5f0\ub3c4 \uacc4\uc5f4 \uceec\ub7fc\uc740 \ub9c8\uc9c0\ub9c9 \uac12 +1 \ub85c \uc790\ub3d9 \uc785\ub825 (\uc21c\uc11c\ub300\ub85c)
    if (/year/i.test(c.path) && typeof last === 'number' && Number.isFinite(last)) {
      a.push(last + 1);
    } else if (typeof c.def === 'function') {
      a.push(c.def());
    } else if (c.def && typeof c.def === 'object') {
      a.push(JSON.parse(JSON.stringify(c.def)));
    } else {
      a.push(c.def);
    }
  });
  buildEditor();
}
function rowDel(cols, i) {
  cols.forEach(c => { const a = dref(c.path); if (Array.isArray(a) && a.length > 1) a.splice(i, 1); });
  buildEditor();
}
function rowDelLast(cols) {
  cols.forEach(c => { const a = dref(c.path); if (Array.isArray(a) && a.length > 1) a.pop(); });
  buildEditor();
}
/* section header with right-aligned add / remove-last controls */
function secHead(label, cols, addLabel) {
  return '<div class="fl fl-row">'
    + '<span>' + esc(label) + '</span>'
    + '<span class="fl-btns">'
      + '<button class="fl-add" onclick=\'rowAdd(' + JSON.stringify(cols) + ')\'>+ ' + esc(addLabel || '\ud589 \ucd94\uac00') + '</button>'
      + '<button class="fl-del-last" onclick=\'rowDelLast(' + JSON.stringify(cols) + ')\'>\u2212 \ub9c8\uc9c0\ub9c9 \uc0ad\uc81c</button>'
    + '</span>'
  + '</div>';
}
