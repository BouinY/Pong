const buttonReset = document.getElementById("buttonReset");
let textScoreCount = document.getElementById("textScoreCount");
let canvasPong = document.getElementById("canvasPong");

let ball = canvasPong.getContext("2d");

let secondes = 0;
setInterval(timeIncrease,1000);

buttonReset.addEventListener( 'click', () => {
    reset();
} )

function timeIncrease() {
    secondes++;
    textScoreCount.textContent = secondes + " s";
    console.log(secondes);
}

function reset() {
    secondes = 0;
    textScoreCount.textContent = secondes + " s";
}

function drawBall() {
    ball.beginPath();
    ball.arc(canvasPong.width/2, canvasPong.width/4, 15, 0, 2 * Math.PI);
    ball.stroke();
    
}

drawBall();

 