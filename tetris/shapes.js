let shNums = "1234567";

let possibleSh = {
    fir :{
        shape : ["1111"],
        num : "1",
        color : "#FF0000",
        center : true,
        hor : true,
        x : 1,
        y : -1
    },
        
    sec :{
        shape : ["22",
                 "22"],
        num : "2",
        color : "#FFFF00",
        center : false
    },
    
    thi :{
        shape : ["333",
                 "300",],
        num : "3",
        color : "#FF8C00",
        center : false
    },
    fou :{
        shape : ["444",
                 "004",],
        num : "4",
        color : "#4169E1",
        center : false
    },
    fif :{
        shape : ["055",
                 "550",],
        num : "5",
        color : "#EE82EE",
        center : false
    },
    six :{
        shape : ["666",
                 "060",],
        num : "6",
        color : "#40E0D0",
        center : false,
    },
    sev :{
        shape : ["770",
                 "077",],
        num : "7",
        color : "#7CFC00",
        center : false
    },
};

let clRows = [];

function detectRows (y) {
    let rowCount = 0;
    for(let x = 0;x<layout[y].length;++x){
        if(shNums.includes(layout[y][x])){
            ++rowCount;
        }
    }
    if(rowCount > 12){
        ++score;
        layout.splice(y,1);
        layout.unshift("000000000000");
    }
}
function drawShapes (x,y,tileSize,layout,printX,printY){
    if(layout[y][x] === "0" || layout[y][x] === ".") return;
    else if(layout[y][x] === "1") cntx.fillStyle = "#FF0000";
    else if(layout[y][x] === "2") cntx.fillStyle = "#FFFF00";
    else if(layout[y][x] === "3") cntx.fillStyle = "#FF8C00";
    else if(layout[y][x] === "4") cntx.fillStyle = "#4169E1";
    else if(layout[y][x] === "5") cntx.fillStyle = "#EE82EE";
    else if(layout[y][x] === "6") cntx.fillStyle = "#40E0D0";
    else if(layout[y][x] === "7") cntx.fillStyle = "#7CFC00";
    let xLoc = x*tileSize;
    let yLoc = y*tileSize;
    cntx.fillRect(xLoc+6+printX,yLoc+6+printY,tileSize-3,tileSize-3);
}
let layout = [
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000", //5
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000", //10
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000", //15
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000", //20
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000",
    "000000000000"  //25
];