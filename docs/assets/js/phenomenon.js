/* Section 02: Figure 1 (sign reversal), the pi0 LIBERO-Long 2 x 2 of Table I, and Figure 3 (s x N grid). */
(function () {
  "use strict";
  var D = SITE.D, FD = SITE.FD, C = SITE.charts, col = SITE.colors, f = SITE.fmt;

  /* ---------------------------------------------------------- Figure 1 */
  function reversal() {
    var P = FD.phenomenon, el = document.getElementById("ph-chart"); if (!P || !el) return;
    var state = { m: "all" };
    SITE.segmented(document.getElementById("ph-model"), [{ value: "all", label: "All" }].concat(P.map(function (s) { return { value: s.name, label: SITE.modelHTML(s.name), dot: s.color }; })),
      state.m, function (v) { state.m = v; resp.redraw(); });
    C.legend(document.getElementById("ph-legend"), P.map(function (s) { return { label: s.name + " (H = " + s.H + ", N0 = " + s.N0 + ")", color: s.color, kind: "line" }; })
      .concat([{ label: "all three seeds agree in sign", color: "#33403f", kind: "dot" }, { label: "seeds disagree", kind: "hollow" }]));
    var resp = C.responsive(el, function (w) {
      var h = Math.max(280, Math.min(380, w * 0.56)), m = { l: 46, r: 14, t: 16, b: 46 };
      var svg = C.svg(el, w, h, "Paired contrast between two-step and default sampling versus execution horizon");
      var x = C.linear(-1.5, 53, m.l, w - m.r), y = C.linear(-10.5, 16.2, h - m.b, m.t), g = C.el("g", null, svg);
      C.el("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: y(0) - m.t, fill: "rgba(31,119,180,.05)" }, g);
      C.yAxis(g, y, m.l, w - m.r, [-10, -5, 0, 5, 10, 15], { title: "Y(s, 2) − Y(s, N0)  (points)", titleX: 10, decimals: 0 });
      C.xAxis(g, x, h - m.b, [0, 10, 20, 30, 40, 50], { title: "execution horizon s" });
      C.el("line", { x1: m.l, x2: w - m.r, y1: y(0), y2: y(0), stroke: "#111a1c", "stroke-dasharray": "4 3", "stroke-width": 1 }, g);
      C.text(g, w - m.r - 4, m.t + 14, "N = 2 better", { "text-anchor": "end", class: "lbl-mono", style: "fill:#1f77b4;font-weight:600" });
      C.text(g, w - m.r - 4, h - m.b - 8, "N = N0 better", { "text-anchor": "end", class: "lbl-mono" });
      P.forEach(function (s) {
        var on = state.m === "all" || state.m === s.name, op = on ? 1 : 0.12;
        var gr = C.el("g", { opacity: op }, g);
        C.el("path", { d: C.path(s.s.map(function (v, i) { return [x(v), y(s.mean[i])]; })), fill: "none", stroke: s.color, "stroke-width": 2 }, gr);
        s.s.forEach(function (v, i) {
          var cx = x(v), lo = y(s.mean[i] - s.sd[i]), hi = y(s.mean[i] + s.sd[i]);
          C.el("line", { x1: cx, x2: cx, y1: lo, y2: hi, stroke: s.color, "stroke-width": 1.2 }, gr);
          C.el("line", { x1: cx - 3, x2: cx + 3, y1: lo, y2: lo, stroke: s.color, "stroke-width": 1.2 }, gr);
          C.el("line", { x1: cx - 3, x2: cx + 3, y1: hi, y2: hi, stroke: s.color, "stroke-width": 1.2 }, gr);
          var mk = C.marker(gr, col.shapes[s.name], cx, y(s.mean[i]), 4.6, { fill: s.solid[i] ? s.color : "#fff", stroke: s.color, "stroke-width": 1.8 });
          if (on) C.hover(mk, function () {
            return '<div class="th">' + SITE.modelHTML(s.name) + " · s = " + v + "</div>" + C.row("Y(s,2) − Y(s," + s.N0 + ")", SITE.signed(s.mean[i], 2) + " ± " + f(s.sd[i], 2), s.color) +
              '<div class="tn">' + (s.solid[i] ? "all three seeds agree in sign" : "the seeds disagree in sign") + "</div>";
          });
        });
      });
    });
  }

  /* ---------------------------------------------------------- pi0 LIBERO-Long 2 x 2 */
  function cross() {
    var p0 = D.libero.models.filter(function (m) { return m.key === "pi0"; })[0], el = document.getElementById("ph-cross");
    if (!p0 || !el) return;
    var L = p0.cells.Long, R = col.roles;
    var lines = [
      { s: p0.s[0], a: L[0], b: L[1], ca: R.sd, cb: R.ss, line: "#5b6f9e", lab: "s = " + p0.s[0] },
      { s: p0.s[2], a: L[2], b: L[3], ca: R.ld, cb: R.ls, line: "#c0762f", lab: "s = " + p0.s[2] }
    ];
    C.responsive(el, function (w) {
      var h = 250, m = { l: 44, r: 70, t: 18, b: 40 };
      var svg = C.svg(el, w, h, "pi0 LIBERO-Long success at two horizons and two depths");
      var x0 = m.l + 30, x1 = w - m.r - 30, y = C.linear(76, 93, h - m.b, m.t), g = C.el("g", null, svg);
      C.yAxis(g, y, m.l, w - m.r, [76, 80, 84, 88, 92], { title: "LIBERO-Long success (%)", titleX: 10, decimals: 0 });
      C.text(g, x0, h - m.b + 20, "N = 10 (default)", { "text-anchor": "middle", class: "lbl" });
      C.text(g, x1, h - m.b + 20, "N = 2", { "text-anchor": "middle", class: "lbl-strong" });
      lines.forEach(function (ln) {
        C.el("line", { x1: x0, x2: x1, y1: y(ln.a[0]), y2: y(ln.b[0]), stroke: ln.line, "stroke-width": 2.6 }, g);
        [[x0, ln.a, ln.ca], [x1, ln.b, ln.cb]].forEach(function (p, k) {
          var mk = C.marker(g, "circle", p[0], y(p[1][0]), 6.5, { fill: p[2], stroke: "#fff", "stroke-width": 2 });
          C.text(g, p[0] + (k ? 12 : -12), y(p[1][0]) + 4, f(p[1][0]), { "text-anchor": k ? "start" : "end", class: "lbl-strong" });
          C.hover(mk, function () { return '<div class="th">π<sub>0</sub> · LIBERO-Long · (' + ln.s + ", " + (k ? 2 : 10) + ")</div>" + C.row("success", f(p[1][0]) + " ± " + f(p[1][1]), p[2]); });
        });
        C.text(g, x1 + 46, y(ln.b[0]) + 4, ln.lab, { class: "lbl-mono", style: "fill:" + ln.line + ";font-weight:600" });
      });
    });
    var q = document.getElementById("ph-quad");
    var cell = function (v, best) { return '<div class="c' + (best ? " best" : "") + '"><b>' + f(v[0]) + "</b><small>± " + f(v[1]) + "</small></div>"; };
    q.innerHTML = '<span></span><span class="h">N = 10</span><span class="h">N = 2</span>' +
      '<span class="r">s = ' + p0.s[0] + "</span>" + cell(L[0]) + cell(L[1]) +
      '<span class="r">s = ' + p0.s[2] + "</span>" + cell(L[2]) + cell(L[3], true);
  }

  /* ---------------------------------------------------------- Figure 3 grid explorer */
  function grid() {
    var G = FD.grid, el = document.getElementById("gx-chart"), side = document.getElementById("gx-side");
    if (!G || !el) return;
    var DEF = { "π0": [5, 10], "π0.5": [5, 10], "GR00T-N1.7": [8, 4] };
    var state = { m: G[0].name, sel: null };
    SITE.segmented(document.getElementById("gx-model"), G.map(function (p) { return { value: p.name, label: SITE.modelHTML(p.name), dot: col.backbones[p.name] }; }), state.m,
      function (v) { state.m = v; state.sel = null; resp.redraw(); });
    function panel() { return G.filter(function (p) { return p.name === state.m; })[0]; }
    function n0(P) { var b = D.setup.backbones.filter(function (x) { return x.name === P.name; })[0]; return b ? b.N0 : P.N[P.N.length - 1]; }
    function info(P, si, ni) {
      var N0 = n0(P), j0 = P.N.indexOf(N0), v = P.Y[si][ni], d = v - P.Y[si][j0];
      var sb = P.s.map(function (s, i) { return '<div class="kv"><span>s = ' + s + "</span><b>N = " + P.row_best[i].N + "<small>" + f(P.row_best[i].v) + "%</small></b></div>"; }).join("");
      side.innerHTML = '<h3 class="label">Cell (s = ' + P.s[si] + ", N = " + P.N[ni] + ")</h3>" +
        '<div class="readout" style="border-top:0;padding-top:0"><div class="v">' + f(v) + '<small style="font-size:15px;color:var(--muted);margin-left:4px">%</small></div>' +
        '<div class="n">' + (ni === j0 ? "the released depth N0 = " + N0 : SITE.signed(d) + " vs. the released depth N0 = " + N0 + " at the same horizon") + "</div></div>" +
        '<h3 class="label mt-24">Best depth per horizon</h3>' + sb +
        '<p class="note">' + (P.runs === "one run" ? "One 500-episode run per cell (seed 7 sweep)." : "Mean over seeds 7/8/9 per cell.") + "</p>";
    }
    var resp = C.responsive(el, function (w) {
      var P = panel(), nS = P.s.length, nN = P.N.length;
      var m = { l: 56, r: 10, t: 10, b: 46 }, cw = Math.min(110, (w - m.l - m.r) / nN), ch = Math.min(44, Math.max(28, cw * 0.42));
      var h = m.t + nS * ch + m.b, gw = cw * nN;
      var svg = C.svg(el, Math.min(w, m.l + gw + m.r), h, "Success over execution horizon and sampling depth");
      var g = C.el("g", null, svg), def = DEF[P.name];
      P.s.forEach(function (s, si) {
        P.N.forEach(function (N, ni) {
          var v = P.Y[si][ni], t = (v - P.vmin) / (P.vmax - P.vmin), fill = C.ramp(col.YLGNBU, t);
          var x0 = m.l + ni * cw, y0 = h - m.b - (si + 1) * ch;
          var cg = C.el("g", { class: "heat-cell" }, g);
          C.el("rect", { x: x0, y: y0, width: cw - 1.5, height: ch - 1.5, rx: 4, fill: fill }, cg);
          C.text(cg, x0 + cw / 2 - 0.75, y0 + ch / 2 + 4, f(v, 0), { "text-anchor": "middle", style: "font-size:12.5px;font-weight:600;fill:" + (t > 0.62 ? "#fff" : "#111a1c") });
          if (P.row_best[si].N === N) C.el("rect", { x: x0 + 1, y: y0 + 1, width: cw - 3.5, height: ch - 3.5, rx: 4, class: "best-mark" }, cg);
          if (def && def[0] === s && def[1] === N) C.el("circle", { cx: x0 + 9, cy: y0 + 9, r: 3.2, fill: "#fff", stroke: "#111a1c", "stroke-width": 1.2 }, cg);
          C.hover(cg, function () {
            return '<div class="th">' + SITE.modelHTML(P.name) + " · (s = " + s + ", N = " + N + ")</div>" + C.row("LIBERO-Long success", f(v, 1) + "%", fill) +
              (N !== n0(P) ? C.row("vs. N0 = " + n0(P), SITE.signed(v - P.Y[si][P.N.indexOf(n0(P))])) : "") +
              (P.row_best[si].N === N ? '<div class="tn">best depth at this horizon</div>' : "") + (def && def[0] === s && def[1] === N ? '<div class="tn">released configuration</div>' : "");
          }, function () { info(P, si, ni); });
        });
        C.text(g, m.l - 8, h - m.b - si * ch - ch / 2 + 4, String(s), { "text-anchor": "end", class: "lbl-mono" });
      });
      P.N.forEach(function (N, ni) { C.text(g, m.l + ni * cw + cw / 2, h - m.b + 16, String(N), { "text-anchor": "middle", class: "lbl-mono" }); });
      C.text(g, m.l + gw / 2, h - 8, "sampling depth N (Euler steps)", { "text-anchor": "middle", class: "axis-title" });
      C.text(g, 0, 0, "execution horizon s", { class: "axis-title", transform: "translate(12," + (m.t + nS * ch / 2) + ") rotate(-90)", "text-anchor": "middle" });
      var i0 = def ? P.s.indexOf(def[0]) : 0, j0 = def ? P.N.indexOf(def[1]) : 0;
      info(P, Math.max(0, i0), Math.max(0, j0));
    });
  }

  SITE.inits.push(reversal, cross, grid);
})();
