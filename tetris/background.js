class Back {
    constructor () {
        this.title = [
            "11111..22222..33333..4444...5...6666",
            "..1....2........3....4...4..5..6....",
            "..1....22222....3....4444...5...666.",
            "..1....2........3....4..4...5......6",
            "..1....22222....3....4...4..5..6666."
        ];
        this.colors = ["#FF0000","#FFFF00","#FF8C00","#4169E1","#EE82EE","#40E0D0"];
        
    }
    drawTitleScreen () {
        cntx.font = "60px Calibri";
        cntx.fillStyle = "black";
        cntx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);
        for(let y = 0, printY = 180;y<this.title.length;++y){
            for (let x = 0, printX = 15;x<this.title[y].length;++x) {
                drawShapes(x,y,10,this.title,printX,printY);
            }
        }
        cntx.font = "25px Calibri";
        cntx.fillStyle = "white";
        cntx.fillText("Press enter to begin...", 100, 350);
    }
    draw(){
        cntx.font = "30px Calibri";
        cntx.fillStyle = "black";
        cntx.fillRect(0, 0, canv.clientWidth, canv.clientHeight);
        cntx.fillStyle = "white";
        cntx.strokeStyle = "white";
        cntx.strokeRect(3, 3, tileSize*13+3, canv.clientHeight-6);
    }
    drawScore () {
        cntx.fillText("Score :", 280, 40); 
        cntx.fillText(score, 310, 80); 
        cntx.fillText("Next :", 280, 130); 
    }
    drawGameOver () {
        cntx.fillStyle = "grey";
        cntx.fillRect(50, 200, canv.clientWidth-100, canv.clientHeight-350);
        cntx.fillStyle = "white";
        cntx.font = "40px Calibri";
        cntx.fillText("Game Over", canv.clientWidth/3-30, 270); 
        cntx.font = "25px Calibri";
        cntx.fillText("Score :", canv.clientWidth/3-20, 320); 
        cntx.fillText(score, canv.clientWidth/3+60, 321); 
    }
    drawPaused () {
        cntx.fillStyle = "white";
        cntx.fillText("Paused", 150, 260);
    }
}