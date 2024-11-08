const questions = {
    general: [
        { question: "What is the only planet in our solar system to rotate clockwise on its axis?", choices: ["Mars", "Jupiter", "Venus", "Earth"], correctAnswer: 2 },
        { question: "Which freezes faster: hot or cold water?", choices: ["Cold water", "Hot water", "Both freeze at the same rate", "Depends on container"], correctAnswer: 1 },
        { question: "What is James Bond's code name?", choices: ["001", "7", "00", "007"], correctAnswer: 3 },
        { question: "Jim Henson is the creator of what beloved cast of characters?", choices: ["The Simpsons", "The Muppets", "Sesame Street", "Peanuts"], correctAnswer: 1 },
        { question: "Weighing around eight pounds, this is the human body's largest organ?", choices: ["Liver", "Heart", "Skin", "Brain"], correctAnswer: 2 },
        { question: "Leonardo da Vinci's “Mona Lisa” hangs in what museum?", choices: ["The Louvre", "The Met", "Uffizi Gallery", "Prado Museum"], correctAnswer: 0 },
        { question: "How many states does the Appalachian Trail cross?", choices: ["12", "14", "16", "10"], correctAnswer: 1 },
        { question: "What is the name of John Travolta's character in the 1977 film “Saturday Night Fever”?", choices: ["Danny Zuko", "Tony Manero", "Vincent Vega", "Johnny Castle"], correctAnswer: 1 },
        { question: "What do you call a group of flamingos?", choices: ["Flock", "Pod", "Flamboyance", "Pride"], correctAnswer: 2 },
        { question: "Relative to the internet, what does “URL” stand for?", choices: ["Unified Reference Link", "Universal Resource Locator", "Uniform Resource Locator", "Universal Retrieval Link"], correctAnswer: 2 },
        { question: "What occasion corresponds with the longest day of the year?", choices: ["Winter Solstice", "Spring Equinox", "Summer Solstice", "Fall Equinox"], correctAnswer: 2 },
        { question: "What is the distance from Earth to the sun?", choices: ["93 million miles", "50 million miles", "150 million kilometers", "93 million kilometers"], correctAnswer: 0 },
        { question: "What sport was featured on the first curved U.S. coin in 2014?", choices: ["Football", "Baseball", "Basketball", "Soccer"], correctAnswer: 1 },
        { question: "Which country is the largest in the world?", choices: ["Canada", "China", "Russia", "USA"], correctAnswer: 2 },
        { question: "M&M’S Fruit Chews would eventually become what popular candy?", choices: ["Skittles", "Starburst", "Jolly Ranchers", "Laffy Taffy"], correctAnswer: 1 },
        { question: "According to Guinness World Records, what's the best-selling book of all time?", choices: ["The Bible", "The Quran", "Harry Potter", "Don Quixote"], correctAnswer: 0 },
        { question: "What U.S. state is home to Acadia National Park?", choices: ["California", "Maine", "Alaska", "Colorado"], correctAnswer: 1 },
        { question: "What is the only food that can never go bad?", choices: ["Rice", "Salt", "Honey", "Vinegar"], correctAnswer: 2 },
        { question: "What was the first animal to ever be cloned?", choices: ["Sheep", "Dog", "Rat", "Horse"], correctAnswer: 0 },
        { question: "What is the name of the pet dinosaur on the TV cartoon “The Flintstones”?", choices: ["Dino", "Spot", "Rex", "Buddy"], correctAnswer: 0 },
        { question: "What identity document is required to travel to different countries around the world?", choices: ["Visa", "ID Card", "Driver's License", "Passport"], correctAnswer: 3 },
        { question: "Who is considered the “Father of Relativity?”", choices: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Niels Bohr"], correctAnswer: 2 },
        { question: "Edie Falco and James Gandolfini star in what series about the life of a New Jersey mob boss?", choices: ["Breaking Bad", "The Sopranos", "Boardwalk Empire", "The Wire"], correctAnswer: 1 },
        { question: "Nearly all fossils are preserved in what type of rock?", choices: ["Igneous", "Sedimentary", "Metamorphic", "Limestone"], correctAnswer: 1 },
        { question: "What guitarist notably performed on the Michael Jackson song “Beat It”?", choices: ["Eric Clapton", "Slash", "Eddie Van Halen", "B.B. King"], correctAnswer: 2 },
        { question: "What is August’s birthstone?", choices: ["Peridot", "Emerald", "Sapphire", "Ruby"], correctAnswer: 0 },
        { question: "What is Prince Harry’s official first name?", choices: ["Harry", "Henry", "Harrison", "Harold"], correctAnswer: 1 },
        { question: "What is the fifth sign of the zodiac?", choices: ["Cancer", "Leo", "Virgo", "Libra"], correctAnswer: 1 },
        { question: "Which branch of the U.S. armed forces used the slogan, “It’s not just a job, it’s an adventure”?", choices: ["The Army", "The Navy", "The Marines", "The Air Force"], correctAnswer: 1 },
        { question: "By U.S. law, exit signs must be one of what two colors?", choices: ["Red or Green", "Blue or Red", "Yellow or Green", "White or Red"], correctAnswer: 0 },
        { question: "What is an eight-sided shape called?", choices: ["Octagon", "Hexagon", "Pentagon", "Nonagon"], correctAnswer: 0 },
        { question: "When was Earth Day first celebrated?", choices: ["1965", "1970", "1975", "1980"], correctAnswer: 1 },
        { question: "How many points does the Star of David have?", choices: ["4", "5", "6", "7"], correctAnswer: 2 },
        { question: "Who is Barbie’s little sister?", choices: ["Chelsea", "Skipper", "Stacie", "Kelly"], correctAnswer: 1 },
        { question: "In the United Kingdom, what is the day after Christmas known as?", choices: ["Black Friday", "Boxing Day", "Christmas Eve", "Gift Day"], correctAnswer: 1 },
        { question: "Which three zodiac signs are water signs?", choices: ["Cancer, Pisces, Scorpio", "Leo, Virgo, Taurus", "Gemini, Libra, Aquarius", "Sagittarius, Aries, Capricorn"], correctAnswer: 0 },
        { question: "Which month of the year is National Ice Cream Month?", choices: ["June", "July", "August", "May"], correctAnswer: 1 }
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
let selectedQuestions = [];

function selectCategory(category) {
    selectedCategory = category;
    currentQuestionIndex = 0;
    score = 0;

    selectedQuestions = questions[selectedCategory]
        .sort(() => Math.random() - 0.5) 
        .slice(0, 5);

    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("question-screen").classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    const questionObj = selectedQuestions[currentQuestionIndex];
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
    const questionObj = selectedQuestions[currentQuestionIndex];
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
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("question-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    document.getElementById("score-text").textContent = `You scored ${score} out of ${selectedQuestions.length}.`;
}

function resetGame() {
    document.getElementById("end-screen").classList.remove("active");
    document.getElementById("category-screen").classList.add("active");
}


function endRound() {
    document.getElementById("question-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    document.getElementById("score-text").textContent = `You scored ${score} out of ${selectedQuestions.length}.`;
}
