let bg = new Back();
let curTetr = new Tetramino ();
let nextTetr = new ShapeRand ();

nextTetr.newShape();
curTetr.addShapeValues(nextTetr.storage);
nextTetr.newShape();

let score = 0;
let gOver = false;
let titleSc = true;
let paused = false;

function reset () {
    score = 0;
    gOver = false;
    moveMax = 400;
    keys = [];
    for(let y = 0;y<layout.length;++y){
        layout[y] = "000000000000";
    }
    curTetr = new Tetramino ();
    curTetr.addShapeValues(nextTetr.storage);
    nextTetr.newShape();
}
function makeNewTetra () {
    curTetr.down = true;
    curTetr.addShape();
    for(let y = 0;y<layout.length;++y){
        detectRows(y);
    }
    curTetr = new Tetramino ();
    curTetr.addShapeValues(nextTetr.storage);
    nextTetr.newShape();
}
function update() {
    if(!gOver && !titleSc && !paused) {
        if(curTetr.y+curTetr.shape.length === 25){
            makeNewTetra();
        } else if(curTetr.checkSides(true)[0] !== 0 && curTetr.y === 0){
            gOver = true;
        } else if (curTetr.checkSides(true)[0] !== 0) {
            makeNewTetra();
        }
    }
}
function draw () {
    if(!titleSc) {
        cntx.clearRect(0, 0, canv.clientWidth, canv.clientHeight);
        bg.draw();
        bg.drawScore();
        curTetr.draw();
        nextTetr.draw();
        for(let y = 0;y<layout.length;++y){
            for(let x = 0;x<layout[y].length;++x){
                drawShapes(x,y,tileSize,layout,0,0);
            }
        }
        if (paused) {
            bg.drawPaused();
        } else if (gOver) {
            bg.drawGameOver();
        }
    }
}

let lastTime = 0;
let moveMax = 400;
let moveTime = 0;

function gameLoop (time = 0) {
    const deltaTime = time - lastTime;

    if(titleSc){
        bg.drawTitleScreen();
    }

    update();

    moveTime += deltaTime;
    if(moveTime>moveMax) {
        moveTime = 0;
        curTetr.update();
    }
    lastTime = time;
    
    draw();

    requestAnimationFrame(gameLoop);
}
gameLoop();