/* Section 06: rollouts of the same initial state under the configurations of Table I / Table II / Real-World. One tab per
   benchmark present in window.ROLLOUTS (assets/videos/manifest.js); each clip shows the paper's success rate of its
   configuration, looked up in PAPER_DATA (LIBERO, per suite) or FIG_DATA (RoboTwin, per task). */
(function () {
  "use strict";
  var D = SITE.D, FD = SITE.FD, col = SITE.colors;
  var ROLE = ["sd", "ss", "ld", "ls"];

  function libModel(ex) { return D.libero.models.filter(function (m) { return m.name === ex.backbone; })[0]; }
  function libRules(ex) { var m = libModel(ex); return m ? m.configs : []; }
  function libRate(ex, rule) {
    var m = libModel(ex), i = m ? m.configs.indexOf(rule) : -1;
    return i >= 0 && m.cells[ex.suite] ? m.cells[ex.suite][i][0] : null;
  }
  function libColor(rule, ex) { var m = libModel(ex), i = m ? m.configs.indexOf(rule) : -1; return i >= 0 ? col.roles[ROLE[i]] : col.acc; }

  var RT_CFG = ["(10, 10)", "(10, 2)", "(50, 10)", "(50, 2)"], RT_COL = { "(10, 10)": "(10,10)", "(10, 2)": "(10,2)", "(50, 10)": "(50,10)", "(50, 2)": "(50,2)", "(25, 10)": "(25,10)", "(25, 2)": "(25,2)" };
  function rtRate(ex, rule) {
    var R = FD.robotwin; if (!R) return null;
    var t = R.tasks.filter(function (x) { return x.key === ex.task; })[0], bk = ex.backbone === "π0" ? "pi0" : "pi05";
    var i = R.columns.indexOf(RT_COL[rule]);
    return t && i >= 0 ? t[bk][i] : null;
  }
  function rtColor(rule) { var i = RT_CFG.indexOf(rule); return i >= 0 ? col.roles[ROLE[i]] : col.acc; }

  var RW_CFG = (D.setup && D.setup.real_world && D.setup.real_world.configs) || ["(s = 10, N0)", "(s = 10, 2)", "(s = H, N0)", "(s = H, 2)"];
  function rwColor(rule) { var i = RW_CFG.indexOf(rule); return i >= 0 ? col.roles[ROLE[i]] : col.acc; }

  var BENCH = {
    LIBERO: { label: "LIBERO", head: ["LIBERO", "execution horizon × sampling depth"], aspect: "1 / 1", rules: libRules, rate: libRate, color: libColor, rate0: 2,
      note: "Percentages are the success rates of each configuration on this suite (Table I, mean over seeds 7/8/9)." },
    RoboTwin: { label: "RoboTwin 2.0", head: ["RoboTwin 2.0", "head camera"], aspect: "4 / 3", rules: function () { return RT_CFG; }, rate: rtRate, color: rtColor, rate0: 2,
      note: "Percentages are the success rates of each configuration on this task (Table II, 100 rollouts per task)." },
    Real: { label: "Real world", head: [D.setup.real_world.robot, "top camera"], aspect: "16 / 9", rules: function () { return RW_CFG; }, rate: null, color: rwColor, rate0: 1,
      syncNote: "On the real arm the four clips of an example are separate trials of the same task, recorded by the top camera and played in sync; clips that finish early hold their last frame. Success is the operator's label of each trial." }
  };

  SITE.inits.push(function () {
    var R = window.ROLLOUTS || {}, tabs = document.getElementById("video-tabs"), panels = document.getElementById("video-panels");
    var names = Object.keys(BENCH).filter(function (b) { return (R[b] || []).length; });
    if (!names.length) {
      var sec = document.getElementById("rollouts"); if (sec) sec.hidden = true;
      var link = document.querySelector('#nav-links a[href="#rollouts"]'); if (link) link.parentNode.hidden = true;
      return;
    }
    names.forEach(function (b, i) {
      var id = "v-" + b.toLowerCase(), lbl = BENCH[b].label || b;
      tabs.insertAdjacentHTML("beforeend", '<button class="tab" role="tab" id="tab-' + id + '" aria-controls="panel-' + id + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" + lbl + '<span class="cnt">' + R[b].length + "</span></button>");
      panels.insertAdjacentHTML("beforeend", '<div class="tabpanel" role="tabpanel" id="panel-' + id + '" aria-labelledby="tab-' + id + '" tabindex="0"' + (i ? " hidden" : "") + '><div id="' + id + '-root"></div></div>');
    });
    names.forEach(function (b) {
      var cfg = BENCH[b];
      SITE.videoPlayer(document.getElementById("v-" + b.toLowerCase() + "-root"), R[b], {
        head: cfg.head,
        groupTitle: "Backbone",
        groupKey: function (ex) { return ex.backbone; },
        groupOrder: ["π0", "π0.5", "GR00T-N1.7"],
        rules: cfg.rules,
        ruleLabel: function (r) {
          var txt = r.indexOf("s =") >= 0 ? SITE.pretty(SITE.esc(r).replace("N0", "N_{0}")) : "(s, N) = " + SITE.esc(r);
          return '<span style="font-family:var(--mono);font-size:12.5px">' + txt + "</span>";
        },
        color: cfg.color,
        highlight: function (r, ex) { var rs = cfg.rules(ex); return rs.indexOf(r) === rs.length - 1; },
        rate: cfg.rate, rateNote: cfg.note, rate0: cfg.rate0, aspect: cfg.aspect, syncNote: cfg.syncNote,
        sub: function (ex) {
          return [SITE.modelHTML(SITE.esc(ex.backbone)), ex.suite ? "LIBERO-" + SITE.esc(ex.suite) : "", ex.episode != null ? (ex.episode_label || "episode") + " " + SITE.esc(ex.episode) : ""].filter(Boolean).join(" · ");
        }
      });
    });
  });
})();
