// Detailed exercise breakdowns for Hyrox training

export const exerciseLibrary = {
  // Strength Exercises
  'back squats': {
    name: 'Back Squats',
    category: 'Strength',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    steps: [
      'Position the barbell on your upper traps, gripping slightly wider than shoulder-width',
      'Unrack the bar and step back, feet shoulder-width apart, toes slightly out',
      'Take a deep breath, brace your core tight',
      'Initiate by pushing hips back, then bend knees to descend',
      'Keep chest up and knees tracking over toes',
      'Descend until thighs are parallel or below (hip crease below knee)',
      'Drive through your whole foot to stand back up',
      'Exhale at the top, reset breath, and repeat'
    ],
    tips: [
      'Keep your core braced throughout the movement',
      'Don\'t let knees cave inward',
      'Maintain a neutral spine - no rounding',
      'Control the descent, explode on the way up'
    ]
  },
  'deadlifts': {
    name: 'Deadlifts',
    category: 'Strength',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Traps', 'Core'],
    steps: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Hinge at hips and grip bar just outside your legs',
      'Drop hips until shins touch the bar, chest up, back flat',
      'Take a deep breath and brace your core hard',
      'Push the floor away with your legs while keeping bar close',
      'As bar passes knees, drive hips forward to lockout',
      'Stand tall with shoulders back, hips fully extended',
      'Reverse the movement: hinge hips first, then bend knees'
    ],
    tips: [
      'Bar should travel in a straight vertical line',
      'Keep the bar close to your body throughout',
      'Don\'t round your lower back',
      'Think "push the floor away" not "pull the bar up"'
    ]
  },
  'sled push': {
    name: 'Sled Push',
    category: 'Hyrox Station',
    muscles: ['Quadriceps', 'Glutes', 'Calves', 'Core', 'Shoulders'],
    steps: [
      'Position hands on the high handles, arms extended',
      'Lean into the sled at a 45-degree angle',
      'Keep your core tight and back flat',
      'Drive through your toes, taking short powerful steps',
      'Keep your head neutral, looking at the ground ahead',
      'Maintain consistent pressure on the sled',
      'Breathe rhythmically - exhale on each push',
      'At the turn, reposition quickly and continue'
    ],
    tips: [
      'Low handles = more leg drive, high handles = easier start',
      'Short, quick steps are more efficient than long strides',
      'Don\'t stand too upright - maintain forward lean',
      'Pace yourself - it\'s 4x50m total in the race'
    ],
    hyroxSpecific: {
      distance: '4 x 50m (200m total)',
      weight: 'Men: 152kg / Women: 102kg',
      strategy: 'Start controlled, find your rhythm, push hard on final 50m'
    }
  },
  'sled pull': {
    name: 'Sled Pull',
    category: 'Hyrox Station',
    muscles: ['Back', 'Biceps', 'Forearms', 'Core', 'Legs'],
    steps: [
      'Face the sled, grab the rope with both hands',
      'Sit back into a quarter squat position',
      'Pull the rope hand-over-hand in a rowing motion',
      'Keep your core engaged and chest up',
      'Use your legs to drive back as you pull',
      'Maintain tension on the rope at all times',
      'Stack the rope neatly to avoid tangles',
      'Once sled arrives, turn and repeat for next length'
    ],
    tips: [
      'Sit low - use your legs and back together',
      'Don\'t just use arms - it\'s a full body movement',
      'Keep the rope tight, no slack',
      'Find a rhythm: pull-sit-pull-sit'
    ],
    hyroxSpecific: {
      distance: '4 x 50m (200m total)',
      weight: 'Men: 103kg / Women: 78kg',
      strategy: 'Grip endurance is key - don\'t death grip, use legs'
    }
  },
  'burpee broad jumps': {
    name: 'Burpee Broad Jumps',
    category: 'Hyrox Station',
    muscles: ['Full Body', 'Shoulders', 'Chest', 'Legs', 'Core'],
    steps: [
      'Start standing tall at the line',
      'Drop down, placing hands on the ground',
      'Jump or step feet back to plank position',
      'Perform a push-up (chest must touch ground)',
      'Jump or step feet back to hands',
      'Explode forward into a broad jump',
      'Land softly with knees bent',
      'Stand fully upright before next rep (hips must extend)'
    ],
    tips: [
      'Chest MUST touch the ground - judges watch this',
      'Full hip extension at the top is required',
      'Jump forward, not up - cover distance',
      'Pace yourself - 80m is a lot of burpees'
    ],
    hyroxSpecific: {
      distance: '80m total',
      standards: 'Chest to ground, full hip extension, forward jump',
      strategy: 'Steady pace wins - don\'t sprint the first 20m'
    }
  },
  'rowing': {
    name: 'Rowing (1000m)',
    category: 'Hyrox Station',
    muscles: ['Back', 'Legs', 'Arms', 'Core'],
    steps: [
      'Strap feet in securely, grab handle with overhand grip',
      'Start at the catch: knees bent, arms extended, slight forward lean',
      'DRIVE: Push with legs first (60% of power)',
      'As legs extend, lean back slightly and pull handle to lower chest',
      'RECOVERY: Extend arms first, then lean forward, then bend knees',
      'Return to catch position smoothly',
      'Maintain a stroke rate of 24-28 for 1000m',
      'Breathe out on the drive, in on the recovery'
    ],
    tips: [
      'Legs-back-arms on the drive, arms-back-legs on recovery',
      'Don\'t grip too tight - wastes forearm energy',
      'Keep damper setting at 4-6 for most people',
      'Focus on power per stroke, not stroke rate'
    ],
    hyroxSpecific: {
      distance: '1000m',
      target: 'Men: 3:30-4:00 / Women: 4:00-4:30',
      strategy: 'Start at target pace, don\'t fly and die'
    }
  },
  'skierg': {
    name: 'SkiErg (1000m)',
    category: 'Hyrox Station',
    muscles: ['Lats', 'Triceps', 'Core', 'Shoulders'],
    steps: [
      'Stand facing the machine, feet hip-width apart',
      'Reach up and grab handles at the top',
      'Initiate pull by engaging lats and driving elbows down',
      'Hinge slightly at hips as you pull down',
      'Pull handles to outside of thighs',
      'Extend through hips as arms finish the pull',
      'Let arms float back up smoothly',
      'Reset at the top and repeat'
    ],
    tips: [
      'Use your core and hips - not just arms',
      'Breathe out forcefully on the pull',
      'Keep a consistent rhythm',
      'Don\'t go full send at the start'
    ],
    hyroxSpecific: {
      distance: '1000m',
      target: 'Men: 3:30-4:00 / Women: 4:00-4:30',
      strategy: 'First station - don\'t burn your arms for later'
    }
  },
  'farmers carry': {
    name: 'Farmers Carry',
    category: 'Hyrox Station',
    muscles: ['Grip', 'Traps', 'Core', 'Legs'],
    steps: [
      'Stand between the kettlebells/dumbbells',
      'Hinge down and grip firmly in the center of handles',
      'Deadlift the weights up, standing tall',
      'Pack shoulders down and back',
      'Engage core, maintain upright posture',
      'Take quick, short steps',
      'Keep weights from swinging',
      'At turns, slow down, pivot, accelerate again'
    ],
    tips: [
      'Grip is everything - chalk up if allowed',
      'Short quick steps beat long strides',
      'If you need to rest, put weights down properly',
      'Breathe! Don\'t hold your breath'
    ],
    hyroxSpecific: {
      distance: '200m (2 x 100m)',
      weight: 'Men: 2x24kg / Women: 2x16kg',
      strategy: 'Unbroken if possible, one break max'
    }
  },
  'lunges': {
    name: 'Sandbag Lunges',
    category: 'Hyrox Station',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    steps: [
      'Clean sandbag to shoulder or bear hug position',
      'Stand tall, core braced',
      'Step forward with one leg',
      'Lower back knee toward the ground (must touch or nearly touch)',
      'Front knee tracks over toes, doesn\'t pass them',
      'Drive through front foot to stand',
      'Step forward with opposite leg',
      'Maintain upright torso throughout'
    ],
    tips: [
      'Back knee must go down - judges watch this',
      'Keep the bag stable, don\'t let it shift',
      'Take consistent step lengths',
      'Breathe on each step'
    ],
    hyroxSpecific: {
      distance: '100m',
      weight: 'Men: 20kg / Women: 10kg',
      strategy: 'Steady rhythm, every step counts the same'
    }
  },
  'wall balls': {
    name: 'Wall Balls',
    category: 'Hyrox Station',
    muscles: ['Quadriceps', 'Glutes', 'Shoulders', 'Core'],
    steps: [
      'Hold medicine ball at chest height',
      'Stand facing wall, about arm\'s length away',
      'Squat down until hip crease is below knee',
      'Explode up, extending hips and legs',
      'As you rise, push ball up toward target',
      'Ball must hit at or above the line',
      'Catch ball as it comes down',
      'Absorb into the next squat immediately'
    ],
    tips: [
      'Use leg drive to throw, not just arms',
      'Find a rhythm and stick to it',
      'If you miss the target, it doesn\'t count',
      'Break into sets if needed: 25-25-25-25'
    ],
    hyroxSpecific: {
      reps: '100 reps',
      weight: 'Men: 6kg / Women: 4kg',
      target: 'Men: 3m / Women: 2.7m',
      strategy: 'Last station - empty the tank but stay controlled'
    }
  },
  // Running
  'threshold run': {
    name: 'Threshold Run',
    category: 'Running',
    muscles: ['Legs', 'Cardiovascular System'],
    steps: [
      'Warm up with 10-15 minutes easy jogging',
      'Gradually increase pace to threshold (comfortably hard)',
      'Threshold pace: can speak in short phrases only',
      'Maintain consistent effort, not pace (adjust for hills)',
      'Focus on relaxed shoulders and efficient arm swing',
      'Land with feet under your center of mass',
      'Breathe rhythmically (e.g., 3 steps in, 2 steps out)',
      'Cool down with 5-10 minutes easy jogging'
    ],
    tips: [
      'Threshold = pace you could hold for ~1 hour racing',
      'Should feel challenging but sustainable',
      'Don\'t start too fast - negative split if possible',
      'Great for building lactate tolerance'
    ]
  },
  'intervals': {
    name: 'Track Intervals',
    category: 'Running',
    muscles: ['Legs', 'Cardiovascular System'],
    steps: [
      'Warm up: 10-15 min easy jog + dynamic stretches',
      'Run strides: 4x100m building to interval pace',
      'Start interval from standing or rolling start',
      'Run at target pace (check watch at 100m/200m marks)',
      'Focus on form: tall posture, quick turnover',
      'Complete the distance, then jog/walk recovery',
      'Recovery: typically equal time or distance to work',
      'Cool down: 10 min easy jog + stretching'
    ],
    tips: [
      '400m intervals: race pace or slightly faster',
      '600-800m intervals: threshold to 5K pace',
      'Rest enough to hit target pace each rep',
      'Last rep should be same pace as first'
    ]
  },
  // Upper Body
  'pull-ups': {
    name: 'Pull-ups',
    category: 'Strength',
    muscles: ['Lats', 'Biceps', 'Rear Delts', 'Core'],
    steps: [
      'Grip bar slightly wider than shoulder width, palms facing away',
      'Hang with arms fully extended, shoulders engaged (not shrugging)',
      'Initiate pull by driving elbows down and back',
      'Pull until chin clears the bar',
      'Control the descent back to full extension',
      'Avoid swinging or kipping',
      'Reset at the bottom before next rep'
    ],
    tips: [
      'If you can\'t do pull-ups, use bands or assisted machine',
      'Squeeze shoulder blades together at the top',
      'Don\'t half-rep - full range of motion',
      'Weighted vest adds progression when bodyweight is easy'
    ]
  },
  'bench press': {
    name: 'Bench Press',
    category: 'Strength',
    muscles: ['Chest', 'Triceps', 'Front Delts'],
    steps: [
      'Lie on bench with eyes under the bar',
      'Grip bar slightly wider than shoulder width',
      'Pinch shoulder blades together, arch upper back slightly',
      'Plant feet firmly on the floor',
      'Unrack bar with arms locked, position over chest',
      'Lower bar to lower chest/sternum with control',
      'Touch chest lightly (no bouncing)',
      'Press back up to lockout'
    ],
    tips: [
      'Keep wrists straight, bar in palm heel',
      'Elbows at ~45 degrees, not flared out',
      'Breathe in on descent, out on press',
      'Keep glutes on bench, maintain arch'
    ]
  },
  'bent over rows': {
    name: 'Bent Over Rows',
    category: 'Strength',
    muscles: ['Lats', 'Rhomboids', 'Biceps', 'Lower Back'],
    steps: [
      'Stand with feet hip-width, holding barbell or dumbbells',
      'Hinge at hips until torso is nearly parallel to floor',
      'Let arms hang straight down, weights below shoulders',
      'Brace core, keep back flat',
      'Pull weights to lower chest/upper abdomen',
      'Squeeze shoulder blades together at the top',
      'Lower with control to full arm extension',
      'Maintain hip hinge position throughout'
    ],
    tips: [
      'Don\'t use momentum or stand up during the row',
      'Think "elbows to ceiling"',
      'Keep neck neutral, don\'t look up',
      'Great for Hyrox sled pull strength'
    ]
  }
}

// Function to find matching exercises from workout text
export function findExerciseDetails(workoutText) {
  const text = workoutText.toLowerCase()
  const matches = []

  for (const [key, exercise] of Object.entries(exerciseLibrary)) {
    if (text.includes(key) || text.includes(exercise.name.toLowerCase())) {
      matches.push(exercise)
    }
  }

  return matches
}
