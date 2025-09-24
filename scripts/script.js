const buttonReset = document.getElementById("buttonReset");
let textScoreCount = document.getElementById("textScoreCount");
let canvasPong = document.getElementById("canvasPong");

let ball = canvasPong.getContext("2d");
let bar = canvasPong.getContext("2d");

let xBall = canvasPong.width / 2;
let yBall = canvasPong.height / 2;
const rayBall = 10;

let xBar = canvasPong.width / 2;
const yBar = 420;

let speed = 4;
let angle = 6;

let animationId;

let secondes = 0;
setInterval(timeIncrease, 1000);
yBall += speed;

buttonReset.addEventListener('click', reset);

addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        if (xBar <= canvasPong.width - 40) {
            xBar += 20;
        }
    }
    if (event.key == "ArrowLeft") {
        if (xBar >= 40) {
            xBar -= 20;
        }
        
    }
});


function timeIncrease() {
    secondes++;
    textScoreCount.textContent = secondes + " s";
    console.log(secondes);
}

function reset() {
    secondes = 0;
    textScoreCount.textContent = secondes + " s";
    xBall = canvasPong.width / 2;
    yBall = canvasPong.height / 2;
    xBar = canvasPong.width / 2;
}

function drawBall() {
    ball.fill = ""
    ball.beginPath();
    ball.arc(xBall, yBall, rayBall, 0, 2 * Math.PI);
    ball.stroke();
}

function movementBall() {
     if (angle > 270 && angle < 360) {
        if (xBall >= canvasPong.width - rayBall) {
            angle = 181 + Math.random()*88;
        } else if (yBall >= yBar - rayBall && (xBall >= xBar -30 && xBall <= xBar + 30 )) {
            angle = 1 + Math.random()*88;
        }  
    } else if (angle > 0 && angle < 90) {
        if (xBall >= canvasPong.width - rayBall) {
            angle = 91 + Math.random()*88;
        } else if ( yBall <= rayBall) {
            angle = 271 + Math.random()*88;
        }  
    } else if (angle > 180 && angle < 270) {
        if (xBall <= rayBall) {
            angle = 271 + Math.random()*88;
        } else if ( yBall >= yBar - rayBall && (xBall >= xBar -30 && xBall <= xBar + 30 )) {
            angle = 91 + Math.random()*88;
        }  
    } else if (angle > 90 && angle < 180) {
        if (xBall <= rayBall) {
            angle = 1 + Math.random()*88;
        } else if ( yBall <= rayBall) {
            angle = 181 + Math.random()*88;
        }  
    }

    if (angle > 270 && angle < 360) {
        xBall += speed;
        yBall += speed;
    } else if (angle > 0 && angle < 90) {
        xBall += speed;
        yBall -= speed;
    } else if (angle > 180 && angle < 270) {
        xBall -= speed;
        yBall += speed;
    } else if (angle > 90 && angle < 180) {
        xBall -= speed;
        yBall -= speed;
    }
}


function drawBar() {
    bar.beginPath();
    bar.moveTo(xBar - 30, yBar);
    bar.lineTo(xBar + 30, yBar);
    bar.stroke();
}

function loop() {
    bar.clearRect(0, 0, canvasPong.width, canvasPong.height);
    movementBall();
    drawBall();
    drawBar();
    animationId = requestAnimationFrame(loop);
}

loop();
