/* Synchronized 4-cell rollout clips for Section 06 (Rollouts).
   LIBERO: pi0 and pi0.5 across Spatial, Object, Goal, Long (seed 7).
   RoboTwin 2.0: pi0 and pi0.5 per-step head-camera recordings (seed 0).
   Built by supplementary/tools/build_videos.py. */
window.ROLLOUTS = {
 "LIBERO": [
  {
   "backbone": "π0",
   "suite": "Spatial",
   "task": "task7",
   "title": "Bowl on stove",
   "instruction": "Pick up the black bowl on the stove and place it on the plate.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_spatial_task7_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task7_ep0_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_spatial_task7_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task7_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_spatial_task7_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task7_ep0_s20_n10.jpg",
     "success": false
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_spatial_task7_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task7_ep0_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Spatial",
   "task": "task0",
   "title": "Bowl between plate and ramekin",
   "instruction": "Pick up the black bowl between the plate and the ramekin and place it on the plate.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_spatial_task0_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task0_ep0_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_spatial_task0_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task0_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_spatial_task0_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task0_ep0_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_spatial_task0_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_spatial_task0_ep0_s20_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0",
   "suite": "Object",
   "task": "task0",
   "title": "Alphabet soup in basket",
   "instruction": "Pick up the alphabet soup and place it in the basket.",
   "episode": 1,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_object_task0_ep1_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_object_task0_ep1_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_object_task0_ep1_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_object_task0_ep1_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_object_task0_ep1_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_object_task0_ep1_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_object_task0_ep1_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_object_task0_ep1_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Object",
   "task": "task5",
   "title": "Tomato sauce in basket",
   "instruction": "Pick up the tomato sauce and place it in the basket.",
   "episode": 1,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_object_task5_ep1_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_object_task5_ep1_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_object_task5_ep1_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_object_task5_ep1_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_object_task5_ep1_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_object_task5_ep1_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_object_task5_ep1_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_object_task5_ep1_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Goal",
   "task": "task0",
   "title": "Open the middle drawer of the cabinet",
   "instruction": "Open the middle drawer of the cabinet.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_goal_task0_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_goal_task0_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_goal_task0_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_goal_task0_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_goal_task0_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_goal_task0_ep0_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_goal_task0_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_goal_task0_ep0_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Goal",
   "task": "task3",
   "title": "Open the top drawer and put the bowl inside",
   "instruction": "Open the top drawer and put the bowl inside.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_goal_task3_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_goal_task3_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_goal_task3_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_goal_task3_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_goal_task3_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_goal_task3_ep0_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_goal_task3_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_goal_task3_ep0_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Long",
   "task": "task9",
   "title": "Mug in microwave, close it",
   "instruction": "Put the yellow and white mug in the microwave and close it.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_long_task9_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_long_task9_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_long_task9_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_long_task9_ep0_s5_n2.jpg",
     "success": false
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_long_task9_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_long_task9_ep0_s20_n10.jpg",
     "success": false
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_long_task9_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_long_task9_ep0_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0",
   "suite": "Long",
   "task": "task8",
   "title": "Both moka pots on stove",
   "instruction": "Put both moka pots on the stove.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi0_long_task8_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi0_long_task8_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi0_long_task8_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi0_long_task8_ep0_s5_n2.jpg",
     "success": false
    },
    {
     "rule": "(20, 10)",
     "file": "assets/videos/libero/pi0_long_task8_ep0_s20_n10.mp4",
     "poster": "assets/videos/libero/pi0_long_task8_ep0_s20_n10.jpg",
     "success": true
    },
    {
     "rule": "(20, 2)",
     "file": "assets/videos/libero/pi0_long_task8_ep0_s20_n2.mp4",
     "poster": "assets/videos/libero/pi0_long_task8_ep0_s20_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0.5",
   "suite": "Spatial",
   "task": "task0",
   "title": "Bowl between plate and ramekin",
   "instruction": "Pick up the black bowl between the plate and the ramekin and place it on the plate.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_spatial_task0_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task0_ep0_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_spatial_task0_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task0_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_spatial_task0_ep0_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task0_ep0_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_spatial_task0_ep0_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task0_ep0_s10_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0.5",
   "suite": "Spatial",
   "task": "task1",
   "title": "Bowl next to ramekin",
   "instruction": "Pick up the black bowl next to the ramekin and place it on the plate.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_spatial_task1_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task1_ep0_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_spatial_task1_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task1_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_spatial_task1_ep0_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task1_ep0_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_spatial_task1_ep0_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_spatial_task1_ep0_s10_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0.5",
   "suite": "Object",
   "task": "task0",
   "title": "Alphabet soup in basket",
   "instruction": "Pick up the alphabet soup and place it in the basket.",
   "episode": 1,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_object_task0_ep1_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_object_task0_ep1_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_object_task0_ep1_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_object_task0_ep1_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_object_task0_ep1_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_object_task0_ep1_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_object_task0_ep1_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_object_task0_ep1_s10_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0.5",
   "suite": "Object",
   "task": "task1",
   "title": "Cream cheese in basket",
   "instruction": "Pick up the cream cheese and place it in the basket.",
   "episode": 1,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_object_task1_ep1_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_object_task1_ep1_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_object_task1_ep1_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_object_task1_ep1_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_object_task1_ep1_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_object_task1_ep1_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_object_task1_ep1_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_object_task1_ep1_s10_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0.5",
   "suite": "Goal",
   "task": "task4",
   "title": "Put the bowl on top of the cabinet",
   "instruction": "Put the bowl on top of the cabinet.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_goal_task4_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_goal_task4_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_goal_task4_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_goal_task4_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_goal_task4_ep0_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_goal_task4_ep0_s10_n10.jpg",
     "success": false
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_goal_task4_ep0_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_goal_task4_ep0_s10_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0.5",
   "suite": "Goal",
   "task": "task0",
   "title": "Open the middle drawer of the cabinet",
   "instruction": "Open the middle drawer of the cabinet.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_goal_task0_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_goal_task0_ep0_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_goal_task0_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_goal_task0_ep0_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_goal_task0_ep0_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_goal_task0_ep0_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_goal_task0_ep0_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_goal_task0_ep0_s10_n2.jpg",
     "success": true
    }
   ],
   "typical": true
  },
  {
   "backbone": "π0.5",
   "suite": "Long",
   "task": "task8",
   "title": "Both moka pots on stove",
   "instruction": "Put both moka pots on the stove.",
   "episode": 0,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_long_task8_ep0_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_long_task8_ep0_s5_n10.jpg",
     "success": false
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_long_task8_ep0_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_long_task8_ep0_s5_n2.jpg",
     "success": false
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_long_task8_ep0_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_long_task8_ep0_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_long_task8_ep0_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_long_task8_ep0_s10_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0.5",
   "suite": "Long",
   "task": "task4",
   "title": "Two mugs on two plates",
   "instruction": "Put the white mug on the left plate and put the yellow and white mug on the right plate.",
   "episode": 4,
   "episode_label": "initial state",
   "clips": [
    {
     "rule": "(5, 10)",
     "file": "assets/videos/libero/pi05_long_task4_ep4_s5_n10.mp4",
     "poster": "assets/videos/libero/pi05_long_task4_ep4_s5_n10.jpg",
     "success": true
    },
    {
     "rule": "(5, 2)",
     "file": "assets/videos/libero/pi05_long_task4_ep4_s5_n2.mp4",
     "poster": "assets/videos/libero/pi05_long_task4_ep4_s5_n2.jpg",
     "success": true
    },
    {
     "rule": "(10, 10)",
     "file": "assets/videos/libero/pi05_long_task4_ep4_s10_n10.mp4",
     "poster": "assets/videos/libero/pi05_long_task4_ep4_s10_n10.jpg",
     "success": false
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/libero/pi05_long_task4_ep4_s10_n2.mp4",
     "poster": "assets/videos/libero/pi05_long_task4_ep4_s10_n2.jpg",
     "success": true
    }
   ]
  }
 ],
 "RoboTwin": [
  {
   "backbone": "π0",
   "task": "lift_pot",
   "title": "Lift Pot",
   "instruction": "Grasp both handles of the pot bimanually and lift it straight up.",
   "episode": 1,
   "episode_label": "scene",
   "clips": [
    {
     "rule": "(10, 10)",
     "file": "assets/videos/robotwin/pi0_lift_pot_ep1_s10_n10.mp4",
     "poster": "assets/videos/robotwin/pi0_lift_pot_ep1_s10_n10.jpg",
     "success": false
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/robotwin/pi0_lift_pot_ep1_s10_n2.mp4",
     "poster": "assets/videos/robotwin/pi0_lift_pot_ep1_s10_n2.jpg",
     "success": true
    },
    {
     "rule": "(50, 10)",
     "file": "assets/videos/robotwin/pi0_lift_pot_ep1_s50_n10.mp4",
     "poster": "assets/videos/robotwin/pi0_lift_pot_ep1_s50_n10.jpg",
     "success": false
    },
    {
     "rule": "(50, 2)",
     "file": "assets/videos/robotwin/pi0_lift_pot_ep1_s50_n2.mp4",
     "poster": "assets/videos/robotwin/pi0_lift_pot_ep1_s50_n2.jpg",
     "success": true
    }
   ]
  },
  {
   "backbone": "π0.5",
   "task": "place_fan",
   "title": "Place Fan",
   "instruction": "Grasp the desk fan and place it upright on the target pad.",
   "episode": 3,
   "episode_label": "scene",
   "clips": [
    {
     "rule": "(10, 10)",
     "file": "assets/videos/robotwin/pi05_place_fan_ep3_s10_n10.mp4",
     "poster": "assets/videos/robotwin/pi05_place_fan_ep3_s10_n10.jpg",
     "success": true
    },
    {
     "rule": "(10, 2)",
     "file": "assets/videos/robotwin/pi05_place_fan_ep3_s10_n2.mp4",
     "poster": "assets/videos/robotwin/pi05_place_fan_ep3_s10_n2.jpg",
     "success": false
    },
    {
     "rule": "(50, 10)",
     "file": "assets/videos/robotwin/pi05_place_fan_ep3_s50_n10.mp4",
     "poster": "assets/videos/robotwin/pi05_place_fan_ep3_s50_n10.jpg",
     "success": true
    },
    {
     "rule": "(50, 2)",
     "file": "assets/videos/robotwin/pi05_place_fan_ep3_s50_n2.mp4",
     "poster": "assets/videos/robotwin/pi05_place_fan_ep3_s50_n2.jpg",
     "success": true
    }
   ]
  }
 ]
};
