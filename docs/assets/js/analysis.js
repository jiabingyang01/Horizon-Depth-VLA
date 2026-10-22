/* Section 05: causal interventions (Table III) and further findings. */
(function () {
  "use strict";
  var D = SITE.D, T = SITE.T, C = SITE.charts, col = SITE.colors, f = SITE.fmt;

  function interventions() {
    var V = D.interventions, el = document.getElementById("iv-chart"); if (!V || !el) return;
    var S5 = "#5b6f9e", S20 = "#c0762f";
    C.legend(document.getElementById("iv-legend"), [{ label: "Δ5 = Y(5,2) − Y(5,10)", color: S5, kind: "dot" }, { label: "Δ20 = Y(20,2) − Y(20,10)", color: S20, kind: "dot" }]);
    C.responsive(el, function (w) {
      var narrow = w < 560, rowH = narrow ? 70 : 56, labW = narrow ? 8 : Math.min(230, w * 0.34), m = { t: 10, r: narrow ? 52 : 70, b: 42 }, rows = V.rows, h = m.t + rows.length * rowH + m.b;
      var svg = C.svg(el, w, h, "Depth effect at two horizons under each intervention");
      var x = C.linear(-13, 33, labW, w - m.r), g = C.el("g", null, svg);
      C.xAxis(g, x, h - m.b, [-10, 0, 10, 20, 30], { grid: true, gridTop: m.t, title: "two steps minus ten steps (points)" });
      C.el("line", { x1: x(0), x2: x(0), y1: m.t, y2: h - m.b, stroke: "#111a1c", "stroke-width": 1, opacity: 0.45 }, g);
      C.text(g, w - 2, m.t + 12, "I = Δ20 − Δ5", { "text-anchor": "end", class: "lbl-mono" });
      rows.forEach(function (r, i) {
        var cy = m.t + i * rowH + rowH / 2 + (narrow ? 14 : 6), a = r.s5.diff[0], b = r.s20.diff[0], gr = C.el("g", null, g);
        if (narrow) C.text(gr, 0, cy - 16, r.name, { class: i === 0 ? "lbl-strong" : "lbl" });
        else {
          C.text(gr, labW - 12, cy - 3, r.name, { "text-anchor": "end", class: i === 0 ? "lbl-strong" : "lbl" });
          if (r.group) C.text(gr, labW - 12, cy + 12, r.group.length > 38 ? r.group.slice(0, 36) + "…" : r.group, { "text-anchor": "end", class: "lbl-mono", style: "font-size:10.5px" });
        }
        C.el("line", { x1: x(a), x2: x(b), y1: cy, y2: cy, stroke: "rgba(17,26,28,.25)", "stroke-width": 3, "stroke-linecap": "round" }, gr);
        [[a, S5, r.s5, "s = 5"], [b, S20, r.s20, "s = 20"]].forEach(function (p) {
          var mk = C.marker(gr, "circle", x(p[0]), cy, 6, { fill: p[1], stroke: "#fff", "stroke-width": 2 });
          C.hover(mk, function () { return '<div class="th">' + SITE.esc(r.name) + " · " + p[3] + "</div>" + C.row("N = 10", f(p[2].deep[0]) + " ± " + f(p[2].deep[1])) + C.row("N = 2", f(p[2].shallow[0]) + " ± " + f(p[2].shallow[1])) + C.row("difference", SITE.signed(p[2].diff[0]) + " ± " + f(p[2].diff[1]), p[1]); });
        });
        C.text(gr, w - 2, cy + 5, SITE.signed(r.I), { "text-anchor": "end", class: "lbl-strong", style: "font-size:15px;fill:" + (r.I > 0 ? col.pos : col.neg) });
      });
    });
    var root = document.getElementById("iv-cards");
    root.innerHTML = V.rows.map(function (r) {
      var cell = function (v, best) { return '<div class="c' + (best ? " best" : "") + '"><b>' + f(v[0]) + "</b><small>± " + f(v[1]) + "</small></div>"; };
      return '<div class="card int-card"><h3>' + SITE.esc(r.name) + '</h3><div class="grp">' + SITE.esc(r.group || "the sampler as deployed") + "</div>" +
        '<div class="quad mt-16"><span></span><span class="h">N = 10</span><span class="h">N = 2</span>' +
        '<span class="r">s = 5</span>' + cell(r.s5.deep) + cell(r.s5.shallow) + '<span class="r">s = 20</span>' + cell(r.s20.deep) + cell(r.s20.shallow, r.key === "standard") + "</div>" +
        '<div class="ival"><b style="color:' + (r.I > 0 ? col.pos : col.neg) + '">' + SITE.signed(r.I) + "</b><span>interaction I</span></div></div>";
    }).join("");
  }

  function findings() {
    var ul = document.getElementById("find-list"); if (!ul || !T.analysis) return;
    ul.innerHTML = T.analysis.findings.map(function (x) { return "<li><b>" + SITE.esc(x.t) + "</b><p>" + SITE.pretty(x.p) + "</p></li>"; }).join("");
  }

  SITE.inits.push(interventions, findings);
})();
