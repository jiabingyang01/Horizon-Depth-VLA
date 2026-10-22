/* Prose of the horizon x depth page. The abstract and the figure captions are the paper's; the rest summarises it. */
window.PAPER_TEXT = {
  title: "Coupling Execution Horizon and Sampling Depth in Flow-Matching VLA Policies",

  tldr: "A flow-matching VLA is deployed with two knobs: how many actions run open loop before the policy is queried again (the execution horizon s) and how many Euler steps generate each action chunk (the sampling depth N). They are tuned separately, yet their effects interact. Fewer steps lower success when the policy replans often and raise it when it executes long open-loop prefixes, because truncated integration keeps the centre of the sampled chunks nearly in place while shrinking their spread. Pairing a long horizon with two steps needs no training and cuts the per-step latency by up to 5.6×.",

  abstract: "Flow-matching Vision-Language-Action (VLA) models generate expressive continuous trajectories for robotic manipulation, yet balancing real-time responsiveness with execution stability remains a persistent challenge. Standard deployment workflows typically treat numerical solver depth and execution horizon as decoupled choices. The horizon amortizes inference latency, while solver depth is kept high to preserve integration fidelity. In this paper, we reveal a fundamental compute–execution coupling in flow-matching VLAs governed by a systematic sign reversal. While coarse numerical integration degrades precision under rapid replanning, it markedly improves task performance under extended open-loop commitment. Geometrically, numerical truncation contracts lateral action dispersion around an invariant trajectory centroid, serving as an implicit regularizer that suppresses compounding open-loop drift. Across LIBERO, RoboTwin 2.0, and real-world Franka manipulation on representative VLA backbones including π₀, π₀.₅, and GR00T, exploiting this joint coupling consistently achieves superior task success while drastically lowering inference latency, entirely training-free and without architectural modifications. These findings establish numerical sampling depth as an operational variance regulator, shifting its role from a static precision budget to an active deployment knob in robot learning.",

  phenomenon: {
    lede: "On π0 LIBERO-Long, going from 10 to 2 Euler steps lowers success when the policy replans every 5 actions and raises it when it executes 20 or more before the next query. The paired contrast Y_{s,2} − Y_{s,10} changes sign between s = 5 and s = 10 and is positive in all three seeds from s = 20 on. π0.5, whose head predicts only 10 actions, turns positive past s = 6; GR00T-N1.7, with a 16-action head, stays below zero, although its penalty shrinks as the horizon grows.",
    phen_sub: "Paired contrast Y_{s,2} − Y_{s,N0} on LIBERO-Long, mean ± sample SD over seeds 7/8/9; filled markers: all three seeds agree in sign.",
    grid_sub: "LIBERO-Long success over the execution horizon s and the sampling depth N. π0 and π0.5: one 500-episode run per cell; GR00T-N1.7: mean over seeds 7/8/9. The outlined cell of each row is its best depth; colours are normalized per panel."
  },

  mechanism: {
    lede: "Why would fewer steps ever help? For a Gaussian target the answer is exact. Forward Euler with N steps keeps the mean and scales the covariance by ρ(N), from a collapse onto the mean at N = 1 back to the full spread as N grows, so a shallow solver emits a tighter cloud around the same centre. When the policy replans every few steps, a fresh and more diverse draw helps it correct course; when it runs one draw open loop for many steps, the extra spread of a deep solver compounds into drift.",
    lab_sub: "Proposition 1 evaluated in the browser for a Gaussian target N(μ, σ0² I). The default σ0 = 0.587 is the value fitted to π0's measured cloud radii in Figure 4a.",
    fig4a_sub: "π0: cloud radius of paired action chunks versus the number of Euler steps (95% intervals), with the Proposition-1 curve fitted on N ≥ 2. The model predicts a radius of 0 at N = 1; the measured single-step cloud keeps a residual.",
    fig4b_sub: "π0: lateral spread of unguided open-loop rollouts over the horizon s; the deep solver's fan is about 2.1× wider, while the centre paths stay within 3% of the path length. The shaded band marks the horizons where the seeds disagree on the sign of the contrast."
  },

  results: {
    lede: "Three flow-matching backbones are evaluated with their released checkpoints on NVIDIA A100 GPUs. On LIBERO (40 tasks, 500 episodes per suite, seeds 7/8/9) each backbone runs a 2 × 2 factorial: a short and a long execution horizon crossed with the default and a two-step sampling depth. On RoboTwin 2.0 (50 bimanual tasks, 100 rollouts per task) π0 and π0.5 run s ∈ {10, 25, 50} with N ∈ {10, 2}.",
    libero_note: "π0 on LIBERO-Long is the clearest case: two steps cost 2.7 points at s = 5 and gain 3.7 at s = 20, an interaction of +6.4, while the per-step latency falls from 14.3 ms to 2.6 ms. The † marks interactions that are limited by ceiling effects.",
    robotwin_note: "On RoboTwin 2.0, π0.5 loses ground with two steps on 36 of the 50 tasks at s = 10; at s = 25 the deficit is gone, and at s = 50 two steps are ahead, an interaction of +8.5 points over the 50 tasks. For π0 the short horizon already sits past its crossover and the contrast is small at every horizon."
  },

  analysis: {
    lede: "Two interventions on π0 LIBERO-Long separate the mechanism from simpler explanations, and two further observations delimit where it applies.",
    interventions_note: "Rescaling the initial noise to match the endpoint radius does not reproduce the reversal: it lowers success at both horizons and flips the interaction to −1.5. Freezing the initial noise across replans removes the redraws that the deep solver relies on under frequent replanning: at s = 5 its success drops from 81.2 to 42.3, while two-step sampling holds at 72.9.",
    findings: [
      { t: "Forward Euler beats multi-stage solvers at matched evaluations", p: "At s = 20 and the same number of velocity-field evaluations, forward Euler outperforms explicit midpoint, Heun and second-order Runge-Kutta. Multi-stage schemes query the learned velocity field at extrapolated intermediate states, away from the data the network was trained on; at a budget of two evaluations the second stage of a single Heun step expands the dispersion instead of contracting it." },
      { t: "The benefit scales with the task's spatial tolerance", p: "Coarse transport tasks with a wide basin of attraction gain the most from long open-loop execution with two steps, while narrow-funnel insertion and contact-rich tasks still need frequent replanning with deep integration to recover from small misalignments." },
      { t: "One step is not a shallower version of two", p: "A single Euler step collapses the chunk onto a biased estimate of the conditional mean instead of contracting its spread, and it lowers success at short and intermediate horizons. From two steps on, the measured cloud radius follows the contraction predicted by Proposition 1." }
    ]
  },

  videos: {
    lede: "Rollouts from the evaluation runs: within an example every clip starts from the same initial state, and only the deployment configuration (s, N) changes."
  },

  figures: {
    phenomenon: {
      group: "Figure 1", title: "Sign-reversing coupling between execution horizon and sampling depth",
      caption: "Sign-reversing coupling between execution horizon s and sampling depth N. Shallow sampling (N = 2) degrades performance under rapid replanning but yields systematic gains under extended open-loop execution. Curves show paired marginal contrasts Y_{s,2} − Y_{s,N0} on LIBERO-Long across matched seeds (mean ± sample SD), where solid markers indicate horizons with unanimous sign agreement across all three seeds.",
      alt: "Paired contrast between two-step and default sampling versus execution horizon for three backbones.",
      files: { svg: "assets/img/fig_phenomenon.svg" }
    },
    pipeline: {
      group: "Figure 2", title: "Overview of computational-execution co-design",
      caption: "Overview of computational-execution co-design in flow-matching Vision-Language-Action policies. Top: the policy conditions on the observation o_t and integrates linear probability flow with N forward Euler steps from prior noise x^{(0)} ~ N(0, I) to generate the action chunk, executing an open-loop prefix of length s on the robot before replanning at t + s. Bottom: early solver truncation (N = 2) contracts sample dispersion around the conditional centroid (R(2) < R(10)); under rapid replanning (s = 5) closed-loop feedback exploits sample diversity, while under extended open-loop execution (s = 20) coarse integration suppresses compounding lateral drift.",
      alt: "Diagram of a flow-matching VLA: noise is integrated with N Euler steps into an action chunk, the first s actions are executed, and the policy is queried again; below, schematic sample clouds and open-loop rollout fans for N = 10 and N = 2.",
      files: { webp: "assets/img/pipeline.webp" }
    },
    grid: {
      group: "Figure 3", title: "Success over the execution-horizon × sampling-depth grid",
      caption: "Success rates across the joint execution horizon (s) vs. sampling depth (N) grid on LIBERO-Long (colour scales normalized per panel). (a) For π0, optimal sampling depth shifts shallower as s expands. (b) π0.5 is restricted by its 10-action prediction head. (c) GR00T-N1.7 supervises 16 actions.",
      alt: "Three heatmaps of LIBERO-Long success over execution horizon and denoising steps.",
      files: { svg: "assets/img/fig_grid.svg" }
    },
    mechanism: {
      group: "Figure 4", title: "Geometric mechanism of horizon–depth coupling",
      caption: "Geometric mechanism of horizon–depth coupling. (a) Cloud radius vs. sampling depth on π0 (Proposition 1 curve fitted on N ≥ 2); single-step Euler deviates by retaining a non-zero approximation residual. (b) Open-loop trajectory spread accumulated over horizon s: deep sampling (N = 10) generates about 2.1× wider lateral dispersion than N = 2 while preserving the nominal path direction.",
      alt: "Left: cloud radius versus denoising steps with a fitted model curve. Right: open-loop spread over execution horizon for N = 10 and N = 2.",
      files: { svg: "assets/img/fig_mechanism.svg" }
    },
    real_world: {
      group: "Figure 5 (top)", title: "Real-world setup",
      caption: "The Franka Research 3 platform (left) and the five evaluated manipulation tasks (right).",
      alt: "Photo of the Franka Research 3 workstation with a ZED 2i camera and SpaceMouse, and two keyframes for each of the five tasks.",
      files: { webp: "assets/img/real_world_setup.webp" }
    }
  }
};
