const container = document.querySelector('#container');

const BOARD_SIZE = 48;

const board = document.createElement("div");
board.id = "board";

const newBoardButton = document.createElement("button");
newBoardButton.innerHTML = "New Board";
newBoardButton.id = "new-board";
newBoardButton.addEventListener('click', newBoard);

let cells;

container.appendChild(board);
container.appendChild(newBoardButton);
drawBoard(BOARD_SIZE);

preventDrag();

board.addEventListener("mousedown", enableDraw);
document.addEventListener("mouseup", disableDraw);
container.addEventListener("drag", disableDraw);

function enableDraw(){
    cells.forEach(function(cell){
        cell.addEventListener("mouseover", cellFill);
        cell.addEventListener("mousedown", cellFill);
    })
}

function disableDraw(){
    cells.forEach(function(cell){
        cell.removeEventListener("mouseover", cellFill);
    })
}

function cellFill(){
    let red = 0;
    let green = 0;
    let blue = 0;


    let random = false;

    if(random){
        red = Math.floor(Math.random()*255);
        green = Math.floor(Math.random()*255);
        blue = Math.floor(Math.random()*255);
    }



    let alpha = this.getAttribute("alpha")*1;
    if(alpha<1){
        alpha+=0.10;
    }
    this.setAttribute(`alpha`, `${alpha}`);
    this.style.backgroundColor = `rgba(${red},${green},${blue},${alpha})`;
}

function preventDrag(){

    cells.forEach(function(cell){
        cell.addEventListener("dragstart", function(e){
            e.preventDefault();
        });
        cell.addEventListener("drop", function(e){
            e.preventDefault();
        });
    })

    container.addEventListener("dragstart", function(e){
        e.preventDefault();
    });

    container.addEventListener("drop", function(e){
        e.preventDefault();
    });
}

function drawBoard(size){

    console.log(container.getAttribute("width"));
    let CELL_SIZE = 800/size;

    for(let i=0; i<size; i++){
        let row = document.createElement('div');
        row.className = 'row';
    
        for(let j=0; j<size; j++){
            let cell = document.createElement('div');
            cell.id = `cell-${i+1}-${j+1}`;
            cell.className = 'cell';
            cell.style.width = `${CELL_SIZE}px`;
            cell.style.height = `${CELL_SIZE}px`;
            cell.setAttribute("alpha", "0");
    
            if(i===0){
                cell.style.borderTop = '1px solid black';
            }
    
            if(j===0){
                cell.style.borderLeft = '1px solid black';
            }
    
            row.appendChild(cell);
        }
        
        board.appendChild(row);
    }

    container.style.width = `${size*CELL_SIZE}px`;
    updateCells();
}

function removeBoard(){
    cells.forEach(function(cell){
        cell.remove();
    });
}

function updateCells(){
    cells = document.querySelectorAll(".cell");
}

function newBoard(){
    removeBoard();
    let input = prompt("Grid size: ");
    drawBoard(input);
}