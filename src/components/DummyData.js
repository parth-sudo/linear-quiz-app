let trivia2 = "We all know intuitively that not all work hours are created equal. The first hour of the morning when your energy and willpower are high is a helluva lot more productive than the hour after lunch when all you want to do is curl up and take a nap. Eat the Frog ensures that you’re using your best hours to do your most mentally taxing work and leaves less important tasks for times when you’ve already exhausted your brain power for the day."
let trivia3 = "Your frog should take half a day’s work, tops. A clearly defined, realistic task will make it easier to get started and not procrastinate on. Checking it off your list before lunch will give you a concrete win and accompanying endorphin boost to carry you into the rest of your day."

export const Questions = [
    { index: 0, title: "The 'Eat the Frog' is one of simplest yet most effective productivity techniques around. What is the 'frog' in Eat the Frog?", trivia: "The “Frog” is also known as your Most Important Task (MIT). This task is often important but not urgent, the type of difficult task that creates a lot of mental resistance and ensuing procrastination if you don't intentionally make time for it. You probably already know the task I’m talking about." },
    { index: 1, title: "When do you eat the frog i.e. do the most important task for the day?", trivia: trivia2 },
    { index: 2, title: "What should be size of the task that you choose as your frog?", trivia: trivia3 },
  ];
  
export const Choices = [
    { question: 0, choice: "An or a set of easy tasks on your to do list", position: 1, is_correct: false },
    { question: 0, choice: "Your hardest, most important task for the day", position: 2, is_correct: true },
    { question: 0, choice: "Your manager's latest burning ask from you", position: 3, is_correct: false },
    { question: 0, choice: "An actual frog", position: 4, is_correct: false },
  
    { question: 1, choice: "First thing in the morning", position: 1, is_correct: true },
    { question: 1, choice: "During an empty slot in the calendar", position: 2, is_correct: false },
    { question: 1, choice: "Immediately after lunch", position: 3, is_correct: false },
    { question: 1, choice: "At night, when there are no distractions", position: 4, is_correct: false },
  
    { question: 2, choice: "A task you can complete in 30-60 mins", position: 1, is_correct: false },
    { question: 2, choice: "A task you can complete in 1-4 hours", position: 2, is_correct: true },
    { question: 2, choice: "A task you can complete in less that 30 mins", position: 3, is_correct: false },
    { question: 2, choice: "A task you can complete in 4-8 hours", position: 4, is_correct: false },
  ];