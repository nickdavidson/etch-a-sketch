const container = document.querySelector('#container');

const BOARD_SIZE = 48;
const CELL_SIZE = 16;

const board = document.createElement("div");
board.id = "board";

const newBoardButton = document.createElement("button");
newBoardButton.innerHTML = "New Board";
newBoardButton.id = "new-board";
newBoardButton.addEventListener('click', removeBoard);

let cells;

container.appendChild(board);
container.appendChild(newBoardButton);
drawBoard(BOARD_SIZE);




preventDrag();

container.addEventListener("mousedown", enableDraw);
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
    this.classList.add('activated');
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

    for(let i=0; i<size; i++){
        let row = document.createElement('div');
        row.className = 'row';
    
        for(let j=0; j<size; j++){
            let cell = document.createElement('div');
            cell.id = `cell-${i+1}-${j+1}`;
            cell.className = 'cell';
            cell.style.width = `${CELL_SIZE}px`;
            cell.style.height = `${CELL_SIZE}px`;
    
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
    drawBoard(BOARD_SIZE);
}

function updateCells(){
    cells = document.querySelectorAll(".cell");
}