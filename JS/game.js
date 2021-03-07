const cards = document.querySelectorAll(".card")
const board = document.querySelector('.board');
const resetButton = document.querySelector(".reset-button")
const wrongGuesses= document.querySelector(".wrong-guesses")
const score= document.querySelector(".score")
let timerDisplay= document.querySelector('.timer');


let totalSeconds=0;
let startInterval;

let startTime;
let curTime;
let endTime;
let totalTime;


let audioElement = new Audio('/css/sounds/right.mp3');


let wrong = 0;
let palyerScore = 0;

let playerName = document.querySelector(".player-name")

let prevCard = null;

let couplesCount = 6; //מספר הזוגות במשחק, מצב של ניצחון
let flippedCouplesCount = 0; //כמה זוגות הפוכים יש לנו 


let isProcessing = false;


function startGame() {
    localStorage.clear();
    NewPlayer();
    startTimer()
}

function NewPlayer() {
    let userName = prompt("Hey there!What is your name?");
    localStorage.setItem('player', userName);
    showPlayerName(userName);
    shuffleCards()
}


function showPlayerName(userName) {
    playerName.innerHTML = userName;
}


function resetGame(){
    for(i=0;  i<cards.length;  i++)
    {
        cards[i].classList.remove('flipped');
        flippedCouplesCount=0;
    }
    stopTimer(); 
    shuffleCards(); 
    location.reload();
}

resetButton.addEventListener('click', resetGame)

for (card of cards) {
    card.addEventListener('click', (el) => {
        console.log(el.currentTarget);
        cardClicked(el.currentTarget)
    })
}



function shuffleCards() {
    console.log(board.children.length);
    for (let i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    }
}

function cardClicked(curCard) {
    if (curCard.classList.contains('flipped')) return
    if (isProcessing) return
    curCard.classList.add('flipped');
    if (prevCard == null) {
        console.log('first card');
        prevCard = curCard;
    }
    else {
        console.log('second card');
        let card1 = prevCard.getAttribute('name');
        let card2 = curCard.getAttribute('name');
        isProcessing = true;
        if (card1 == card2) {
            audioElement.play();
            palyerScore+=10
            console.log('Right ! ');
            flippedCouplesCount++;
            prevCard = null;
            setTimeout(function () {
                isProcessing = false;
            }, 1000)
            isProcessing = true;
            if (flippedCouplesCount == couplesCount) {
                console.log('Victory');
                setTimeout(function () {
                    resetGame()
                }, 1000)
            }
        } else {
            console.log('Wrong');
            palyerScore-=30;
            setTimeout(function () {
                prevCard.classList.remove('flipped');
                curCard.classList.remove('flipped');
                prevCard = null;
                isProcessing = false;
            }, 1000);
            wrong++;
            wrongGuesses.innerHTML = wrong
            isProcessing = true;
        }
    }
    score.innerHTML = palyerScore;
}


function startTimer()
{
    startInterval= setInterval(timer,1000);
    console.log("startInterval", startInterval);
}


function stopTimer()
{
    var hours = Math.floor(totalSeconds/3600);
    var minute= Math.floor((totalSeconds-hours*3600)/60);
    var seconds = totalSeconds -(hours*3600 + minute*60);
      clearInterval(startInterval);
      timerDisplay.innerHTML=  hours +':'+ minute + ':'+ seconds;
      totalSeconds=0;
}



function showClock()
{
    clockdisplay.textContent=totalTime;
}


function startTheClock(){
    if(startTime==null)
    {
        startTime=(Date.now())/1000;
        console.log(startTime)
        startTimer();
    }
}


function timer()
{
    totalSeconds++;
    var hours = Math.floor(totalSeconds/3600);
    var minute= Math.floor((totalSeconds-hours*3600)/60);
    var seconds = totalSeconds -(hours*3600 + minute*60);
    timerDisplay.innerHTML= hours +':'+ minute + ':'+ seconds ;
}

startGame();