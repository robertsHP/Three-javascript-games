class Back {
    constructor () {
        this.h = 5;
        this.w = 2;
        this.gap = 18;
        this.x = (canv.clientWidth/2)-this.w;
    }
    draw(){
        cntx.clearRect(0, 0, canv.clientWidth, canv.clientHeight);
        cntx.fillStyle = "black";
        cntx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);
        cntx.fillStyle = "white";
        this.drawLine();
    }
    drawLine() {
        for(let y = this.gap;y<canv.clientHeight;y+=this.gap+this.h){
            cntx.fillRect(this.x,y,this.w*2,this.h);
        }
    }
    drawScore (player) {
        if(player === player1){
            let digits = player1.score.toString().length*2;
            cntx.fillText(player1.score, canv.clientWidth/4-digits, canv.clientHeight/5); 
        } else if (player === player2){
            let digits = player2.score.toString().length*2;
            cntx.fillText(player2.score, canv.clientWidth/2+140-digits, canv.clientHeight/5); 
        }
    }
}