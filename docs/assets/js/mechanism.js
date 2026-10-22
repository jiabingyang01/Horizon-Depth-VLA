/* Section 03: the Euler contraction lab (Proposition 1, computed exactly for a Gaussian target) and Figure 4
   redrawn from its data (FIG_DATA.mechanism). */
(function () {
  "use strict";
  var FD = SITE.FD, C = SITE.charts, col = SITE.colors, f = SITE.fmt;

  /* Proposition 1 */
  function alpha(t, s0) { return (t - (1 - t) * s0 * s0) / (t * t + (1 - t) * (1 - t) * s0 * s0); }
  function factors(N, s0) { var out = []; for (var k = 0; k < N; k++) out.push(1 - alpha(1 - k / N, s0) / N); return out; }
  function rho(N, s0) { return factors(N, s0).reduce(function (p, x) { return p * x * x; }, 1) / (s0 * s0); }
  SITE.prop1 = { alpha: alpha, rho: rho };

  function lab() {
    var cv = document.getElementById("lab-canvas"), wrap = document.getElementById("lab-canvas-wrap");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var NS = [1, 2, 3, 4, 5, 8, 10, 15, 20];
    var M = FD.mechanism, fit = M && M.radius.fit;
    var state = { N: 2, s0: fit ? fit.sigma0 : 0.587, playing: !SITE.reduced };
    var MU = [0.95, -0.25], K = 180, Z = [];
    for (var i = 0; i < K; i++) {
      var u = 1 - Math.random(), v = Math.random(), r = Math.sqrt(-2 * Math.log(u));
      Z.push([r * Math.cos(6.2832 * v), r * Math.sin(6.2832 * v)]);
    }
    /* buttons */
    var nb = document.getElementById("lab-n");
    NS.forEach(function (n) {
      var b = SITE.h("button", { type: "button", "aria-pressed": String(n === state.N) }, String(n));
      b.addEventListener("click", function () { SITE.$$("button", nb).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); state.N = n; t0 = null; update(); });
      nb.appendChild(b);
    });
    var sl = document.getElementById("lab-sigma"), so = document.getElementById("lab-sigma-out");
    var rng = SITE.range(sl, function (v) { state.s0 = v / 1000; update(); });
    var pb = document.getElementById("lab-play");
    function paintPlay() {
      pb.setAttribute("aria-pressed", String(state.playing));
      pb.innerHTML = state.playing ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg><span>Pause</span>' : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg><span>Play</span>';
    }
    pb.addEventListener("click", function () { state.playing = !state.playing; paintPlay(); if (state.playing) loop(); });
    paintPlay();

    /* trajectories: positions after each Euler step, x_k = (1 - tau_k) mu + prod(factors) z */
    function traj(z) {
      var fs = factors(state.N, state.s0), out = [[z[0], z[1]]], d = [z[0], z[1]];
      for (var k = 0; k < state.N; k++) {
        d = [d[0] * fs[k], d[1] * fs[k]];
        var m = (k + 1) / state.N;
        out.push([m * MU[0] + d[0], m * MU[1] + d[1]]);
      }
      return out;
    }
    var W = 0, H = 0, dpr = 1;
    function resize() {
      var r = wrap.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(phase) {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);
      var sc = Math.min(W, H) / 5.6, cx = W * 0.42, cy = H * 0.52;
      var X = function (p) { return cx + p[0] * sc; }, Y = function (p) { return cy - p[1] * sc; };
      /* source N(0, I) and target N(mu, s0^2 I), 1-sigma circles */
      ctx.setLineDash([4, 4]); ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(91,104,103,.45)"; ctx.beginPath(); ctx.arc(X([0, 0]), Y([0, 0]), sc, 0, 6.2832); ctx.stroke();
      ctx.strokeStyle = "rgba(5,150,105,.55)"; ctx.beginPath(); ctx.arc(X(MU), Y(MU), sc * state.s0, 0, 6.2832); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "600 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(91,104,103,.8)";
      ctx.fillText("noise N(0, I), τ = 1", X([0, 0]) - sc * 0.9, Y([0, 0]) + sc + 16);
      ctx.fillStyle = "rgba(4,120,87,.9)";
      ctx.fillText("target, N → ∞", X(MU) + sc * state.s0 * 0.72 + 4, Y(MU) - sc * state.s0 * 0.72 - 4);
      var N = state.N, g = Math.sqrt(rho(N, state.s0));
      var steps = N * phase, k = Math.min(N - 1, Math.floor(steps)), fr = Math.min(1, steps - k);
      if (phase >= 1) { k = N - 1; fr = 1; }
      var blue = [37, 99, 235], green = [5, 150, 105], mixc = function (t) { return [0, 1, 2].map(function (i) { return Math.round(blue[i] + (green[i] - blue[i]) * t); }).join(","); };
      Z.forEach(function (z, i) {
        var P = traj(z);
        ctx.strokeStyle = "rgba(" + mixc(Math.min(1, (N - 1) / 9)) + ",.13)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(X(P[0]), Y(P[0]));
        for (var j = 1; j <= k; j++) ctx.lineTo(X(P[j]), Y(P[j]));
        var cur = [P[k][0] + (P[k + 1][0] - P[k][0]) * fr, P[k][1] + (P[k + 1][1] - P[k][1]) * fr];
        ctx.lineTo(X(cur), Y(cur)); ctx.stroke();
        ctx.fillStyle = "rgba(" + mixc(phase) + ",.75)";
        ctx.beginPath(); ctx.arc(X(cur), Y(cur), 2.1, 0, 6.2832); ctx.fill();
      });
      if (phase >= 1) {
        ctx.strokeStyle = "rgba(4,120,87,.95)"; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.arc(X(MU), Y(MU), Math.max(1.5, sc * state.s0 * g), 0, 6.2832); ctx.stroke();
      }
      /* the mean: exactly on mu for every N */
      var mx = X(MU), my = Y(MU);
      ctx.strokeStyle = "#111a1c"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx - 6, my); ctx.lineTo(mx + 6, my); ctx.moveTo(mx, my - 6); ctx.lineTo(mx, my + 6); ctx.stroke();
      ctx.fillStyle = "#33403f"; ctx.font = "600 11.5px 'JetBrains Mono', monospace";
      ctx.fillText(phase >= 1 ? "τ = 0 · N = " + N : "Euler step " + Math.min(N, k + 1) + " / " + N, 12, 20);
    }
    var t0 = null, raf = null;
    function loop() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function tick(ts) {
        if (t0 == null) t0 = ts;
        var dur = 1.6 + 0.12 * state.N, hold = 1.3, t = (ts - t0) / 1000;
        if (t > dur + hold) { t0 = ts; t = 0; }
        draw(Math.min(1, t / dur));
        if (state.playing) raf = requestAnimationFrame(tick);
      });
    }
    function chart() {
      var el = document.getElementById("lab-chart");
      C.responsive(el, function (w) { render(el, w); });
      return el;
    }
    var chartEl = null;
    function render(el, w) {
      var h = 300, m = { l: 44, r: 12, t: 12, b: 44 };
      var svg = C.svg(el, w, h, "Variance gain g(N) versus the number of Euler steps");
      var x = C.linear(0.5, 20.5, m.l, w - m.r), y = C.linear(0, 1.05, h - m.b, m.t), g = C.el("g", null, svg);
      C.yAxis(g, y, m.l, w - m.r, [0, 0.25, 0.5, 0.75, 1], { title: "g(N) = √ρ(N)", titleX: 10 });
      C.xAxis(g, x, h - m.b, [1, 2, 5, 10, 15, 20], { title: "Euler steps N" });
      var pts = []; for (var n = 1; n <= 20; n++) pts.push([x(n), y(Math.sqrt(rho(n, state.s0)))]);
      C.el("path", { d: C.path(pts), fill: "none", stroke: col.acc, "stroke-width": 2.4 }, g);
      pts.forEach(function (p, i) { C.marker(g, "circle", p[0], p[1], i + 1 === state.N ? 6 : 2.6, { fill: i + 1 === state.N ? col.accDeep : col.acc, stroke: "#fff", "stroke-width": i + 1 === state.N ? 2 : 1 }); });
      if (M && fit) {
        M.radius.N.forEach(function (n, i) {
          var v = M.radius.R[i] / fit.A, mk = C.marker(g, "diamond", x(n), y(v), 4.4, { fill: col.radius, stroke: "#fff", "stroke-width": 1.4, opacity: 0.9 });
          C.hover(mk, function () { return '<div class="th">π<sub>0</sub>, measured · N = ' + n + "</div>" + C.row("cloud radius R(N)", f(M.radius.R[i], 3), col.radius) + C.row("R(N) / A", f(v, 3)) + '<div class="tn">A = ' + f(fit.A, 3) + " pins the fitted curve to R(10)</div>"; });
        });
        C.text(g, w - m.r - 4, y(0.08), "◆ π0 measured radius / A (Figure 4a)", { "text-anchor": "end", class: "lbl-mono", style: "fill:" + col.radius });
      }
      var hl = C.el("line", { class: "hover-line", y1: m.t, y2: h - m.b }, g);
      var hit = C.el("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: h - m.t - m.b, class: "hit" }, svg);
      hit.style.cursor = "pointer";
      hit.addEventListener("click", function (e) {
        var r = svg.getBoundingClientRect(), n = Math.max(1, Math.min(20, Math.round(x.invert(e.clientX - r.left))));
        var near = NS.reduce(function (a, b) { return Math.abs(b - n) < Math.abs(a - n) ? b : a; }, NS[0]);
        SITE.$$("button", nb).forEach(function (bt) { bt.setAttribute("aria-pressed", String(+bt.textContent === near)); });
        state.N = near; t0 = null; update();
      });
      hit.addEventListener("pointermove", function (e) {
        var r = svg.getBoundingClientRect(), n = Math.max(1, Math.min(20, Math.round(x.invert(e.clientX - r.left))));
        hl.setAttribute("x1", x(n)); hl.setAttribute("x2", x(n)); hl.classList.add("on");
        C.tip.show('<div class="th">N = ' + n + "</div>" + C.row("ρ(N)", f(rho(n, state.s0), 4)) + C.row("g(N)", f(Math.sqrt(rho(n, state.s0)), 3), col.acc) + '<div class="tn">click to animate this depth</div>', e, hit);
      });
      hit.addEventListener("pointerleave", function () { hl.classList.remove("on"); C.tip.hide(); });
    }
    function update() {
      so.textContent = state.s0.toFixed(3);
      sl.value = String(Math.round(state.s0 * 1000)); rng.paint();
      var N = state.N, r = rho(N, state.s0), gN = Math.sqrt(r), g10 = Math.sqrt(rho(10, state.s0));
      document.getElementById("lab-g").textContent = gN.toFixed(3);
      document.getElementById("lab-rho").innerHTML = "ρ(" + N + ") = " + r.toFixed(4) + " · spread " + (gN * state.s0).toFixed(3) + " vs. target " + state.s0.toFixed(3);
      document.getElementById("lab-bar").style.width = (gN * 100) + "%";
      document.getElementById("lab-ratio").innerHTML = '<div class="k">Spread relative to N = 10</div><div class="v">' + (gN / g10).toFixed(3) + '</div><div class="d">g(' + N + ") / g(10). The mean of the emitted chunk equals μ for every N, so fewer steps change only how far the draws fall from it.</div>";
      document.getElementById("lab-eq").innerHTML = N === 1
        ? "<b>N = 1.</b> The first step starts at τ = 1, where α(1) = 1, so every draw lands exactly on the mean: ρ(1) = 0. The measured π<sub>0</sub> cloud keeps a residual at N = 1 because the learned velocity field is not this Gaussian one."
        : "<b>N = " + N + ".</b> Each step multiplies the deviation from the mean path by (1 − α(τ<sub>k</sub>)/N); after " + N + " steps the spread is " + gN.toFixed(3) + " of the target's, and it recovers at the rate 1 − c/N with c(σ<sub>0</sub>) = " + cconst(state.s0).toFixed(3) + ".";
      document.getElementById("lab-foot").textContent = "dashed: noise and exact target · solid: emitted spread · cross: mean";
      if (chartEl) render(chartEl, Math.floor(chartEl.clientWidth));
      t0 = null;
      if (!state.playing) draw(1); else loop();
    }
    function cconst(s0) { var n = 4000, sum = 0; for (var i = 0; i < n; i++) { var a = alpha((i + 0.5) / n, s0); sum += a * a; } return 2 + sum / n; }
    resize();
    if ("ResizeObserver" in window) new ResizeObserver(function () { resize(); if (!state.playing) draw(1); }).observe(wrap);
    chartEl = chart();
    update();
    SITE.onVisible(wrap, function () { if (state.playing) loop(); });
  }

  /* ---------------------------------------------------------- Figure 4a */
  function radius() {
    var M = FD.mechanism, el = document.getElementById("m-radius"); if (!M || !el) return;
    var R = M.radius;
    C.legend(document.getElementById("m-radius-legend"), [{ label: "measured, π0 (95% interval)", color: col.radius, kind: "dot" }, { label: "Proposition 1, fitted on N ≥ 2 (σ0 = " + f(R.fit.sigma0, 3) + ")", color: col.fit, kind: "dash" }]);
    C.responsive(el, function (w) {
      var h = 280, m = { l: 46, r: 14, t: 12, b: 44 };
      var svg = C.svg(el, w, h, "Cloud radius versus sampling depth");
      var lx = function (n) { return Math.log(n); };
      var x = C.linear(Math.log(0.89), Math.log(11.2), m.l, w - m.r), y = C.linear(-0.06, 1.05, h - m.b, m.t), g = C.el("g", null, svg);
      C.yAxis(g, y, m.l, w - m.r, [0, 0.25, 0.5, 0.75, 1], { title: "cloud radius", titleX: 10 });
      var ax = C.el("g", { class: "axis" }, g);
      [1, 2, 3, 5, 10].forEach(function (n) { C.text(ax, x(lx(n)), h - m.b + 18, String(n), { "text-anchor": "middle" }); C.el("line", { x1: x(lx(n)), x2: x(lx(n)), y1: m.t, y2: h - m.b, stroke: "rgba(17,26,28,.05)" }, g); });
      C.text(ax, (m.l + w - m.r) / 2, h - m.b + 36, "sampling depth N (log scale)", { "text-anchor": "middle", class: "axis-title" });
      C.el("line", { class: "domain", x1: m.l, x2: w - m.r, y1: h - m.b + 0.5, y2: h - m.b + 0.5 }, g);
      C.el("path", { d: C.path(R.fit.N.map(function (n, i) { return [x(lx(n)), y(R.fit.R[i])]; })), fill: "none", stroke: col.fit, "stroke-width": 2, "stroke-dasharray": "5 3" }, g);
      R.N.forEach(function (n, i) {
        var cx = x(lx(n));
        C.el("line", { x1: cx, x2: cx, y1: y(R.ci[i][0]), y2: y(R.ci[i][1]), stroke: col.radius, "stroke-width": 1.4 }, g);
        var mk = C.marker(g, "circle", cx, y(R.R[i]), 5, { fill: col.radius, stroke: "#fff", "stroke-width": 1.5 });
        var mi = R.fit.N.indexOf(n);
        C.hover(mk, function () { return '<div class="th">N = ' + n + "</div>" + C.row("measured radius", f(R.R[i], 3), col.radius) + C.row("95% interval", f(R.ci[i][0], 3) + " – " + f(R.ci[i][1], 3)) + (mi >= 0 ? C.row("Proposition 1", f(R.fit.R[mi], 3), col.fit) : ""); });
      });
      C.text(g, x(lx(1)) + 8, y(0.02) - 8, "model predicts 0", { class: "lbl-mono", style: "fill:" + col.fit });
    });
  }

  /* ---------------------------------------------------------- Figure 4b */
  function spread() {
    var M = FD.mechanism, el = document.getElementById("m-spread"); if (!M || !el) return;
    var S = M.spread, xmax = S.xmax || 30;
    C.legend(document.getElementById("m-spread-legend"), [{ label: "N = 10", color: col.fanDeep, kind: "band" }, { label: "N = 2", color: col.fanShallow, kind: "sq" }, { label: "seeds disagree on the sign", color: col.band, kind: "band" }]);
    C.responsive(el, function (w) {
      var h = 280, m = { l: 46, r: 14, t: 12, b: 44 };
      var svg = C.svg(el, w, h, "Open-loop spread over execution horizon");
      var x = C.linear(1, xmax, m.l, w - m.r), y = C.linear(-3, 3, h - m.b, m.t), g = C.el("g", null, svg);
      C.el("rect", { x: x(S.band[0]), y: m.t, width: x(S.band[1]) - x(S.band[0]), height: h - m.b - m.t, fill: col.band, opacity: 0.32 }, g);
      C.yAxis(g, y, m.l, w - m.r, [-2, 0, 2], { title: "open-loop spread", titleX: 10, decimals: 0 });
      C.xAxis(g, x, h - m.b, [1, 10, 20, 30], { title: "execution horizon s" });
      var idx = S.s.map(function (s, i) { return i; }).filter(function (i) { return S.s[i] <= xmax; });
      [[S.N10, col.fanDeep, 0.38], [S.N2, col.fanShallow, 0.62]].forEach(function (p) {
        var top = idx.map(function (i) { return [x(S.s[i]), y(p[0][i])]; }), bot = idx.map(function (i) { return [x(S.s[i]), y(-p[0][i])]; }).reverse();
        C.el("path", { d: "M" + top.concat(bot).map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join("L") + "Z", fill: p[1], opacity: p[2], stroke: p[1], "stroke-width": 1 }, g);
      });
      C.el("line", { x1: m.l, x2: w - m.r, y1: y(0), y2: y(0), stroke: "#111a1c", "stroke-width": 1, opacity: 0.5 }, g);
      var hl = C.el("line", { class: "hover-line", y1: m.t, y2: h - m.b }, g);
      var hit = C.el("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: h - m.t - m.b, class: "hit" }, svg);
      var si = 19;
      function at(evt) {
        if (evt && evt.clientX != null) { var r = svg.getBoundingClientRect(); si = Math.max(0, Math.min(idx.length - 1, Math.round(x.invert(evt.clientX - r.left)) - 1)); }
        hl.setAttribute("x1", x(S.s[si])); hl.setAttribute("x2", x(S.s[si])); hl.classList.add("on");
        return '<div class="th">s = ' + S.s[si] + "</div>" + C.row("N = 10 spread", f(S.N10[si], 3), col.fanDeep) + C.row("N = 2 spread", f(S.N2[si], 3), col.fanShallow) + C.row("ratio", f(S.N10[si] / S.N2[si], 2) + "×");
      }
      hit.addEventListener("pointermove", function (e) { C.tip.show(at(e), e, hit); });
      C.hover(hit, function () { return at(null); }, null, function () { hl.classList.remove("on"); });
    });
  }

  SITE.inits.push(lab, radius, spread);
})();
