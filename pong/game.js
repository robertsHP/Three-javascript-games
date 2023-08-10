let bg = new Back();
let ball = new Ball(canv.clientWidth/2,canv.clientHeight/2);
let player1 = new Paddle(50,200,87,83);
let player2 = new Paddle(canv.clientWidth-60,200,38,40);

let paused = false;

function update() {
    if(!paused) {
        ball.update();
        player1.update();
        player2.update();
    }
}
function draw () {
    cntx.font = "30px Arial";
    bg.draw();
    bg.drawScore(player1);
    bg.drawScore(player2);
    player1.draw();
    player2.draw();
    ball.draw();
    if(paused){
        cntx.fillStyle = "grey";
        cntx.font = "60px Calibri";
        cntx.fillText("Paused", 235,200);
    }
}

let lastTime = 0;
let moveMax = 10;
let moveTime = 0;

function gameLoop (time = 0) {
    const deltaTime = time - lastTime;
    
    moveTime += deltaTime;
    if(moveTime>moveMax) {
        moveTime = 0;
        update();
    }
    lastTime = time;
    draw();

    requestAnimationFrame(gameLoop);
}
gameLoop();