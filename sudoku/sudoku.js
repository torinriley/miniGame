const board = document.getElementById("sudoku-board");
const resetButton = document.getElementById("reset-button");
const giveUpButton = document.getElementById("give-up-button");
const cells = [];

// Generate a solved Sudoku board
function generateSolution() {
    // Naive generation for a solved board (you can improve this with a backtracking algorithm)
    let solution = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));
        function isSafe(board, row, col, num) {
          for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num) {
              return false;
            }
          }
          const startRow = row - row % 3;
          const startCol = col - col % 3;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i + startRow][j + startCol] === num) {
                return false;
              }
            }
          }
          return true;
        }

        function solveSudoku(board) {
          let row = -1;
          let col = -1;
          let isEmpty = true;
          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
              if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
              }
            }
            if (!isEmpty) {
              break;
            }
          }
          if (isEmpty) {
            return true;
          }
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
    // Fill diagonal subgrids
    for (let i = 0; i < 9; i += 3) {
        fillDiagonalSubgrid(solution, i, i);
    }
    solveSudoku(solution);
    return solution;
}

function fillDiagonalSubgrid(board, row, col) {
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[row + i][col + j] = nums[index++];
        }
    }
}

// Generate a puzzle by removing numbers
function generatePuzzle(solution) {
    const puzzle = solution.map((row) => [...row]);
    let cellsToRemove = 40; // Number of cells to remove
    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            cellsToRemove--;
        }
    }
    return puzzle;
}

// Solve the board using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(board, row, col, num) {
    return (
        !board[row].includes(num) &&
        !board.map((r) => r[col]).includes(num) &&
        !isInSubgrid(board, row - (row % 3), col - (col % 3), num)
    );
}

function isInSubgrid(board, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return true;
        }
    }
    return false;
}

// Shuffle numbers (utility function)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the Sudoku board
function createBoard(puzzle) {
    board.innerHTML = ""; // Clear the board
    cells.length = 0; // Clear the cells array
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (puzzle[row][col] !== 0) {
                cell.textContent = puzzle[row][col];
                cell.classList.add("prefilled");
            } else {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.addEventListener("focus", () => cell.classList.add("active"));
                input.addEventListener("blur", () => cell.classList.remove("active"));
                input.addEventListener("input", (e) => {
                    if (!/^[1-9]$/.test(e.target.value)) {
                        e.target.value = ""; // Clear invalid input
                    }
                });
                cell.appendChild(input);
            }
            cells.push(cell);
            board.appendChild(cell);
        }
    }
}

// Reset the board
resetButton.addEventListener("click", () => {
    const solution = generateSolution();
    const puzzle = generatePuzzle(solution);
    createBoard(puzzle);
});

// Give up (reveal solution)
giveUpButton.addEventListener("click", () => {
    const solution = generateSolution();
    createBoard(solution);
});

// Initialize game
const solution = generateSolution();
const puzzle = generatePuzzle(solution);
createBoard(puzzle);