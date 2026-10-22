/* Colour roles of the horizon x depth pages; they follow the paper's figures. */
window.SITE_COLORS = {
  acc: "#059669", accDeep: "#047857", accLight: "#34d399",
  deep: "#2563eb", shallow: "#059669",
  /* the four cells of the 2 x 2 design (real-world figure): short/long horizon x deep/shallow sampling */
  roles: { sd: "#2563eb", ss: "#0ea5e9", ld: "#f97316", ls: "#10b981" },
  /* Figure 1 */
  backbones: { "π0": "#1f77b4", "π0.5": "#ff7f0e", "GR00T-N1.7": "#2ca02c" },
  shapes: { "π0": "circle", "π0.5": "square", "GR00T-N1.7": "triangle" },
  /* Figure 4 */
  radius: "#0d3b66", fit: "#d62728", fanDeep: "#8a8a8a", fanShallow: "#1f77b4", band: "#f2c14e",
  ink: "#111a1c", ink2: "#33403f", muted: "#5b6867", faint: "#748180",
  pos: "#0f7a4f", neg: "#b4233c",
  /* matplotlib YlGnBu, as in Figure 3 */
  YLGNBU: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]
};
