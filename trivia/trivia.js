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
        { 
            question: "In JavaScript, what is the result of `typeof NaN`?", 
            choices: ["'undefined'", "'number'", "'NaN'", "'object'"], 
            correctAnswer: 1 
        },
        { 
            question: "Which data structure offers O(1) complexity for insertion, deletion, and access, but only in an ideal scenario?", 
            choices: ["Array", "Hash Table", "Linked List", "Binary Search Tree"], 
            correctAnswer: 1 
        },
        { 
            question: "In Python, which of the following is NOT a valid key for a dictionary?", 
            choices: ["(1, 2)", "1", "'key'", "[]"], 
            correctAnswer: 3 
        },
        { 
            question: "In C++, which memory management technique prevents dangling pointers?", 
            choices: ["Garbage collection", "RAII (Resource Acquisition Is Initialization)", "Manual memory management", "Smart pointers"], 
            correctAnswer: 3 
        },
        { 
            question: "Which computational problem class is defined as having no polynomial-time solution, but for which a solution can be verified in polynomial time?", 
            choices: ["NP", "P", "BPP", "EXP"], 
            correctAnswer: 0 
        },
        { 
            question: "In distributed computing, what is the main purpose of a 'consensus algorithm'?", 
            choices: ["To coordinate simultaneous writes", "To agree on a single source of truth among nodes", "To reduce memory usage", "To optimize network traffic"], 
            correctAnswer: 1 
        },
        { 
            question: "What does the `git cherry-pick` command do?", 
            choices: ["Merges two branches", "Reverts a commit", "Applies a commit from another branch", "Checks out a new branch"], 
            correctAnswer: 2 
        },
        { 
            question: "Which of the following scheduling algorithms prevents 'starvation' in operating systems?", 
            choices: ["Round Robin", "Shortest Job First", "First-Come, First-Served", "Priority Scheduling"], 
            correctAnswer: 0 
        },
        { 
            question: "In relational databases, what does 'normalization' primarily achieve?", 
            choices: ["Eliminating redundant data", "Increasing data retrieval speed", "Adding indexes", "Improving transaction speed"], 
            correctAnswer: 0 
        },
        { 
            question: "What is the primary difference between RSA and ECC in cryptography?", 
            choices: ["ECC provides stronger security with smaller key sizes", "RSA is faster than ECC", "ECC requires more computational power", "RSA keys are always shorter than ECC keys"], 
            correctAnswer: 0 
        },
        { 
            question: "Which sorting algorithm has the best average-case time complexity when sorting an already nearly sorted list?", 
            choices: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], 
            correctAnswer: 3 
        },
        { 
            question: "In UNIX, what does the command `chmod 755` set for a file?", 
            choices: ["Read-only for everyone", "Full access for owner, read and execute for group and others", "Write-only for owner, execute for everyone else", "No access for others"], 
            correctAnswer: 1 
        },
        { 
            question: "Which of the following algorithms is known to solve the 'Traveling Salesman Problem' optimally but is not feasible for large input sizes?", 
            choices: ["Greedy algorithm", "Nearest Neighbor", "Dynamic Programming", "Brute Force"], 
            correctAnswer: 3 
        },
        { 
            question: "In the context of computer networking, what does the OSI model layer 'Session' primarily handle?", 
            choices: ["Routing and forwarding packets", "Establishing, managing, and terminating sessions", "Data encryption", "Encoding and decoding data"], 
            correctAnswer: 1 
        },
        { 
            question: "What is the maximum number of nodes in a complete binary tree with depth `d`?", 
            choices: ["2^(d+1)", "2^d - 1", "2^(d+1) - 1", "d^2"], 
            correctAnswer: 2 
        },
        { 
            question: "In machine learning, what is the purpose of dropout in a neural network?", 
            choices: ["To prevent overfitting", "To increase learning rate", "To allow unsupervised learning", "To reduce the number of neurons"], 
            correctAnswer: 0 
        },
        { 
            question: "In the Linux kernel, what does the 'niceness' level affect?", 
            choices: ["The priority of network traffic", "The execution priority of processes", "The security level", "Disk I/O operations"], 
            correctAnswer: 1 
        },
        { 
            question: "Which of the following is NOT true about Big-O notation?", 
            choices: ["Describes the upper bound of an algorithm's runtime", "Represents the worst-case scenario", "Is affected by constant factors", "Indicates the scalability of an algorithm"], 
            correctAnswer: 2 
        },
        { 
            question: "In object-oriented programming, which principle is focused on 'wrapping' data and methods into a single unit?", 
            choices: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], 
            correctAnswer: 1 
        },
        { 
            question: "What does the CAP theorem state in distributed systems?", 
            choices: ["Consistency, Availability, and Partition Tolerance cannot be achieved simultaneously", "There is a trade-off between speed and security", "Databases can always be both consistent and available", "Every system must have a master node"], 
            correctAnswer: 0 
        }
    ],
    funny: [
        { question: "How many words in the English language end in 'dous'?", choices: ["Four", "Five", "Six", "Seven"], correctAnswer: 0 },
        { question: "What animal is said to be 30 times more likely to be struck by lightning than humans?", choices: ["Giraffe", "Elephant", "Lion", "Horse"], correctAnswer: 0 },
        { question: "What do you call the offspring of a grizzly bear and polar bear?", choices: ["Pizzly bear", "Grolar bear", "Panda bear", "Kodiak bear"], correctAnswer: 0 },
        { question: "What is the British word for a toilet?", choices: ["Loo", "Bobby", "Tube", "Lift"], correctAnswer: 0 },
        { question: "What time is almost always displayed on a watch or clock in an ad?", choices: ["10:10", "12:30", "6:30", "3:00"], correctAnswer: 0 },
        { question: "Which actor/comedian played drums in a college band with Steely Dan members?", choices: ["Chevy Chase", "Bill Murray", "John Belushi", "Robin Williams"], correctAnswer: 0 },
        { question: "'Where's the beef' was a slogan used by which fast-food chain?", choices: ["Wendy's", "McDonald's", "Burger King", "Jack in the Box"], correctAnswer: 0 },
        { question: "What is Bob Dylan's real last name?", choices: ["Zimmerman", "Davis", "Levy", "Rosen"], correctAnswer: 0 },
        { question: "How many cats do you need to form a colony?", choices: ["Three or more", "Ten", "Five", "Two"], correctAnswer: 0 },
        { question: "Which U.S. president attended the first American circus in 1793?", choices: ["George Washington", "Thomas Jefferson", "James Madison", "John Adams"], correctAnswer: 0 },
        { question: "Meaning 'someone who asks too many questions,' this Russian word is hard to spell.", choices: ["Pochemuchka", "Matryoshka", "Babushka", "Mishka"], correctAnswer: 0 },
        { question: "How many months have 28 days?", choices: ["All of them", "One", "Three", "Six"], correctAnswer: 0 },
        { question: "Who holds the record for the longest attack of hiccups?", choices: ["Charles Osborne", "Mary Jones", "Sarah Thomas", "John Smith"], correctAnswer: 0 },
        { question: "People with hippopotomonstrosesquippedaliophobia have a fear of what?", choices: ["Long words", "Water", "Open spaces", "Animals"], correctAnswer: 0 },
        { question: "These space objects are said to smell like urine and rotten eggs.", choices: ["Comets", "Asteroids", "Moons", "Stars"], correctAnswer: 0 },
        { question: "Which country drinks the most beer (by volume)?", choices: ["China", "Germany", "USA", "Russia"], correctAnswer: 0 },
        { question: "In which U.S. state will you find Transylvania County?", choices: ["North Carolina", "California", "Texas", "Maine"], correctAnswer: 0 },
        { question: "What is a group of pandas called?", choices: ["An embarrassment", "A pride", "A pack", "A colony"], correctAnswer: 0 },
        { question: "How often does the average person burp per day?", choices: ["Up to 30 times", "10 times", "5 times", "20 times"], correctAnswer: 0 },
        { question: "What is the medical term for stinky feet?", choices: ["Bromodosis", "Halitosis", "Dermatitis", "Pharyngitis"], correctAnswer: 0 },
        { question: "Steve Martin is widely known for playing what stringed instrument?", choices: ["Banjo", "Guitar", "Violin", "Cello"], correctAnswer: 0 },
        { question: "What's the only bird that can swim, but not fly?", choices: ["Penguin", "Ostrich", "Emu", "Kiwi"], correctAnswer: 0 },
        { question: "These popular nuts are a member of the peach family. What are they?", choices: ["Almonds", "Walnuts", "Peanuts", "Cashews"], correctAnswer: 0 },
        { question: "'He likes it! Hey Mikey!' is from what TV commercial?", choices: ["Life cereal", "Coca-Cola", "Cheerios", "Pepsi"], correctAnswer: 0 },
        { question: "Farrokh Bulsara is the real name of which rock band lead?", choices: ["Queen's Freddie Mercury", "The Beatles' John Lennon", "The Rolling Stones' Mick Jagger", "The Who's Roger Daltrey"], correctAnswer: 0 },
        { question: "What animal's pee glows under ultraviolet light?", choices: ["Cat", "Dog", "Horse", "Bat"], correctAnswer: 0 },
        { question: "Which grows faster, your toenails or fingernails?", choices: ["Fingernails", "Toenails", "Same rate", "Neither grows"], correctAnswer: 0 },
        { question: "What was the original title of the TV show 'Seinfeld'?", choices: ["The Seinfeld Chronicles", "Jerry", "Friends", "The Stand Up"], correctAnswer: 0 },
        { question: "What is Billie Eilish's full name?", choices: ["Billie Eilish Pirate Baird O'Connell", "Billie Jean Eilish", "Billie Katherine Eilish", "Billie Marie Eilish"], correctAnswer: 0 },
        { question: "What animal burps when it's happy?", choices: ["Gorilla", "Cat", "Dog", "Horse"], correctAnswer: 0 },
        { question: "What is the longest country name in the world?", choices: ["United Kingdom of Great Britain and Northern Ireland", "Republic of the Union of Myanmar", "Democratic Republic of the Congo", "Federative Republic of Brazil"], correctAnswer: 0 },
        { question: "A flamboyance is a term for a group of which animals?", choices: ["Flamingos", "Peacocks", "Parrots", "Swans"], correctAnswer: 0 },
        { question: "Bibliosmia is the love of what?", choices: ["The smell of old books", "New books", "Libraries", "Reading"], correctAnswer: 0 },
        { question: "About how many words is a dog able to learn?", choices: ["165", "300", "50", "500"], correctAnswer: 0 },
        { question: "Where is the largest desert on earth?", choices: ["Antarctica", "Sahara", "Gobi", "Kalahari"], correctAnswer: 0 },
        { question: "Budimir Šobat broke a world record in 2021 for holding his breath. How long did he hold it?", choices: ["24 minutes 37 seconds", "18 minutes", "20 minutes", "16 minutes"], correctAnswer: 0 },
        { question: "Which two U.S. states make it illegal to get married on a dare?", choices: ["Colorado and Delaware", "Texas and California", "New York and Florida", "Nevada and Arizona"], correctAnswer: 0 }
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
