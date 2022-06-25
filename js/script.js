const container = document.querySelector('#container');

drawBoard(48);


container.addEventListener("mousedown", enableDraw);

container.addEventListener("mouseup", disableDraw);
container.addEventListener("drag", disableDraw);
container.addEventListener("mouseleave", disableDraw);

const cells = document.querySelectorAll(".cell");
preventDrag();

function enableDraw(){
    cells.forEach(function(cell){
        cell.addEventListener("mouseover", cellFill);
        cell.addEventListener("mousedown", cellFill);
    })
}

function disableDraw(){
    cells.forEach(function(cell){
        cell.removeEventListener("mouseover", cellFill);
        cell.removeEventListener("mousedown", cellFill);
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
    
            if(i===0){
                cell.style.borderTop = '1px solid black';
            }
    
            if(j===0){
                cell.style.borderLeft = '1px solid black';
            }
    
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
}