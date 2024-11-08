let targetWord = ""; 
let wordList = [];
let currentRow = 0;
let completedRows = 0;

window.onload = async function() {
    await loadWordList();
    createGrid();
};

async function loadWordList() {
    try {
        const response = await fetch('word/words.txt');
        const text = await response.text();
        wordList = text
            .split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5 && !word.endsWith("ED") && !word.endsWith("S"));
        
        if (wordList.length === 0) {
            console.error("No valid words available.");
            return;
        }

        targetWord = wordList[Math.floor(Math.random() * wordList.length)];
        console.log("Target word (for debugging):", targetWord);
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            const square = document.createElement("input");
            square.classList.add("square");
            square.setAttribute("maxlength", "1");
            square.setAttribute("readonly", true);
            square.addEventListener("keydown", handleSquareInput);
            square.addEventListener("focus", (e) => {
                if (i !== currentRow) {
                    e.target.blur();
                }
            });
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
    
    const firstSquare = document.querySelector(".row .square");
    if (firstSquare) {
        firstSquare.focus();
    }
}

function handleSquareInput(e) {
    const square = e.target;

    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        square.value = e.key.toUpperCase();
        moveFocus(e);
    } else if (e.key === "Backspace") {
        if (square.value === "") {
            const prevSquare = square.previousElementSibling;
            if (prevSquare) {
                prevSquare.value = "";
                prevSquare.focus();
            }
        } else {
            square.value = "";
        }
    } else if (e.key === "Enter") {
        submitGuess();
    }
}

function moveFocus(e) {
    const nextSquare = e.target.nextElementSibling;
    if (nextSquare) {
        nextSquare.focus();
    }
}

function submitGuess() {
    const row = document.getElementsByClassName("row")[currentRow];
    const guessArray = Array.from(row.children).map(square => square.value.toUpperCase());
    const guessWord = guessArray.join("");

    if (guessArray.includes("")) {
        displayMessage("Please fill in all squares.");
        return;
    }

    if (!wordList.includes(guessWord)) {
        displayMessage("Invalid word. Please try again.");
        row.classList.add("shake");
        setTimeout(() => row.classList.remove("shake"), 500);
        return;
    }

    completedRows++;

    const targetArray = targetWord.split("");
    const guessCopy = [...guessArray];
    const matchedIndexes = new Set();

    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === targetArray[i]) {
            updateSquare(row.children[i], "correct");
            matchedIndexes.add(i);
            guessCopy[i] = null;
            targetArray[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessCopy[i] && targetArray.includes(guessCopy[i])) {
            const targetIndex = targetArray.indexOf(guessCopy[i]);
            if (targetIndex !== -1 && !matchedIndexes.has(targetIndex)) {
                updateSquare(row.children[i], "present");
                targetArray[targetIndex] = null;
            } else {
                updateSquare(row.children[i], "absent");
            }
        } else if (!matchedIndexes.has(i)) {
            updateSquare(row.children[i], "absent");
        }
    }

    if (guessWord === targetWord) {
        displayMessage("Congratulations! You've guessed the word.");
        disableInputs();
    } else if (completedRows === 6) {
        displayMessage(`Game over! The word was ${targetWord}.`);
        disableInputs();
    } else {
        currentRow++;
        const nextRowFirstSquare = document.getElementsByClassName("row")[currentRow].children[0];
        nextRowFirstSquare.focus();
    }
}

function updateSquare(square, resultClass) {
    square.classList.add(resultClass);
}

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.classList.add("show");

    setTimeout(() => {
        messageDiv.classList.remove("show");
    }, 2000);
}

function disableInputs() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.disabled = true);
}

function clearBoard() {
    const rows = document.getElementsByClassName("row");
    for (let row of rows) {
        for (let square of row.children) {
            square.value = "";
            square.className = "square";
            square.disabled = false;
        }
    }
}

async function restartGame() {
    clearBoard();
    await loadWordList();
    currentRow = 0;
    completedRows = 0;
    displayMessage("");

    const firstSquare = document.querySelector(".row .square");
    if (firstSquare) {
        firstSquare.focus();
    }
}

function giveUp() {
    const row = document.getElementsByClassName("row")[currentRow];
    for (let i = 0; i < 5; i++) {
        const square = row.children[i];
        square.value = targetWord[i];
        square.classList.add("give-up");
        square.disabled = true;
    }
    displayMessage("You gave up! Better luck next time.");
    disableInputs();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
