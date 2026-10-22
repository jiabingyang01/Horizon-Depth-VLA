/* Section 04: benchmark strip, LIBERO (Table I), RoboTwin 2.0 (Table II), real-world setup. */
(function () {
  "use strict";
  var D = SITE.D, FD = SITE.FD, T = SITE.T, C = SITE.charts, col = SITE.colors, f = SITE.fmt;
  var ROLE = ["sd", "ss", "ld", "ls"];   /* order of the four configurations in every Table I block */

  function chip(v, dag) {
    var cls = v > 0 ? "pos" : v < 0 ? "neg" : "zero";
    return '<span class="chip ' + cls + '">' + SITE.signed(v) + (dag ? "<sup>†</sup>" : "") + "</span>";
  }
  function cfgChip(label, role) { return '<span class="cfg-chip"><i style="background:' + col.roles[role] + '"></i>' + label + "</span>"; }

  /* ---------------------------------------------------------- benchmark strip */
  function bench() {
    var root = document.getElementById("bench-strip"); if (!root) return;
    var S = D.setup;
    [
      { img: "bench_libero.webp", full: "bench_libero_full.webp", t: "LIBERO", d: S.LIBERO.tasks + " tasks in 4 suites · " + S.LIBERO.episodes_per_suite + " episodes per suite", cap: "LIBERO-Long (LIBERO-10) tasks, agent view." },
      { img: "bench_robotwin.webp", full: "bench_robotwin_full.webp", t: "RoboTwin 2.0", d: S.RoboTwin.tasks + " bimanual tasks · " + S.RoboTwin.rollouts_per_task + " rollouts each", cap: "RoboTwin 2.0, head camera: the ten tasks printed in Table II." },
      { img: "bench_real.webp", full: "real_world_setup.webp", t: "Real Franka arm", d: S.real_world.tasks.length + " tabletop tasks · overhead ZED 2i", cap: T.figures.real_world.caption }
    ].forEach(function (it) {
      var b = SITE.h("button", { class: "bench", type: "button", "aria-label": "Open image: " + it.t },
        '<span class="ph"><img src="assets/img/' + it.img + '" width="640" height="400" loading="lazy" decoding="async" alt=""></span>' +
        '<span class="cap"><b>' + it.t + "</b><span>" + SITE.esc(it.d) + "</span></span>");
      b.addEventListener("click", function () { SITE.openLightbox("assets/img/" + it.full, it.t, it.cap, it.t); });
      root.appendChild(b);
    });
  }

  /* ---------------------------------------------------------- LIBERO */
  function libero() {
    var L = D.libero; if (!L) return;
    var state = { m: "pi0", metric: "Average" };
    function M() { return L.models.filter(function (x) { return x.key === state.m; })[0]; }
    SITE.segmented(document.getElementById("lib-model"), L.models.map(function (m) { return { value: m.key, label: SITE.modelHTML(m.name) + " <small>H = " + m.H + "</small>", dot: col.backbones[m.name] }; }), state.m,
      function (v) { state.m = v; draw(); r1.redraw(); r2.redraw(); });
    document.getElementById("lib-caption").innerHTML = "<b>" + L.label + ".</b> " + SITE.pretty(L.caption) + " Mean ± sample SD over seeds 7/8/9; latency is per control step.";

    function draw() {
      var m = M(), rows = L.rows;
      var h = '<thead><tr><th class="l" scope="col">Suite</th>' + m.configs.map(function (c, i) { return '<th scope="col">' + cfgChip(c, ROLE[i]) + "</th>"; }).join("") + '<th scope="col">Interaction I</th></tr></thead><tbody>';
      rows.forEach(function (r) {
        var cells = m.cells[r];
        h += '<tr class="' + (r === "Average" ? "grp-end" : "") + '"><td class="l"><b>' + r + "</b></td>" + cells.map(function (c, i) {
          return '<td class="' + (m.best[r] === i ? "cell-best" : "") + '"><span class="v">' + f(c[0]) + '</span><span class="sd">±' + f(c[1]) + "</span></td>";
        }).join("") + '<td class="inter">' + chip(m.I[r][0], m.dagger[r]) + '<span class="sd">±' + f(m.I[r][1]) + "</span></td></tr>";
      });
      h += '<tr class="lat-row"><td class="l">Latency per step</td>' + (m.latency_ms ? m.latency_ms.map(function (v, i) { return '<td class="' + (i === 3 ? "cell-best" : "") + '"><span class="v">' + f(v) + " ms</span></td>"; }).join("") : m.configs.map(function () { return '<td><span class="v">--</span></td>'; }).join("")) + '<td class="inter"><b>' + m.speedup + "</b></td></tr>";
      document.getElementById("lib-table").innerHTML = h + "</tbody>";
    }
    draw();

    /* small multiples: one panel per suite */
    C.legend(document.getElementById("lib-mult-legend"), [
      { label: "short horizon", color: "#5b6f9e", kind: "line" }, { label: "long horizon", color: "#c0762f", kind: "line" },
      { label: "† limited by ceiling effects", color: "#748180", kind: "dot" }
    ]);
    var el = document.getElementById("lib-multiples");
    var r1 = C.responsive(el, function (w) {
      var m = M(), rows = L.rows, cols = w < 520 ? 2 : w < 760 ? 3 : 5, pw = w / cols, ph = 170;
      var nr = Math.ceil(rows.length / cols), h = nr * ph + 6;
      var svg = C.svg(el, w, h, "Interaction per suite");
      rows.forEach(function (r, k) {
        var gx = (k % cols) * pw, gy = Math.floor(k / cols) * ph, c = m.cells[r];
        var vals = c.map(function (x) { return x[0]; }), lo = Math.min.apply(null, vals) - 1.2, hi = Math.max.apply(null, vals) + 1.2;
        var x0 = gx + 26, x1 = gx + pw - 22, y = C.linear(lo, hi, gy + ph - 30, gy + 30), g = C.el("g", null, svg);
        C.el("rect", { x: gx + 4, y: gy + 4, width: pw - 8, height: ph - 8, rx: 12, fill: r === "Long" ? "rgba(5,150,105,.05)" : "rgba(17,26,28,.025)" }, g);
        C.text(g, gx + 14, gy + 20, r, { class: "lbl-strong" });
        var t = C.el("text", { x: gx + pw - 14, y: gy + 20, "text-anchor": "end", class: "lbl-mono", style: "font-weight:650;fill:" + (m.I[r][0] > 0 ? col.pos : col.neg) }, g);
        t.textContent = "I = " + SITE.signed(m.I[r][0]) + (m.dagger[r] ? "†" : "");
        [[0, 1, "#5b6f9e"], [2, 3, "#c0762f"]].forEach(function (p) {
          C.el("line", { x1: x0, x2: x1, y1: y(c[p[0]][0]), y2: y(c[p[1]][0]), stroke: p[2], "stroke-width": 2.2 }, g);
          [[x0, p[0]], [x1, p[1]]].forEach(function (q) {
            var mk = C.marker(g, "circle", q[0], y(c[q[1]][0]), 4.4, { fill: col.roles[ROLE[q[1]]], stroke: "#fff", "stroke-width": 1.4 });
            C.hover(mk, function () { return '<div class="th">' + SITE.modelHTML(m.name) + " · " + r + " · " + m.configs[q[1]] + "</div>" + C.row("success", f(c[q[1]][0]) + " ± " + f(c[q[1]][1]), col.roles[ROLE[q[1]]]); });
          });
        });
        C.text(g, x0, gy + ph - 12, "N = " + m.N[0], { "text-anchor": "middle", class: "lbl-mono" });
        C.text(g, x1, gy + ph - 12, "N = 2", { "text-anchor": "middle", class: "lbl-mono" });
      });
    });

    /* success vs per-step latency */
    var el2 = document.getElementById("lib-pareto");
    var r2 = C.responsive(el2, function (w) {
      var m = M(), h = 300, mg = { l: 46, r: 16, t: 14, b: 46 };
      var svg = C.svg(el2, w, h, "Average success versus per-step latency");
      var ys = m.cells.Average.map(function (c) { return c[0]; }), lo = Math.floor(Math.min.apply(null, ys) - 0.8), hi = Math.ceil(Math.max.apply(null, ys) + 0.8);
      var hasLat = !!m.latency_ms;
      var xs = hasLat ? m.latency_ms : m.N.map(function (n, i) { return n / m.s[i]; });
      var xMax = hasLat ? 16 : 2.2, xTicks = hasLat ? [0, 4, 8, 12, 16] : [0, 0.5, 1.0, 1.5, 2.0];
      var xTitle = hasLat ? "latency per control step (ms)" : "compute per control step (N/s NFE)";
      var x = C.linear(0, xMax, mg.l, w - mg.r), y = C.linear(lo, hi, h - mg.b, mg.t), g = C.el("g", null, svg);
      C.yAxis(g, y, mg.l, w - mg.r, C.ticks(lo, hi, 4), { title: "LIBERO average (%)", titleX: 10 });
      C.xAxis(g, x, h - mg.b, xTicks, { title: xTitle });
      var pts = xs.map(function (v, i) { return { x: v, y: ys[i], i: i }; });
      pts.forEach(function (p) {
        var mk = C.marker(g, "circle", x(p.x), y(p.y), p.i === 3 ? 8 : 6.5, { fill: col.roles[ROLE[p.i]], stroke: "#fff", "stroke-width": 2 });
        C.text(g, x(p.x) + 11, y(p.y) + (p.i % 2 ? 14 : -8), m.configs[p.i], { class: p.i === 3 ? "lbl-strong" : "lbl-mono" });
        C.hover(mk, function () { return '<div class="th">' + SITE.modelHTML(m.name) + " · " + m.configs[p.i] + "</div>" + C.row("average success", f(p.y), col.roles[ROLE[p.i]]) + C.row(hasLat ? "per-step latency" : "NFE / step", f(p.x) + (hasLat ? " ms" : " NFE")); });
      });
      C.text(g, w - mg.r, mg.t + 10, "↖ better", { "text-anchor": "end", class: "lbl-mono" });
    });
  }

  /* ---------------------------------------------------------- RoboTwin 2.0 */
  function robotwin() {
    var R = FD.robotwin; if (!R) return;
    var BK = [{ key: "pi0", name: "π0" }, { key: "pi05", name: "π0.5" }];
    var HOR = [10, 25, 50];
    /* delta by horizon */
    C.legend(document.getElementById("rt-delta-legend"), BK.map(function (b) { return { label: b.name, color: col.backbones[b.name], kind: "line" }; }));
    var el = document.getElementById("rt-delta");
    C.responsive(el, function (w) {
      var h = 290, m = { l: 46, r: 20, t: 20, b: 46 };
      var svg = C.svg(el, w, h, "Depth effect on RoboTwin by execution horizon");
      var x = C.linear(5, 55, m.l, w - m.r), y = C.linear(-8.5, 4.5, h - m.b, m.t), g = C.el("g", null, svg);
      C.el("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: y(0) - m.t, fill: "rgba(5,150,105,.05)" }, g);
      C.yAxis(g, y, m.l, w - m.r, [-8, -6, -4, -2, 0, 2, 4], { title: "Δs = Y(s,2) − Y(s,10)  (points)", titleX: 10, decimals: 0 });
      C.xAxis(g, x, h - m.b, HOR, { title: "execution horizon s (H = 50)" });
      C.el("line", { x1: m.l, x2: w - m.r, y1: y(0), y2: y(0), stroke: "#111a1c", "stroke-dasharray": "4 3", "stroke-width": 1 }, g);
      BK.forEach(function (b) {
        var c = col.backbones[b.name], vals = HOR.map(function (s) { return R.delta[b.key]["s=" + s]; });
        C.el("path", { d: C.path(HOR.map(function (s, i) { return [x(s), y(vals[i])]; })), fill: "none", stroke: c, "stroke-width": 2.2 }, g);
        HOR.forEach(function (s, i) {
          var mk = C.marker(g, col.shapes[b.name], x(s), y(vals[i]), 5.4, { fill: c, stroke: "#fff", "stroke-width": 1.6 });
          C.text(g, x(s), y(vals[i]) + (vals[i] < 0 ? 18 : -10), SITE.signed(vals[i]) + " · " + R.negative[b.key]["s=" + s] + " < 0", { "text-anchor": "middle", class: "lbl-mono", style: "fill:" + c + ";font-weight:600;font-size:10.5px" });
          C.hover(mk, function () { return '<div class="th">' + SITE.modelHTML(b.name) + " · s = " + s + "</div>" + C.row("Δs (mean over 50 tasks)", SITE.signed(vals[i], 2), c) + C.row("tasks with Δs < 0", R.negative[b.key]["s=" + s]); });
        });
      });
    });
    /* averages of the six configurations */
    var st = { m: "pi05" };
    SITE.segmented(document.getElementById("rt-model"), BK.map(function (b) { return { value: b.key, label: SITE.modelHTML(b.name), dot: col.backbones[b.name] }; }), st.m, function (v) { st.m = v; ra.redraw(); });
    var mm = R.mean;
    document.getElementById("rt-avg-sub").innerHTML = "Mean over the 50 tasks. Moving from (10, 10) to (25, 2) lowers the per-step latency " + D.text_numbers.pareto_latency_factor + ": " + SITE.modelHTML("π0") + " " + mm.pi0.printed[0] + " → " + mm.pi0.printed[3] + ", " + SITE.modelHTML("π0.5") + " " + mm.pi05.printed[0] + " → " + mm.pi05.printed[3] + ".";
    C.legend(document.getElementById("rt-avg-legend"), [{ label: "N = 10", color: col.deep, kind: "sq" }, { label: "N = 2", color: col.shallow, kind: "sq" }]);
    var el2 = document.getElementById("rt-avg");
    var ra = C.responsive(el2, function (w) {
      var v = mm[st.m].value, p = mm[st.m].printed, h = 270, m = { l: 40, r: 10, t: 24, b: 44 };
      var svg = C.svg(el2, w, h, "RoboTwin average success per configuration");
      var hi = Math.ceil((Math.max.apply(null, v) + 8) / 10) * 10, y = C.linear(0, hi, h - m.b, m.t), band = C.band(3, m.l, w - m.r, 0.36), g = C.el("g", null, svg);
      C.yAxis(g, y, m.l, w - m.r, C.ticks(0, hi, 4), { decimals: 0 });
      HOR.forEach(function (s, i) {
        var cx = band(i), bw = band.inner / 2;
        [[2 * i, col.deep, "10"], [2 * i + 1, col.shallow, "2"]].forEach(function (q, k) {
          var x0 = cx - band.inner / 2 + k * bw;
          var rect = C.el("rect", { x: x0 + 2, y: y(v[q[0]]), width: bw - 4, height: y(0) - y(v[q[0]]), rx: 4, fill: q[1] }, g);
          C.text(g, x0 + bw / 2, y(v[q[0]]) - 6, p[q[0]], { "text-anchor": "middle", class: "lbl-strong", style: "font-size:12px" });
          C.hover(rect, function () { return '<div class="th">' + SITE.modelHTML(st.m === "pi0" ? "π0" : "π0.5") + " · (" + s + ", " + q[2] + ")</div>" + C.row("mean over 50 tasks", p[q[0]] + "%", q[1]); });
        });
        C.text(g, cx, h - m.b + 18, "s = " + s, { "text-anchor": "middle", class: "lbl" });
      });
    });
    /* per-task table */
    var tt = { m: "pi05", sort: 6, dir: -1 };
    SITE.segmented(document.getElementById("rt-table-model"), BK.map(function (b) { return { value: b.key, label: SITE.modelHTML(b.name), dot: col.backbones[b.name] }; }), tt.m, function (v) { tt.m = v; table(); });
    var COLS = R.columns.concat(["Δ10", "Δ25", "Δ50"]);
    function rowVals(t) { var a = t[tt.m]; return a.concat([a[1] - a[0], a[3] - a[2], a[5] - a[4]]); }
    function table() {
      var tasks = R.tasks.slice().sort(function (a, b) {
        if (tt.sort < 0) return a.name.localeCompare(b.name) * tt.dir * -1;
        return (rowVals(a)[tt.sort] - rowVals(b)[tt.sort]) * tt.dir;
      });
      var h = '<thead><tr><th class="l rt-sort" scope="col" data-k="-1"' + (tt.sort < 0 ? ' aria-sort="' + (tt.dir < 0 ? "ascending" : "descending") + '"' : "") + ">Task</th>" +
        COLS.map(function (c, i) { return '<th class="rt-sort" scope="col" data-k="' + i + '"' + (tt.sort === i ? ' aria-sort="' + (tt.dir < 0 ? "descending" : "ascending") + '"' : "") + ">" + c + "</th>"; }).join("") + "</tr></thead><tbody>";
      tasks.forEach(function (t) {
        var v = rowVals(t);
        h += '<tr class="' + (R.shown.indexOf(t.key) >= 0 ? "shown-row" : "") + '"><td class="l">' + SITE.esc(t.name) + "</td>" +
          v.map(function (x, i) { return i < 6 ? '<td><span class="v">' + f(x, 0) + "</span></td>" : "<td>" + chip(x) + "</td>"; }).join("") + "</tr>";
      });
      var mv = R.mean[tt.m];
      h += '<tr class="grp-hd"><th colspan="' + (COLS.length + 1) + '" scope="rowgroup"><span>All 50 tasks</span></th></tr>';
      h += '<tr><td class="l"><b>Overall mean</b></td>' + mv.printed.map(function (p) { return '<td><b class="v">' + p + "</b></td>"; }).join("") +
        ["s=10", "s=25", "s=50"].map(function (s) { return "<td>" + chip(R.delta[tt.m][s]) + "</td>"; }).join("") + "</tr>";
      h += '<tr><td class="l">Tasks with Δ<sub>s</sub> &lt; 0</td>' + mv.printed.map(function () { return "<td></td>"; }).join("") +
        ["s=10", "s=25", "s=50"].map(function (s) { return '<td><span class="v">' + R.negative[tt.m][s] + "</span></td>"; }).join("") + "</tr>";
      var tb = document.getElementById("rt-table"); tb.innerHTML = h + "</tbody>";
      SITE.$$("th.rt-sort", tb).forEach(function (th) {
        th.addEventListener("click", function () { var k = +th.getAttribute("data-k"); if (tt.sort === k) tt.dir *= -1; else { tt.sort = k; tt.dir = -1; } table(); });
      });
    }
    table();
    document.getElementById("rt-caption").innerHTML = "<b>Table II.</b> RoboTwin 2.0, 50 bimanual tasks, 100 rollouts per task, columns (s, N) with H = 50; checkpoints fine-tuned following the official recipes. Δ<sub>s</sub> = Y<sub>s,2</sub> − Y<sub>s,10</sub>. The paper prints ten of the tasks; all fifty are listed here.";
  }

  /* ---------------------------------------------------------- real world: setup only */
  function real() {
    var root = document.getElementById("real-root"); if (!root) return;
    var R = D.setup.real_world, F = T.figures.real_world;
    root.innerHTML =
      '<figure class="card figure-card"><img src="' + F.files.webp + '" loading="lazy" decoding="async" data-zoom alt="' + SITE.esc(F.alt) + '" data-caption="' + SITE.esc(F.caption) + '" data-label="' + F.group + '">' +
      '<figcaption class="caption"><b>' + F.group + ".</b> " + SITE.pretty(F.caption) + "</figcaption></figure>" +
      '<div class="facts"><span class="fact"><b>' + SITE.esc(R.robot) + '</b></span><span class="fact">' + SITE.esc(R.control) + '</span><span class="fact">' + SITE.esc(R.camera) + " + " + SITE.esc(R.proprio) + '</span><span class="fact"><b>' + R.demos_per_task + "</b> " + SITE.esc(R.teleoperation) + " demonstrations per task (" + R.demos_total + " in total)</span>" +
      Object.keys(R.finetune).map(function (b) { return '<span class="fact">' + SITE.modelHTML(b) + ": " + R.finetune[b] + "</span>"; }).join("") + "</div>" +
      '<div class="facts"><span class="fact-lab">Configurations (s, N) per backbone</span>' + R.configs.map(function (c, i) { return cfgChip(c, ROLE[i]); }).join("") + "</div>" +
      '<ol class="rw-tasks">' + R.tasks.map(function (t, i) {
        return '<li class="rw-task"><b>' + (i + 1) + ". " + SITE.esc(t.name) + "</b><span>“" + SITE.esc(t.instruction) + "”</span>" + (t.moving ? "<em>moving target</em>" : "") + "</li>";
      }).join("") + "</ol>";
    SITE.$$("img[data-zoom]", root).forEach(SITE.zoomable);
  }

  SITE.inits.push(bench, libero, robotwin, real);
})();
