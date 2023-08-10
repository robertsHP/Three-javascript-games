var keys = [];

window.addEventListener('keydown', function (e) {
    if(titleSc && e.keyCode === 13){
        titleSc = false;
    } else if(!gOver && !titleSc && !paused) {
        if (keys[83] === true) { //down
            moveMax = 50;
        } else if(e.repeat) {
            return;
        } else if(e.keyCode === 76){ //rotate
            curTetr.rotate();
        } else if(e.keyCode === 65 && curTetr.x > 0 
            && (curTetr.checkSides(false)[0] === 0 && curTetr.checkSides(false)[0] === 0)){ //left
            curTetr.x -= 1;
        } else if (e.keyCode === 68 && curTetr.x+curTetr.shape[0].length < 13 
            && (curTetr.checkSides(false)[1] === 0 && curTetr.checkSides(false)[1] === 0)) { //right
            curTetr.x += 1;
        } else if (e.keyCode === 80) {
            paused = true;
        } else {
            keys[e.keyCode] = true;
        }
    } else if (e.keyCode === 80 && paused) {
        paused = false;
    } else {
        if(e.keyCode === 13) {
            reset();
        }
    }
});
window.addEventListener('keyup', function (e) {
    if(!gOver && !titleSc) {
        keys[e.keyCode] = false;
        if (e.keyCode === 83) { //down
            moveMax = 400;
        }
    }
});