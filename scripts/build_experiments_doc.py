#!/usr/bin/env python3
"""把 EXPERIMENTS.md 里所有 <!-- AUTO:名字 --> ... <!-- /AUTO:名字 --> 区块从源数据现读现算后就地替换。

文档的文字部分(实验目的、配置、说明、决策记录)是手写的,放在标记之外;标记之内的表格
一律由本脚本生成,重跑即刷新,不要手改。逐种子明细复用 dump_all_results.py 的各节函数,
这里新增它没有覆盖的:表 I / 表 II 汇总、延迟、图 1 实际画的点、单次查询几何、开环扇面、
各项消融(表 III、π0.5 冻结噪声复刻、求解器、N=1)。

用法:
    python3 _work/build_experiments_doc.py           # 刷新全部区块
    python3 _work/build_experiments_doc.py --check   # 只报告哪些区块会变,不写盘
"""
import argparse
import glob
import importlib.util
import json
import re
import statistics as st
import sys
from pathlib import Path

import numpy as np

WORK = Path(__file__).resolve().parent
ROOT = WORK.parent
DOC = ROOT / "docs/EXPERIMENTS.md"
LEDGER = Path("/data/yjb/projects/VLA/new_methods/_work/results_ledger.txt")
RUNS = Path("/data/yjb/projects/VLA/openpi/eval_results/new_methods/dispersion_match_runs")
SWEEP = RUNS / "icra27_pi0_nfe_sweep_v1"
DM = RUNS / "icra27_pi0_long_seed8_v3/on_policy_analysis_v1_local.json"
SEEDS = (7, 8, 9)
SUITES = ("Spatial", "Object", "Goal", "Long")
LABEL = {"pi0": "π0", "pi05": "π0.5", "groot": "GR00T-N1.7"}


def load(name):
    spec = importlib.util.spec_from_file_location(name.replace(".py", ""), WORK / name)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


sys.path.insert(0, str(WORK))
D = load("dump_all_results.py")          # 逐种子各节:写进 D.OUT
F1 = load("fill_table1_interaction.py")  # 表 I 取数的唯一权威
F2 = load("fill_groot_table2.py")


def capture(fn, *args):
    """跑 dump_all_results.py 的一节;它自带的「### 2. 标题」按本文档层级降一级并去掉旧编号。"""
    D.OUT.clear()
    fn(*args)
    lines = []
    for ln in D.OUT:
        ln = re.sub(r"^#### (?:\d+[a-z]\. )?", "##### ", ln)
        ln = re.sub(r"^### \d+\. ", "#### ", ln)
        lines.append(ln)
    return "\n".join(lines).strip("\n")


def ms(v, d=1, sign=False):
    """mean ± 样本 SD,与论文同口径。"""
    m = st.mean(v)
    s = st.stdev(v) if len(v) > 1 else 0.0
    return f"{m:+.{d}f} ± {s:.{d}f}" if sign else f"{m:.{d}f} ± {s:.{d}f}"


def ledger():
    row = re.compile(r"^\[GOAL\] (\S+) (\d+)/500 \((\d+\.\d+)%\)\s*$")
    v = {}
    for raw in LEDGER.read_text(encoding="utf-8").splitlines():
        m = row.match(raw.strip())
        if m:
            v[m.group(1)] = float(m.group(3))    # 后写的覆盖前面的,与守卫和画图脚本同规则
    return v


def J(xs, f=".1f"):
    return " / ".join(format(x, f) for x in xs)


