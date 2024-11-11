// Get user data from localStorage
document.getElementById('userName').textContent = localStorage.getItem('userName') || 'Guest';

// Test questions data
const questions = [
    // Mathematics Questions
    {
        question: "What is the value of 7 × 8?",
        options: ["52", "56", "64", "48"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is a prime number?",
        options: ["21", "18", "29", "15"],
        correctAnswer: 2
    },
    {
        question: "What is the perimeter of a rectangle with length 8 cm and width 5 cm?",
        options: ["30 cm", "26 cm", "40 cm", "20 cm"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is the correct fraction equivalent to 0.25?",
        options: ["1/4", "1/2", "3/4", "1/5"],
        correctAnswer: 0
    },
    {
        question: "If x = 4, what is the value of 3x + 5?",
        options: ["12", "17", "11", "9"],
        correctAnswer: 1
    },
    
    // English Questions
    {
        question: "Choose the correct past tense form of the verb \"go\":",
        options: ["goed", "going", "gone", "went"],
        correctAnswer: 3
    },
    {
        question: "Which of the following is a synonym for \"happy\"?",
        options: ["Sad", "Excited", "Angry", "Glad"],
        correctAnswer: 3
    },
    {
        question: "What is the plural form of the word \"child\"?",
        options: ["Childs", "Children", "Childes", "Childern"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is an example of a metaphor?",
        options: [
            "The wind whispered through the trees",
            "She is as tall as a giraffe",
            "The classroom is a zoo",
            "The sun smiled down on us"
        ],
        correctAnswer: 2
    },
    {
        question: "Choose the correct sentence:",
        options: [
            "He don't like chocolate",
            "He doesn't like chocolate",
            "He don't likes chocolate",
            "He doesn't likes chocolate"
        ],
        correctAnswer: 1
    },
    
    // Science Questions
    {
        question: "Which of the following is a solid at room temperature?",
        options: ["Oxygen", "Water", "Iron", "Nitrogen"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the \"Red Planet\"?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        correctAnswer: 2
    },
    {
        question: "What is the main function of the heart in the human body?",
        options: [
            "To digest food",
            "To pump blood",
            "To produce energy",
            "To filter waste"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the chemical formula of water?",
        options: ["H2O", "CO2", "O2", "H2O2"],
        correctAnswer: 0
    },
    {
        question: "What gas do plants absorb from the air during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 1800; // 30 minutes in seconds
let timer;

// Initialize the test
function initTest() {
    displayQuestion();
    startTimer();
    updateProgress();
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option ${answers[currentQuestion] === index ? 'selected' : ''}"
                         onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    updateNavButtons();
    updateProgress();
}

// Handle answer selection
function selectAnswer(index) {
    answers[currentQuestion] = index;
    displayQuestion();
}

// Navigation functions
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

// Update navigation buttons
function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Update progress bar and question counter
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('testProgress').style.width = `${progress}%`;
    document.getElementById('currentQuestionNum').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
}

// Timer functionality
function startTimer() {
    const timerDisplay = document.getElementById('timeRemaining');
    
    timer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

// Submit test
function submitTest() {
    clearInterval(timer);
    const score = calculateScore();
    localStorage.setItem('testScore', score);
    window.location.href = 'dashboard.html#results';
}

// Calculate test score
function calculateScore() {
    const correctAnswers = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    return Math.round((correctAnswers / questions.length) * 100);
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('prevBtn').addEventListener('click', previousQuestion);
document.getElementById('submitBtn').addEventListener('click', submitTest);

// Initialize the test when the page loads
initTest();