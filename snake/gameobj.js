class Snake {

    setToDefault () {
        this.move = false;
        this.chDir = false;
        this.coor = [{
            xLoc : scSizes.width/2,
            yLoc : scSizes.height/2,
            xDir : 0,
            yDir : 0
        }];
    }
    constructor () {
        this.setToDefault();
    }
    changeLoc (x,y){
        if(!this.move) this.move = true;
        this.coor[0].xDir = x;
        this.coor[0].yDir = y;
        this.chDir = true;
    }
    update () {
        let prevLoc = {
            xLoc : this.coor[0].xLoc,
            yLoc : this.coor[0].yLoc,
            xDir : this.coor[0].xDir,
            yDir : this.coor[0].yDir
        };
        for (let s = 1;s<this.coor.length;++s) {
            let before = this.coor[s];
            this.coor[s] = prevLoc;
            prevLoc = before;
        }
        this.coor[0].xLoc = this.coor[0].xLoc+this.coor[0].xDir;
        this.coor[0].yLoc = this.coor[0].yLoc+this.coor[0].yDir;
        if((this.checkCollision(this.coor[0].xLoc,this.coor[0].yLoc,1) && !(this.coor[0].xDir == 0 && this.coor[0].yDir == 0)) || 
        (this.coor[0].xLoc === 0 || this.coor[0].yLoc === 0 || this.coor[0].xLoc === scSizes.width-1 || this.coor[0].yLoc === scSizes.height-1)){
            gameOver = true;
        }
        if(this.chDir === true){
            this.chDir = false;
        }
    }
    draw () {
        for(let s = 0;s<this.coor.length;++s){
            cntx.fillRect((this.coor[s].xLoc*tileSize)+2
                         ,(this.coor[s].yLoc*tileSize)+2
                         ,tileSize-2
                         ,tileSize-2);
        }
    }
    checkCollision (x,y,index) {
        for(let s = index;s<this.coor.length;++s){
            if (this.coor[s].xLoc == x && this.coor[s].yLoc == y) {
                return true;
            }
        }
        return false;
    }
    checkDirection (xDir,yDir) {
        if(xDir==this.coor[0].xDir && yDir==this.coor[0].yDir){
            if(this.coor.length > 1){
                if(this.coor[1].xLoc == this.coor[0].xLoc+xDir || this.coor[1].yLoc == this.coor[0].yLoc+yDir){
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    }
    makeBigger (){
        this.coor.push({
            xDir : this.coor[this.coor.length-1].xDir,
            yDir : this.coor[this.coor.length-1].yDir,
            xLoc : this.coor[this.coor.length-1].xLoc-this.coor[this.coor.length-1].xDir,
            yLoc : this.coor[this.coor.length-1].yLoc-this.coor[this.coor.length-1].yDir
        });
    }
}
class Food {
    setToDefault () {
        this.x = 0;
        this.y = 0;
        this.exists = false;
    }
    constructor () {
        this.setToDefault();
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    update () {
        if(!this.exists){
            do {
                this.x = this.getRandomInt(1,scSizes.width-1);
                this.y = this.getRandomInt(1,scSizes.height-1);
            } while (snake.checkCollision(this.x,this.y,0)==true);
            this.exists = true;
        } else if (snake.coor[0].xLoc == this.x && snake.coor[0].yLoc == this.y && this.exists) {
            this.exists = false;
            ++score;
            snake.makeBigger();
        }
    }
    draw(){
        if(snake.move){
            cntx.fillRect((this.x*tileSize)+2,(this.y*tileSize)+2,tileSize-2,tileSize-2);
        }
    }
}