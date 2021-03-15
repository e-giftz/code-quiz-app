//var body = document.body;
var startButton = document.querySelector("#start");
var timerEl = document.getElementById("timerCountdown");
var timeLeft = localStorage.getItem("timeLeft");
var containerQuizEl = document.getElementById("container-quiz");
var questionEl = document.getElementById("quizquestions");
var answerBtnEl = document.getElementById("quiz-options");


var isWin = false;
var randomQuestions;
var currentQuestionIndex;

//timerEl.setAttribute("style", "padding:0px; margin-right: 50px;");
// Insert function that counts timer
// Insert function that presents the  questions

startButton.addEventListener("click", startGame);

// Add function to start game
function startGame(){
    isWin = false;
    timeLeft = 75;
    startButton.classList.add('hide-container-quiz');
    
    // Set questions to be displayed randomly
    //randomQuestions = questions [Math.floor(Math.random() * questions.length)];
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    containerQuizEl.classList.remove('hide-container-quiz');
    
    
    timerCountdown();
    setQuestion();
}

// Create function for next question
function setQuestion() {
    resetQuiz();
    displayQuestion(randomQuestions[currentQuestionIndex]);
}

// Create function to take each of the questions
function displayQuestion(quizquestions) {
    questionEl.innerText = quizquestions.question;
    quizquestions.answers.forEach(answer => {
        var answerButton = document.createElement("button");
        answerButton.innerText = answer.text;
        answerButton.classList.add("btn-answer");

        // Checking for correct answers
        if (answer.correct) {
            answerButton.dataset.correct = answer.correct;
        }
        // Add event listener for the answer button when it is clicked
        answerButton.addEventListener("click", checkAnswer);
        answerBtnEl .appendChild(answerButton);
    });
}

// Function to reset quiz 
function resetQuiz() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
}

// Call function to selecr your answer
function checkAnswer(event) {
    var element = event.target;
    var correct = element.dataset.correct;
    // Create an array from the answers selected
    Array.from(answerBtnEl.firstChild).forEach(button => {
        button.dataset.correct
    })
    clearStatus(element);
    if (correct) {
        
        var correctAnswer = element.classList.add("correct");
        //correctAnswer.setAttribute("style", "color: green")
    }
    else {
        var wrongAnswer = element.classList.add("wrong");
        //wrongAnswer.setAttribute("style", "color: red");
    }
        
}

function clearStatus (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}



// Timer that counts down from 75
function timerCountdown() {
    
    
    // Method to call timer function
    var timeInterval = setInterval(function () {
        timeLeft--; 
        timerEl.textContent = timeLeft; 
        
        if (timeLeft >= 0){
            if (isWin && timeLeft > 0) {
                clearInterval(timeInterval);
            }
        }
        // Check if time is run out
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
        
    }, 1000);
}

// Create a list to store object for questions and answers
const questions  = [
    {
        question: "Commonly used data types do not include:",
        answers: [
            {text: 'strings', correct: false },
            {text: 'booleans', correct: false},
            {text: 'alerts', correct: true},
            {text: 'numbers', correct: false}
        ]
    }
]


  

