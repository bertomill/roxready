// Training start: December 23, 2025
// Race date: May 15, 2026
// 20 weeks of training

export const RACE_DATE = new Date('2026-05-15')
export const START_DATE = new Date('2025-12-23')

const sessionTemplates = {
  // Phase 1: Base Building templates
  base: {
    monday: {
      title: 'Lower Strength + Running',
      type: 'strength',
      description: 'Squats, sled push/pull practice',
      details: {
        warmup: '10 min easy jog, dynamic stretches',
        main: [
          'Back Squats: 4x8 @ 70%',
          'Sled Push: 4x20m moderate weight',
          'Sled Pull: 4x20m moderate weight',
          'Lunges: 3x12 each leg',
          'Running: 3-4 x 1km @ 4:00/km pace'
        ],
        notes: 'Focus on form, build strength foundation'
      },
      duration: '90 min',
      targetPace: '4:00/km'
    },
    tuesday: {
      title: 'Threshold Run + Upper Push',
      type: 'running',
      description: 'Threshold running with lighter upper body work',
      details: {
        warmup: '10 min easy jog, arm circles',
        main: [
          'Threshold Run: 5-6km @ 4:10/km',
          'Bench Press: 3x10 moderate',
          'Overhead Press: 3x10',
          'Push-ups: 3x15',
          'Tricep Dips: 3x12'
        ],
        notes: 'Keep chest/shoulders lighter, running is priority'
      },
      duration: '75 min',
      targetPace: '4:10/km'
    },
    wednesday: {
      title: 'Yoga / Recovery',
      type: 'recovery',
      description: 'Mobility focus, active recovery',
      details: {
        warmup: 'Light walking 5 min',
        main: [
          '45 min yoga flow',
          'Hip openers',
          'Spine mobility',
          'Foam rolling: 15 min'
        ],
        notes: 'Focus on areas of tightness, prioritize recovery'
      },
      duration: '60 min'
    },
    thursday: {
      title: 'Lower Pull + Running Under Fatigue',
      type: 'mixed',
      description: 'Deadlifts, lunges, dark zone simulation',
      details: {
        warmup: '10 min row or bike, dynamic stretches',
        main: [
          'Deadlifts: 4x6 @ 75%',
          'Romanian Deadlifts: 3x10',
          'Walking Lunges: 3x20 total',
          '1km Run',
          'Wall Balls: 3x20',
          '1km Run',
          'Burpee Broad Jumps: 3x10'
        ],
        notes: 'Simulate running under fatigue from stations'
      },
      duration: '90 min',
      targetPace: '4:15/km'
    },
    friday: {
      title: 'Upper Pull + Intervals',
      type: 'mixed',
      description: 'Back and biceps with fast intervals',
      details: {
        warmup: '10 min easy jog, arm swings',
        main: [
          'Pull-ups: 4x8 (assisted if needed)',
          'Bent Over Rows: 4x10',
          'Bicep Curls: 3x12',
          'Face Pulls: 3x15',
          'Track Intervals: 6-8 x 400m @ 1:30-1:35'
        ],
        notes: '90 sec rest between intervals'
      },
      duration: '75 min',
      targetPace: '3:45/km'
    },
    saturday: {
      title: 'Full Simulation',
      type: 'simulation',
      description: 'All 8 stations + runs, practice transitions',
      details: {
        warmup: '15 min easy jog, full body activation',
        main: [
          '1km Run → SkiErg 1000m',
          '1km Run → Sled Push 50m',
          '1km Run → Sled Pull 50m',
          '1km Run → Burpee Broad Jumps 80m',
          '1km Run → Rowing 1000m',
          '1km Run → Farmers Carry 200m',
          '1km Run → Lunges 100m',
          '1km Run → Wall Balls 100 reps'
        ],
        notes: 'Focus on pacing and transitions with Katy'
      },
      duration: '60-70 min',
      targetPace: '4:00/km'
    },
    sunday: {
      title: 'Rest / Light Yoga',
      type: 'recovery',
      description: 'Full rest or gentle mobility',
      details: {
        main: [
          'Complete rest OR',
          '30 min gentle yoga',
          'Light stretching',
          'Meditation/visualization'
        ],
        notes: 'Listen to your body, prioritize sleep'
      },
      duration: '0-30 min'
    }
  },
  // Phase 2: Race-Specific templates
  raceSpecific: {
    monday: {
      title: 'Lower Strength + Race Pace Runs',
      type: 'strength',
      description: 'Maintenance strength with race pace work',
      details: {
        warmup: '10 min easy jog, dynamic stretches',
        main: [
          'Back Squats: 3x6 @ 75%',
          'Sled Push: 5x20m race weight',
          'Sled Pull: 5x20m race weight',
          'Running: 4 x 1km @ 3:55/km'
        ],
        notes: 'Reduced strength volume, increased running intensity'
      },
      duration: '85 min',
      targetPace: '3:55/km'
    },
    tuesday: {
      title: 'Negative Split Run + Rowing',
      type: 'running',
      description: 'Practice finishing strong with rowing technique',
      details: {
        warmup: '10 min easy jog',
        main: [
          'Negative Split Run: 6km total',
          '  - First 3km @ 4:15/km',
          '  - Last 3km @ 3:50/km',
          'Rowing Technique: 4 x 500m',
          '  - Focus on drive sequence',
          '  - Maintain 1:45-1:50 split'
        ],
        notes: 'Rowing form is key - legs, back, arms'
      },
      duration: '75 min',
      targetPace: 'Negative split'
    },
    wednesday: {
      title: 'Active Recovery',
      type: 'recovery',
      description: 'Easy movement and mobility',
      details: {
        main: [
          '30 min easy swim or bike',
          '30 min yoga/mobility',
          'Foam rolling'
        ],
        notes: 'Stay loose, no intensity'
      },
      duration: '60 min'
    },
    thursday: {
      title: 'Station Time Trials',
      type: 'simulation',
      description: 'Test individual station times',
      details: {
        warmup: '15 min easy jog, full activation',
        main: [
          '1km Run time trial',
          'Rest 5 min',
          'SkiErg 1000m time trial',
          'Rest 5 min',
          'Rowing 1000m time trial',
          'Rest 5 min',
          'Wall Balls 100 reps time trial'
        ],
        notes: 'Record times, compare to previous weeks'
      },
      duration: '60 min',
      targetPace: 'Max effort'
    },
    friday: {
      title: 'Transition Drills + Intervals',
      type: 'mixed',
      description: 'Partner transitions with Katy',
      details: {
        warmup: '10 min jog, dynamic stretches',
        main: [
          'Handoff Practice: 6x station-to-run transitions',
          'Communication drills under fatigue',
          'Track Intervals: 6 x 600m @ 2:20-2:25',
          'Cool down together'
        ],
        notes: 'Practice race day communication with Katy'
      },
      duration: '70 min',
      targetPace: '3:50/km'
    },
    saturday: {
      title: 'Race Simulation',
      type: 'simulation',
      description: 'Full race pace simulation with strategy',
      details: {
        warmup: '15 min easy jog, race prep routine',
        main: [
          'Full Hyrox simulation at 90% effort',
          'Practice pacing strategy:',
          '  - Runs 1-4: Controlled @ 4:00/km',
          '  - Runs 5-8: Push @ 3:50/km',
          'Time all stations',
          'Practice handoffs with Katy'
        ],
        notes: 'Target sub-57:00 simulation'
      },
      duration: '55-60 min',
      targetPace: '3:55/km avg'
    },
    sunday: {
      title: 'Rest',
      type: 'recovery',
      description: 'Complete rest',
      details: {
        main: [
          'No training',
          'Light walking only',
          'Focus on nutrition and sleep'
        ],
        notes: 'Recovery is training'
      },
      duration: '0 min'
    }
  },
  // Phase 3: Taper templates
  taper: {
    monday: {
      title: 'Light Strength + Strides',
      type: 'strength',
      description: 'Maintain neuromuscular activation',
      details: {
        warmup: '10 min easy jog',
        main: [
          'Back Squats: 2x5 @ 60%',
          'Sled Push: 3x20m light',
          'Strides: 6 x 100m @ race pace',
          'Core work: 10 min'
        ],
        notes: 'Low volume, maintain sharpness'
      },
      duration: '50 min',
      targetPace: 'Race pace strides'
    },
    tuesday: {
      title: 'Easy Run + Technique',
      type: 'running',
      description: 'Short easy running with form focus',
      details: {
        warmup: '5 min walk',
        main: [
          'Easy Run: 4km @ conversational pace',
          'Rowing: 2 x 500m technique focus',
          'Light stretching'
        ],
        notes: 'Stay loose, no hard efforts'
      },
      duration: '45 min',
      targetPace: '4:30/km'
    },
    wednesday: {
      title: 'Yoga / Mobility',
      type: 'recovery',
      description: 'Active recovery focus',
      details: {
        main: [
          '45 min yoga',
          'Foam rolling',
          'Meditation'
        ],
        notes: 'Mental preparation begins'
      },
      duration: '45 min'
    },
    thursday: {
      title: 'Short Sharp Session',
      type: 'mixed',
      description: 'Brief intensity to stay sharp',
      details: {
        warmup: '10 min easy jog',
        main: [
          '4 x 400m @ race pace',
          '2 min rest between',
          'Wall Balls: 2 x 20 @ race pace',
          'Easy cool down'
        ],
        notes: 'Just enough to maintain fitness'
      },
      duration: '40 min',
      targetPace: '3:50/km'
    },
    friday: {
      title: 'Rest or Light Walk',
      type: 'recovery',
      description: 'Minimal activity',
      details: {
        main: [
          '20-30 min easy walk',
          'Light stretching',
          'Visualization'
        ],
        notes: 'Save energy for race'
      },
      duration: '30 min'
    },
    saturday: {
      title: 'Mini Simulation',
      type: 'simulation',
      description: 'Short opener workout',
      details: {
        warmup: '10 min easy jog',
        main: [
          '2 x 1km @ race pace',
          '1 x SkiErg 500m',
          '1 x Rowing 500m',
          '20 Wall Balls',
          'Easy cool down'
        ],
        notes: 'Wake up the systems, stay fresh'
      },
      duration: '35 min',
      targetPace: 'Race pace'
    },
    sunday: {
      title: 'Complete Rest',
      type: 'recovery',
      description: 'Full recovery',
      details: {
        main: [
          'No training',
          'Prepare gear',
          'Visualization',
          'Early to bed'
        ],
        notes: 'Trust your training'
      },
      duration: '0 min'
    }
  }
}

