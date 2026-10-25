/* Synchronized rollout examples for Section 06 (Rollouts). */
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
      "backbone": "π0",
      "task": "beat_block_hammer",
      "title": "Beat Block Hammer",
      "instruction": "Pick up the hammer and strike the target block.",
      "episode": 0,
      "episode_label": "scene",
      "clips": [
        {
          "rule": "(10, 10)",
          "file": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s10_n10.mp4",
          "poster": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s10_n10.jpg",
          "success": false
        },
        {
          "rule": "(10, 2)",
          "file": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s10_n2.mp4",
          "poster": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s10_n2.jpg",
          "success": true
        },
        {
          "rule": "(50, 10)",
          "file": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s50_n10.mp4",
          "poster": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s50_n10.jpg",
          "success": false
        },
        {
          "rule": "(50, 2)",
          "file": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s50_n2.mp4",
          "poster": "assets/videos/robotwin/pi0_beat_block_hammer_ep0_s50_n2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0",
      "task": "place_burger_fries",
      "title": "Place Burger Fries",
      "instruction": "Place the burger and French fries onto the serving tray.",
      "episode": 4,
      "episode_label": "scene",
      "clips": [
        {
          "rule": "(10, 10)",
          "file": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s10_n10.mp4",
          "poster": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s10_n10.jpg",
          "success": true
        },
        {
          "rule": "(10, 2)",
          "file": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s10_n2.mp4",
          "poster": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s10_n2.jpg",
          "success": true
        },
        {
          "rule": "(50, 10)",
          "file": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s50_n10.mp4",
          "poster": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s50_n10.jpg",
          "success": false
        },
        {
          "rule": "(50, 2)",
          "file": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s50_n2.mp4",
          "poster": "assets/videos/robotwin/pi0_place_burger_fries_ep4_s50_n2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "stack_blocks_three",
      "title": "Stack Blocks Three",
      "instruction": "Stack three blocks on top of each other in the center of the table.",
      "episode": 3,
      "episode_label": "scene",
      "clips": [
        {
          "rule": "(10, 10)",
          "file": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s10_n10.mp4",
          "poster": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s10_n10.jpg",
          "success": false
        },
        {
          "rule": "(10, 2)",
          "file": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s10_n2.mp4",
          "poster": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s10_n2.jpg",
          "success": false
        },
        {
          "rule": "(50, 10)",
          "file": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s50_n10.mp4",
          "poster": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s50_n10.jpg",
          "success": true
        },
        {
          "rule": "(50, 2)",
          "file": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s50_n2.mp4",
          "poster": "assets/videos/robotwin/pi05_stack_blocks_three_ep3_s50_n2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "turn_switch",
      "title": "Turn Switch",
      "instruction": "Toggle the switch on the tabletop panel.",
      "episode": 1,
      "episode_label": "scene",
      "clips": [
        {
          "rule": "(10, 10)",
          "file": "assets/videos/robotwin/pi05_turn_switch_ep1_s10_n10.mp4",
          "poster": "assets/videos/robotwin/pi05_turn_switch_ep1_s10_n10.jpg",
          "success": false
        },
        {
          "rule": "(10, 2)",
          "file": "assets/videos/robotwin/pi05_turn_switch_ep1_s10_n2.mp4",
          "poster": "assets/videos/robotwin/pi05_turn_switch_ep1_s10_n2.jpg",
          "success": false
        },
        {
          "rule": "(50, 10)",
          "file": "assets/videos/robotwin/pi05_turn_switch_ep1_s50_n10.mp4",
          "poster": "assets/videos/robotwin/pi05_turn_switch_ep1_s50_n10.jpg",
          "success": false
        },
        {
          "rule": "(50, 2)",
          "file": "assets/videos/robotwin/pi05_turn_switch_ep1_s50_n2.mp4",
          "poster": "assets/videos/robotwin/pi05_turn_switch_ep1_s50_n2.jpg",
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
  ],
  "Real": [
    {
      "backbone": "π0",
      "task": "corn_to_pink_plate",
      "title": "Put Corn on Pink Plate",
      "instruction": "Put the corn on the pink plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_pink_plate_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0",
      "task": "press_yellow_then_blue_button",
      "title": "Press Yellow Button, then Blue",
      "instruction": "Press the yellow button, then press the blue button",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_s10_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_sh_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_press_yellow_then_blue_button_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0",
      "task": "box_cover_blue_block",
      "title": "Cover Blue Block with Box",
      "instruction": "Cover the blue block with the box",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_s10_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_sh_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_box_cover_blue_block_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0",
      "task": "corn_to_upper_rack",
      "title": "Lift Corn onto Upper Rack",
      "instruction": "Put the corn on the upper rack",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_s10_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_sh_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_corn_to_upper_rack_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0",
      "task": "tomato_from_turntable_to_white_plate",
      "title": "Move Tomato from Turntable to Plate",
      "instruction": "Pick up the tomato from the rotating turntable and place it in the white plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/pi0/pi0_tomato_from_turntable_to_white_plate_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "corn_to_pink_plate",
      "title": "Put Corn on Pink Plate",
      "instruction": "Put the corn on the pink plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_pink_plate_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "press_yellow_then_blue_button",
      "title": "Press Yellow Button, then Blue",
      "instruction": "Press the yellow button, then press the blue button",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_s10_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_sh_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_press_yellow_then_blue_button_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "box_cover_blue_block",
      "title": "Cover Blue Block with Box",
      "instruction": "Cover the blue block with the box",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_s10_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_sh_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_box_cover_blue_block_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "corn_to_upper_rack",
      "title": "Lift Corn onto Upper Rack",
      "instruction": "Put the corn on the upper rack",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_s10_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_sh_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_corn_to_upper_rack_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "π0.5",
      "task": "tomato_from_turntable_to_white_plate",
      "title": "Move Tomato from Turntable to Plate",
      "instruction": "Pick up the tomato from the rotating turntable and place it in the white plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/pi05/pi05_tomato_from_turntable_to_white_plate_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "GR00T-N1.7",
      "task": "corn_to_pink_plate",
      "title": "Put Corn on Pink Plate",
      "instruction": "Put the corn on the pink plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/groot/groot_corn_to_pink_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_pink_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/groot/groot_corn_to_pink_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_pink_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/groot/groot_corn_to_pink_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_pink_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/groot/groot_corn_to_pink_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_pink_plate_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "GR00T-N1.7",
      "task": "press_yellow_then_blue_button",
      "title": "Press Yellow Button, then Blue",
      "instruction": "Press the yellow button, then press the blue button",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_s10_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_s10_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_sh_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_sh_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_press_yellow_then_blue_button_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "GR00T-N1.7",
      "task": "box_cover_blue_block",
      "title": "Cover Blue Block with Box",
      "instruction": "Cover the blue block with the box",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/groot/groot_box_cover_blue_block_s10_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_box_cover_blue_block_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/groot/groot_box_cover_blue_block_s10_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_box_cover_blue_block_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/groot/groot_box_cover_blue_block_sh_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_box_cover_blue_block_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/groot/groot_box_cover_blue_block_sh_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_box_cover_blue_block_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "GR00T-N1.7",
      "task": "corn_to_upper_rack",
      "title": "Lift Corn onto Upper Rack",
      "instruction": "Put the corn on the upper rack",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/groot/groot_corn_to_upper_rack_s10_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_upper_rack_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/groot/groot_corn_to_upper_rack_s10_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_upper_rack_s10_2.jpg",
          "success": false
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/groot/groot_corn_to_upper_rack_sh_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_upper_rack_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/groot/groot_corn_to_upper_rack_sh_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_corn_to_upper_rack_sh_2.jpg",
          "success": true
        }
      ]
    },
    {
      "backbone": "GR00T-N1.7",
      "task": "tomato_from_turntable_to_white_plate",
      "title": "Move Tomato from Turntable to Plate",
      "instruction": "Pick up the tomato from the rotating turntable and place it in the white plate",
      "clips": [
        {
          "rule": "(s = 10, N0)",
          "file": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_s10_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_s10_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = 10, 2)",
          "file": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_s10_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_s10_2.jpg",
          "success": true
        },
        {
          "rule": "(s = H, N0)",
          "file": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_sh_n0.mp4",
          "poster": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_sh_n0.jpg",
          "success": false
        },
        {
          "rule": "(s = H, 2)",
          "file": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_sh_2.mp4",
          "poster": "assets/videos/realworld/groot/groot_tomato_from_turntable_to_white_plate_sh_2.jpg",
          "success": true
        }
      ]
    }
  ]
};
