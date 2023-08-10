class Ball {
    constructor (xLoc,yLoc) {
        this.w = 10;
        this.h = 10;
        this.x = xLoc-(this.w/2);
        this.y = yLoc-(this.h/2);
        this.defLoc = {
            x : xLoc,
            y : yLoc
        }
        this.moving = false;
        this.speed = {
            x : 0,
            y : 0
        };
    }
    update(){
        if(this.y < 0 || this.y > canv.clientHeight-this.h){
            this.speed.y *= -1;
        } else if (this.x < 0-this.w) {
            this.x = this.defLoc.x;
            this.y = this.defLoc.y;
            ++player1.score;
        } else if (this.x > canv.clientWidth) {
            this.x = this.defLoc.x;
            this.y = this.defLoc.y;
            ++player2.score;
        }
        this.x += this.speed.x;
        this.y += this.speed.y;
    }
    draw () {
        cntx.fillRect(this.x,this.y,this.w,this.h);
    }
}
class Paddle {
    constructor (xLoc,yLoc) {
        this.x = xLoc;
        this.y = yLoc;
        this.w = 10;
        this.h = 60;
        this.score = 0;
        this.touched = false;
    }
    playerControls (player,up,down) {
        if(keys[up] && player.y > 5){
            player.move(-3);
        } else if(keys[down] && player.y+player.h < canv.clientHeight-5){
            player.move(3);
        }
    }
    update () {
        if(keys[13] && ball.moving === false){
            ball.moving = true;
            let dirX = Math.random() < 0.5 ? -1 : 1;
            let dirY = Math.random() < 0.5 ? -1 : 1;
            ball.speed.x = 3*dirX;
            ball.speed.y = -5*dirY;
        }
        this.checkCollision();
        this.playerControls(player1,87,83);
        this.playerControls(player2,79,76);
    }
    draw () {
        cntx.fillRect(this.x,this.y,this.w,this.h);
    }
    move (yDir) {
        if(this.y < canv.clientHeight && this.y > 0){
            this.y += yDir;
        }
    }
    checkCollision () {
        if(ball.y+ball.h > this.y && ball.y < this.y+this.h){
            if (this.touched) {
                if(ball.speed.y > 0){
                    ball.y = this.y+this.h+4;
                } else if (ball.speed.y < 0) {
                    ball.y = this.y-ball.h-4;
                }
            } else if((ball.x > this.x+this.w-4 && ball.x < this.x+this.w) ||
                    (ball.x+ball.w < this.x+4 && ball.x+ball.w > this.x)){
                ball.speed.x *= -1;
            } else if(ball.x+ball.w > this.x && ball.x < this.x+this.w){
                if(!this.touched) {
                    ball.speed.y *= -1;
                    this.touched = true;
                }
            }
            return;
        }
        this.touched = false;
    }
}

var keys = [];

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    if (e.repeat) {
        return;
    } else if(e.keyCode === 80){
        if(paused === false){
            paused = true;
        } else if (paused === true) {
            paused = false;
        }
    }
});
window.addEventListener('keyup', function (e) {
    keys[e.keyCode] = false;
});