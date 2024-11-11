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

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    if (!messageDiv) {
        console.error("Message container is missing.");
        return;
    }
    messageDiv.textContent = message;
    messageDiv.classList.add("show");

    setTimeout(() => {
        messageDiv.classList.remove("show");
    }, 2000);
}

document.getElementById("submit-button").addEventListener("click", submitGuess);

function updateSquare(square, resultClass) {
    square.classList.add(resultClass);
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

    const notebook = document.getElementById("notebook-content");
    if (notebook) {
        notebook.value = "";
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

function toggleNotebook() {
    const notebook = document.getElementById("notebook-popup");
    
    if (notebook.classList.contains("hidden")) {
        notebook.classList.remove("hidden");
        notebook.classList.add("show");
        
        setTimeout(() => {
            document.addEventListener("click", closeNotebookOnClickOutside);
        }, 0);
    } else {
        notebook.classList.remove("show");
        notebook.classList.add("hidden");
        document.removeEventListener("click", closeNotebookOnClickOutside);
    }
}

function closeNotebookOnClickOutside(event) {
    const notebook = document.getElementById("notebook-popup");
    const openNotebookButton = document.getElementById("open-notebook");

    if (!notebook.contains(event.target) && event.target !== openNotebookButton) {
        notebook.classList.remove("show");
        notebook.classList.add("hidden");
        document.removeEventListener("click", closeNotebookOnClickOutside);
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        submitGuess();
    }
});

function handleSquareInput(e) {
    const square = e.target;
    square.setAttribute("readonly", true);
    
    if (square.value.length === 1) {
        const nextSquare = square.nextElementSibling;
        if (nextSquare) {
            nextSquare.focus();
            nextSquare.removeAttribute("readonly");
        }
    }
}

function handleBackspace(e) {
    const square = e.target;
    square.removeAttribute("readonly"); 

    if (e.key === "Backspace") {
        if (square.value === "") {
            const prevSquare = square.previousElementSibling;
            if (prevSquare) {
                prevSquare.value = "";
                prevSquare.focus();
                prevSquare.removeAttribute("readonly");
            }
        } else {
            square.value = "";
        }
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

            square.addEventListener("input", handleSquareInput);
            square.addEventListener("keydown", handleBackspace);

            row.appendChild(square);
        }
        grid.appendChild(row);
    }

    const firstSquare = document.querySelector(".row .square");
    if (firstSquare) {
        firstSquare.focus();
    }
}