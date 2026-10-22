/* Hero background: the mechanism of the paper in motion. In each lane, particles start from standard Gaussian noise
   (left) and are integrated with forward Euler through the exact affine velocity field of a Gaussian target
   (Proposition 1): ten small steps in the blue lane (N = 10), two large ones in the green lane (N = 2). The glow
   marks the emitted action distribution, whose spread is sigma0 * sqrt(rho(N)). Each particle then continues as an
   open-loop rollout whose lateral drift grows with its distance from the centre, so the deep lane fans out about
   twice as wide. Decorative only (aria-hidden); pauses off-screen and for reduced motion. */
(function () {
  "use strict";
  SITE.inits.push(function () {
    var cv = document.getElementById("hero-canvas");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var S0 = 0.587, MU = -0.9;                 /* target spread (Figure 4a fit) and target mean, in noise units */
    function alpha(t) { return (t - (1 - t) * S0 * S0) / (t * t + (1 - t) * (1 - t) * S0 * S0); }
    function factors(N) { var out = []; for (var k = 0; k < N; k++) out.push(1 - alpha(1 - k / N) / N); return out; }
    var LANES = [
      { N: 10, rgb: [37, 99, 235], y: 0.285, label: "N = 10" },
      { N: 2, rgb: [5, 150, 105], y: 0.815, label: "N = 2" }
    ];
    LANES.forEach(function (L) { L.f = factors(L.N); L.g = L.f.reduce(function (p, x) { return p * Math.abs(x); }, 1); });
    var W = 0, Ht = 0, dpr = 1, running = false, visible = true, raf = null, last = 0;
    var parts = [], spawnAcc = 0, geo = null;
    var LIFE = 6.0, FLOW = 0.4;                 /* seconds per particle; share of life spent in the Euler segment */

    function gauss() { var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); }
    function layout() {
      var mobile = W < 700;
      geo = { mobile: mobile, x0: W * 0.04, x1: W * (mobile ? 0.42 : 0.3), x2: W * 0.97, amp: Ht * (mobile ? 0.034 : 0.05) };
    }
    function laneY(L) { return Ht * (geo.mobile ? (L.N === 10 ? 0.12 : 0.93) : L.y); }
    function calm(x, y) {
      var dx = (x - W / 2) / (W * (geo.mobile ? 0.66 : 0.36)), dy = (y - Ht * 0.52) / (Ht * 0.3);
      var d = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0.05, Math.min(1, (d - 0.62) / 0.45));
    }
    function spawn() {
      LANES.forEach(function (L) {
        var z = gauss(), p = [z], d = z;
        for (var k = 0; k < L.N; k++) { d *= L.f[k]; p.push((k + 1) / L.N * MU + d); }
        parts.push({ L: L, p: p, t: 0, drift: 1.2 + 0.6 * Math.random(), wig: Math.random() * 6.28 });
      });
      if (parts.length > 320) parts.splice(0, parts.length - 320);
    }
    function pos(pt, u) {
      var L = pt.L, y0 = laneY(L), A = geo.amp;
      if (u <= FLOW) {
        var fr = u / FLOW * L.N, k = Math.min(L.N - 1, Math.floor(fr)), r = fr - k;
        return [geo.x0 + (geo.x1 - geo.x0) * (fr / L.N), y0 + A * (pt.p[k] + (pt.p[k + 1] - pt.p[k]) * r)];
      }
      var v = (u - FLOW) / (1 - FLOW), fin = pt.p[L.N], dev = fin - MU;
      var y = MU + dev * (1 + pt.drift * Math.pow(v, 1.5) * 1.25) + 0.04 * Math.sin(pt.wig + v * 5) * v;
      return [geo.x1 + (geo.x2 - geo.x1) * v, y0 + A * y];
    }
    function resize() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, r.width); Ht = Math.max(1, r.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(Ht * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout(); draw();
    }
    function draw() {
      if (!W || !geo) return;
      ctx.clearRect(0, 0, W, Ht);
      LANES.forEach(function (L) {
        var y0 = laneY(L), A = geo.amp, col = L.rgb.join(",");
        /* mean path: from the noise mean (0) to the target mean over the Euler segment, then straight on */
        var ym = function (x) { return x <= geo.x1 ? y0 + A * MU * (x - geo.x0) / (geo.x1 - geo.x0) : y0 + A * MU; };
        ctx.strokeStyle = "rgba(" + col + ",0.18)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(geo.x0, ym(geo.x0)); ctx.lineTo(geo.x1, ym(geo.x1)); ctx.lineTo(geo.x2, ym(geo.x2)); ctx.stroke();
        /* Euler nodes as ticks on the mean path */
        for (var k = 0; k <= L.N; k++) {
          var x = geo.x0 + (geo.x1 - geo.x0) * k / L.N, yy = ym(x), m = calm(x, yy);
          ctx.strokeStyle = "rgba(" + col + "," + (0.55 * m).toFixed(3) + ")"; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(x, yy - 5); ctx.lineTo(x, yy + 5); ctx.stroke();
        }
        /* source cloud and emitted distribution */
        var g0 = ctx.createRadialGradient(geo.x0, y0, 0, geo.x0, y0, A * 2.2);
        g0.addColorStop(0, "rgba(120,130,140,0.10)"); g0.addColorStop(1, "rgba(120,130,140,0)");
        ctx.fillStyle = g0; ctx.beginPath(); ctx.arc(geo.x0, y0, A * 2.2, 0, 6.2832); ctx.fill();
        var r1 = Math.max(4, A * 2.1 * L.g), yc = y0 + A * MU, m1 = calm(geo.x1, yc);
        var g1 = ctx.createRadialGradient(geo.x1, yc, 0, geo.x1, yc, r1 * 1.4);
        g1.addColorStop(0, "rgba(" + col + "," + (0.2 * m1).toFixed(3) + ")"); g1.addColorStop(1, "rgba(" + col + ",0)");
        ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(geo.x1, yc, r1 * 1.4, 0, 6.2832); ctx.fill();
        ctx.font = "600 11.5px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(" + col + ",0.85)";
        ctx.fillText(L.label, geo.x0, y0 - A * 2.6 - 4);
      });
      parts.forEach(function (pt) {
        var u = Math.min(1, pt.t / LIFE), col = pt.L.rgb.join(",");
        var fade = u > 0.85 ? Math.max(0, 1 - (u - 0.85) / 0.15) : Math.min(1, u / 0.04);
        var n = 14, u0 = Math.max(0, u - 0.09);
        ctx.lineWidth = 1.2; ctx.lineCap = "round";
        var a = pos(pt, u0);
        for (var i = 1; i <= n; i++) {
          var b = pos(pt, u0 + (u - u0) * i / n), m = calm(b[0], b[1]);
          ctx.strokeStyle = "rgba(" + col + "," + (i / n * 0.5 * fade * m).toFixed(3) + ")";
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
          a = b;
        }
        var mh = calm(a[0], a[1]);
        ctx.fillStyle = "rgba(" + col + "," + (0.9 * fade * mh).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(a[0], a[1], 1.8, 0, 6.2832); ctx.fill();
      });
    }
    function step(dt) {
      spawnAcc += dt;
      while (spawnAcc > 0.06) { spawnAcc -= 0.06; spawn(); }
      parts.forEach(function (pt) { pt.t += dt; });
      parts = parts.filter(function (pt) { return pt.t < LIFE; });
    }
    function frame(ts) {
      if (!running) return;
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      step(dt); draw();
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || SITE.reduced || !visible || document.hidden) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    resize();
    for (var w = 0; w < 110; w++) step(0.055);    /* warm up so the first frame is already populated */
    draw();
    window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) { visible = ents[0].isIntersecting; if (visible) start(); else stop(); }).observe(cv);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    start();
  });
})();
