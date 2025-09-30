const buttonReset = document.getElementById("buttonReset");
let textScoreCount = document.getElementById("textScoreCount");
let canvasPong = document.getElementById("canvasPong");

let ball = canvasPong.getContext("2d");
let bar = canvasPong.getContext("2d");

let xBall = canvasPong.width / 2;
let yBall = canvasPong.height / 2;
const rayBall = 10;

let xBar = canvasPong.width / 2;
const yBar = 460;
let movleftBar = false;
let movrightBar = false;

let speed = 1;
let angle = Math.floor(Math.random() * 4);
let dummy_angle;
let angle_precis = (Math.random());

let animationId;

let secondes = 0;
setInterval(timeIncrease, 1000);
yBall += speed;

buttonReset.addEventListener('click', reset);

addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        movleftBar = true;
    }
    if (event.key == "ArrowLeft") {
        movrightBar = true; 
    }
});

addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
        movleftBar = false;
    }
    if (event.key == "ArrowLeft") {
        movrightBar = false; 
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

function collisionCheck() {
    dummy_angle = angle
    if (angle == 3) {
        if (xBall >= canvasPong.width - rayBall) {
            angle = 2;
        } else if (yBall >= yBar - rayBall && (xBall >= xBar -30 && xBall <= xBar + 30 )) {
            angle = 0; 
        }  
    } else if (angle == 0) {
        if (xBall >= canvasPong.width - rayBall) {
            angle = 1;
        } else if ( yBall <= rayBall) {
            angle = 3;
        }  
    } else if (angle  ==  2) {
        if (xBall <= rayBall) {
            angle = 3;
        } else if ( yBall >= yBar - rayBall && (xBall >= xBar -30 && xBall <= xBar + 30 )) {
            angle = 1 ;
        }
    } else if (angle == 1) {
        if (xBall <= rayBall) {
            angle = 0 ;
        } else if ( yBall <= rayBall) {
            angle = 2 ;
        }  
    }

    if (dummy_angle != angle) {
        angle_precis = (Math.random() *0.5 + 0.3);
        speed += 0.05;
    }
}

function movementBall() {
    collisionCheck();
    if (angle == 3) {
        xBall += speed *angle_precis;
        yBall += speed;
    } else if (angle == 0) {
        xBall += speed*angle_precis;
        yBall -= speed;
    } else if (angle ==  2) {
        xBall -= speed*angle_precis;
        yBall += speed;
    } else if (angle == 1) {
        xBall -= speed*angle_precis;
        yBall -= speed;
    }
}

function movementBar() {
    if (movleftBar == true) {
        if (xBar <= canvasPong.width - 40) {
            xBar += 5;
        }
    }
    if (movrightBar == true) {
        if (xBar >= 40) {
            xBar -= 5;
        }
        
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
    movementBar();
    drawBall();
    drawBar();
    animationId = requestAnimationFrame(loop);
}

loop();
