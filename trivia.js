const questions = {
    general: [
        { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "Lisbon"], correctAnswer: 2 },
        { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"], correctAnswer: 0 },
        { question: "What is the largest planet?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 2 },
        { question: "What element has the symbol 'O'?", choices: ["Oxygen", "Gold", "Iron", "Osmium"], correctAnswer: 0 },
        { question: "When did the Titanic sink?", choices: ["1912", "1915", "1918", "1920"], correctAnswer: 0 },
    ],
    coding: [
        { question: "In JavaScript, what is the result of `[] + []`?", choices: ["0", "undefined", "empty string", "NaN"], correctAnswer: 2 },
        { question: "Which algorithm has a time complexity of O(log n) for searching in a sorted array?", choices: ["Bubble Sort", "Binary Search", "Quick Sort", "Linear Search"], correctAnswer: 1 },
        { question: "What does ACID stand for in database systems?", choices: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Deletion", "Accuracy, Consistency, Integration, Durability", "Availability, Consistency, Integrity, Dependency"], correctAnswer: 0 },
        { question: "In the Linux file system, what is the root directory symbol?", choices: ["~", "/", "\\", "."], correctAnswer: 1 },
        { question: "Which of the following best describes 'pipelining' in CPU architecture?", choices: ["Storing data in registers", "Fetching multiple instructions in parallel", "Increasing clock speed", "Sequential execution of instructions"], correctAnswer: 1 },
    ],
    funny: [
        { question: "What color is a mirror?", choices: ["Green", "White", "Silver", "Clear"], correctAnswer: 2 },
        { question: "Why did the chicken cross the road?", choices: ["To get to the other side", "It was lost", "Because it could", "To find food"], correctAnswer: 0 },
        { question: "What is faster, light or your Wi-Fi?", choices: ["Light", "Wi-Fi", "Depends", "They're the same"], correctAnswer: 0 },
        { question: "Why don’t skeletons fight each other?", choices: ["They have no guts", "They're too bony", "It's too spooky", "They're friends"], correctAnswer: 0 },
        { question: "What's orange and sounds like a parrot?", choices: ["A carrot", "An orange parrot", "A crow", "A traffic cone"], correctAnswer: 0 },
    ]
};



let selectedCategory = null;
let currentQuestionIndex = 0;
let score = 0;

function selectCategory(category) {
    selectedCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("question-screen").classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    const questionObj = questions[selectedCategory][currentQuestionIndex];
    document.getElementById("question-text").textContent = questionObj.question;
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    questionObj.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("div");
        choiceElement.textContent = choice;
        choiceElement.classList.add("choice");
        choiceElement.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(choiceElement);
    });

    document.getElementById("next-button").disabled = true;
}

function selectAnswer(selectedIndex) {
    const questionObj = questions[selectedCategory][currentQuestionIndex];
    const choices = document.getElementsByClassName("choice");

    Array.from(choices).forEach((choice, index) => {
        if (index === questionObj.correctAnswer) {
            choice.classList.add("correct");
        } else if (index === selectedIndex) {
            choice.classList.add("incorrect");
        }
        choice.onclick = null; 
    });

    if (selectedIndex === questionObj.correctAnswer) {
        score++;
    }

    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[selectedCategory].length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("question-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    document.getElementById("score-text").textContent = `You scored ${score} out of ${questions[selectedCategory].length} in the ${selectedCategory} category.`;
}

function resetGame() {
    document.getElementById("end-screen").classList.remove("active");
    document.getElementById("category-screen").classList.add("active");
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


function endRound() {
    // Hide the question screen and show the end screen
    document.getElementById("question-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");

    // Display the final score
    document.getElementById("score-text").textContent = `You scored ${score} out of ${questions[selectedCategory].length} in the ${selectedCategory} category.`;
}
