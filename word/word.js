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
            square.type = "text"; 
            square.maxLength = 1;
            square.addEventListener("input", handleSquareInput); 
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
    square.value = square.value.toUpperCase(); 

    const nextSquare = square.nextElementSibling;
    if (nextSquare) {
        nextSquare.focus();
    } else if (square.parentElement.nextElementSibling) {
        square.parentElement.nextElementSibling.children[0].focus();
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

    // Reset notebook content and hide it
    const notebook = document.getElementById("notebook-content");
    if (notebook) {
        notebook.value = ""; // Clear the notebook content
    }

    const notebookPopup = document.getElementById("notebook-popup");
    if (notebookPopup && notebookPopup.classList.contains("show")) {
        notebookPopup.classList.remove("show");
        notebookPopup.classList.add("hidden");
    }

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

// Toggle the notebook open and closed
function toggleNotebook() {
    const notebook = document.getElementById("notebook-popup");
    
    // Toggle hidden and show classes for sliding animation
    if (notebook.classList.contains("hidden")) {
        notebook.classList.remove("hidden");
        notebook.classList.add("show");
        
        // Delay to allow the notebook to open fully
        setTimeout(() => {
            document.addEventListener("click", closeNotebookOnClickOutside);
        }, 0);
    } else {
        notebook.classList.remove("show");
        notebook.classList.add("hidden");
        document.removeEventListener("click", closeNotebookOnClickOutside);
    }
}

// Close the notebook when clicking outside
function closeNotebookOnClickOutside(event) {
    const notebook = document.getElementById("notebook-popup");
    const openNotebookButton = document.getElementById("open-notebook");

    if (!notebook.contains(event.target) && event.target !== openNotebookButton) {
        notebook.classList.remove("show");
        notebook.classList.add("hidden");
        document.removeEventListener("click", closeNotebookOnClickOutside);
    }
}