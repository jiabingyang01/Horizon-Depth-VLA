#!/usr/bin/env python3
"""Render the execution-horizon x denoising-steps grid for all three backbones.

Supersedes plot_grid_ab.py (frozen, still listed in PROVENANCE.md), which drew two
panels. Still IEEE single-column (3.4in) with square axes boxes, as before; the only
change is that the row now holds three panels instead of two, so each box is ~0.88in
and the fonts scale down with it.

GR00T cells that have not finished are left plain white: the sweep runs in seed
triples, and a cell only enters the ledger once all ten of its tasks are in, so a
white cell means "not evaluated yet", never "evaluated and bad".

No cell is boxed or circled. Marking the brightest cell would endorse a result the
text retracts (pi0.5's (10,1) looked best on one seed and did not survive
replication), and marking the selected cell pulls the eye away from the surface
shape, which is the only thing this figure is for. Released settings are named in
the caption instead.

Usage: python3 _work/plot_grid_abc.py [outdir]
"""
import json
import re
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _style as S                                    # noqa: E402

FA, FT, FN, FP = 6.2, 5.2, 4.9, 6.2          # axis label / ticks / cell value / panel name
# The y label is set rotated across a square panel only ~0.88in tall, so at FA it is
# LONGER than the box and spills past the canvas (S.save catches this at the 3px edge
# test). Give it its own size rather than shortening the term: the paper settled on
# "execution horizon" and the axis should say what the text says.
FY = 5.2
plt.rcParams.update({
    "font.family": S._FP.get_name(), "font.weight": "bold", "font.size": FT,
    "axes.labelweight": "bold", "axes.titleweight": "bold",
    "axes.linewidth": 1.3, "xtick.major.width": 1.1, "ytick.major.width": 1.1,
    "xtick.direction": "in", "ytick.direction": "in",
    "axes.grid": False, "pdf.fonttype": 42, "mathtext.default": "bf",
})

WORK = Path(__file__).resolve().parent
OUTDIR = Path(sys.argv[1]) if len(sys.argv) > 1 else WORK.parent / "figures"

# --- pi0 / pi0.5: same ledger and last-occurrence rule as guard_success_numbers.py ---
LEDGER = Path("/data/yjb/projects/VLA/new_methods/_work/results_ledger.txt")
LINE = re.compile(r"^\[GOAL\] (\S+) (\d+)/500 \((\d+\.\d+)%\)\s*$")
CELL = re.compile(r"^grid(A|B)_s(\d+)_n(\d+)$")
vals = {}
for raw in LEDGER.read_text(encoding="utf-8").splitlines():
    m = LINE.match(raw.strip())
    if m:
        vals[m.group(1)] = float(m.group(3))          # later line wins = the rerun
grids = {"A": {}, "B": {}}
for k, v in vals.items():
    m = CELL.match(k)
    if m:
        grids[m.group(1)][(int(m.group(2)), int(m.group(3)))] = v

# --- GR00T: three-seed means from the pinned-episode sweep ---
led = json.loads((WORK / "groot_hgrid_ledger.json").read_text(encoding="utf-8"))
by_cell = {}
for c in led["cells"].values():
    by_cell.setdefault((c["s"], c["n"]), []).append(c["suite_mean"])
grids["C"] = {k: sum(v) / len(v) for k, v in by_cell.items() if len(v) == 3}

PANELS = [
    ("A", r"(a) $\pi_0$",        [2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50], [1, 2, 3, 5, 10]),
    ("B", r"(b) $\pi_{0.5}$",    [2, 4, 6, 8, 10],                           [1, 2, 3, 5, 10]),
    # GR00T's depth axis is centred on its own released N=4 and stops at 8 (double it).
    # N=10 was swept as well and stays in the ledger, but it is pi0's released depth, not
    # GR00T's, and the 4-to-10 stretch is flat everywhere, so it is not plotted.
    ("C", r"(c) GR00T-N1.7",     [2, 4, 6, 8, 12, 16],                       [1, 2, 3, 4, 8]),
]

W = 3.4                                   # IEEE single-column text width
# ML is measured, not guessed: the y label cluster is only 22px wide and the tick
# labels run to ~82px, so 0.135 left a quarter inch of dead space at the left edge.
ML, GAP, MR = 0.072, 0.040, 0.008
PW = (1.0 - ML - 2 * GAP - MR) / 3.0
BOT, TOP = 0.315, 0.965
H = PW * W / (TOP - BOT)                  # make each axes box square
fig = plt.figure(figsize=(W, H), dpi=400)
gs = fig.add_gridspec(1, 3, wspace=GAP / PW, left=ML, right=1.0 - MR, bottom=BOT, top=TOP)

summary = []
for col, (g, name, strides, nfe) in enumerate(PANELS):
    ax = fig.add_subplot(gs[0, col])
    M = np.full((len(strides), len(nfe)), np.nan)
    for i, s_ in enumerate(strides):
        for j, n in enumerate(nfe):
            if (s_, n) in grids[g]:
                M[i, j] = grids[g][(s_, n)]
    lo, hi = np.nanmin(M), np.nanmax(M)
    ax.imshow(M, cmap=S.HEAT, vmin=lo, vmax=hi, aspect="auto", origin="lower")
    for i in range(len(strides)):
        for j in range(len(nfe)):
            if np.isnan(M[i, j]):
                ax.add_patch(Rectangle((j - .5, i - .5), 1, 1, facecolor="white",
                                       edgecolor="#cccccc", lw=0.6, zorder=2))
                continue
            ax.text(j, i, f"{M[i, j]:.0f}", ha="center", va="center", zorder=3, fontsize=FN,
                    color="white" if (M[i, j] - lo) / max(hi - lo, 1e-9) > 0.62 else "black")
    ax.set_xticks(range(len(nfe)), [str(n) for n in nfe], fontsize=FT)
    ax.set_yticks(range(len(strides)), [str(s_) for s_ in strides], fontsize=FT)
    ax.set_xlabel(r"denoising steps  $\mathbfit{N}$", fontsize=FA, labelpad=1.2)
    if col == 0:
        ax.set_ylabel(r"execution horizon  $\mathbfit{s}$", fontsize=FY, labelpad=1.0)
    ax.text(0.5, -0.265, name, transform=ax.transAxes, ha="center", va="top", fontsize=FP)
    ax.tick_params(length=2.2, width=1.1, pad=1.2)
    for sp in ax.spines.values():
        sp.set_visible(True); sp.set_linewidth(1.3); sp.set_color("black")
    for lab in list(ax.get_xticklabels()) + list(ax.get_yticklabels()):
        lab.set_fontweight("bold")
    filled = int(np.count_nonzero(~np.isnan(M)))
    summary.append(f"{name.split()[-1]}: {filled}/{M.size} cells, best {hi:.1f}")

OUTDIR.mkdir(parents=True, exist_ok=True)
out = OUTDIR / "grid_abc.png"
S.save(fig, out)
print(out)
for line in summary:
    print("  " + line)
if led["pending"]:
    print(f"  GR00T pending: {len(led['pending'])} cells still running")
