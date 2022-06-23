const container = document.querySelector('#container');

const NUM_ROWS = 48;
const NUM_COLS = NUM_ROWS;

for(let i=0; i<NUM_ROWS; i++){
    let row = document.createElement('div');
    row.className = 'row';

    for(let j=0; j<NUM_COLS; j++){
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