let isMouseDown = false;
document.body.addEventListener('mousedown', function (){
    isMouseDown = true;
});
document.body.addEventListener('mouseup', function (){
    isMouseDown = false;
});

const container = document.querySelector('#container');
const BOARD_SIZE = 48;

const board = document.createElement("div");
board.id = "board";

const inputPanel = document.createElement("div");
inputPanel.id = "input-panel";

const optionPanel = document.createElement("div");
optionPanel.id = "option-panel";

const shaderButton = document.createElement("button");
shaderButton.innerHTML = "Shading Mode OFF"
shaderButton.id = "shader-button";
shaderButton.addEventListener('click', shadingToggle);

const randomRGBButton = document.createElement("button");
randomRGBButton.innerHTML = "Rainbow Mode OFF"
randomRGBButton.id = "rainbow-button";
randomRGBButton.addEventListener('click', randomRGBToggle);

const eraserButton = document.createElement("button");
eraserButton.innerHTML = "Eraser OFF"
eraserButton.id = "eraser-button";
eraserButton.addEventListener('click', eraserToggle);

const newBoardButton = document.createElement("button");
newBoardButton.innerHTML = "New Board";
newBoardButton.id = "new-board";
newBoardButton.addEventListener('click', newBoard);

const sliderContainer = document.createElement("div");
sliderContainer.id = "slider-container";

const gridSlider = document.createElement("input");
gridSlider.id = "slider";
gridSlider.type = "range";
gridSlider.min = "8";
gridSlider.max = "96";
gridSlider.value = BOARD_SIZE;

const sliderOutput = document.createElement("span");
sliderOutput.id = "slider-output";
sliderOutput.innerHTML = `${gridSlider.value}x${gridSlider.value}`;



sliderContainer.appendChild(gridSlider);
sliderContainer.appendChild(sliderOutput);

optionPanel.appendChild(shaderButton);
optionPanel.appendChild(randomRGBButton);
optionPanel.appendChild(eraserButton);

inputPanel.appendChild(newBoardButton);
inputPanel.appendChild(sliderContainer);

gridSlider.oninput = function() {
    sliderOutput.innerHTML = `${this.value}x${this.value}`;
}

let cells;

container.appendChild(optionPanel);
container.appendChild(board);
drawBoard(BOARD_SIZE);
board.append(inputPanel);

preventDrag();


let shadingMode = false;
let randomRGBMode = false;
let eraserMode = false;

function shadingToggle(){
    if(eraserMode){
        eraserToggle();
    }

    if(!shadingMode){
        shaderButton.innerHTML = "Shading Mode ON";
        shadingMode = true;
    } else {
        shaderButton.innerHTML = "Shading Mode OFF";
        shadingMode = false;
    }
}

function randomRGBToggle(){
    if(eraserMode){
        eraserToggle();
    }

    if(!randomRGBMode){
        randomRGBButton.innerHTML = "Rainbow Mode ON";
        randomRGBMode = true;
    } else {
        randomRGBButton.innerHTML = "Rainbow Mode OFF";
        randomRGBMode = false;
    }
}

function eraserToggle(){
    if(shadingMode){
        shadingToggle();
    }
    if(randomRGBMode){
        randomRGBToggle();
    }
    
    if(!eraserMode){
        eraserMode = true;
        eraserButton.innerHTML = "Eraser ON";
    } else {
        eraserMode = false;
        eraserButton.innerHTML = "Eraser OFF";
    }

}

function cellFill(e){
    if((e.type==='mouseover') && !isMouseDown){
        return;
    }

    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 1;

    if(eraserMode){
        red = 255;
        green = 255;
        blue = 255;
        this.setAttribute('alpha', 0);
    }

    if(randomRGBMode){
        red = Math.floor(Math.random()*255);
        green = Math.floor(Math.random()*255);
        blue = Math.floor(Math.random()*255);
    }

    if(shadingMode){
        alphaFill(this, red, green, blue);
    }
    else{
        if(!eraserMode){
            this.setAttribute('alpha', alpha);
        }
        this.style.backgroundColor = `rgba(${red},${green},${blue}, ${alpha})`;
    }
}

function alphaFill(cell, r, g, b){
    let alpha = cell.getAttribute("alpha")*1;
    console.log(alpha);
    if(alpha<1){
        alpha+=0.10;
    }
    cell.setAttribute(`alpha`, `${alpha}`);
    cell.style.backgroundColor = `rgba(${r},${g},${b},${alpha})`;
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

            cell.addEventListener("mouseover", cellFill);
            cell.addEventListener("mousedown", cellFill);

            row.appendChild(cell);
        }
        
        board.appendChild(row);
    }

    //container.style.width = `${size*CELL_SIZE}px`;
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
    drawBoard(gridSlider.value);
}