def jload(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


# ---------------------------------------------------------------- 表 I
def blk_table1_summary():
    C, COLS = F1.data(), F1.COLS
    out = []
    for m in ("pi0", "pi05", "groot"):
        cc = COLS[m]
        out += [f"**{LABEL[m]}**", "",
                "| 套件 | " + " | ".join(f"({s},{n})" for s, n in cc) + " | 𝓘 |",
                "|---|" + "---|" * (len(cc) + 1)]
        avg = {c: {sd: [] for sd in SEEDS} for c in cc}
        for su in SUITES:
            cells = [[C[(m, su, s, n)][sd] for sd in SEEDS] for s, n in cc]
            for c, vals in zip(cc, cells):
                for sd, x in zip(SEEDS, vals):
                    avg[c][sd].append(x)
            inter = [(cells[3][i] - cells[2][i]) - (cells[1][i] - cells[0][i]) for i in range(3)]
            out.append(f"| {su} | " + " | ".join(ms(v) for v in cells) + f" | {ms(inter, sign=True)} |")
        per_seed = [[st.mean(avg[c][sd]) for sd in SEEDS] for c in cc]
        inter = [(per_seed[3][i] - per_seed[2][i]) - (per_seed[1][i] - per_seed[0][i]) for i in range(3)]
        out.append("| **Average** | " + " | ".join(ms(v) for v in per_seed) + f" | {ms(inter, sign=True)} |")
        out.append("")
    return "\n".join(out)


# ---------------------------------------------------------------- 延迟
def blk_latency():
    a, b = 45.93, 2.572       # PROVENANCE.md「Latency」节:PROJECT.md Batch 53 五个中位数的拟合
    call = lambda n: a + b * n
    rows = ["| 骨干 | 格 (s,N) | 每次调用 (ms) | 每控制步 = 调用/s (ms) | 数据状态 |", "|---|---|---|---|---|"]
    for m, cells in (("pi0", F1.COLS["pi0"]), ("pi05", F1.COLS["pi05"])):
        for s, n in cells:
            note = "π0 实测拟合" if m == "pi0" else "**借用 π0 的拟合式,π0.5 未单独测**"
            rows.append(f"| {LABEL[m]} | ({s},{n}) | {call(n):.2f} | {call(n) / s:.2f} | {note} |")
    for s, n in F1.COLS["groot"]:
        rows.append(f"| GR00T-N1.7 | ({s},{n}) | — | — | **无测量记录** |")
    sp = lambda c0, c1: (call(c0[1]) / c0[0]) / (call(c1[1]) / c1[0])
    p0, p5 = F1.COLS["pi0"], F1.COLS["pi05"]
    rows += ["", f"加速比(表 I 最后一列,= 短步长出厂深度格 / 长步长 N=2 格):"
             f"π0 {sp(p0[0], p0[3]):.2f}×,π0.5 {sp(p5[0], p5[3]):.2f}×。",
             "五个实测中位数(每次调用):NFE 1/2/3/5/10 = 47.34 / 53.31 / 52.78 / 58.49 / 71.72 ms,约 34,000 次调用;"
             "原始延迟日志未留存,只剩 `PROJECT.md` Batch 53 的汇总。"]
    return "\n".join(rows)


# ---------------------------------------------------------------- 图 1 实际画的点
def blk_flip_as_drawn():
    V = ledger()
    per = jload(WORK / "flip_seeds_pi05.json")["per_stride"]
    shallow = [V["p5_s10n2"], V["p5_s10n2_s8"], V["p5_s10n2_s9"]]
    tot = re.compile(r"OVERALL:\s+success\s*:\s*\d+/500 \((\d+\.\d+)%\)")
    deep = [float(tot.search((WORK / f"pi_patch_done/patch_pi05_libero_10_s10n10_seed{sd}.summary.txt")
                             .read_text(encoding="utf-8")).group(1)) for sd in SEEDS]
    d = [x - y for x, y in zip(shallow, deep)]
    g = per["10"]
    return "\n".join([
        "| 来源 | (10,10) 逐种子 | (10,2) 逐种子 | Δ₁₀ 逐种子 | Δ₁₀ |",
        "|---|---|---|---|---|",
        f"| **表 I 同源(图 1 revise 版画的点)** | {J(deep)} | "
        f"{J(shallow)} | {J(d, '+.1f')} | **{ms(d, 2, True)}** |",
        f"| gridB 重复(原图 1 画的点,已弃用) | {J([g['nfe10'][str(sd)] for sd in SEEDS])} | "
        f"{J([g['nfe2'][str(sd)] for sd in SEEDS])} | "
        f"{J([g['delta_per_seed'][str(sd)] for sd in SEEDS], '+.1f')} | {g['delta_mean']:+.2f} ± {g['delta_sd']:.2f} |",
    ])


# ---------------------------------------------------------------- 单次查询几何(seed-8 扫描库)
def blk_geometry():
    e = jload(SWEEP / "analysis/nfe_sweep.summary.json")["estimates"]
    c = jload(SWEEP / "analysis/contraction_map.json")["estimates"]
    u = jload(SWEEP / "analysis/nfe_multimodality.json")
    n_obs = u["num_observations"]
    fit = jload(WORK / "toy_model_fit.json")
    out = [f"观测 {n_obs} 个 × 每个 32 个共享初始噪声;半径与质心间距用前 10 步、7 个活动维。",
           "", "| N | 云半径 R(N) [95% CI] | R(N)/R(10) | 质心间距 δμ(N, 10) [95% CI] | 质心投影 | 偏轴占比 | 标量映射斜率 | 未解释方差 | 拒绝单峰(p<.05) |",
           "|---|---|---|---|---|---|---|---|---|"]
    r10 = e["radius_nfe10"]["balanced_mean"]
    for n in (1, 2, 3, 5, 10):
        r = e[f"radius_nfe{n}"]
        gap = e.get(f"mean_gap_nfe{n}_vs_nfe10")
        gtxt = f"{gap['balanced_mean']:.3f} [{gap['hierarchical_bootstrap_ci'][0]:.3f}, {gap['hierarchical_bootstrap_ci'][1]:.3f}]" if gap else "0(参照)"
        rej = u["per_nfe"][str(n)]["n_reject_p05"]
        out.append(f"| {n} | {r['balanced_mean']:.3f} [{r['hierarchical_bootstrap_ci'][0]:.3f}, {r['hierarchical_bootstrap_ci'][1]:.3f}] | "
                   f"{r['balanced_mean'] / r10:.3f} | {gtxt} | {c[f'mean_proj_nfe{n}']['mean']:.4f} | "
                   f"{100 * c[f'mean_orth_frac_nfe{n}']['mean']:.1f}% | {c[f'paired_slope_nfe{n}']['mean']:.3f} | "
                   f"{100 * c[f'paired_resid_frac_nfe{n}']['mean']:.1f}% | {rej}/{n_obs}({100 * rej / n_obs:.1f}%) |")
    s0 = float(fit["sigma0"])

    def alpha(t):
        return (t - (1 - t) * s0**2) / (t**2 + (1 - t)**2 * s0**2)

    def g(n):
        p = 1.0
        for k in range(n):
            p *= 1 - alpha(1 - k / n) / n
        return abs(p) / s0
    out += ["", "**命题 1 单参数拟合**(`_work/toy_model_fit.json`,只用 N≥2 的四个半径,N=10 定整体尺度):",
            f"σ₀ = {s0:.3f},c = {fit['c']:.2f}(ρ(N) ≈ 1 − c/N),N≥2 上最大绝对偏差 {fit['max_abs_dev_ge2']:.4f},"
            f"RSS = {fit['rss_ge2']:.2e};τ* = σ₀²/(1+σ₀²) = {s0**2 / (1 + s0**2):.2f};"
            f"g(10)/g(2) = {g(10) / g(2):.2f};√ρ(2) = σ₀/(1+σ₀²) = {g(2):.3f}(公式上限 0.5)。",
            "", "⚠ 拟合用到了 N=2 与 N=10,所以「实测 R(2)/R(10) 与理论吻合」是循环论证;"
            "不循环的检验是用这个拟合去预测开环扇面宽度比(下一节)。"]
    return "\n".join(out)


# ---------------------------------------------------------------- 开环扇面
def blk_fans():
    nf = (1, 2, 3, 5, 10)
    acc = {10: [], 2: []}
    ctr = []
    for f in sorted(glob.glob(str(SWEEP / "sweep_grid/*.npz"))):
        e = np.load(f)["endpoints"]
        paths = {}
        for n in (10, 2):
            p = np.cumsum(e[nf.index(n)][..., :6], axis=1)
            acc[n].append(np.linalg.norm(p - p.mean(0), axis=-1).mean(0))
            paths[n] = p.mean(0)
        step = np.linalg.norm(np.diff(np.vstack([np.zeros((1, 6)), paths[10]]), axis=0), axis=-1)
        ctr.append(np.linalg.norm(paths[10] - paths[2], axis=-1) / np.cumsum(step))
    R = {n: np.stack(v).mean(0) for n, v in acc.items()}
    frac = np.stack(ctr).mean(0)
    out = [f"{len(acc[10])} 个观测文件;路径 = 动作块沿时间累加(前 6 维),扇面宽度 = 各采样路径到均值路径的平均距离。",
           "", "| 已执行步数 s | R₁₀(s) | R₂(s) | R₁₀/R₂ | 绝对差 R₁₀−R₂ | 中心路径间距 / 深采样中心路径长度 |",
           "|---|---|---|---|---|---|"]
    for s in (1, 2, 5, 8, 10, 12, 15, 16, 20, 25, 30, 40, 50):
        i = s - 1
        out.append(f"| {s} | {R[10][i]:.3f} | {R[2][i]:.3f} | {R[10][i] / R[2][i]:.2f} | {R[10][i] - R[2][i]:.3f} | {100 * frac[i]:.1f}% |")
    ratio = R[10] / R[2]
    out += ["", f"宽度比全程 {ratio.min():.2f}–{ratio.max():.2f};绝对差首次 ≥ 1.0 在 s = {int(np.argmax(R[10] - R[2] >= 1.0)) + 1};"
            f"中心路径间距占比全程最大 {100 * frac.max():.1f}%(s = {int(np.argmax(frac)) + 1}),s ≥ 5 时最大 {100 * frac[4:].max():.1f}%。"]
    return "\n".join(out)


# ---------------------------------------------------------------- 表 III(π0)
def blk_table3():
    C = F1.data()
    std = {(s, n): [C[("pi0", "Long", s, n)][sd] for sd in SEEDS] for s, n in F1.COLS["pi0"]}
    dm = jload(DM)
    arm = {}
    for r in dm["cell_results"]:
        arm.setdefault((r["arm"], r["stride"], r["nfe"]), {})[r["seed"]] = 100 * r["successes"] / 500
    scaled = {(s, n): [arm[("matched", s, n)][sd] for sd in SEEDS] for s, n in F1.COLS["pi0"]}
    own_std = {(s, n): [arm[("standard", s, n)][sd] for sd in SEEDS] for s, n in F1.COLS["pi0"]}
    sn = jload(WORK / "srcnoise_gathered.json")["cells"]
    frozen = {(s, n): [sn[f"icra27_srcnoise_a0_s{s}_n{n}_seed{sd}"]["pct"] for sd in SEEDS] for s, n in F1.COLS["pi0"]}

    def row(name, X):
        d5 = [X[(5, 2)][i] - X[(5, 10)][i] for i in range(3)]
        d20 = [X[(20, 2)][i] - X[(20, 10)][i] for i in range(3)]
        it = [d20[i] - d5[i] for i in range(3)]
        return (f"| {name} | {ms(X[(5, 10)])} | {ms(X[(5, 2)])} | {ms(d5, sign=True)} | {ms(X[(20, 10)])} | "
                f"{ms(X[(20, 2)])} | {ms(d20, sign=True)} | {ms(it, sign=True)} |")
    out = ["| 条件 | (5,10) | (5,2) | Δ₅ | (20,10) | (20,2) | Δ₂₀ | 𝓘 |", "|---|---|---|---|---|---|---|---|",
           row("标准采样(表 I 同源)", std),
           row("干预 1:噪声重缩放(N=2 噪声 ×%.3f,N=10 噪声 ×%.3f)" % (
               next(r["noise_scale"] for r in dm["cell_results"] if r["arm"] == "matched" and r["nfe"] == 2),
               next(r["noise_scale"] for r in dm["cell_results"] if r["arm"] == "matched" and r["nfe"] == 10)), scaled),
           row("干预 1 自带的标准对照臂(未入稿)", own_std),
           row("干预 2:冻结初始噪声 α=0", frozen)]
    out += ["", f"干预 1 的预注册主要论断:`primary_claim_supported = {dm['primary_claim_supported']}`"
            "(分析 `on_policy_analysis_v1_local.json`,SHA 前缀 83a538b1)。",
            "逐种子(干预 1 / 干预 2):"]
    for name, X in (("噪声重缩放", scaled), ("冻结噪声", frozen)):
        out.append(f"- {name}:" + ";".join(f"({s},{n}) = {J(X[(s, n)])}" for s, n in F1.COLS["pi0"]))
    return "\n".join(out)


# ---------------------------------------------------------------- π0.5 冻结噪声复刻
def blk_pi05_srcnoise():
    x = jload(WORK / "pi05_srcnoise.json")
    c = x["cells"]
    out = ["| 条件 | (2,10) | (2,2) | (10,10) | (10,2) | Δ₂ | Δ₁₀ | 𝓘 = Δ₁₀ − Δ₂ |", "|---|---|---|---|---|---|---|---|"]
    for a, name in (("a1", "标准重抽 α=1"), ("a0", "冻结噪声 α=0")):
        v = {k: [c[f"{a}_{k}"][str(sd)] for sd in SEEDS] for k in ("s2_n10", "s2_n2", "s10_n10", "s10_n2")}
        d2 = [v["s2_n2"][i] - v["s2_n10"][i] for i in range(3)]
        d10 = [v["s10_n2"][i] - v["s10_n10"][i] for i in range(3)]
        it = [d10[i] - d2[i] for i in range(3)]
        out.append(f"| {name} | {ms(v['s2_n10'])} | {ms(v['s2_n2'])} | {ms(v['s10_n10'])} | {ms(v['s10_n2'])} | "
                   f"{ms(d2, sign=True)} | {ms(d10, sign=True)} | {ms(it, sign=True)} |")
    return "\n".join(out)


# ---------------------------------------------------------------- 求解器
def blk_solver():
    sv = jload(WORK / "solver_3seed.json")
    out = []
    for key, rows in sv.items():
        if not isinstance(rows, dict):
            continue
        out += [f"**`{key}`**", "", "| 配置键(`solver_3seed.json`) | 求解器 | 网络求值次数 | seed7 / 8 / 9 | 均值 ± 样本SD |", "|---|---|---|---|---|"]
        for k, r in rows.items():
            if not isinstance(r, dict) or "per_seed" not in r:
                continue
            ps = J([r["per_seed"][str(sd)] for sd in SEEDS if str(sd) in r["per_seed"]])
            out.append(f"| `{k}` | {r.get('family', '—')} | {r.get('evals', '—')} | {ps} | {r['mean']:.1f} ± {r['sd']:.1f} |")
        out.append("")
    return "\n".join(out).rstrip()


# ---------------------------------------------------------------- N=1
def blk_n1():
    x = jload(WORK / "n1_seeds.json")
    out = ["| 格 | seed7 / 8 / 9 | 均值 ± 样本SD |", "|---|---|---|"]
    for k, r in x.items():
        if "per_seed" in r:
            out.append(f"| `{k}` | {J([r['per_seed'][str(sd)] for sd in SEEDS])} | {r['mean']:.1f} ± {r['sd']:.1f} |")
    g = x.get("gap_s2_n10_minus_n1")
    if g:
        out += ["", f"s=2 时 N=10 比 N=1 高 **{g['mean']:.1f} ± {g['sd']:.1f}** 点(逐种子配对)。"]
    return "\n".join(out)


# ---------------------------------------------------------------- RoboTwin 汇总
def blk_robotwin_summary():
    r = jload(WORK / "robotwin_r100s0_results.json")
    cells = ["s10_n10", "s10_n2", "s25_n10", "s25_n2", "s50_n10", "s50_n2"]
    out = ["| 骨干 | " + " | ".join(f"({c.split('_')[0][1:]},{c.split('_')[1][1:]})" for c in cells) + " | Δ₁₀ | Δ₂₅ | Δ₅₀ | 𝓘 = Δ₅₀ − Δ₁₀ |",
           "|---|" + "---|" * (len(cells) + 4)]
    for m in ("pi0", "pi05"):
        tasks = r["results"][m]
        mean = {c: st.mean(tasks[t][c] for t in tasks) for c in cells}
        d = {s: mean[f"s{s}_n2"] - mean[f"s{s}_n10"] for s in (10, 25, 50)}
        out.append(f"| {LABEL[m]} | " + " | ".join(f"{mean[c]:.1f}" for c in cells)
                   + f" | {d[10]:+.1f} | {d[25]:+.1f} | {d[50]:+.1f} | {d[50] - d[10]:+.1f} |")
    out += ["", f"每格 = 50 任务 × 100 集的任务均值;任务数 π0 {len(r['results']['pi0'])}、π0.5 {len(r['results']['pi05'])}。"]
    g = jload(WORK / "groot_robotwin_cells.json")["per_task"]
    gc = ["s2_n4", "s2_n2", "s8_n4", "s8_n2", "s16_n4", "s16_n2"]
    gm = {c: (st.mean(g[c].values()) if g.get(c) else None) for c in gc}
    out += ["", "**GR00T-N1.7(RoboTwin,H=16,未入稿)**", "",
            "| " + " | ".join(f"({c.split('_')[0][1:]},{c.split('_')[1][1:]})" for c in gc) + " |",
            "|" + "---|" * len(gc),
            "| " + " | ".join(f"{gm[c]:.1f}" if gm[c] is not None else "—" for c in gc) + " |"]
    return "\n".join(out)


def blk_robotwin_effects():
    e = jload(WORK / "robotwin_r100s0_effects.json")
    out = ["| 骨干 | 量 | 均值 | 95% 区间(任务级 bootstrap) | 正 / 负 / 平(任务数) |", "|---|---|---|---|---|"]
    names = {"d10": "Δ₁₀", "d25": "Δ₂₅", "d50": "Δ₅₀", "inter": "𝓘 = Δ₅₀ − Δ₁₀", "inter25": "𝓘₂₅ = Δ₂₅ − Δ₁₀"}
    for m in ("pi0", "pi05"):
        for k, lab in names.items():
            c, ci = e[m]["counts"][k], e[m]["ci95_task_bootstrap"][k]
            out.append(f"| {LABEL[m]} | {lab} | {e[m]['mean'][k]:+.2f} | [{ci[0]:+.2f}, {ci[1]:+.2f}] | "
                       f"{c['positive']} / {c['negative']} / {c['tied']} |")
    out += ["", f"来源 `_work/robotwin_r100s0_effects.json`:{e['_source']}"]
    return "\n".join(out)


def blk_band():
    import math
    old = jload(WORK / "flip_seeds.json")["per_stride"]
    band = jload(WORK / "band_gathered.json")["cells"]
    out = ["| s | 种子 7/8/9 的 Δ | 种子 10/11/12 的 Δ | 六种子 均值 ± SD | 正号 | 95% t 区间 |", "|---|---|---|---|---|---|"]
    for s in (10, 15):
        d_old = [old[str(s)]["delta_per_seed"][str(sd)] for sd in SEEDS]
        d_new = [band[f"icra27_band_s{s}_n2_seed{sd}"]["pct"] - band[f"icra27_band_s{s}_n10_seed{sd}"]["pct"] for sd in (10, 11, 12)]
        d = d_old + d_new
        m, sd_ = st.mean(d), st.stdev(d)
        h = 2.571 * sd_ / math.sqrt(len(d))
        out.append(f"| {s} | {J(d_old, '+.1f')} | {J(d_new, '+.1f')} | {m:+.2f} ± {sd_:.2f} | "
                   f"{sum(x > 0 for x in d)}/{len(d)} | [{m - h:+.2f}, {m + h:+.2f}] |")
    return "\n".join(out)


def blk_banks():
    """四个观测库并排。三种「半径比」统计量不同,并列给出,引用时必须说明用的是哪一种。"""
    norms = jload(WORK / "geometry_norms.json")

    def ci(x):
        return f"[{x[0]:.3f}, {x[1]:.3f}]"
    rows = ["| 库 | 观测数 | 平均半径之比 R̄(2)/R̄(10) | 逐观测比的均值 [95% CI] | δμ(2,10) | δμ / 动作模长 | N=2 未解释方差 | 拒绝单峰 N=2 / N=10 |",
            "|---|---|---|---|---|---|---|---|"]
    e8 = jload(SWEEP / "analysis/nfe_sweep.summary.json")["estimates"]
    c8 = jload(SWEEP / "analysis/contraction_map.json")["estimates"]
    u8 = jload(SWEEP / "analysis/nfe_multimodality.json")
    r = c8["radius_ratio_nfe2"]
    rows.append(f"| **π0 seed-8 扫描库(图 4、正文)** | {u8['num_observations']} | "
                f"{e8['radius_nfe2']['balanced_mean'] / e8['radius_nfe10']['balanced_mean']:.3f} | "
                f"{r['mean']:.3f} {ci(r['ci'])} | {e8['mean_gap_nfe2_vs_nfe10']['balanced_mean']:.3f} | "
                f"{100 * norms['pi0_seed8']['gap_frac_2_over_10']:.1f}% | {100 * c8['paired_resid_frac_nfe2']['mean']:.1f}% | "
                f"{u8['per_nfe']['2']['n_reject_p05']} / {u8['per_nfe']['10']['n_reject_p05']} |")
    s9 = jload(WORK / "fixed_obs_v6/analysis_long_seed9/fixed_obs.summary.json")["estimates"]
    r9 = jload(WORK / "residual_diagnosis_v1/residual.seed9.summary.json")["estimates"]
    lg = s9["log_spread_ratio_2_over_10"]
    rms = s9["nfe2_rms_radius"]["balanced_mean"] / s9["nfe10_rms_radius"]["balanced_mean"]
    rows.append(f"| π0 seed-9 库 | 320 | RMS 半径之比 {rms:.3f} | exp(对数比均值) {np.exp(lg['balanced_mean']):.3f} "
                f"{ci(np.exp(lg['hierarchical_bootstrap_ci']))} | {r9['mean_l2_nfe2_std_vs_nfe10_std']['balanced_mean']:.3f} | "
                f"{100 * norms['pi0_seed9']['gap_frac_2_over_10']:.1f}% | — | — |")
    for sd in ("seed8", "seed9"):
        run = RUNS / f"icra27_pi05_long_{sd}_v1/analysis"
        g = jload(run / "pi05_geometry.summary.json")
        ge, cm = g["estimates"], jload(run / "contraction_map.json")["estimates"]
        uni = jload(run / "pi05_geometry_multimodality.json")["per_nfe"]
        rr = ge["radius_ratio_2_over_10"]
        rows.append(f"| π0.5 {sd.replace('seed', 'seed-')} 库 | {g.get('num_observations', '—')} | "
                    f"{ge['radius_nfe2']['balanced_mean'] / ge['radius_nfe10']['balanced_mean']:.3f} | "
                    f"{rr['balanced_mean']:.3f} {ci(rr['hierarchical_bootstrap_ci'])} | {ge['mean_gap']['balanced_mean']:.3f} | "
                    f"{100 * ge['mean_gap_over_nfe10_norm']['balanced_mean']:.1f}% | {100 * cm['paired_resid_frac_nfe2']['mean']:.1f}% | "
                    f"{uni['2']['n_reject_p05']} / {uni['10']['n_reject_p05']} |")
    rows += ["", "读法:四个库里,两步积分都把云半径压到十步的 0.34–0.51 倍,质心移动只占动作模长的 2–3%。"
             "同一个库换统计量,半径比能差出 0.03–0.05(π0)到 0.09–0.10(π0.5),引用时必须说明用的是哪一种;"
             "正文统一用 seed-8 扫描库的平均半径之比 0.51。"]
    return "\n".join(rows)


BLOCKS = {
    "table1_summary": blk_table1_summary,
    "table1_perseed": lambda: capture(D.sec_table1, F1),
    "latency": blk_latency,
    "flip_perseed": lambda: capture(D.sec_flip),
    "flip_as_drawn": blk_flip_as_drawn,
    "band": blk_band,
    "grids": lambda: capture(D.sec_grids, D.ledger_keys()),
    "groot_grids": lambda: capture(D.sec_groot),
    "robotwin_summary": blk_robotwin_summary,
    "robotwin_effects": blk_robotwin_effects,
    "robotwin_detail": lambda: capture(D.sec_robotwin, F2),
    "geometry": blk_geometry,
    "fans": blk_fans,
    "banks": blk_banks,
    "geometry_banks": lambda: capture(D.sec_geometry),
    "table3": blk_table3,
    "pi05_srcnoise": blk_pi05_srcnoise,
    "solver": blk_solver,
    "n1": blk_n1,
    "realrobot": lambda: capture(D.sec_realrobot),
    "probes": lambda: capture(D.sec_probes),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--print", dest="show", metavar="BLOCK")
    a = ap.parse_args()
    if a.show:
        print(BLOCKS[a.show]())
        return
    doc = DOC.read_text(encoding="utf-8")
    changed, missing = [], []
    for name, fn in BLOCKS.items():
        b, e = f"<!-- AUTO:{name} -->", f"<!-- /AUTO:{name} -->"
        if b not in doc or e not in doc:
            missing.append(name)
            continue
        body = f"{b}\n{fn()}\n{e}"
        i, j = doc.index(b), doc.index(e) + len(e)
        if doc[i:j] != body:
            changed.append(name)
            doc = doc[:i] + body + doc[j:]
    if missing:
        print("文档里缺少这些区块标记:", ", ".join(missing))
    if a.check:
        print("会变的区块:", ", ".join(changed) or "无")
        return
    DOC.write_text(doc, encoding="utf-8")
    print(f"已刷新 {len(changed)} 个区块:{', '.join(changed) or '无'}")


if __name__ == "__main__":
    main()
