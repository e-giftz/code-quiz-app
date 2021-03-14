//var body = document.body;
var startButton = document.querySelector("#start");
var timerEl = document.getElementById("timerCountdown");
var timeLeft = localStorage.getItem("timeLeft");

//timerEl.setAttribute("style", "padding:0px; margin-right: 50px;");
// Insert function that counts timer
// Insert function that presents the  questions

startButton.addEventListener("click", function() {
    timerCountdown();
  
});

// Timer that counts down from 75
function timerCountdown() {
    timeLeft = 75;
    
    // Method to call timer function
    var timeInterval = setInterval(function () {

        // As long as the `timeLeft` is equal 75
        if (timeLeft === 75) {
          
          // Set the `textContent` of `timerEl` to show the remaining seconds
          timerEl.textContent = timeLeft;
          timeLeft--;
          localStorage.setItem("timeLeft", timeLeft);
        } 
        else if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft; 
            localStorage.setItem("timeLeft", timeLeft);
        }
        else {

            // Use `clearInterval()` to stop the timer
            clearInterval(timeLeft);
            localStorage.setItem("timeLeft", timeLeft);
        }
    }, 1000);
}
  

