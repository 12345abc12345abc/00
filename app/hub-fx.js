/* ─────────────────────────────────────────────
   IEG INSIGHT — Hub particle FX
   Particle network · Shooting stars · Mouse repulsion
   ───────────────────────────────────────────── */
(function () {
  let canvas, ctx, W, H;
  let particles = [], meteors = [];
  let mouse = { x: -9999, y: -9999 };
  let animId = null, active = false, meteorTimer = null;

  const MOBILE      = () => window.innerWidth <= 768;
  const PCOUNT      = () => MOBILE() ? 60 : 115;
  const CONNECT     = () => MOBILE() ? 0  : 138;
  const MOUSE_R     = 160;

  /* ── Particle factory ── */
  function makeP(spread) {
    return {
      x:   Math.random() * W,
      y:   spread ? Math.random() * H : H + 8,
      vx:  (Math.random() - 0.5) * 0.38,
      vy:  -(Math.random() * 0.55 + 0.18),
      r:   Math.random() * 1.8 + 0.4,
      op:  Math.random() * 0.5 + 0.25,
      ph:  Math.random() * Math.PI * 2,
      ps:  Math.random() * 0.018 + 0.008,
      red: Math.random() < 0.1,
    };
  }

  /* ── Meteor factory ── */
  function makeMeteor() {
    const a = (Math.random() * 20 + 18) * Math.PI / 180;
    const s = Math.random() * 5 + 4;
    return {
      x:    Math.random() * W * 1.4,
      y:    -12,
      vx:  -Math.cos(a) * s,
      vy:   Math.sin(a) * s,
      len:  Math.random() * 130 + 60,
      op:   Math.random() * 0.55 + 0.5,
      fade: Math.random() * 0.014 + 0.009,
    };
  }

  function scheduleMeteor() {
    if (!active) return;
    meteorTimer = setTimeout(() => {
      meteors.push(makeMeteor());
      if (Math.random() < 0.25) meteors.push(makeMeteor()); // double burst
      scheduleMeteor();
    }, Math.random() * 4200 + 2000);
  }

  /* ── Canvas resize ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Main draw loop ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const cd = CONNECT();

    /* Connections */
    if (cd > 0) {
      const n = particles.length;
      ctx.lineWidth = 0.55;
      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < cd * cd) {
            const alpha = (1 - Math.sqrt(d2) / cd) * 0.22;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    /* Particles */
    particles.forEach((p, i) => {
      p.ph += p.ps;

      /* Mouse repulsion */
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < MOUSE_R * MOUSE_R && md2 > 1) {
        const md = Math.sqrt(md2);
        const f  = (1 - md / MOUSE_R) * 0.055;
        p.vx += (mdx / md) * f;
        p.vy += (mdy / md) * f;
      }

      p.vx *= 0.974;
      p.vy *= 0.974;
      p.x  += p.vx;
      p.y  += p.vy;

      if (p.x < -14) p.x = W + 14;
      if (p.x > W + 14) p.x = -14;
      if (p.y < -26)  { particles[i] = makeP(false); return; }

      const pulse = 0.68 + Math.sin(p.ph) * 0.32;
      const op    = p.op * pulse;
      const r     = p.r  * (p.red ? 1 + Math.sin(p.ph) * 0.38 : 1);

      if (p.red) {
        /* Red particle — radial glow */
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 7);
        g.addColorStop(0,    `rgba(237,28,36,${op * 0.9})`);
        g.addColorStop(0.35, `rgba(237,28,36,${op * 0.25})`);
        g.addColorStop(1,    'rgba(237,28,36,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 7, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,120,120,${op})`; ctx.fill();
      } else {
        /* White particle — soft halo + core */
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op * 0.1})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`; ctx.fill();
      }
    });

    /* Shooting stars */
    meteors = meteors.filter(m => {
      m.x  += m.vx; m.y += m.vy; m.op -= m.fade;
      if (m.op <= 0 || m.y > H + 20) return false;

      const angle = Math.atan2(m.vy, m.vx);
      const tx = m.x - Math.cos(angle) * m.len;
      const ty = m.y - Math.sin(angle) * m.len;

      const lg = ctx.createLinearGradient(m.x, m.y, tx, ty);
      lg.addColorStop(0,    `rgba(255,255,255,${m.op})`);
      lg.addColorStop(0.22, `rgba(255,255,255,${m.op * 0.55})`);
      lg.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty);
      ctx.strokeStyle = lg; ctx.lineWidth = 1.8; ctx.stroke();

      /* Tip sparkle */
      const sg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 7);
      sg.addColorStop(0, `rgba(255,255,255,${m.op})`);
      sg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(m.x, m.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = sg; ctx.fill();

      return true;
    });

    animId = requestAnimationFrame(draw);
  }

  /* ── Start / Stop ── */
  function start() {
    if (active) return;
    active = true;
    resize();
    if (!particles.length)
      particles = Array.from({ length: PCOUNT() }, () => makeP(true));
    draw();
    scheduleMeteor();
  }

  function stop() {
    active = false;
    if (animId)      { cancelAnimationFrame(animId); animId = null; }
    if (meteorTimer) { clearTimeout(meteorTimer); meteorTimer = null; }
  }

  /* ── Boot ── */
  window.addEventListener('load', () => {
    canvas = document.getElementById('hub-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    start();

    window.addEventListener('resize', () => {
      resize();
      particles = Array.from({ length: PCOUNT() }, () => makeP(true));
    });

    const hub = document.getElementById('hub');
    if (!hub) return;

    hub.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    hub.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    hub.addEventListener('touchmove', e => {
      if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
    }, { passive: true });
    hub.addEventListener('touchend', () => { mouse.x = -9999; mouse.y = -9999; });

    /* Pause when hub hidden, resume when shown */
    new MutationObserver(() => {
      const gone = hub.classList.contains('hidden') || hub.style.display === 'none';
      gone ? stop() : start();
    }).observe(hub, { attributes: true, attributeFilter: ['style', 'class'] });

    /* ── 3D card tilt + spotlight (pointer devices only) ── */
    if (window.matchMedia('(hover: hover)').matches) {
      document.querySelectorAll('.hub-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          const r = this.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          const cx = r.width / 2, cy = r.height / 2;
          const rx = ((y - cy) / cy) * -11;
          const ry = ((x - cx) / cx) * 11;
          this.style.transition = 'border-color 0.12s, background 0.12s, box-shadow 0.12s';
          this.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(12px)';
          this.style.boxShadow = '0 22px 55px -14px rgba(0,0,0,0.75), 0 0 28px -8px rgba(237,28,36,0.28), inset 0 1px 0 rgba(255,255,255,0.14)';
          this.style.setProperty('--mx', x + 'px');
          this.style.setProperty('--my', y + 'px');
        });
        card.addEventListener('mouseleave', function () {
          this.style.transition = 'transform 0.48s cubic-bezier(.22,.61,.36,1), border-color 0.2s, background 0.2s, box-shadow 0.2s';
          this.style.transform = '';
          this.style.boxShadow = '';
          this.style.removeProperty('--mx');
          this.style.removeProperty('--my');
        });
      });
    }

    /* ── Global ESC navigation (편집 모드 제외) ── */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;

      // 편집 모드 계열 → 무시
      if (document.body.classList.contains('studio-mode')) return;
      const vidStudio = document.getElementById('vid-studio');
      if (vidStudio && vidStudio.classList.contains('show')) return;
      const cbStudio = document.getElementById('cb-studio');
      if (cbStudio && cbStudio.classList.contains('show')) return;
      const editHub = document.getElementById('edit-hub');
      if (editHub && editHub.style.display === 'flex') return;

      // 자체 ESC 핸들러가 있는 오버레이 → 무시
      // fsActive: app.js 전역 변수 (전체화면 슬라이드쇼 진행 중)
      if (typeof fsActive !== 'undefined' && fsActive) return;
      // #vp-ov / #vp-ov 는 JS로 display='flex' 세팅되므로 inline style 비교
      const vpOv = document.getElementById('vp-ov');
      if (vpOv && vpOv.style.display === 'flex') return;
      const pwGate = document.getElementById('pw-gate');
      if (pwGate && pwGate.classList.contains('show')) return;

      // 챗봇 패널 닫기
      const cbPanel = document.getElementById('cb-panel');
      if (cbPanel && cbPanel.classList.contains('open')) {
        if (window.closeChatbotPanel) window.closeChatbotPanel();
        return;
      }

      // VIDEO 허브 → 메인 허브
      const videoHub = document.getElementById('video-hub');
      if (videoHub && videoHub.style.display === 'flex' && !videoHub.classList.contains('hidden')) {
        if (window.closeVideoHub) window.closeVideoHub();
        return;
      }

      // 랜딩(덱 타이틀) → 메인 허브
      const landing = document.getElementById('landing');
      if (landing && landing.style.display === 'flex' && !landing.classList.contains('hidden')) {
        if (window.backToHub) window.backToHub();
      }
    });
  });
})();
