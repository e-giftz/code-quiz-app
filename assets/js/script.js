//var body = document.body;
var startButton = document.querySelector("#start");
var containerInfoEl = document.getElementById("container-info");
var timerEl = document.getElementById("timerCountdown");
var timeLeft = localStorage.getItem("timeLeft");
var containerQuizEl = document.getElementById("container-quiz");
var questionEl = document.querySelector("#quizquestions");
var answerBtnEl = Array.from(document.querySelectorAll(".option-answer"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#finalscore");

//var userInitialsEl = document.querySelector("#userid");
var userInitialsEl = document.getElementById("userid");
var submitScoreBtnEl = document.querySelector("#submit-form");
var finalScoreEl = document.querySelector("#container-highScores");
var mostRecentScoreEl = localStorage.getItem("mostRecentScore");
var userList = document.querySelector("#user-list");

var currentQuestion = {};
var scorePoints = 20;
var totalQuestions = 3;
var getAnswers = true;
var score = 0;
var questionCounter = 0;
var applicableQuestions = [];
//var users = [];
var users = Array.from(localStorage.getItem("users"));

startButton.addEventListener("click", startGame);
// Add function to start game
function startGame(){
    console.log("hello");
    questionCounter =0;
    score = 0;
    timeLeft = 75;
    applicableQuestions = [...questions];

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
// Timer that counts down from 75
function timerCountdown() {
    
    // Method to call timer function
    var timeInterval = setInterval(function () {
        timeLeft--; 
        timerEl.textContent = timeLeft; 
        
        if (timeLeft >= 0){
            if (getAnswers && timeLeft > 0) {
            }
        }
        // Check if time is run out
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
        
    }, 1000);
}

//storeUserInitials(users);
    
// function storeUserInitials(data) {
//     // Stringify and set key in localStorage to todos array
//     localStorage.setItem("users", JSON.stringify(data));
//     console.log('users');
// }

//Get the high score from the local storage
  var highScore = JSON.parse(localStorage.getItem("highScore")) || [];


// Variable to store the maximum numnber of score to record
var maxHighScore = 5; 
finalScoreEl.innerText = mostRecentScoreEl;

// Create keyup event to re-enable the submit button when key pressed
userInitialsEl.addEventListener('keyup', ()=> {     
    submitScoreBtnEl.disabled = !userInitialsEl.value;
})

submitScoreBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    //alert("testing")
    // var userInitialsText = userInitialsEl.value.trim();

    // //return if submitted is blank
    // if (userInitialsText ==="") {
    //    return;
    // }

    // users.push(userInitialsText);
    // userInitialsEl.value ="";
    var score = {
       score: mostRecentScoreEl,
       name: userInitialsEl.value
    }
    

    highScore.push(score)

    highScore.sort((a,b) => {
        return b.score - a.score
    })

    highScore.splice(5);

    localStorage.setItem('users', users);
    localStorage.setItem('highScore', JSON.stringify(highScore));
    userList.innerHTML = highScore.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`
    }).join('')
    
})

// renderUserInitials();
// function renderUserInitials() {

//     // for (var i = 0; i < userScore.length; i++){
//     //     var node = document.createElement("p");
//     //     node.textContent = users[i] + " " + userScore[i];
//     //     finalScoreEl.append(node);
//     //     console.log('happy');
//     // }
//     userList.innerHTML = 
//     highScore.map(score => {
//         return `<li class="high-score">${score.name} - ${score.score}</li>`
//     }).join('')
    
// }
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
// Create function for next question
function setNewQuestion() {
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
        option.innerText = currentQuestion['option' + number]; 
    })
    applicableQuestions.splice(currentQuestionIndex, 1);
    
    getAnswers = true;   
}
answerBtnEl.forEach(option => {
    option.addEventListener("click", event => {
        if (!getAnswers) return
        getAnswers = false;
        var selectedEl = event.target;
        event.stopPropagation();
        var correctAnswer = selectedEl.dataset['number'];

        var setClass = correctAnswer == currentQuestion.answer ? "correct" : "wrong";
        if (setClass === 'correct') {
            incrementScore(scorePoints);
        }

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

  

