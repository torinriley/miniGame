let targetWord = ""; 
let wordList = [];
let currentRow = 0;
let completedRows = 0;
const keyStatus = {};
const keyboardContainer = document.getElementById("keyboard");
const keyboardLayout = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
];



window.onload = async function() {
    await loadWordList();
    createGrid();
    updateRowFocus(currentRow);
};

async function loadWordList() {
    try {
        const response = await fetch('word/words.txt');
        const text = await response.text();
        wordList = text.split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5 && !word.endsWith("ED"));
        
        if (wordList.length === 0) {
            console.error("No valid words available.");
            return;
        }

        targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    } catch (error) {
        console.error("Error loading words:", error);
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
            updateKeyboard(guessArray[i], "correct");
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
                updateKeyboard(guessCopy[i], "present");
                targetArray[targetIndex] = null;
            } else {
                updateSquare(row.children[i], "absent");
                updateKeyboard(guessCopy[i], "absent");
            }
        } else if (!matchedIndexes.has(i)) {
            updateSquare(row.children[i], "absent");
            updateKeyboard(guessArray[i], "absent");
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
        updateRowFocus(currentRow); 
    }
}




// Reset the keyboard when restarting the game
function restartGame() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.value = "";
        square.classList.remove("correct", "present", "absent", "give-up");
        square.removeAttribute("disabled");
    });

    targetWord = "";
    wordList = [];
    currentRow = 0;
    completedRows = 0;

    loadWordList().then(() => {
        updateRowFocus(currentRow);
    });

    // Reset keyboard colors and remove 'revealed' class
    document.querySelectorAll(".key").forEach(key => {
        key.classList.remove("correct", "present", "absent", "revealed"); // Clear all classes
    });
}

function giveUp() {
    const row = document.getElementsByClassName("row")[currentRow];
    
    // Reveal the target word on the grid
    for (let i = 0; i < targetWord.length; i++) {
        const square = row.children[i];
        square.value = targetWord[i];
        square.classList.add("give-up");
        square.disabled = true;
    }
    displayMessage("You gave up! Better luck next time.");
    disableInputs();

    // Update the keyboard to show the revealed word in red
    for (let i = 0; i < targetWord.length; i++) {
        const letter = targetWord[i];
        updateKeyboard(letter, "revealed"); // Apply 'revealed' styling to each letter
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

function updateSquare(square, resultClass) {
    square.classList.add(resultClass);
}


function disableInputs() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.disabled = true);
}

function preventFocus(e) {
    const square = e.target;
    const row = square.parentElement;
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);

    if (rowIndex !== currentRow) {
        square.blur();
    }
}

function handleBackspace(e) {
    const square = e.target;
    const row = square.parentElement;
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);

    if (rowIndex !== currentRow) {
        square.blur();
        return;
    }

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
        e.preventDefault();
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const row = document.getElementsByClassName("row")[currentRow];
        const isRowFilled = Array.from(row.children).every(square => square.value !== "");

        if (isRowFilled) {
            submitGuess();
        } else {
            displayMessage("Please fill in all squares before submitting.");
        }
    }
});

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
            square.addEventListener("input", handleSquareInput);
            square.addEventListener("keydown", handleBackspace);
            square.addEventListener("focus", preventFocus);
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
    updateRowFocus(currentRow); 
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

function handleSquareInput(e) {
    const square = e.target;
    const row = square.parentElement;
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);

    if (rowIndex !== currentRow) {
        square.blur();
        return;
    }

    if (square.value.length === 1) {
        const nextSquare = square.nextElementSibling;
        if (nextSquare) {
            nextSquare.removeAttribute("readonly");
            nextSquare.focus();
        }
    } else {
        square.removeAttribute("readonly");
    }
}

function updateRowFocus(rowIndex) {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const squares = row.children;
        for (let square of squares) {
            if (i === rowIndex) {
                square.setAttribute("readonly", true);
                square.classList.remove("disabled");
            } else {
                square.setAttribute("readonly", true);
                square.classList.add("disabled");
                square.addEventListener("focus", preventFocus);
            }
        }
    }
    rows[rowIndex].children[0].removeAttribute("readonly");
    rows[rowIndex].children[0].focus();
}



function createKeyboard() {
    keyboardContainer.innerHTML = "";
    
    keyboardLayout.forEach((row, rowIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");
        if (rowIndex === 2) rowDiv.classList.add("bottom-row"); 
        
        for (let letter of row) {
            const key = document.createElement("div");
            key.classList.add("key");
            key.textContent = letter;
            key.id = `key-${letter}`;
            
            key.addEventListener("click", () => handleKeyClick(letter));
            
            rowDiv.appendChild(key);
        }
        
        keyboardContainer.appendChild(rowDiv);
    });
}


function handleKeyClick(letter) {
    const row = document.getElementsByClassName("row")[currentRow];
    const squares = Array.from(row.children);
    const emptySquare = squares.find(square => square.value === "");

    if (emptySquare) {
        emptySquare.value = letter;
        emptySquare.dispatchEvent(new Event("input")); 
    }

    const keyElement = document.getElementById(`key-${letter}`);
    if (keyElement) {
        keyElement.classList.add("pressed");
        setTimeout(() => {
            keyElement.classList.remove("pressed"); 
        }, 100);
    }
}

window.onload = async function() {
    createKeyboard();
    await loadWordList();
    createGrid();
    updateRowFocus(currentRow);
};

function updateKeyboard(letter, status) {
    const keyElement = document.getElementById(`key-${letter}`);
    if (keyElement) {
        keyElement.classList.remove("correct", "present", "absent", "revealed"); // Clear existing status
        keyElement.classList.add(status); // Apply new status (e.g., "revealed")
    }
}