let canv = document.getElementById("screen");
let cntx = canv.getContext('2d');

const tileSize = 10;
const scSizes = {
    width : canv.clientWidth/tileSize,
    height : canv.clientHeight/tileSize
};
let gameTick = true;
let gameOver = false;

let score = 0;

let snake = new Snake ();
let food = new Food ();

function drawTextWithShadow (text,x,y,font) {
    cntx.font = font;
    cntx.fillStyle = "grey";
    cntx.fillText(text, x-2, y); 
    cntx.fillStyle = "white";
    cntx.fillText(text, x, y); 
}
function drawGameOver () {
    drawTextWithShadow("Game over", 130, 50,"30px Arial");
    drawTextWithShadow("Score : ", 40,80,"30px Arial");
    drawTextWithShadow(score, 145,83,"30px Arial");
    drawTextWithShadow("Press enter to try again...", 40,110,"30px Arial"); 
}
function draw () {
    if(gameTick && !gameOver){
        cntx.clearRect(0, 0, canv.clientWidth, canv.clientHeight);
        cntx.fillStyle = "#D8BFD8";
        cntx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);
        cntx.fillStyle = "#000000";
        for(let x = 0;x<scSizes.width;++x){
            for (let y = 0;y<scSizes.height;++y){
                if(x === 0 || y === 0 || x === scSizes.width-1 || y === scSizes.height-1){
                    cntx.fillRect((x*tileSize)+2,(y*tileSize)+2,tileSize-2,tileSize-2);
                }
            }
        }
        snake.draw();
        food.draw();
    } else if (!gameTick && !gameOver) {
        drawTextWithShadow("Paused", 155, 50,"30px Arial");
    } else {
        drawGameOver();
    }
}

document.addEventListener("keydown", event => {
    if(gameTick && !gameOver && snake.chDir === false){
        if(event.keyCode==87 && snake.checkDirection(0,1)==false){ //W
            snake.changeLoc(0,-1);
        } else if(event.keyCode==65 && snake.checkDirection(1,0)==false){  //A
            snake.changeLoc(-1,0);
        } else if(event.keyCode==83 && snake.checkDirection(0,-1)==false){  //S
            snake.changeLoc(0,1);
        } else if(event.keyCode==68 && snake.checkDirection(-1,0)==false){  //D
            snake.changeLoc(1,0);
        } else if(event.keyCode==80) {
            gameTick = false;
        }
    } else if (!gameTick && !gameOver) {
        if(event.keyCode==80){
            gameTick = true;
        }
    } else {
        if(event.keyCode==13){
            score = 0;
            snake.setToDefault();
            food.setToDefault();
            gameTick = true;
            gameOver = false;
        }
    }
});

let lastTime = 0;
let moveMax = 90;
let moveTime = 0;

function gameLoop (time = 0) {
    const deltaTime = time - lastTime;
    
    moveTime += deltaTime;
    if(gameTick){
        food.update();
        if(moveTime>moveMax) {
            moveTime = 0;
            snake.update();
        }
    }
    lastTime = time;
    draw();

    requestAnimationFrame(gameLoop);
}
gameLoop();