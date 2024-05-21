const questionElement = document.querySelector("#question");
const choiceElements = Array.from(document.querySelectorAll(".choice-text"));
const progressElement = document.querySelector("#progressText");
const scoreElement = document.querySelector("#score");
const progressBar = document.querySelector("#progressBarFull");

let currentQ = {};
let isAnswering = false;
let currentScore = 0;
let questionCount = 0;
let remainingQuestions = [];

const quizQuestions = [
  {
    question: "What does CSS stand for?",
    choice1: "Cascading Style Sheets",
    choice2: "Creative Style System",
    choice3: "Computer Style Sheets",
    choice4: "Colorful Style Sheets",
    answer: 1
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    choice1: "font",
    choice2: "class",
    choice3: "styles",
    choice4: "style",
    answer: 4
  },
  {
    question: "Which property is used to change the background color?",
    choice1: "background-color",
    choice2: "bgColor",
    choice3: "color",
    choice4: "background",
    answer: 1
  }
];

const POINTS_FOR_CORRECT = 10;
const TOTAL_QUESTIONS = 3;

const initiateGame = () => {
  questionCount = 0;
  currentScore = 0;
  remainingQuestions = [...quizQuestions];
  fetchNextQuestion();
};

const fetchNextQuestion = () => {
  if (remainingQuestions.length === 0 || questionCount >= TOTAL_QUESTIONS) {
    localStorage.setItem("latestScore", currentScore);
    return (window.location.href = "/end.html");
  }

  questionCount++;
  progressElement.textContent = `Question ${questionCount}/${TOTAL_QUESTIONS}`;
  progressBar.style.width = `${(questionCount / TOTAL_QUESTIONS) * 100}%`;

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  currentQ = remainingQuestions[randomIndex];
  questionElement.textContent = currentQ.question;

  choiceElements.forEach(choice => {
    const num = choice.dataset["number"];
    choice.textContent = currentQ["choice" + num];
  });

  remainingQuestions.splice(randomIndex, 1);
  isAnswering = true;
};

choiceElements.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!isAnswering) return;

    isAnswering = false;
    const selectedChoice = e.target;
    const chosenAnswer = selectedChoice.dataset["number"];

    const applyClass =
      chosenAnswer == currentQ.answer ? "correct" : "incorrect";

    if (applyClass === "correct") {
      addScore(POINTS_FOR_CORRECT);
    }

    selectedChoice.parentElement.classList.add(applyClass);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(applyClass);
      fetchNextQuestion();
    }, 1000);
  });
});

const addScore = points => {
  currentScore += points;
  scoreElement.textContent = currentScore;
};

initiateGame();
