<div align="center">

# Coupling Execution Horizon and Sampling Depth in Flow-Matching VLA Policies

<a href="https://jiabingyang01.github.io/Horizon-Depth-VLA/"><img src="https://img.shields.io/badge/Project_Page-项目主页-2E6F6B?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Project Page"></a>
<a href="https://jiabingyang01.github.io/Horizon-Depth-VLA/paper.pdf"><img src="https://img.shields.io/badge/Paper-论文_PDF-B84A2B?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Paper PDF"></a>
<a href="LICENSE.md"><img src="https://img.shields.io/badge/License-Apache_2.0-4E5D6C?style=for-the-badge" alt="License"></a>

**[English](README.md) | [中文](README_zh.md)**

**Jiabing Yang**<sup>1,2,5</sup>, **Yuan Xu**<sup>1,2</sup>, **Yixiang Chen**<sup>1,2</sup>, **Qisen Ma**<sup>1,2</sup>, **Peiyan Li**<sup>1,2</sup>, **Kai Wang**<sup>1,2</sup>, **Chenhang Cui**<sup>3</sup>, **Tao Yu**<sup>1,2</sup>,  
**Zichen Wen**<sup>4</sup>, **Wen Ye**<sup>1,2</sup>, **Bowen Fang**<sup>1,2</sup>, **Ziheng He**<sup>1,2</sup>, **Xiangnan Wu**<sup>1,2</sup>, **Yingda Li**<sup>1,2</sup>, **Yan Huang**<sup>1,2,5,&dagger;</sup>, **Liang Wang**<sup>1,2</sup>

<sup>1</sup>中国科学院大学人工智能学院 &nbsp;&middot;&nbsp;
<sup>2</sup>中国科学院自动化研究所多模态人工智能系统全国重点实验室 (NLPR)  
<sup>3</sup>新加坡国立大学 &nbsp;&middot;&nbsp;
<sup>4</sup>上海交通大学 &nbsp;&middot;&nbsp;
<sup>5</sup>FiveAges &nbsp;&middot;&nbsp;
<sup>&dagger;</sup>通讯作者

</div>

---

<p align="center">
  <img src="docs/assets/figs/pipeline.png" width="95%" alt="Compute-Execution Coupling Overview">
</p>

## 📖 核心简介

流匹配（Flow-Matching）视觉-语言-动作（VLA）模型能够生成极具表现力的连续机器人操作轨迹，但如何在实时响应速度与开环执行稳定性之间取得平衡仍是部署中的关键难题。传统的部署流程通常将**数值积分步数（采样深度 $N$）**与**开环执行步长（执行视界 $s$）**视为相互独立的超参数。

本文揭示了流匹配 VLA 策略中由**系统性符号反转（Sign Reversal）**主导的**计算-执行耦合机制（Compute–Execution Coupling）**：
- **短执行视界（$s = 5$，高频重规划）：** 浅层积分（$N = 2$）相比深层积分（$N = 10$）会降低任务成功率，因为高频闭环视觉反馈能及时纠正探索性偏差，此时截断误差占主导。
- **长执行视界（$s = 20$，长周期开环承诺）：** 浅层积分（$N = 2$）**显著反超**深层积分（$N = 10$），在**完全免训练（Training-Free）、不改动模型结构**的前提下大幅提升成功率，并将推理延迟降低 **2.6×–3.3×**。
- **几何机理：** 前向欧拉截断在保持轨迹均值中心几乎不变的前提下，将动作束的横向方差收缩了约一半（$R(2)/R(10) = 0.51$），从而充当了**隐式方差正则化器**，有效抑制了长周期开环执行中的累积漂移。

---

## ✨ 核心实验结果

| 评测基准 | VLA 基座模型 | 核心结论 |
| :--- | :--- | :--- |
| **LIBERO** (40 项任务 / 4 子集, 种子 7/8/9) | $\pi_0$, $\pi_{0.5}$, GR00T-N1.7 | LIBERO-Long 上出现一致符号反转（$\pi_0$: $\Delta_{5} = -2.7\% \to \Delta_{20} = +3.7\%$，交互效应 $\mathcal{I} = \mathbf{+6.4\%}$）；协同配置 $(20, 2)$ 在 LIBERO-Long 达 **90.5%**（四子集平均 **95.5%**），单步均摊延迟仅 **2.6 ms**（**5.6×** 加速）。 |
| **RoboTwin 2.0** (50 项双臂任务, 100 次/任务) | $\pi_0$, $\pi_{0.5}$ | $\pi_{0.5}$ 在 50 项双臂任务上呈现显著符号反转（交互效应 $\mathcal{I} = \mathbf{+8.5\%}, p < 10^{-4}$）；均衡协同配置 $(25, 2)$ 实现 **3.5×** 加速，保持 $\pi_{0.5}$ 高成功率（**70.8%**）并将 $\pi_0$ 从 **37.0%** 提升至 **45.7%**。 |
| **Franka 真机实验** (5 项任务, 2,400 次试验) | $\pi_0$, $\pi_{0.5}$, GR00T-N1.7 | 每格 40 次配对真机实验表明，全视界浅层采样 $(s=H, N=2)$ 在全部 4 项准静态任务上全面反超深层求解器（$\pi_0$ **+10.0%**，$\pi_{0.5}$ **+6.9%**，GR00T-N1.7 **+11.3%**），计算开销最高降低 **25×**。 |

---

## 📝 引用 (Citation)

如果本研究的实验发现或理论分析对您的研究有所帮助，欢迎引用我们的论文：

```bibtex
@article{yang2026coupling,
  title   = {Coupling Execution Horizon and Sampling Depth in Flow-Matching VLA Policies},
  author  = {Yang, Jiabing and Xu, Yuan and Chen, Yixiang and Ma, Qisen and Li, Peiyan and Wang, Kai and Cui, Chenhang and Yu, Tao and Wen, Zichen and Ye, Wen and Fang, Bowen and He, Ziheng and Wu, Xiangnan and Li, Yingda and Huang, Yan and Wang, Liang},
  journal = {arXiv preprint},
  year    = {2026}
}
```
