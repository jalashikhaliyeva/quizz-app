let timeLeft = document.querySelector(".time-left");
let quizContainer = document.querySelector(".container");
let nextBtn = document.querySelector("#next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.querySelector("#display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.querySelector("#restart");
let userScore = document.querySelector("#user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.querySelector("#start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// 10 questions with options and answers array
const quizArray = [
  {
    id: "0",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: "1",
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
  },
  {
    id: "2",
    question: 'Which element has the chemical symbol "O"?',
    options: ["Oxygen", "Gold", "Iron", "Silver"],
    correctAnswer: "Oxygen",
  },
  {
    id: "3",
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: "4",
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1500", "1601", "1405"],
    correctAnswer: "1492",
  },
  {
    id: "5",
    question: 'Which planet is known as the "Red Planet"?',
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: "6",
    question: "What is the currency of Brazil?",
    options: ["Euro", "Dollar", "Real", "Peso"],
    correctAnswer: "Real",
  },
  {
    id: "7",
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    id: "8",
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: "9",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
  },
  {
    id: "10",
    question:
      "Which famous scientist developed the theory of general relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Stephen Hawking",
    ],
    correctAnswer: "Albert Einstein",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
      createResultTable(); //gpt

    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question ";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);




restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");

  // Hide the result container when restarting
  document.getElementById("result-container").classList.add("hide");
});

// Function to get the selected answer for a question
function getSelectedAnswer(index) {
  const selectedOption = document.querySelector(`.container-mid:nth-child(${index + 1}) .option-div.correct`);
  return selectedOption ? selectedOption.innerText : "Not answered";
}





const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  if (quizCards.length > questionCount) {
    quizCards.forEach((card) => {
      card.classList.add("hide");
    });

    quizCards[questionCount].classList.remove("hide");
  }
};

function quizCreater() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question ";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `<button class="option-div" onclick= "checker(this)">${i.options[0]}</button> 
  
  <button class="option-div" onclick= "checker(this)">${i.options[1]}</button> 
  
  <button class="option-div" onclick= "checker(this)">${i.options[2]}</button> 
  
  <button class="option-div" onclick= "checker(this)">${i.options[3]}</button> 
  
  `;

    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correctAnswer) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correctAnswer) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);

  options.forEach((element) => {
    element.disabled = true;
  });
}



function initial() {
  


  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreater();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};



