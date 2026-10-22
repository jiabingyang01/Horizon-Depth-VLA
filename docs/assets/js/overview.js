/* Hero facts and key-result cards. Every number is read from PAPER_DATA / FIG_DATA. */
(function () {
  "use strict";
  var D = SITE.D, FD = SITE.FD, col = SITE.colors, f = SITE.fmt;

  function model(key) { return D.libero.models.filter(function (m) { return m.key === key; })[0]; }

  function heroFacts() {
    var ul = document.getElementById("hero-facts"); if (!ul) return;
    var p0 = model("pi0");
    ul.innerHTML = [
      "<b>" + D.setup.backbones.length + "</b> flow-matching backbones",
      "<b>" + D.setup.sim_tasks + "</b> simulation tasks",
      "<b>" + p0.speedup + "</b> lower per-step latency",
      "<b>No</b> training or architecture changes"
    ].map(function (s) { return "<li>" + s + "</li>"; }).join("");
  }

  function card(k) {
    var ref = (k.refs || []).map(function (x) { return '<span><i style="background:' + x.c + '"></i>' + x.t + "</span>"; }).join("");
    return SITE.h("a", { class: "card kr reveal", href: k.link },
      '<span class="scope">' + SITE.modelHTML(SITE.esc(k.scope)) + "</span>" +
      '<span class="claim">' + SITE.esc(k.title) + "</span>" +
      '<span class="num">' + k.value + (k.unit ? "<small>" + SITE.esc(k.unit) + "</small>" : "") + "</span>" +
      '<span class="lbl">' + k.label + "</span>" +
      (ref ? '<span class="ref">' + ref + "</span>" : "") +
      '<span class="note">' + k.note + "</span>" +
      '<span class="go">' + SITE.esc(k.go) + "</span>");
  }

  function keyResults() {
    var root = document.getElementById("key-results"); if (!root) return;
    var p0 = model("pi0"), L = p0.cells.Long, R = FD.robotwin, iv = D.interventions.rows[0];
    var neg = R ? R.negative.pi05["s=10"] : "", I05 = R ? R.interaction.pi05 : null;
    [
      { scope: "π0 · LIBERO-Long", title: "A long horizon with two steps beats the default", value: f(L[3][0]), unit: "%",
        label: p0.configs[3] + " vs. " + f(L[0][0]) + " at the default " + p0.configs[0],
        refs: [{ c: col.roles.sd, t: p0.configs[0] + " " + f(L[0][0]) }, { c: col.roles.ls, t: p0.configs[3] + " " + f(L[3][0]) }],
        note: "The per-step latency falls from " + f(p0.latency_ms[0]) + " ms to " + f(p0.latency_ms[3]) + " ms, " + p0.speedup + " lower.",
        go: "LIBERO results", link: "#results" },
      { scope: "π0 · LIBERO-Long", title: "The depth effect changes sign with the horizon", value: SITE.signed(p0.I.Long[0]), unit: "points",
        label: "interaction, Δ<sub>20</sub> = " + SITE.signed(iv.s20.diff[0]) + " vs. Δ<sub>5</sub> = " + SITE.signed(iv.s5.diff[0]),
        note: "Two steps cost " + f(-iv.s5.diff[0]) + " points when the policy replans every 5 actions and gain " + f(iv.s20.diff[0]) + " when it executes 20.",
        go: "The sign reversal", link: "#phenomenon" },
      { scope: "π0.5 · RoboTwin 2.0, 50 tasks", title: "The same reversal on bimanual tasks", value: SITE.signed(I05), unit: "points",
        label: "interaction between s = 10 and s = 50",
        note: "Two steps lose ground on " + neg + " tasks at s = 10 and are ahead on average at s = 50.",
        go: "RoboTwin results", link: "#results" },
      { scope: "Proposition 1 · π0 geometry", title: "A tighter cloud around the same centre", value: f(D.text_numbers.fan_ratio) + "×", unit: "",
        label: "wider open-loop fan with 10 steps than with 2",
        note: "For a Gaussian target, Euler integrates the mean exactly and scales the covariance by ρ(N); π0's measured radii follow the predicted curve from N = 2 on.",
        go: "The mechanism", link: "#mechanism" }
    ].forEach(function (k) { root.appendChild(card(k)); });
  }

  SITE.inits.push(heroFacts, keyResults);
})();
