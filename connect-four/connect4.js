const WIDTH = 7;  // const as board size will not change 
const HEIGHT = 6; // const as board size will not change 

let currPlayer = 1;  // 2 player game 
let board=[]; //board is an empty array 


// board [y][x]  makes grid outline 
const makeBoard = () => {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

// makes grid of assigned x and y values for pieces to be placed 
const makeHtmlBoard = () => {   
  const board = document.getElementById('board');
  
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);  
  
  
  //creates spaces at top to show which column piece will land in annd appends to top 
  for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
          top.append(headCell);
    }

    board.append(top);
  
  // creates table rows , table data 
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement("td");
          cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);        
          }
          board.append(row);
        }
      }


      // finds Y value for piece location   
      const findSpotForCol = (x) => {
        for(let y = HEIGHT-1; y >= 0; y--){
          if(!board[y][x]){
            return y;
          }
        }
        return null;
      }
      

// to start placing pieces 

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

const endGame = (msg) => {
  alert(msg);
}




// functions for when area above the grid is clicked and where the piece lands 

function handleClick(evt) { // get x from ID of clicked cell
    const x = +evt.target.id;

  // to drop piece into next spot in column 
    const y = findSpotForCol(x);
    if (y === null) {
    return;
  }

  // put in board and add to table 
  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  currPlayer = currPlayer === 1 ? 2 : 1;


const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  // checks for horizontal wins 
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];   // checks for vertical wins 
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // checks for diagonal left win 
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // checks for diagonal right win 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true; // check for win returns true if any of above four conditions are met 
      }
    }
  }
}
}

makeBoard();
makeHtmlBoard();