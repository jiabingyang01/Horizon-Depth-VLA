/* Numbers of the paper "Coupling Execution Horizon and Sampling Depth in Flow-Matching VLA Policies", copied
   from its tables. Success rates are in percent; ± is the sample SD over seeds 7/8/9. A configuration is (s, N):
   s = execution horizon (actions executed open loop before the policy is queried again), N = sampling depth
   (forward Euler steps = function evaluations). */
window.PAPER_DATA = {
  setup: {
    backbones: [
      { key: "pi0", name: "π0", size: "3B", H: 50, N0: 10 },
      { key: "pi05", name: "π0.5", size: "3B", H: 10, N0: 10 },
      { key: "groot", name: "GR00T-N1.7", size: "2B", H: 16, N0: 4 }
    ],
    default_pi0_libero: [5, 10],
    LIBERO: { suites: ["Spatial", "Object", "Goal", "Long"], tasks: 40, episodes_per_suite: 500, seeds: [7, 8, 9] },
    RoboTwin: { tasks: 50, rollouts_per_task: 100, H: 50, horizons: [10, 25, 50] },
    sim_tasks: 55,
    gpu: "NVIDIA A100",
    real_world: {
      robot: "Franka Research 3 (7-DoF) with a parallel-jaw gripper",
      control: "25 Hz Cartesian impedance targets",
      camera: "overhead ZED 2i RGB camera",
      proprio: "joint proprioception",
      teleoperation: "SpaceMouse",
      demos_per_task: 50, demos_total: 250,
      finetune: { "π0": "30k steps", "π0.5": "30k steps", "GR00T-N1.7": "10k steps" },
      configs: ["(s = 10, N0)", "(s = 10, 2)", "(s = H, N0)", "(s = H, 2)"],
      tasks: [
        { key: "corn_to_pink_plate", name: "Put Corn on Pink Plate", instruction: "Put the corn on the pink plate" },
        { key: "press_yellow_then_blue_button", name: "Press Yellow Button, then Blue", instruction: "Press the yellow button, then press the blue button" },
        { key: "box_cover_blue_block", name: "Cover Blue Block with Box", instruction: "Cover the blue block with the box" },
        { key: "corn_to_upper_rack", name: "Lift Corn onto Upper Rack", instruction: "Put the corn on the upper rack" },
        { key: "tomato_from_turntable_to_white_plate", name: "Move Tomato from Turntable to Plate", instruction: "Pick up the tomato from the rotating turntable and place it in the white plate", moving: true }
      ]
    }
  },

  /* Table I: 2 x 2 factorial per backbone; cells [mean, sd]; interaction I = Δ_long − Δ_short, † = limited by ceiling */
  libero: {
    label: "Table I",
    caption: "Factorial horizon–depth evaluation on the LIBERO benchmark (mean success rate %). For each model the table contrasts a short-horizon and a long-horizon pair; Δ_{short} and Δ_{long} are the paired marginal effects of reducing the solver depth, and the interaction I = Δ_{long} − Δ_{short} reflects the sign-reversing coupling across execution regimes († marks interaction contrasts constrained by ceiling effects).",
    rows: ["Spatial", "Object", "Goal", "Long", "Average"],
    models: [
      { key: "pi0", name: "π0", H: 50,
        configs: ["(5, 10)", "(5, 2)", "(20, 10)", "(20, 2)"], s: [5, 5, 20, 20], N: [10, 2, 10, 2],
        cells: {
          Spatial: [[97.1, 0.3], [97.7, 0.4], [93.8, 0.5], [95.3, 0.3]],
          Object: [[98.1, 0.5], [97.9, 0.8], [97.1, 0.7], [99.1, 0.5]],
          Goal: [[93.3, 1.0], [93.9, 1.2], [93.9, 0.1], [97.3, 0.6]],
          Long: [[81.2, 0.7], [78.5, 1.5], [86.9, 2.5], [90.5, 0.6]],
          Average: [[92.4, 0.6], [92.0, 0.5], [92.9, 0.8], [95.5, 0.1]]
        },
        best: { Spatial: 1, Object: 3, Goal: 3, Long: 3, Average: 3 },
        I: { Spatial: [0.9, 0.6], Object: [2.1, 1.5], Goal: [2.7, 1.2], Long: [6.4, 2.1], Average: [3.0, 0.8] },
        dagger: {},
        latency_ms: [14.3, 10.2, 3.6, 2.6], speedup: "5.6×" },
      { key: "pi05", name: "π0.5", H: 10,
        configs: ["(5, 10)", "(5, 2)", "(10, 10)", "(10, 2)"], s: [5, 5, 10, 10], N: [10, 2, 10, 2],
        cells: {
          Spatial: [[98.5, 0.4], [98.5, 0.4], [98.3, 0.6], [98.7, 0.6]],
          Object: [[97.8, 0.3], [98.5, 0.6], [99.1, 0.6], [99.5, 0.2]],
          Goal: [[98.3, 1.1], [97.9, 0.5], [98.0, 0.6], [98.5, 0.5]],
          Long: [[93.1, 0.4], [93.1, 0.5], [94.8, 1.0], [95.3, 0.8]],
          Average: [[96.9, 0.4], [97.0, 0.2], [97.6, 0.2], [98.0, 0.5]]
        },
        best: { Spatial: 3, Object: 3, Goal: 3, Long: 3, Average: 3 },
        I: { Spatial: [0.3, 1.2], Object: [-0.4, 0.2], Goal: [0.8, 0.5], Long: [0.5, 1.6], Average: [0.3, 0.5] },
        dagger: { Spatial: true, Long: true, Average: true },
        latency_ms: [14.2, 10.3, 7.1, 5.1], speedup: "2.8×" },
      { key: "groot", name: "GR00T-N1.7", H: 16,
        configs: ["(2, 4)", "(2, 2)", "(8, 4)", "(8, 2)"], s: [2, 2, 8, 8], N: [4, 2, 4, 2],
        cells: {
          Spatial: [[97.0, 0.5], [96.9, 0.6], [96.7, 0.5], [96.5, 0.4]],
          Object: [[97.1, 0.9], [96.5, 0.8], [98.9, 0.3], [99.1, 0.3]],
          Goal: [[94.4, 0.5], [94.4, 1.1], [95.9, 0.7], [95.5, 0.5]],
          Long: [[84.4, 0.3], [78.9, 0.9], [91.3, 2.4], [89.5, 0.8]],
          Average: [[93.2, 0.3], [91.7, 0.5], [95.7, 0.6], [95.1, 0.3]]
        },
        best: { Spatial: 0, Object: 3, Goal: 2, Long: 2, Average: 2 },
        I: { Spatial: [-0.1, 0.4], Object: [0.7, 0.4], Goal: [-0.4, 0.5], Long: [3.6, 1.4], Average: [0.9, 0.4] },
        dagger: { Spatial: true, Goal: true },
        latency_ms: [55.6, 39.6, 13.9, 9.9], speedup: "5.6×" }
    ]
  },

  /* Table III: causal diagnostic interventions on π0 / LIBERO-Long */
  interventions: {
    label: "Table III",
    caption: "Causal diagnostic interventions on π0 / LIBERO-Long. Success rates (%) are mean ± sample SD across matched seeds 7/8/9; Δ_{s} = Y_{s,2} − Y_{s,10} and the interaction contrast I = Δ_{20} − Δ_{5}.",
    rows: [
      { key: "standard", name: "Standard sampling (default)", group: "",
        s5: { deep: [81.2, 0.7], shallow: [78.5, 1.5], diff: [-2.7, 1.0] }, s20: { deep: [86.9, 2.5], shallow: [90.5, 0.6], diff: [3.7, 2.4] }, I: 6.4 },
      { key: "scaled", name: "Scaled noise prior", group: "1D dispersion rescaling (matched endpoint radius)",
        s5: { deep: [79.8, 0.9], shallow: [70.9, 1.7], diff: [-8.9, 2.5] }, s20: { deep: [88.3, 1.3], shallow: [77.8, 0.7], diff: [-10.5, 0.9] }, I: -1.5 },
      { key: "frozen", name: "Frozen noise source", group: "Noise freezing across replans (redraw stochasticity ablation)",
        s5: { deep: [42.3, 2.3], shallow: [72.9, 0.6], diff: [30.6, 2.5] }, s20: { deep: [75.0, 1.7], shallow: [89.3, 0.4], diff: [14.3, 1.9] }, I: -16.3 }
    ]
  },

  /* in-text numbers used on the page */
  text_numbers: {
    pi0_long_best: 90.5, pi0_long_default: 81.2, pi0_long_I: 6.4,
    pi0_latency_default_ms: 14.3, pi0_latency_best_ms: 2.6, pi0_speedup: "5.6×",
    robotwin_pi05_I: 8.46, robotwin_pi05_tasks_losing_s10: 36,
    pareto_latency_factor: "3.5×",
    fan_ratio: 2.1, center_path_within_pct: 3
  }
};
