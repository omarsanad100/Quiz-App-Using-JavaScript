const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "1", correct: false },
      { text: "22", correct: false },
      { text: "3", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Cairo", correct: false },
    ],
  },
  {
    question: "What's the best Anime in the World?",
    answers: [
      { text: "One Piece", correct: false },
      { text: "HxH", correct: true },
      { text: "One Punch Man", correct: false },
      { text: "Naruto", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  nextButton.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `scored ${score} out of ${questions.length}`;
  nextButton.innerText = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
