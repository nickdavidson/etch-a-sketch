const container = document.querySelector('#container');

const NUM_ROWS = 16;
const NUM_COLS = 16;

for(let i=0; i<NUM_ROWS; i++){
    for(let j=0; j<NUM_COLS; j++){
        let cell = document.createElement('div');
        cell.id = `cell-${i+1}-${j+1}`;
        cell.style.width = '16px';
        cell.style.height = '16px';
        cell.style.border = `1px solid black`;
        container.appendChild(cell);
    }
}