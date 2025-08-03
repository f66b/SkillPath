import React, { useState, useEffect } from 'react'

const PomodoroMasteryCourse = () => {
  const [currentPart, setCurrentPart] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState({})
  const [partScores, setPartScores] = useState({})
  const [showFinalQuiz, setShowFinalQuiz] = useState(false)
  const [finalQuizAnswers, setFinalQuizAnswers] = useState({})
  const [courseProgress, setCourseProgress] = useState(0)

  // Course data structure
  const courseData = {
    1: {
      title: "Introduction to Time Blocking",
      lessons: [
        {
          id: 1,
          title: "What is Time Blocking?",
          content: "Time blocking is a productivity method where you divide your day into specific time slots, assigning each slot to a particular task or activity. Unlike traditional to-do lists, time blocking creates a visual schedule that helps you stay focused and accountable. This approach transforms abstract tasks into concrete, scheduled commitments.",
          quiz: {
            question: "What is the main difference between time blocking and traditional to-do lists?",
            options: [
              "Time blocking is faster to create",
              "Time blocking creates a visual schedule with specific time slots",
              "To-do lists are more detailed",
              "Time blocking requires no planning"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "The Psychology Behind Time Blocking",
          content: "Time blocking works because it leverages psychological principles like Parkinson's Law and the planning fallacy. When you assign specific time frames to tasks, you naturally work more efficiently to complete them within the allocated time. This method also reduces decision fatigue by eliminating constant choices about what to work on next.",
          quiz: {
            question: "Which psychological principle helps explain why time blocking is effective?",
            options: [
              "The halo effect",
              "Parkinson's Law",
              "Confirmation bias",
              "The anchoring effect"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "Benefits of Time Blocking",
          content: "Time blocking reduces mental fatigue by removing guesswork from your day. When your schedule is clearly defined, you're less likely to procrastinate or multitask. This structured approach creates momentum, improves focus, and provides a clear sense of progress throughout your day.",
          quiz: {
            question: "What is one of the key benefits of time blocking?",
            options: [
              "It allows multitasking",
              "It increases guesswork",
              "It creates structured focus and reduces procrastination",
              "It eliminates the need for a schedule"
            ],
            correct: 2
          }
        },
        {
          id: 4,
          title: "Common Time Blocking Mistakes",
          content: "Many beginners make the mistake of over-planning their days, leaving no buffer time for unexpected interruptions. Another common error is creating unrealistic time estimates for tasks. The key is to start with broader time blocks and gradually refine your estimates as you learn your natural work rhythms.",
          quiz: {
            question: "What is a common mistake beginners make with time blocking?",
            options: [
              "Under-planning their days",
              "Over-planning without buffer time",
              "Using too much buffer time",
              "Not planning at all"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "Digital vs. Analog Time Blocking",
          content: "You can practice time blocking using digital calendars, apps, or traditional paper planners. Digital tools offer convenience, reminders, and easy editing, while analog methods provide tactile satisfaction and fewer distractions. Choose the method that feels most natural and sustainable for your lifestyle.",
          quiz: {
            question: "What advantage do analog time blocking methods offer?",
            options: [
              "Automatic reminders",
              "Easy editing and syncing",
              "Tactile satisfaction and fewer distractions",
              "Cloud backup"
            ],
            correct: 2
          }
        },
        {
          id: 6,
          title: "Setting Realistic Time Estimates",
          content: "Accurate time estimation is crucial for effective time blocking. Start by tracking how long tasks actually take you, then add 25% buffer time to account for interruptions and complexity. Remember that cognitive tasks often take longer than we initially estimate, especially when they require deep focus.",
          quiz: {
            question: "How much buffer time should you typically add to your initial task estimates?",
            options: [
              "10%",
              "25%",
              "50%",
              "75%"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "Creating Buffer Time",
          content: "Buffer time is essential for handling unexpected interruptions, urgent emails, or tasks that run longer than expected. Plan for 15-30 minute buffers between major tasks, and consider scheduling 'catch-up' blocks during your day. This prevents your entire schedule from derailing when something unexpected occurs.",
          quiz: {
            question: "Why is buffer time important in time blocking?",
            options: [
              "To fill empty spaces in your calendar",
              "To handle unexpected interruptions and overruns",
              "To make your schedule look busier",
              "To reduce the number of tasks"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "Energy-Based Time Blocking",
          content: "Your energy levels fluctuate throughout the day, so align your most demanding tasks with your peak energy periods. For most people, cognitive work is best done in the morning when mental clarity is highest. Reserve routine tasks for periods when your energy naturally dips.",
          quiz: {
            question: "When should you typically schedule your most demanding cognitive tasks?",
            options: [
              "Late at night",
              "During lunch breaks",
              "During your peak energy periods",
              "When you're tired"
            ],
            correct: 2
          }
        },
        {
          id: 9,
          title: "Theme Days and Time Blocking",
          content: "Theme days involve dedicating entire days or large portions of days to similar types of work. For example, 'Marketing Monday' or 'Writing Wednesday.' This approach reduces context switching and allows you to dive deeper into specific types of work, maximizing both efficiency and quality.",
          quiz: {
            question: "What is the main benefit of using theme days?",
            options: [
              "It makes scheduling more complex",
              "It reduces context switching and allows deeper focus",
              "It requires more planning time",
              "It eliminates the need for time blocking"
            ],
            correct: 1
          }
        },
        {
          id: 10,
          title: "Starting Your Time Blocking Journey",
          content: "Begin with just one week of time blocking to test the waters. Start by blocking out your most important tasks first, then fill in the supporting activities. Don't aim for perfection—focus on building the habit and adjusting your approach based on what you learn about your work patterns.",
          quiz: {
            question: "How should beginners start their time blocking journey?",
            options: [
              "Plan out an entire month perfectly",
              "Start with one week and focus on building the habit",
              "Block every minute of every day",
              "Only use it for work tasks"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "What does time blocking primarily help with?",
          options: [
            "Prioritizing Netflix shows",
            "Multitasking more effectively", 
            "Reducing distractions and improving focus",
            "Avoiding planning altogether"
          ],
          correct: 2
        },
        {
          question: "According to Parkinson's Law, how does time blocking affect productivity?",
          options: [
            "Work expands to fill the time available",
            "Work contracts when given specific time limits",
            "Time has no effect on productivity",
            "More time always equals better results"
          ],
          correct: 1
        },
        {
          question: "What is a major mistake beginners make with time blocking?",
          options: [
            "Planning too little",
            "Over-planning without buffer time",
            "Using digital tools",
            "Starting on Monday"
          ],
          correct: 1
        },
        {
          question: "How much buffer time should you add to task estimates?",
          options: [
            "10%",
            "25%",
            "50%",
            "No buffer needed"
          ],
          correct: 1
        },
        {
          question: "When should you schedule your most demanding cognitive work?",
          options: [
            "When you're tired",
            "During your peak energy periods",
            "Late at night",
            "During lunch"
          ],
          correct: 1
        },
        {
          question: "What is the benefit of theme days?",
          options: [
            "More complexity",
            "Reduces context switching",
            "Requires more planning",
            "Eliminates time blocking"
          ],
          correct: 1
        },
        {
          question: "Which tool is commonly used to block time visually?",
          options: [
            "Email",
            "Calendar",
            "Notes app",
            "Stopwatch"
          ],
          correct: 1
        },
        {
          question: "What should you do when tasks consistently run over their time blocks?",
          options: [
            "Give up time blocking",
            "Adjust your time estimates and add more buffer",
            "Work faster",
            "Skip the overrunning tasks"
          ],
          correct: 1
        },
        {
          question: "Why does time blocking reduce decision fatigue?",
          options: [
            "It eliminates all decisions",
            "It reduces constant choices about what to work on next",
            "It makes decisions for you",
            "It increases available choices"
          ],
          correct: 1
        },
        {
          question: "How should beginners approach their first week of time blocking?",
          options: [
            "Plan every minute perfectly",
            "Focus on building the habit and learning",
            "Only plan work tasks",
            "Avoid any flexibility"
          ],
          correct: 1
        }
      ]
    },
    2: {
      title: "What is the Pomodoro Technique?", 
      lessons: [
        {
          id: 1,
          title: "Origins of the Pomodoro Technique",
          content: "The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. As a university student, Cirillo struggled with focus and procrastination. He used a tomato-shaped kitchen timer (pomodoro is Italian for tomato) to break his work into focused intervals. This simple tool became the foundation of a productivity method used by millions worldwide.",
          quiz: {
            question: "Who created the Pomodoro Technique?",
            options: [
              "David Allen",
              "Francesco Cirillo", 
              "Stephen Covey",
              "Tim Ferriss"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "The Basic 25-Minute Rule",
          content: "The traditional Pomodoro Technique uses 25-minute focused work sessions followed by 5-minute breaks. This timing isn't arbitrary—research shows that most people can maintain intense focus for about 20-30 minutes before attention begins to wane. The 25-minute interval hits the sweet spot of sustained concentration without mental fatigue.",
          quiz: {
            question: "How long is a traditional Pomodoro work session?",
            options: [
              "20 minutes",
              "25 minutes",
              "30 minutes", 
              "45 minutes"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "The Four-Step Pomodoro Process",
          content: "Each Pomodoro follows four simple steps: 1) Choose a task, 2) Set a 25-minute timer, 3) Work until the timer rings, 4) Take a 5-minute break. This cycle creates a rhythm that your brain learns to recognize, making it easier to enter a focused state. The key is treating each step as sacred—no shortcuts or modifications initially.",
          quiz: {
            question: "What happens immediately after a 25-minute Pomodoro session ends?",
            options: [
              "Start another Pomodoro immediately",
              "Take a 5-minute break",
              "Take a 15-minute break",
              "Evaluate your progress"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "The Longer Break Rule",
          content: "After completing four Pomodoros (about 2 hours of focused work), you take a longer break of 15-30 minutes. This extended break allows your mind to rest and process what you've learned. During this time, step away from your workspace, stretch, hydrate, or do something completely different from your work.",
          quiz: {
            question: "How long should the longer break be after four Pomodoros?",
            options: [
              "5-10 minutes",
              "10-15 minutes",
              "15-30 minutes",
              "45-60 minutes"
            ],
            correct: 2
          }
        },
        {
          id: 5,
          title: "Why 25 Minutes Works",
          content: "The 25-minute duration leverages your brain's natural attention span and creates just enough urgency to maintain focus without causing stress. It's long enough to get into deep work but short enough that your mind doesn't rebel against the commitment. This 'micro-commitment' makes starting less daunting than facing a 3-hour work block.",
          quiz: {
            question: "Why is 25 minutes effective for focused work sessions?",
            options: [
              "It's too short to be useful",
              "It matches natural attention spans and creates manageable urgency",
              "It allows for multitasking",
              "It's the minimum time needed for any task"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "Indivisible Time Blocks",
          content: "A core principle of the Pomodoro Technique is that each 25-minute session is indivisible—you can't split it or pause it. If you're interrupted, you either deal with the interruption quickly and continue, or you abandon the Pomodoro and start fresh. This 'all or nothing' approach protects the integrity of your focused time.",
          quiz: {
            question: "What should you do if you're interrupted during a Pomodoro?",
            options: [
              "Pause the timer and resume later",
              "Split the Pomodoro into smaller parts",
              "Deal with it quickly and continue, or start fresh",
              "Ignore all interruptions completely"
            ],
            correct: 2
          }
        },
        {
          id: 7,
          title: "The Anti-Multitasking Method",
          content: "The Pomodoro Technique is fundamentally anti-multitasking—you work on ONE task during each 25-minute session. This single-focus approach trains your brain to resist the urge to switch between tasks, improving your ability to concentrate deeply. Research shows that task-switching can reduce productivity by up to 40%.",
          quiz: {
            question: "How many tasks should you work on during one Pomodoro session?",
            options: [
              "As many as possible",
              "Two related tasks",
              "One task only",
              "Three small tasks"
            ],
            correct: 2
          }
        },
        {
          id: 8,
          title: "Physical Timer vs. Digital Apps",
          content: "Francesco Cirillo advocates for physical timers because they create a tangible commitment and remove the temptation of digital distractions. However, digital Pomodoro apps offer features like task tracking and statistics. Choose based on your distraction level—if you're easily tempted by notifications, stick with a physical timer.",
          quiz: {
            question: "What advantage does a physical timer have over digital apps?",
            options: [
              "Better accuracy",
              "More features",
              "Removes digital distractions and creates tangible commitment",
              "Automatic task tracking"
            ],
            correct: 2
          }
        },
        {
          id: 9,
          title: "Measuring Productivity in Pomodoros",
          content: "Instead of measuring productivity by hours worked, the Pomodoro Technique measures it by the number of focused sessions completed. This shift in perspective emphasizes quality over quantity. A day with 6 high-quality Pomodoros (2.5 hours of focused work) often accomplishes more than 8 hours of distracted, interrupted work.",
          quiz: {
            question: "How does the Pomodoro Technique measure productivity?",
            options: [
              "By total hours worked",
              "By number of tasks completed",
              "By number of focused Pomodoro sessions completed",
              "By amount of coffee consumed"
            ],
            correct: 2
          }
        },
        {
          id: 10,
          title: "Common Misconceptions",
          content: "Many people think the Pomodoro Technique is too rigid or only works for certain types of tasks. In reality, it's adaptable to almost any work type—from creative projects to administrative tasks. The technique doesn't limit creativity; it provides a structured framework within which creativity can flourish without the anxiety of unlimited time pressure.",
          quiz: {
            question: "What is a common misconception about the Pomodoro Technique?",
            options: [
              "It works for all types of tasks",
              "It's too rigid and limits creativity",
              "It requires special equipment",
              "It was invented in Italy"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "Who invented the Pomodoro Technique?",
          options: [
            "Tim Ferriss",
            "Francesco Cirillo",
            "David Allen", 
            "Stephen Covey"
          ],
          correct: 1
        },
        {
          question: "What does 'pomodoro' mean in Italian?",
          options: [
            "Timer",
            "Focus",
            "Tomato",
            "Work"
          ],
          correct: 2
        },
        {
          question: "How long is a standard Pomodoro work session?",
          options: [
            "20 minutes",
            "25 minutes", 
            "30 minutes",
            "45 minutes"
          ],
          correct: 1
        },
        {
          question: "How long is the break after each Pomodoro?",
          options: [
            "3 minutes",
            "5 minutes",
            "10 minutes",
            "15 minutes"
          ],
          correct: 1
        },
        {
          question: "After how many Pomodoros do you take a longer break?",
          options: [
            "2 Pomodoros",
            "3 Pomodoros",
            "4 Pomodoros",
            "5 Pomodoros"
          ],
          correct: 2
        },
        {
          question: "How long is the longer break?",
          options: [
            "10-15 minutes",
            "15-30 minutes",
            "30-45 minutes",
            "45-60 minutes"
          ],
          correct: 1
        },
        {
          question: "Can you pause a Pomodoro session?",
          options: [
            "Yes, anytime",
            "Only for emergencies",
            "No, each session is indivisible",
            "Only during the first 10 minutes"
          ],
          correct: 2
        },
        {
          question: "How many tasks should you focus on during one Pomodoro?",
          options: [
            "One task only",
            "Two related tasks",
            "As many as you can fit",
            "Three small tasks"
          ],
          correct: 0
        },
        {
          question: "What does the Pomodoro Technique help prevent?",
          options: [
            "Taking breaks",
            "Task-switching and multitasking",
            "Working too little",
            "Using timers"
          ],
          correct: 1
        },
        {
          question: "How does the Pomodoro Technique measure productivity?",
          options: [
            "By hours worked",
            "By completed Pomodoro sessions",
            "By tasks finished",
            "By break time taken"
          ],
          correct: 1
        }
      ]
    },
    3: {
      title: "Set Up Your First Focus Cycle",
      lessons: [
        {
          id: 1,
          title: "Choosing Your First Task",
          content: "Start with a task that's moderately challenging but not overwhelming—something that requires focus but won't cause anxiety. Avoid tasks that are too easy (you'll get bored) or too difficult (you'll get frustrated). Good first tasks include writing, reading, organizing files, or learning something new. The goal is to experience success in your first Pomodoro.",
          quiz: {
            question: "What type of task is best for your first Pomodoro session?",
            options: [
              "The most difficult task on your list",
              "The easiest task you can find", 
              "A moderately challenging task that requires focus",
              "Multiple small tasks at once"
            ],
            correct: 2
          }
        },
        {
          id: 2,
          title: "Setting Up Your Environment",
          content: "Create a distraction-free environment before starting your first Pomodoro. Close unnecessary browser tabs, put your phone in another room or on silent, and clear your workspace of unrelated items. Inform others that you'll be unavailable for 25 minutes. This preparation ritual signals to your brain that it's time to focus.",
          quiz: {
            question: "What should you do with your phone during a Pomodoro session?",
            options: [
              "Keep it nearby for emergencies",
              "Put it on vibrate",
              "Put it in another room or on silent",
              "Use it as your Pomodoro timer"
            ],
            correct: 2
          }
        },
        {
          id: 3,
          title: "The Pre-Pomodoro Ritual",
          content: "Develop a consistent pre-Pomodoro ritual to signal the start of focused work. This might include taking three deep breaths, stating your intention for the session, or quickly reviewing what you want to accomplish. Having water nearby and ensuring comfortable temperature and lighting are also important. These small preparations can significantly impact your focus quality.",
          quiz: {
            question: "Why is a pre-Pomodoro ritual helpful?",
            options: [
              "It wastes time unnecessarily",
              "It signals to your brain that focused work is starting", 
              "It's required by the official technique",
              "It replaces the need for a timer"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "Starting Your Timer",
          content: "The moment you start your timer, begin working immediately—no checking email, no organizing your desk, no 'just one quick thing.' The timer is sacred. Whether you use a physical timer, phone app, or computer program, the act of starting it should be your commitment to 25 minutes of focused effort on your chosen task.",
          quiz: {
            question: "What should you do immediately after starting your Pomodoro timer?",
            options: [
              "Check email quickly",
              "Organize your workspace",
              "Begin working on your chosen task immediately",
              "Plan what you'll do in the next Pomodoro"
            ],
            correct: 2
          }
        },
        {
          id: 5,
          title: "Handling Initial Resistance",
          content: "It's normal to feel resistance when you first start working—your brain might want to check social media, grab a snack, or do anything except the task at hand. Acknowledge these urges without acting on them. Tell yourself 'I'll deal with that during my break.' This initial resistance usually disappears within 5-10 minutes as you settle into focus mode.",
          quiz: {
            question: "What should you do when you feel the urge to check social media during a Pomodoro?",
            options: [
              "Take a quick 2-minute break to check it",
              "Acknowledge the urge but don't act on it",
              "Stop the Pomodoro and check it",
              "Multitask and check it while working"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "Staying on Task",
          content: "During your first Pomodoro, you'll notice your mind wandering or wanting to switch tasks. This is completely normal. When you catch your attention drifting, gently redirect it back to your chosen task without self-judgment. Some people find it helpful to keep a small notepad nearby to quickly jot down distracting thoughts to address later.",
          quiz: {
            question: "What should you do when you notice your mind wandering during a Pomodoro?",
            options: [
              "Stop the session and take a break",
              "Switch to a different task",
              "Gently redirect attention back to your chosen task",
              "Start a new Pomodoro"
            ],
            correct: 2
          }
        },
        {
          id: 7,
          title: "The First Break",
          content: "When your timer rings after 25 minutes, stop working immediately—even if you're in the middle of a sentence or close to a breakthrough. This teaches your brain that the system has boundaries. Take a genuine 5-minute break: stretch, walk around, hydrate, or do some light movement. Avoid screens and work-related thinking during this time.",
          quiz: {
            question: "What should you do when the 25-minute timer rings?",
            options: [
              "Continue working to finish your thought",
              "Take 2 more minutes to reach a stopping point",
              "Stop working immediately and take a break",
              "Start the next Pomodoro right away"
            ],
            correct: 2
          }
        },
        {
          id: 8,
          title: "Making the Break Restorative",
          content: "Your 5-minute break should be truly restorative, not just less work. Avoid checking emails, social media, or doing other tasks during this time. Instead, do something that refreshes you: look out a window, do gentle stretches, practice deep breathing, or chat briefly with a colleague. The goal is to return to work feeling recharged, not more drained.",
          quiz: {
            question: "What makes a Pomodoro break most effective?",
            options: [
              "Checking emails and messages",
              "Planning the next work session",
              "Doing something truly restorative like stretching or breathing",
              "Starting on smaller tasks"
            ],
            correct: 2
          }
        },
        {
          id: 9,
          title: "Evaluating Your First Session",
          content: "After your first complete Pomodoro cycle (work + break), take a moment to reflect: How did it feel? What was challenging? What worked well? Don't worry if it wasn't perfect—the first session is about learning, not achieving peak productivity. Notice any insights about your focus patterns, energy levels, or the task itself.",
          quiz: {
            question: "What's the main purpose of your first Pomodoro session?",
            options: [
              "To achieve maximum productivity",
              "To complete as many tasks as possible",
              "To learn and understand how the technique works for you", 
              "To prove the technique doesn't work"
            ],
            correct: 2
          }
        },
        {
          id: 10,
          title: "Building on Success",
          content: "Whether your first Pomodoro felt amazing or challenging, consider it a success—you tried something new and gathered valuable data about your work habits. Plan when you'll do your second Pomodoro, perhaps later the same day or the next morning. Consistency in practice is more important than perfection in execution. Small, regular practice builds the focus muscle over time.",
          quiz: {
            question: "What's most important when building a Pomodoro practice?",
            options: [
              "Perfect execution from the start",
              "Doing as many sessions as possible",
              "Consistency in practice over perfection",
              "Only using the technique for difficult tasks"
            ],
            correct: 2
          }
        }
      ],
      finalQuiz: [
        {
          question: "What type of task is best for your first Pomodoro?",
          options: [
            "The hardest task available",
            "Multiple easy tasks",
            "A moderately challenging task requiring focus",
            "Administrative work only"
          ],
          correct: 2
        },
        {
          question: "How should you prepare your environment before starting?",
          options: [
            "Keep all devices nearby",
            "Create a distraction-free environment",
            "Have multiple tasks ready",
            "Keep notifications on"
          ],
          correct: 1
        },
        {
          question: "What should you do immediately after starting the timer?",
          options: [
            "Check email first",
            "Organize your workspace",
            "Begin working on your chosen task",
            "Plan the next session"
          ],
          correct: 2
        },
        {
          question: "How should you handle distracting thoughts during a Pomodoro?",
          options: [
            "Stop and address them immediately",
            "Write them down to address later",
            "Try to forget about them",
            "Take a break to handle them"
          ],
          correct: 1
        },
        {
          question: "What should you do when the 25-minute timer rings?",
          options: [
            "Continue until you finish",
            "Take just 2 more minutes",
            "Stop immediately and take a break",
            "Start another Pomodoro"
          ],
          correct: 2
        },
        {
          question: "What makes a Pomodoro break most effective?",
          options: [
            "Checking social media",
            "Doing truly restorative activities",
            "Planning work tasks",
            "Answering emails"
          ],
          correct: 1
        },
        {
          question: "How should you handle initial resistance to starting work?",
          options: [
            "Give in and take a break",
            "Force yourself to work harder",
            "Acknowledge urges without acting on them",
            "Switch to an easier task"
          ],
          correct: 2
        },
        {
          question: "What's the purpose of a pre-Pomodoro ritual?",
          options: [
            "To waste time",
            "To signal focused work is starting",
            "To replace the timer",
            "To avoid working"
          ],
          correct: 1
        },
        {
          question: "What should you do with your phone during a Pomodoro?",
          options: [
            "Use it as a timer only",
            "Keep it visible but silent",
            "Put it in another room or on silent",
            "Check it every 10 minutes"
          ],
          correct: 2
        },
        {
          question: "What's most important when starting with Pomodoros?",
          options: [
            "Perfect execution",
            "Doing many sessions",
            "Consistency over perfection",
            "Only using it for work"
          ],
          correct: 2
        }
      ]
    },
    4: {
      title: "Tracking Your Energy & Distractions",
      lessons: [
        {
          id: 1,
          title: "Understanding Your Energy Patterns",
          content: "Everyone has natural energy rhythms throughout the day—times when focus comes easily and times when concentration feels impossible. Start tracking your energy levels during each Pomodoro session on a scale of 1-10. After a week, you'll begin to see patterns: perhaps you're most focused at 9 AM or hit an energy wall at 3 PM. This data helps you schedule your most important work during peak times.",
          quiz: {
            question: "Why should you track your energy levels during Pomodoro sessions?",
            options: [
              "To prove you're working hard",
              "To identify when you focus best and schedule important work accordingly",
              "To compete with others",
              "To fill time during breaks"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Creating a Simple Energy Log",
          content: "Create a simple log with three columns: Time, Energy Level (1-10), and Notes. Rate your energy at the start of each Pomodoro. Add brief notes about factors that might affect your energy: sleep quality, caffeine intake, meal timing, or external stressors. This simple tracking reveals valuable patterns without becoming burdensome.",
          quiz: {
            question: "What should you include in a simple energy log?",
            options: [
              "Only the time of day",
              "Time, energy level, and relevant notes",
              "Detailed hourly analysis",
              "Just energy levels"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "The Distraction Log Method",
          content: "Keep a distraction log during your Pomodoro sessions—simply make a small mark each time you notice your attention wandering or feel the urge to do something else. Don't judge these moments; just observe them. This awareness alone often reduces distractions. Common patterns include specific times of day, certain types of tasks, or environmental triggers.",
          quiz: {
            question: "What's the main benefit of keeping a distraction log?",
            options: [
              "To punish yourself for losing focus",
              "To create awareness that naturally reduces distractions",
              "To prove the technique doesn't work",
              "To have something to do during work time"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "Identifying Distraction Triggers",
          content: "Review your distraction log weekly to identify patterns. Are you more easily distracted in the afternoon? Does your phone buzzing break your concentration? Do certain types of tasks trigger more mind-wandering? Once you identify your personal distraction triggers, you can take proactive steps to minimize them during your Pomodoro sessions.",
          quiz: {
            question: "What should you do after identifying your distraction triggers?",
            options: [
              "Accept them as unchangeable",
              "Take proactive steps to minimize them",
              "Work around them without addressing them",
              "Only work when you have no triggers"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "The Internal vs. External Distraction Distinction",
          content: "Distractions fall into two categories: internal (thoughts, emotions, physical discomfort) and external (notifications, noise, interruptions). Internal distractions often require mindfulness techniques—acknowledging thoughts without following them. External distractions need environmental changes—silencing phones, using noise-canceling headphones, or communicating boundaries to others.",
          quiz: {
            question: "How should you handle internal distractions like wandering thoughts?",
            options: [
              "Follow them to their conclusion",
              "Fight them aggressively",
              "Acknowledge them without following them",
              "Stop working immediately"
            ],
            correct: 2
          }
        },
        {
          id: 6,
          title: "Weekly Energy and Focus Review",
          content: "Every week, spend 10 minutes reviewing your energy and distraction logs. Look for patterns: Which days were most productive? What environmental factors supported or hindered focus? When did you feel most energized? Use these insights to optimize your following week's schedule, placing your most important work during identified peak times.",
          quiz: {
            question: "How often should you review your energy and distraction patterns?",
            options: [
              "Daily",
              "Weekly",
              "Monthly",
              "Only when problems arise"
            ],
            correct: 1
          }
        },
        {
          id: 7,
          title: "Adjusting Your Schedule Based on Data",
          content: "Use your energy tracking data to restructure your day. If you're most focused from 9-11 AM, schedule your most challenging work then. If you experience an energy dip after lunch, use that time for routine tasks or administrative work. If certain environments boost your focus, try to work there more often. Let data, not just habit, guide your schedule.",
          quiz: {
            question: "How should you use your energy tracking data?",
            options: [
              "Ignore it and stick to your current schedule",
              "Use it to restructure your day for optimal productivity",
              "Only look at it when you feel unproductive",
              "Share it with others for comparison"
            ],
            correct: 1
          }
        },
        {
          id: 8,
          title: "The Pomodoro Success Rate Metric",
          content: "Track your 'Pomodoro success rate'—the percentage of planned Pomodoros you actually complete. A good initial target is 70-80%. If your success rate is too low, you might be over-planning or choosing tasks that are too difficult. If it's consistently 100%, you might not be challenging yourself enough. This metric helps calibrate your planning.",
          quiz: {
            question: "What's a good initial target for Pomodoro success rate?",
            options: [
              "50-60%",
              "70-80%",
              "90-95%",
              "100%"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Mood and Productivity Correlation",
          content: "Track your mood alongside energy and productivity. Note whether you feel excited, anxious, calm, or stressed before starting Pomodoros. Over time, you'll see how different emotional states affect your focus and productivity. This awareness helps you develop strategies for maintaining focus even when you're not in an optimal mood.",
          quiz: {
            question: "Why should you track mood alongside productivity?",
            options: [
              "To find excuses for low productivity",
              "To understand how emotional states affect focus",
              "To complain about bad days",
              "To prove mood doesn't matter"
            ],
            correct: 1
          }
        },
        {
          id: 10,
          title: "Building Your Personal Productivity Profile",
          content: "After several weeks of tracking, you'll have a personal productivity profile—a clear picture of when you work best, what distracts you most, and what conditions support your focus. This isn't just data; it's self-knowledge that allows you to design days that work with your natural rhythms rather than against them. Use this profile to make informed decisions about when to schedule different types of work.",
          quiz: {
            question: "What is a personal productivity profile?",
            options: [
              "A comparison with other people's productivity",
              "A clear picture of your optimal work conditions and patterns",
              "A rigid schedule you must follow",
              "A list of your work accomplishments"
            ],
            correct: 1
          }
        }
      ],
      finalQuiz: [
        {
          question: "What should you track to understand your natural work rhythms?",
          options: [
            "Only completed tasks",
            "Energy levels and focus patterns",
            "Hours worked per day",
            "Number of breaks taken"
          ],
          correct: 1
        },
        {
          question: "How should you rate your energy during Pomodoro sessions?",
          options: [
            "Only when you feel low energy",
            "On a scale of 1-10 at the start of each session",
            "Once per day",
            "Only when you feel high energy"
          ],
          correct: 1
        },
        {
          question: "What's the purpose of a distraction log?",
          options: [
            "To punish yourself for distractions",
            "To create awareness that reduces distractions",
            "To prove you can't focus",
            "To waste time during work"
          ],
          correct: 1
        },
        {
          question: "How should you handle internal distractions like wandering thoughts?",
          options: [
            "Follow them completely",
            "Fight them aggressively",
            "Acknowledge without following them",
            "Stop working immediately"
          ],
          correct: 2
        },
        {
          question: "How often should you review your productivity data?",
          options: [
            "Daily",
            "Weekly",
            "Monthly",
            "Yearly"
          ],
          correct: 1
        },
        {
          question: "What's a good target for Pomodoro success rate?",
          options: [
            "50%",
            "70-80%",
            "95%",
            "100%"
          ],
          correct: 1
        },
        {
          question: "What should you do with your energy tracking data?",
          options: [
            "Ignore it",
            "Use it to optimize your schedule",
            "Only look at it when struggling",
            "Compare it with others"
          ],
          correct: 1
        },
        {
          question: "Why track mood alongside productivity?",
          options: [
            "To make excuses",
            "To understand how emotions affect focus",
            "To prove mood doesn't matter",
            "To complain about bad days"
          ],
          correct: 1
        },
        {
          question: "What are the two main types of distractions?",
          options: [
            "Big and small",
            "Internal and external",
            "Important and unimportant",
            "Work and personal"
          ],
          correct: 1
        },
        {
          question: "What is a personal productivity profile?",
          options: [
            "A comparison with others",
            "A picture of your optimal work conditions",
            "A rigid schedule",
            "A list of accomplishments"
          ],
          correct: 1
        }
      ]
    },
    5: {
      title: "Final Reflection – Customize Your Focus System",
      lessons: [
        {
          id: 1,
          title: "Assessing Your Pomodoro Journey",
          content: "Take time to reflect on your Pomodoro experience so far. What has worked well? Which aspects feel natural, and which still feel forced? Consider your initial goals versus your current reality. This honest assessment helps you understand what to keep, modify, or experiment with as you develop your personal focus system. There's no one-size-fits-all approach to productivity.",
          quiz: {
            question: "Why is it important to assess your Pomodoro journey?",
            options: [
              "To prove the technique works perfectly",
              "To identify what to keep, modify, or experiment with",
              "To compare yourself with others",
              "To find reasons to quit"
            ],
            correct: 1
          }
        },
        {
          id: 2,
          title: "Customizing Your Time Intervals",
          content: "While 25 minutes is the traditional Pomodoro length, some people find other intervals work better for them. Creative work might benefit from 45-50 minute sessions, while administrative tasks might work well with 15-20 minute bursts. Experiment with different intervals, but maintain the core principle: focused work followed by a break. The key is finding your optimal focus duration.",
          quiz: {
            question: "What should you keep in mind when customizing Pomodoro intervals?",
            options: [
              "Always stick to exactly 25 minutes",
              "Maintain focused work followed by breaks, but adjust timing to fit your needs",
              "Make sessions as long as possible",
              "Eliminate breaks entirely"
            ],
            correct: 1
          }
        },
        {
          id: 3,
          title: "Adapting for Different Types of Work",
          content: "Different types of work may require different approaches. Deep, creative work might need longer sessions with minimal interruption tracking. Administrative tasks might work well with standard 25-minute Pomodoros. Collaborative work might need flexible timing around meetings. Develop different 'modes' for different work types while maintaining the core focus principles.",
          quiz: {
            question: "How should you handle different types of work with the Pomodoro Technique?",
            options: [
              "Use the same approach for everything",
              "Develop different 'modes' while maintaining core principles",
              "Only use it for one type of work",
              "Abandon the technique for complex work"
            ],
            correct: 1
          }
        },
        {
          id: 4,
          title: "Building Your Personal Distraction Protocol",
          content: "Based on your distraction tracking, create specific protocols for your most common interruptions. For example: 'If my phone buzzes, I'll acknowledge it but not check until my break' or 'If I have an urgent thought, I'll write it on my notepad and address it later.' Having predetermined responses to distractions reduces decision fatigue and maintains focus momentum.",
          quiz: {
            question: "What's the benefit of having predetermined responses to distractions?",
            options: [
              "It eliminates all distractions completely",
              "It reduces decision fatigue and maintains focus",
              "It makes you work longer hours",
              "It prevents you from taking breaks"
            ],
            correct: 1
          }
        },
        {
          id: 5,
          title: "Creating Your Ideal Work Environment",
          content: "Design your workspace to support focused work. This might include specific lighting, background sounds, temperature settings, or desk arrangements that you've discovered work best for you. Consider having 'focus triggers'—environmental cues that signal to your brain it's time for concentrated work. Your environment should make focus the path of least resistance.",
          quiz: {
            question: "What should your ideal work environment accomplish?",
            options: [
              "Look impressive to others",
              "Make focus the path of least resistance",
              "Include as much technology as possible",
              "Be identical to everyone else's setup"
            ],
            correct: 1
          }
        },
        {
          id: 6,
          title: "Developing Sustainable Habits",
          content: "Focus on building sustainable practices rather than perfect adherence to rules. It's better to do 3-4 consistent Pomodoros daily than to attempt 10 and burn out after a week. Build the technique gradually into your routine, connecting it to existing habits. For example, 'After my morning coffee, I'll do my first Pomodoro' creates a natural trigger for the practice.",
          quiz: {
            question: "What's more important for long-term success with the Pomodoro Technique?",
            options: [
              "Perfect adherence to all rules",
              "Doing as many sessions as possible",
              "Building sustainable, consistent practices",
              "Impressing others with your productivity"
            ],
            correct: 2
          }
        },
        {
          id: 7,
          title: "Planning for Obstacles and Setbacks",
          content: "Identify potential obstacles to your Pomodoro practice: busy periods at work, family obligations, travel, or personal challenges. Develop strategies for maintaining some form of focused work practice even during difficult times. This might mean shorter sessions, fewer daily Pomodoros, or modified approaches. Resilience comes from adaptation, not perfection.",
          quiz: {
            question: "How should you handle obstacles to your Pomodoro practice?",
            options: [
              "Give up until conditions are perfect",
              "Force yourself to maintain the exact same routine",
              "Develop adaptive strategies for difficult times",
              "Only practice when it's easy"
            ],
            correct: 2
          }
        },
        {
          id: 8,
          title: "The Long-Term Learning Mindset",
          content: "View your focus system as an ongoing experiment rather than a fixed solution. What works for you now might need adjustment in six months as your work changes, your life evolves, or you discover new insights about your productivity patterns. Stay curious about your own focus patterns and remain open to evolving your approach over time.",
          quiz: {
            question: "How should you view your personal focus system?",
            options: [
              "As a fixed solution that never changes",
              "As an ongoing experiment that evolves",
              "As something that should work for everyone",
              "As a temporary solution"
            ],
            correct: 1
          }
        },
        {
          id: 9,
          title: "Sharing and Learning from Others",
          content: "Consider sharing your experiences with the Pomodoro Technique with colleagues, friends, or online communities. Teaching others what you've learned reinforces your own understanding, and hearing about others' adaptations can inspire new approaches for your own practice. However, remember that what works for others might not work for you—use their experiences as inspiration, not rules.",
          quiz: {
            question: "Why might sharing your Pomodoro experience with others be beneficial?",
            options: [
              "To prove you're more productive than others",
              "To force others to use the same technique",
              "To reinforce your own learning and discover new approaches",
              "To find people to compete with"
            ],
            correct: 2
          }
        },
        {
          id: 10,
          title: "Your Focus System Moving Forward",
          content: "You now have the foundation to build a personalized focus system that evolves with your needs. The principles you've learned—focused work sessions, strategic breaks, distraction management, and energy awareness—form a toolkit you can adapt for any situation. Remember that productivity is not about perfection; it's about creating systems that help you do meaningful work consistently over time.",
          quiz: {
            question: "What is the ultimate goal of developing a personal focus system?",
            options: [
              "To achieve perfect productivity every day",
              "To impress others with your work output",
              "To create systems for doing meaningful work consistently",
              "To eliminate all breaks and work constantly"
            ],
            correct: 2
          }
        }
      ],
      finalQuiz: [
        {
          question: "What's the main purpose of assessing your Pomodoro journey?",
          options: [
            "To prove it works perfectly",
            "To identify what to keep, modify, or experiment with",
            "To compare with others",
            "To find reasons to quit"
          ],
          correct: 1
        },
        {
          question: "When customizing Pomodoro intervals, what should you maintain?",
          options: [
            "Exactly 25-minute sessions",
            "The core principle of focused work followed by breaks",
            "No breaks at all",
            "Sessions longer than one hour"
          ],
          correct: 1
        },
        {
          question: "How should you handle different types of work?",
          options: [
            "Use identical approach for everything",
            "Develop different modes while keeping core principles",
            "Only use Pomodoros for easy tasks",
            "Abandon the technique for complex work"
          ],
          correct: 1
        },
        {
          question: "What's the benefit of predetermined distraction responses?",
          options: [
            "Eliminates all distractions",
            "Reduces decision fatigue and maintains focus",
            "Makes you work longer",
            "Prevents breaks"
          ],
          correct: 1
        },
        {
          question: "What should your ideal work environment accomplish?",
          options: [
            "Impress visitors",
            "Make focus the path of least resistance",
            "Include maximum technology",
            "Look like everyone else's"
          ],
          correct: 1
        },
        {
          question: "What's more important for long-term success?",
          options: [
            "Perfect rule adherence",
            "Maximum daily sessions",
            "Sustainable, consistent practices",
            "Impressing others"
          ],
          correct: 2
        },
        {
          question: "How should you handle obstacles to your practice?",
          options: [
            "Wait for perfect conditions",
            "Never modify your routine",
            "Develop adaptive strategies",
            "Only practice when easy"
          ],
          correct: 2
        },
        {
          question: "How should you view your personal focus system?",
          options: [
            "As a fixed, permanent solution",
            "As an ongoing experiment that evolves",
            "As universal for everyone",
            "As temporary"
          ],
          correct: 1
        },
        {
          question: "Why share your experience with others?",
          options: [
            "To prove superiority",
            "To force others to use it",
            "To reinforce learning and discover new approaches",
            "To compete"
          ],
          correct: 2
        },
        {
          question: "What's the ultimate goal of a personal focus system?",
          options: [
            "Perfect daily productivity",
            "Impressing others",
            "Creating systems for meaningful work consistently",
            "Working without breaks"
          ],
          correct: 2
        }
      ]
    }
  }

  // Calculate total progress
  useEffect(() => {
    let totalLessons = 0
    let completedCount = 0
    
    for (let part = 1; part <= 5; part++) {
      totalLessons += 10 // 10 lessons per part
      for (let lesson = 1; lesson <= 10; lesson++) {
        if (completedLessons[`${part}-${lesson}`]) {
          completedCount++
        }
      }
    }
    
    setCourseProgress(Math.round((completedCount / totalLessons) * 100))
  }, [completedLessons])

  const markLessonComplete = (partId, lessonId) => {
    setCompletedLessons(prev => ({
      ...prev,
      [`${partId}-${lessonId}`]: true
    }))
  }

  const handleFinalQuizAnswer = (partId, questionIndex, selectedAnswer) => {
    setFinalQuizAnswers(prev => ({
      ...prev,
      [`${partId}-${questionIndex}`]: selectedAnswer
    }))
  }

  const calculateFinalQuizScore = (partId) => {
    const quiz = courseData[partId].finalQuiz
    let correct = 0
    
    quiz.forEach((question, index) => {
      if (finalQuizAnswers[`${partId}-${index}`] === question.correct) {
        correct++
      }
    })
    
    return Math.round((correct / quiz.length) * 100)
  }

  const submitFinalQuiz = (partId) => {
    const score = calculateFinalQuizScore(partId)
    setPartScores(prev => ({ ...prev, [partId]: score }))
    
    if (score >= 60 && partId < 5) {
      setCurrentPart(partId + 1)
      setCurrentLesson(1)
    }
    setShowFinalQuiz(false)
    setFinalQuizAnswers({})
  }

  const canAccessPart = (partId) => {
    if (partId === 1) return true
    return partScores[partId - 1] >= 60
  }

  const getLessonsToShow = (partId) => {
    const lessons = []
    const maxLessons = partId === currentPart ? currentLesson : 10
    
    for (let i = 1; i <= maxLessons; i++) {
      lessons.push(courseData[partId].lessons[i - 1])
    }
    return lessons
  }

  const nextLesson = (partId) => {
    // Check if current lesson is completed before allowing progression
    const currentLessonKey = `${partId}-${currentLesson}`
    if (!completedLessons[currentLessonKey]) {
      return // Don't allow progression if current lesson isn't completed
    }
    
    if (partId === currentPart && currentLesson < 10) {
      setCurrentLesson(currentLesson + 1)
    } else if (partId === currentPart && currentLesson === 10) {
      setShowFinalQuiz(true)
    }
  }

  const LessonComponent = ({ lesson, partId, onComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const isCompleted = completedLessons[`${partId}-${lesson.id}`]

    const handleQuizSubmit = () => {
      setShowResult(true)
      if (!isCompleted) {
        onComplete(partId, lesson.id)
      }
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Lesson {lesson.id} – {lesson.title}
          </h3>
          {isCompleted && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ✓ Completed
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3">Quick Quiz:</h4>
          <p className="text-gray-700 mb-4">{lesson.quiz.question}</p>
          
          <div className="space-y-2 mb-4">
            {lesson.quiz.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`lesson-${partId}-${lesson.id}`}
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={(e) => setSelectedAnswer(parseInt(e.target.value))}
                  className="text-emerald-600"
                />
                <span className="text-gray-700">{String.fromCharCode(65 + index)}) {option}</span>
              </label>
            ))}
          </div>

          {!showResult && (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedAnswer === null}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg ${selectedAnswer === lesson.quiz.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium ${selectedAnswer === lesson.quiz.correct ? 'text-green-800' : 'text-red-800'}`}>
                {selectedAnswer === lesson.quiz.correct ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-gray-700 mt-1">
                The correct answer is: {String.fromCharCode(65 + lesson.quiz.correct)}) {lesson.quiz.options[lesson.quiz.correct]}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const FinalQuizComponent = ({ partId, onSubmit }) => {
    const quiz = courseData[partId].finalQuiz
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)

    const handleAnswerChange = (questionIndex, answerIndex) => {
      setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
      handleFinalQuizAnswer(partId, questionIndex, answerIndex)
    }

      const submitQuiz = () => {
    // Only allow submission if all questions are answered
    if (Object.keys(answers).length !== quiz.length) {
      return
    }
    setShowResults(true)
    setTimeout(() => onSubmit(partId), 2000)
  }

  const allAnswered = Object.keys(answers).length === quiz.length
    const score = showResults ? calculateFinalQuizScore(partId) : 0

    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Final Quiz – Part {partId}: {courseData[partId].title}
        </h3>

        <div className="space-y-6">
          {quiz.map((question, qIndex) => (
            <div key={qIndex} className="border-b pb-4">
              <p className="font-medium text-gray-800 mb-3">
                {qIndex + 1}. {question.question}
              </p>
              
              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex
                  const isCorrect = oIndex === question.correct
                  const showCorrection = showResults && (isSelected || isCorrect)
                  
                  return (
                    <label
                      key={oIndex}
                      className={`flex items-center space-x-3 cursor-pointer p-2 rounded ${
                        showCorrection
                          ? isCorrect
                            ? 'bg-green-100 border border-green-300'
                            : isSelected
                            ? 'bg-red-100 border border-red-300'
                            : ''
                          : isSelected
                          ? 'bg-blue-50 border border-blue-300'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`final-quiz-${partId}-${qIndex}`}
                        value={oIndex}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(qIndex, oIndex)}
                        disabled={showResults}
                        className="text-emerald-600"
                      />
                      <span className="text-gray-700">
                        {String.fromCharCode(65 + oIndex)}) {option}
                        {showResults && isCorrect && ' ✓'}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {!showResults && (
          <div className="mt-6">
            <button
              onClick={submitQuiz}
              disabled={!allAnswered}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Submit Final Quiz
            </button>
            {!allAnswered && (
              <p className="text-amber-600 text-sm mt-2">
                Please answer all {quiz.length} questions before submitting
              </p>
            )}
          </div>
        )}

        {showResults && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-bold text-lg text-gray-800">Quiz Results</h4>
            <p className="text-gray-700 mt-2">
              You scored: <span className="font-bold text-2xl">{score}%</span>
            </p>
            <p className="text-gray-600 mt-1">
              {score >= 60 
                ? "🎉 Congratulations! You passed and can proceed to the next part."
                : "😔 You need 60% or higher to proceed. Please review the material and try again."
              }
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Course Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Productivity 101: Master the Pomodoro Technique
          </h1>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700">Overall Progress</span>
              <span className="text-lg font-bold text-emerald-600">{courseProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Part Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(partId => (
              <button
                key={partId}
                onClick={() => canAccessPart(partId) && setCurrentPart(partId)}
                disabled={!canAccessPart(partId)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  partId === currentPart
                    ? 'bg-emerald-600 text-white'
                    : canAccessPart(partId)
                    ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Part {partId}
                {partScores[partId] >= 60 && ' ✓'}
              </button>
            ))}
          </div>
        </div>

        {/* Current Part Content */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Part {currentPart}: {courseData[currentPart].title}
          </h2>

          {!showFinalQuiz ? (
            <div>
              {getLessonsToShow(currentPart).map((lesson) => (
                <LessonComponent
                  key={lesson.id}
                  lesson={lesson}
                  partId={currentPart}
                  onComplete={markLessonComplete}
                />
              ))}

                        {currentPart === currentPart && currentLesson <= 10 && (
            <div className="text-center mt-6">
              {completedLessons[`${currentPart}-${currentLesson}`] ? (
                <button
                  onClick={() => nextLesson(currentPart)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 font-medium"
                >
                  {currentLesson === 10 ? 'Take Final Quiz' : 'Continue to Next Lesson'}
                </button>
              ) : (
                <div className="text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="font-medium">Complete the quiz above to continue to the next lesson</p>
                </div>
              )}
            </div>
          )}
            </div>
          ) : (
            <FinalQuizComponent
              partId={currentPart}
              onSubmit={submitFinalQuiz}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PomodoroMasteryCourse 