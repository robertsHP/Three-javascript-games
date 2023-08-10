let defauX = 5;
let defauY = 0;

class Tetramino {
    constructor () {
        this.x = defauX;
        this.y = defauY;
        this.down = false;
        this.rot = true;
    }
    rotate () {
        let savedShape = this.shape;
        let savedX = this.x;
        let savedY = this.y;
        if(this.rot === true){
            let stShape = this.shape[0].split("");
            for(let y = 1;y<this.shape.length;++y){
                for(let x = 0;x<this.shape[y].length;++x){
                    stShape[x] += this.shape[y][x];
                }
            }
            stShape.reverse();
            this.shape = stShape;
            this.changeAllignment();
        }
        this.collision(savedShape,savedX,savedY);
    }
    changeAllignment () {
        if(this.center){
            if(this.hor === true){
                this.hor = false;
                this.y += this.coor.y;
                this.x += this.coor.x;
            } else {
                this.hor = true;
                this.y -= this.coor.y;
                this.x -= this.coor.x;
            }
        }
    }
    collision (savedShape,savedX,savedY) {
        let yCol = this.checkSides(true);
        let xCol = this.checkSides(false);

        if(yCol[0] !== 0 || (xCol[0] !== 0 && xCol[1] !== 0)){
            this.shape = savedShape;
            this.x = savedX;
            this.y = savedY;
            this.rot = false;
        }

        if(this.x+this.shape[0].length > 13){
            this.x = 13-this.shape[0].length;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }
    addShapeValues (storage){
        this.shape = storage.shape;
        this.num = storage.num;
        this.color = storage.color;
        this.center = storage.center;
        this.hor = storage.hor;
        this.coor = {
            x : storage.x,
            y : storage.y
        }
    }
    checkSides (isY){
        let colCount = [0,0];
        let sh = this.shape;
        for(let y = 0;y<sh.length;++y){
            for(let x = 0;x<sh[y].length;++x){
                if(isY) {   //[down,up]
                    if(shNums.includes(layout[y+this.y+1][x+this.x]) && shNums.includes(sh[y][x])) {
                        ++colCount[0];
                    }
                } else if (!isY && shNums.includes(sh[y][x])) { //[left,right]
                    if (shNums.includes(layout[y+this.y][x+this.x-1])) {
                        ++colCount[0];
                    } else if (shNums.includes(layout[y+this.y][x+this.x+1]))  {
                        ++colCount[1];
                    }
                }
            }
        }
        return colCount;
    }
    update () {
        if(!this.down && !gOver && !titleSc && !paused){
            this.y += 1;
        }
    }
    addShape (){
        let sh = this.shape;
        for(let y = 0;y<sh.length;++y){
            for(let x = 0;x<sh[y].length;++x){
                if(shNums.includes(sh[y][x])){
                    let splitLay = layout[this.y+y].split("");
                    splitLay[this.x+x] = this.num;
                    layout[this.y+y] = splitLay.join("");
                }
            }
        }
    }
    draw () {
        if(this.shape != null){
            cntx.fillStyle = this.color;
            for(let y = 0;y<this.shape.length;++y){
                for(let x = 0;x<this.shape[y].length;++x){
                    if(shNums.includes(this.shape[y][x]) && this.y < 25 && this.y+y > -1){
                        let xLoc = (this.x+x)*tileSize;
                        let yLoc = (this.y+y)*tileSize;
                        cntx.fillRect(xLoc+6,yLoc+6,tileSize-3,tileSize-3);
                    }
                }
            }
        }
    }
}
class ShapeRand {
    constructor() {
        this.x = 14;
        this.y = 8;
    }
    newShape (){
        let num = Math.floor(Math.random() * 7);
        const keys = Object.keys(possibleSh);
        for(let c = 0;c<keys.length;++c){
            if(c === num){
                this.storage = possibleSh[keys[c]];
                return;
            }
        }
    }
    draw () {
        if(this.storage != null){
            cntx.fillStyle = this.storage.color;
            for(let y = 0;y<this.storage.shape.length;++y){
                for(let x = 0;x<this.storage.shape[y].length;++x){
                    if(shNums.includes(this.storage.shape[y][x])){
                        let xLoc = (this.x+x)*tileSize;
                        let yLoc = (this.y+y)*tileSize;
                        cntx.fillRect(xLoc+6,yLoc+6,tileSize-3,tileSize-3);
                    }
                }
            }
        }
    }
}