function generateWeek(weekNumber, startDate) {
  let phase, phaseName, templates

  if (weekNumber <= 8) {
    phase = 1
    phaseName = 'Base Building'
    templates = sessionTemplates.base
  } else if (weekNumber <= 15) {
    phase = 2
    phaseName = 'Race-Specific'
    templates = sessionTemplates.raceSpecific
  } else {
    phase = 3
    phaseName = 'Taper'
    templates = sessionTemplates.taper
  }

  const weekStart = new Date(startDate)
  weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7)

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const sessions = days.map((day, index) => {
    const sessionDate = new Date(weekStart)
    sessionDate.setDate(sessionDate.getDate() + index)

    return {
      id: `week${weekNumber}-${day}`,
      day: day.charAt(0).toUpperCase() + day.slice(1),
      date: sessionDate.toISOString().split('T')[0],
      ...templates[day]
    }
  })

  return {
    weekNumber,
    phase,
    phaseName,
    startDate: weekStart.toISOString().split('T')[0],
    sessions
  }
}

export const trainingPlan = {
  athlete: {
    name: 'Robert',
    partner: 'Katy',
    event: 'Hyrox Mixed Doubles',
    currentTime: '57:00',
    goalTime: 'Sub-57:00'
  },
  weeks: Array.from({ length: 20 }, (_, i) => generateWeek(i + 1, START_DATE))
}
