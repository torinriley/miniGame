let targetWord = ""; 
let wordList = [];
let currentRow = 0;
let completedRows = 0;
let guessedLetters = {};
let revealEnabled = true;
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
        const response1 = await fetch('word/words.txt');
        const text1 = await response1.text();
        wordList = text1.split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5 && !word.endsWith("ED"));

        const response2 = await fetch('word/answerWords.txt');
        const text2 = await response2.text();
        const targetWordList = text2.split('\n')
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5 && !word.endsWith("ED"));

        wordList = [...new Set([...wordList, ...targetWordList])];

        if (targetWordList.length > 0) {
            targetWord = targetWordList[Math.floor(Math.random() * targetWordList.length)];
        } else {
            console.error("No valid target words available.");
        }
    } catch (error) {
        console.error("Error loading words:", error);
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
    correctLetters = 0;
    incorrectLetters = 0;

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
            correctLetters++;
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
            incorrectLetters++;
        }
    }

    if (guessWord === targetWord) {
        displayMessage("Congratulations! You've guessed the word.");
        disableInputs();
    } else if (completedRows === 6) {
        displayGameOverModal();
        disableInputs();
    } else {
        currentRow++;
        updateRowFocus(currentRow);
    }
}


function displayGameOverModal() {
    document.getElementById("targetWordDisplay").textContent = targetWord;
    document.getElementById("correctLetters").textContent = correctLetters;
    document.getElementById("incorrectLetters").textContent = incorrectLetters;
    const modal = document.getElementById("gameOverModal");
    modal.classList.add("show");
}


function closeGameOverModal() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("show");
}



function restartGame() {
    guessedLetters = {};
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.textContent = "";
        messageDiv.classList.remove("show");
    }

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

    document.querySelectorAll(".key").forEach(key => {
        key.classList.remove("correct", "present", "absent", "revealed"); 
    });
}


function giveUp() {
    const row = document.getElementsByClassName("row")[currentRow];


    for (let i = 0; i < targetWord.length; i++) {
        const square = row.children[i];
        square.value = targetWord[i];
        square.classList.add("give-up");
        square.disabled = true;
    }
    
    displayMessage("You gave up! Better luck next time.");
    disableInputs();

    for (let letter of targetWord) {
        updateKeyboard(letter, "revealed");
    }
}

function displayMessage(message) {
    const messageDiv = document.getElementById("message-container");
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
    if (!rows[rowIndex]) return; // Check if row exists
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row) continue; // Ensure the row is defined
        const squares = row.children;
        for (let square of squares) {
            if (i === rowIndex) {
                square.setAttribute("readonly", true);
                square.classList.remove("disabled");
            } else {
                square.setAttribute("readonly", true);
                square.classList.add("disabled");
            }
        }
    }
    if (rows[rowIndex]) {
        rows[rowIndex].children[0].removeAttribute("readonly");
        rows[rowIndex].children[0].focus();
    }
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
        const currentStatus = guessedLetters[letter];

    if (
        status === "revealed" || 
        (status === "correct" && currentStatus !== "revealed") ||
        (status === "present" && currentStatus !== "revealed" && currentStatus !== "correct") ||
        (!currentStatus || currentStatus === "absent")
    ) {
        guessedLetters[letter] = status;
        
        const keyElement = document.getElementById(`key-${letter}`);
        if (keyElement) {
            keyElement.classList.remove("correct", "present", "absent", "revealed");
            keyElement.classList.add(status);
        }
    }
}


function toggleModal() {
    const modal = document.getElementById("infoModal");
    modal.classList.toggle("show");
}

function toggleSettingsModal() {
    const modal = document.getElementById("settingsModal");
    modal.classList.toggle("show");

    if (modal.classList.contains("show")) {
        document.addEventListener("click", closeModalOnOutsideClick);
    } else {
        document.removeEventListener("click", closeModalOnOutsideClick);
    }
}

function closeModalOnOutsideClick(event) {
    const modal = document.getElementById("settingsModal");
    if (!modal.contains(event.target) && !event.target.closest(".settings-icon")) {
        modal.classList.remove("show");
        document.removeEventListener("click", closeModalOnOutsideClick);
    }
}

function toggleElementVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === "none" || getComputedStyle(element).opacity === "0") {
            fadeIn(element);
        } else {
            fadeOut(element);
        }
    }
}

function fadeIn(element) {
    element.style.display = "block";
    element.style.opacity = 0;
    let opacity = 0;
    const fadeInterval = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInterval);
        }
    }, 30);
}

function fadeOut(element) {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            element.style.display = "none";
            clearInterval(fadeInterval);
        }
    }, 30);
}



function toggleElementVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (elementId === 'reveal') {
        revealEnabled = element.style.display !== "none";
    }
    if (element) {
        if (element.style.display === "none" || getComputedStyle(element).opacity === "0") {
            fadeIn(element);
        } else {
            fadeOut(element);
        }
    }
}



function gameOver() {
    if (!revealEnabled && completedRows === 6 && targetWord) {
        document.getElementById("targetWordDisplay").textContent = targetWord;
        document.getElementById("guessesUsed").textContent = guessesUsed;
        document.getElementById("correctLetters").textContent = correctLetters;
        document.getElementById("incorrectLetters").textContent = incorrectLetters;
        showGameOverModal();
    }
}

function showGameOverModal() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.add("show");
}

function closeGameOverModal() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("show");
}