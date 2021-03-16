//var body = document.body;
var startButton = document.querySelector("#start");
var containerInfoEl = document.getElementById("container-info");
var timerEl = document.getElementById("timerCountdown");
var timeLeft = localStorage.getItem("timeLeft");
var containerQuizEl = document.getElementById("container-quiz");
var questionEl = document.querySelector("#quizquestions");
var answerBtnEl = Array.from(document.querySelectorAll(".option-answer"));
var highScoreEl = document.getElementById("finalscore");
//var highScore = localStorage.getItem("highscore");
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");


// var nextButton = document.createElement("button");
// nextButton.innerHTML = "Next";
// containerQuizEl.appendChild(nextButton);

var currentQuestion = {};
var scorePoints = 20;
var totalQuestions = 3;
var getAnswers = true;
var score = 0;
var questionCounter = 0;
var applicableQuestions = [];

startButton.addEventListener("click", startGame);

// Add function to start game
function startGame(){
    questionCounter =0;
    score = 0;
    applicableQuestions = [...questions];
    timeLeft = 75;
    startButton.classList.add('hide-container-quiz');
    containerQuizEl.classList.remove('hide-container-quiz');
    if (containerInfoEl ===  "none") {
        containerInfoEl.style.display = "block";
    } 
    else {
        containerInfoEl.style.display = "none";
    }
    
    timerCountdown();
    setNewQuestion();
}

// Create function for next question
function setNewQuestion() {
    //resetQuiz();
    if (applicableQuestions.length === 0 || questionCounter > totalQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return;
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${totalQuestions}`;

    // Set questions to be displayed randomly
    var currentQuestionIndex = Math.floor(Math.random() * applicableQuestions.length);
    currentQuestion = applicableQuestions[currentQuestionIndex];
    questionEl.innerText =currentQuestion.question;

    answerBtnEl.forEach(option => {
        var number = option.dataset['number'];
        //var answerButton = document.createElement("button");

        option.innerText = currentQuestion['option' + number];
        
    })
    applicableQuestions.splice(currentQuestionIndex, 1);
    getAnswers = true;   
}

answerBtnEl.forEach(option => {
    option.addEventListener("click", event => {
        if (!getAnswers)
        return
        getAnswers = false;
        var selectedEl = event.target;
        event.stopPropagation();
        var correctAnswer = selectedEl.dataset['number'];

        var setClass = correctAnswer == currentQuestion.answer ? "correct" : "wrong";
        if (setClass === 'correct') {
            incrementScore(scorePoints);
        }
        //selectedEl.classList.add("correct");
        //     event.currentTarget.setAttribute(
        //         "style",
        //         "background-color: green"
        //     );
    
        // if ("correct") {
        //     incrementScore(scorePoints);
        //     event.currentTarget.setAttribute(
        //         "style",
        //         "background-color: green"
        //     );
        // }
        selectedEl.parentElement.classList.add(setClass);

        setTimeout(() => {
            selectedEl.parentElement.classList.remove(setClass);
            setNewQuestion();
        }, 1000)
    })
    
    
})
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}


// Timer that counts down from 75
function timerCountdown() {
    
    
    // Method to call timer function
    var timeInterval = setInterval(function () {
        timeLeft--; 
        timerEl.textContent = timeLeft; 
        
        if (timeLeft >= 0){
            if (getAnswers && timeLeft > 0) {
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
var questions  = [
    {
        question: "Commonly used data types do not include:",
        option1: "strings",
        option2: "booleans",
        option3: "alerts",
        option4: "numbers",
        answer: 3,
        
    },
    {
        question: "The condition in an if/else statement is enclosed within _____",
        option1: "quotes",
        option2: "curly brackets",
        option3: "parenthesis",
        option4: "square brackets",
        answer: 3,
    
    },
    {
        question: "Arrays in Javascript can be used to store ___________",
        option1: "numbers and strings",
        option2: "other arrays",
        option3: "booleans",
        option4: "all of  the above",
        answer: 1,
        
    }
];


  

