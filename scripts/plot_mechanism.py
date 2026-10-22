#!/usr/bin/env python3
"""机制图:两个面板,一个把理论对到数据上,一个把几何接到执行长度上。

(a) 逐深度云半径:实测点 + Proposition 1 的单参数高斯模型。σ0 只用 N>=2 拟合,
    所以 N=1 是模型的**预测**而非拟合目标 —— 它在那里塌到 0 而实测是 0.204,
    这处背离是正文主动写出的理论边界,必须在图上看得见。
(b) 开环散布锥:把动作块按位姿增量累加成"若不再重规划会走的路",画其围绕质心的
    平均偏离半径随已执行步数的 ±带。深浅两档套在一起,同顶点同中心线,宽度差 2.1 倍。

数据:nfe_sweep.summary.json(守卫同源)+ sweep_grid/*.npz。零手抄,零 GPU。
"""
import glob, json, sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _style as S                                     # noqa: E402
import matplotlib.pyplot as plt                        # noqa: E402

WORK = Path(__file__).resolve().parent
RUNS = Path("/data/yjb/projects/VLA/openpi/eval_results/new_methods/dispersion_match_runs")
GRID = RUNS / "icra27_pi0_nfe_sweep_v1/sweep_grid"
OUT = WORK.parent / "figures/mechanism.png"
NF = [1, 2, 3, 5, 10]
C_DEEP, C_SHAL, C_MOD = S.GREY, S.BLUE, S.RED


def alpha(t, s0): return (t - (1 - t) * s0**2) / (t**2 + (1 - t)**2 * s0**2)


def rho(N, s0):
    v = 1.0
    for k in range(N):
        v *= (1 - alpha(1 - k / N, s0) / N)**2
    return v / s0**2


est = json.loads((RUNS / "icra27_pi0_nfe_sweep_v1/analysis/nfe_sweep.summary.json")
                 .read_text())["estimates"]
meas = {N: est[f"radius_nfe{N}"]["balanced_mean"] for N in NF}
best = None
for s0 in np.linspace(0.05, 5.0, 9901):
    A = meas[10] / np.sqrt(rho(10, s0))
    rss = sum((A * np.sqrt(rho(N, s0)) - meas[N])**2 for N in NF if N >= 2)
    if best is None or rss < best[0]:
        best = (rss, s0, A)
rss, s0, A = best

acc = {10: [], 2: []}
for f in sorted(glob.glob(str(GRID / "*.npz"))):
    e = np.load(f)["endpoints"]
    for n in (10, 2):
        p = np.cumsum(e[NF.index(n)][..., :6], axis=1)
        acc[n].append(np.linalg.norm(p - p.mean(0), axis=-1).mean(0))
R = {n: np.stack(v).mean(0) for n, v in acc.items()}
k = np.arange(1, 51)

S.apply()
fig = plt.figure(figsize=(S.SINGLE, 1.46), dpi=400)
gs = fig.add_gridspec(1, 2, wspace=0.40, left=0.125, right=0.962, bottom=0.30, top=0.955)

# ---- (a) 理论 vs 数据 ----
ax = fig.add_subplot(gs[0, 0])
xs = np.linspace(1, 10, 200)
ax.plot(xs, [A * np.sqrt(max(rho(int(round(x)), s0), 0)) if x == int(x) else np.nan for x in xs],
        lw=0)                                                   # 占位,保持轴范围
mx = np.arange(1, 11)
ax.plot(mx, [A * np.sqrt(rho(int(n), s0)) for n in mx], "-", color=C_MOD, lw=1.4,
        label="Prop. 1", zorder=2)
ax.plot(NF, [meas[N] for N in NF], "o", color=S.DARK, ms=3.4, label="measured", zorder=3)
ax.annotate("model\npredicts 0", (1, 0.0), xytext=(2.0, 0.19), fontsize=S.T_ANNOT - 0.8,
            color=C_MOD, ha="left", va="bottom", linespacing=0.95,
            arrowprops=dict(arrowstyle="->", color=C_MOD, lw=0.7, shrinkA=1, shrinkB=2))
ax.set_xscale("log"); ax.set_xticks(NF); ax.set_xticklabels(NF, fontsize=S.T_TICK)
ax.minorticks_off()
ax.set_xlabel(r"denoising steps  $\mathbfit{N}$", fontsize=S.T_AXIS, labelpad=1.0)
ax.set_ylabel("cloud radius", fontsize=S.T_AXIS, labelpad=1.5)
ax.set_ylim(-0.06, 1.05)
ax.legend(fontsize=S.T_ANNOT - 0.4, loc="lower right", handlelength=1.2,
          borderaxespad=0.15, labelspacing=0.2, handletextpad=0.35)
ax.text(0.5, -0.30, "(a)", transform=ax.transAxes, fontsize=S.T_AXIS, ha="center",
        va="top", fontweight="bold")
ax.tick_params(pad=1.5); S.finish(ax)

# ---- (b) 开环散布锥 ----
ax2 = fig.add_subplot(gs[0, 1])
# s=10..15 是**三种子符号分歧带**,不是穿零带 —— 点估计在 s=5 与 s=10 之间就已变号
# (flip_seeds.json 的 crossing_between=[5,10])。正文的论证是"种子在 s=20 停止分歧,
# 正好过了散布差达到 1.0 的横坐标",所以这里要标的是分歧带。
ax2.axvspan(10, 15, color="#f2c14e", alpha=0.32, lw=0, zorder=0)
ax2.fill_between(k, -R[10], R[10], color=C_DEEP, alpha=0.38, lw=0, zorder=1)
ax2.fill_between(k, -R[2], R[2], color=C_SHAL, alpha=0.62, lw=0, zorder=2)
for sg in (1, -1):
    ax2.plot(k, sg * R[10], color=C_DEEP, lw=0.9, zorder=3)
    ax2.plot(k, sg * R[2], color=C_SHAL, lw=0.9, zorder=4)
ax2.axhline(0, color="black", lw=0.6, ls=(0, (3, 2)), zorder=5)
ax2.text(28.5, 1.85, r"$\mathbfit{N}{=}10$", color=C_DEEP, fontsize=S.T_ANNOT - 0.3, ha="right",
         va="center", fontweight="bold")
ax2.text(28.5, 0.48, r"$\mathbfit{N}{=}2$", color=C_SHAL, fontsize=S.T_ANNOT - 0.3, ha="right",
         va="center", fontweight="bold")
ax2.text(12.5, -2.55, "seeds\ndisagree", color="#8a6d1f", fontsize=S.T_ANNOT - 1.0,
         ha="center", va="center", linespacing=0.9, fontweight="bold")
ax2.set_xlim(1, 30); ax2.set_ylim(-3.0, 3.0)
ax2.set_xticks([1, 10, 20, 30])
ax2.set_xlabel(r"execution horizon  $\mathbfit{s}$", fontsize=S.T_AXIS, labelpad=1.0)
ax2.set_ylabel("open-loop spread", fontsize=S.T_AXIS, labelpad=1.5)
ax2.text(0.5, -0.30, "(b)", transform=ax2.transAxes, fontsize=S.T_AXIS, ha="center",
         va="top", fontweight="bold")
ax2.tick_params(pad=1.5); S.finish(ax2)

S.save(fig, OUT)
print(f"  sigma_0*={s0:.3f} RSS(N>=2)={rss:.2e}  模型 N=1 给 {A*np.sqrt(rho(1,s0)):.3f} 实测 {meas[1]:.3f}")
print(f"  锥宽比 s=5 {R[10][4]/R[2][4]:.2f}  s=20 {R[10][19]/R[2][19]:.2f}")
