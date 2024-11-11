// Mock data for testing
const mockUser = {
    name: "Aditya",
    subject: "All Subjects"
};

const mockQuestions = {
    math: [
        {
            id: 1,
            question: "What is the value of the tangent of a 45° angle?",
            options: [
                "1",
                "0.5",
                "0.707",
                "0.866"
            ],
            correctAnswer: 0
        },
        {
            id: 2,
            question: "What is the cosine of a 45° angle?",
            options: [
                "1",
                "0.707",
                "0.5",
                "0.866"
            ],
            correctAnswer: 1
        }
    ],
    english: [
        {
            id: 3,
            question: "Which of the following is a correct example of a simile?",
            options: [
                "He is a lion.",
                "He is like a lion.",
                "He is lion-hearted.",
                "He roars like a lion."
            ],
            correctAnswer: 1
        },
        {
            id: 4,
            question: "Which of the following is a proper noun?",
            options: [
                "school",
                "teacher",
                "India",
                "city"
            ],
            correctAnswer: 2
        },
        {
            id: 5,
            question: "Which of the following is a compound word?",
            options: [
                "House",
                "Cup",
                "Bedroom",
                "Apple"
            ],
            correctAnswer: 2
        }
    ],
    science: [
        {
            id: 6,
            question: "What is the main function of the heart?",
            options: [
                "To filter blood",
                "To pump blood throughout the body",
                "To produce red blood cells",
                "To transport oxygen"
            ],
            correctAnswer: 1
        },
        {
            id: 7,
            question: "What is the largest organ in the human body?",
            options: [
                "Brain",
                "Skin",
                "Heart",
                "Lungs"
            ],
            correctAnswer: 1
        },
        {
            id: 8,
            question: "What is the pH of pure water?",
            options: [
                "1",
                "5",
                "7",
                "10"
            ],
            correctAnswer: 2
        }
    ]
};

let currentQuestion = 0;
let answers = [];
let timeLeft = 1800; // 30 minutes in seconds
let timerInterval;

// Flatten questions for sequential access
const allQuestions = [
    ...mockQuestions.math,
    ...mockQuestions.english,
    ...mockQuestions.science
];

// Initialize DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
});

function initializeDashboard() {
    // Initialize user data
    document.getElementById('userName').textContent = mockUser.name;
    document.getElementById('userSubject').textContent = mockUser.subject;

    // Set up initial state
    updateSubjectIndicator();
}

function setupEventListeners() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Test Controls
    const startTestBtn = document.getElementById('startTestBtn');
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const submitBtn = document.getElementById('submitTest');
    const viewReportBtn = document.getElementById('viewDetailedReport');

    if (startTestBtn) startTestBtn.addEventListener('click', startTest);
    if (prevBtn) prevBtn.addEventListener('click', showPreviousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', showNextQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitTest);
    if (viewReportBtn) viewReportBtn.addEventListener('click', showDetailedReport);
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }
}

function startTest() {
    answers = new Array(allQuestions.length).fill(null);
    currentQuestion = 0;
    showSection('test');
    displayQuestion();
    startTimer();
    updateSubjectIndicator();
}

function updateSubjectIndicator() {
    const currentSubjectElem = document.getElementById('currentSubject');
    if (currentSubjectElem) {
        const questionSubject = getCurrentQuestionSubject();
        currentSubjectElem.textContent = questionSubject.charAt(0).toUpperCase() + questionSubject.slice(1);
    }
}

function getCurrentQuestionSubject() {
    if (currentQuestion < mockQuestions.math.length) return 'Mathematics';
    if (currentQuestion < mockQuestions.math.length + mockQuestions.english.length) return 'English';
    return 'Science';
}

function displayQuestion() {
    const container = document.getElementById('questionContainer');
    const question = allQuestions[currentQuestion];
    
    container.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestion + 1} of ${allQuestions.length}</h3>
            <p>${question.question}</p>
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

    updateProgressBar();
    updateButtonStates();
    updateSubjectIndicator();
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    const submitBtn = document.getElementById('submitTest');

    if (prevBtn) prevBtn.disabled = currentQuestion === 0;
    if (nextBtn) nextBtn.classList.toggle('hidden', currentQuestion === allQuestions.length - 1);
    if (submitBtn) submitBtn.classList.toggle('hidden', currentQuestion !== allQuestions.length - 1);
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    displayQuestion();
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestion < allQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeRemaining').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateSubjectScore(subject) {
    const subjectQuestions = mockQuestions[subject];
    const startIndex = allQuestions.findIndex(q => q.id === subjectQuestions[0].id);
    const subjectAnswers = answers.slice(startIndex, startIndex + subjectQuestions.length);
    
    const correctAnswers = subjectAnswers.reduce((count, answer, index) => {
        return count + (answer === subjectQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    return Math.round((correctAnswers / subjectQuestions.length) * 100);
}

function submitTest() {
    clearInterval(timerInterval);
    
    // Calculate overall score
    const correctAnswers = answers.reduce((count, answer, index) => {
        return count + (answer === allQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const overallScore = Math.round((correctAnswers / allQuestions.length) * 100);
    
    // Calculate subject-wise scores
    const mathScore = calculateSubjectScore('math');
    const englishScore = calculateSubjectScore('english');
    const scienceScore = calculateSubjectScore('science');
    
    // Update DOM with scores
    document.getElementById('scorePercentage').textContent = `${overallScore}%`;
    document.getElementById('mathScore').textContent = `${mathScore}%`;
    document.getElementById('englishScore').textContent = `${englishScore}%`;
    document.getElementById('scienceScore').textContent = `${scienceScore}%`;
    
    // Set difficulty level
    let level = 'Beginner';
    if (overallScore >= 80) level = 'Advanced';
    else if (overallScore >= 60) level = 'Intermediate';
    document.getElementById('difficultyLevel').textContent = `Level: ${level}`;
    
    // Generate course recommendations
    generateCourseRecommendations(level);
    
    // Show results section
    showSection('results');
}

function generateCourseRecommendations(level) {
    const coursesByLevel = {
        Beginner: [
            { title: 'Mathematics Fundamentals', duration: '8 weeks', subject: 'math' },
            { title: 'Basic English Grammar', duration: '6 weeks', subject: 'english' },
            { title: 'Introduction to Science', duration: '8 weeks', subject: 'science' }
        ],
        Intermediate: [
            { title: 'Advanced Mathematics', duration: '10 weeks', subject: 'math' },
            { title: 'English Composition', duration: '8 weeks', subject: 'english' },
            { title: 'Scientific Methods', duration: '10 weeks', subject: 'science' }
        ],
        Advanced: [
            { title: 'Complex Mathematics', duration: '12 weeks', subject: 'math' },
            { title: 'Advanced English Literature', duration: '10 weeks', subject: 'english' },
            { title: 'Advanced Scientific Concepts', duration: '12 weeks', subject: 'science' }
        ]
    };

    const recommendedCourses = coursesByLevel[level];
    const container = document.getElementById('courseRecommendations');
    
    container.innerHTML = recommendedCourses.map(course => `
        <div class="course-card ${course.subject}">
            <h4>${course.title}</h4>
            <p>Duration: ${course.duration}</p>
            <button class="secondary-btn">View Course</button>
        </div>
    `).join('');
}

function showDetailedReport() {
    // Implementation for detailed report view
    console.log('Showing detailed report...');
}