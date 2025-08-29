const quizData = [
  {
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<heading>"],
    answer: "<h1>"
  },
  {
    question: "Which property in CSS is used to change text color?",
    options: ["background-color", "color", "font-color", "text-color"],
    answer: "color"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: "<a>"
  },
  {
    question: "Which CSS property controls the size of text?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which symbol is used for comments in CSS?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
    answer: "/* comment */"
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: ["msg('Hello World')", "alert('Hello World')", "prompt('Hello World')", "console.log('Hello World')"],
    answer: "alert('Hello World')"
  },
  {
    question: "Which attribute is used in HTML to provide an alternate text for an image?",
    options: ["alt", "title", "src", "href"],
    answer: "alt"
  },
  {
    question: "Which CSS property is used to set the background color?",
    options: ["color", "background-color", "bgcolor", "background"],
    answer: "background-color"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript (ES6)?",
    options: ["var", "let", "int", "const"],
    answer: "let"
  }
];



let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const timerBox=document.getElementById("timerBox");
const timerElement=document.getElementById("timer");
const themeToggle = document.getElementById("theme-toggle-checkbox");
const quizBox = document.getElementById("quizBox-main");
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("option");
const nxtBtnElement = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");
const scoreElement = document.getElementById("score");
const percentageElement = document.getElementById("percentage");
const msgElement = document.getElementById("message");
const restartElement = document.getElementById("restart-btn");

function startQuiz() {
    window.location.href = "game.html";
  }

window.onload = function () {
    if (quizBox) {
      currentQuestion = 0;
      score = 0;
      showQuestion();
      timerBox.classList.remove("vis-hidden");
      quizBox.classList.remove("hidden");
      resultBox.classList.add("hidden");
    }
    if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", themeToggle.checked);

    if (themeToggle.checked) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
};

function shuffle(quizData) {
  return quizData.sort(() => Math.random() - 0.5);
}
quizData = shuffle(quizData);

function showQuestion() {
    document.getElementById("progressBar").classList.remove("hidden")
    optionElement.innerHTML = "";  // this line clears the old options so new ones don’t pile up
    timeUpMessage.textContent = ""; // this clears the previous times up msg 
    timeUpMessage.classList.add("hidden");
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    q.options.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        li.onclick = () => selectAnswer(element, q.answer);  //()=> this is an arrow function it defines when clickrd do this
        optionElement.appendChild(li);
    });
    nxtBtnElement.disabled = true;
    resetTimer();
    updateProgress();
  }
  
  

  function selectAnswer(selected, correct) {
    clearInterval(timer);
    const options = optionElement.querySelectorAll("li");
    options.forEach(element => {
      element.style.pointerEvents = "none";
    });
  
    if (selected === correct) {
      score++;
      options.forEach(element => {
        if (element.textContent === selected) {
          element.style.backgroundColor = "#4CAF50"; 
          element.style.color = "white";
          element.style.fontWeight = "bold";
          element.style.border = "2px solid #2e7d32";
        }
      });
    } else {
      options.forEach(element => {
        if (element.textContent === selected) {
          element.style.backgroundColor = "#FF4C4C"; 
          element.style.color = "white";
          element.style.fontWeight = "bold";
          element.style.border = "2px dashed #b71c1c";
        }
        if (element.textContent === correct) {
          element.style.backgroundColor = "#4CAF50"; 
          element.style.color = "white";
          element.style.border = "2px solid #2e7d32";
        }
      });
    }
  
    nxtBtnElement.disabled = false; 
    nxtBtnElement.onclick = function () {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
        nxtBtnElement.disabled = true;
      } else {
        showResult();
      }
    };
  }
  

  function updateProgress() {
    let progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById("progress").style.width = progress + "%";
  }
  

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    updateTimerColor(timeLeft);
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      updateTimerColor(timeLeft);
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        autoSelectOption();
      }
    }, 1000);
  }

  function autoSelectOption() {
    const q = quizData[currentQuestion];
    const options = optionElement.querySelectorAll("li");
    const message = document.getElementById("timeUpMessage");

    message.textContent = " Time's up!";
    message.classList.remove("hidden");
  
    setTimeout(() => {
      message.classList.add("hidden");
    }, 5000);
  
    options.forEach(li => {
      li.style.pointerEvents = "none";
      
      if (li.textContent === q.answer) {
        li.style.backgroundColor = "#90ee90";
        li.style.color = "black";
        li.style.border = "2px dashed #28a745"; 
      }
    });
  
    nxtBtnElement.disabled = false;
    nxtBtnElement.onclick = function () {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
        nxtBtnElement.disabled = true;
      } else {
        showResult();
      }
    };
  }
  

function showResult(){
    document.getElementById("progressBar").classList.add("hidden")
    timerBox.classList.add("vis-hidden");
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    let percentage = Math.round((score / quizData.length) * 100);
    scoreElement.textContent = `${score} / ${quizData.length}`;
    percentageElement.textContent = `${percentage}%`;
    let message = "";
    if (percentage === 100) {
        message = "🎉 Excellent! Perfect score!";
    } else if (percentage >= 75) {
        message = "👏 Great job! You did really well.";
    } else if (percentage >= 50) {
        message = "🙂 Not bad! Keep practicing.";
    } else {
        message = "😅 Keep trying, you’ll get better!";
    }
    msgElement.textContent = message;
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 15;

    scoreElement.textContent = "0";
    percentageElement.textContent = "0%";
    msgElement.textContent = "";
    
    timerBox.classList.remove("vis-hidden");
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
  
    clearInterval(timer);
    resetTimer();
  
    showQuestion();
  }
  

  function updateTimerColor(timeLeft) {
    const timerSpan = timerElement;
    if (timeLeft <= 4) {
      timerSpan.style.color = "red";
    } else if (timeLeft <= 9) {
      timerSpan.style.color = "orange";
    } else {
      timerSpan.style.color = "green";
    }
  }