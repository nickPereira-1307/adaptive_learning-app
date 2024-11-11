// Get user data from localStorage
document.getElementById('userName').textContent = localStorage.getItem('userName') || 'Guest';

// Mock data for subject progress
const subjectProgress = {
    mathematics: {
        score: 85,
        questionsTotal: 5,
        questionsCorrect: 4,
        timeSpent: 15
    },
    english: {
        score: 90,
        questionsTotal: 5,
        questionsCorrect: 4,
        timeSpent: 12
    },
    science: {
        score: 75,
        questionsTotal: 5,
        questionsCorrect: 3,
        timeSpent: 18
    }
};

// Mock data for recent activities
const recentActivities = [
    {
        type: 'test',
        subject: 'Mathematics',
        score: 85,
        date: '2024-02-20'
    },
    {
        type: 'test',
        subject: 'English',
        score: 90,
        date: '2024-02-20'
    },
    {
        type: 'test',
        subject: 'Science',
        score: 75,
        date: '2024-02-20'
    }
];

// Initialize progress data
function initializeProgress() {
    // Update overall score
    const overallScore = Math.round(
        (subjectProgress.mathematics.score + 
         subjectProgress.english.score + 
         subjectProgress.science.score) / 3
    );
    document.getElementById('overallScore').textContent = `${overallScore}%`;

    // Update Mathematics progress
    updateSubjectProgress('math', subjectProgress.mathematics);
    
    // Update English progress
    updateSubjectProgress('english', subjectProgress.english);
    
    // Update Science progress
    updateSubjectProgress('science', subjectProgress.science);

    // Display recent activities
    displayRecentActivities();
}

// Update subject progress
function updateSubjectProgress(subject, data) {
    document.getElementById(`${subject}Progress`).style.width = `${data.score}%`;
    document.getElementById(`${subject}Score`).textContent = `${data.score}%`;
    document.getElementById(`${subject}Questions`).textContent = 
        `${data.questionsCorrect}/${data.questionsTotal}`;
    document.getElementById(`${subject}Time`).textContent = `${data.timeSpent} min`;
}

// Display recent activities
function displayRecentActivities() {
    const activityList = document.getElementById('activityList');
    
    activityList.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${getActivityIcon(activity.subject)}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.subject} Test Completed</h4>
                <span>Score: ${activity.score}% • ${formatDate(activity.date)}</span>
            </div>
        </div>
    `).join('');
}

// Helper function to get activity icon
function getActivityIcon(subject) {
    switch(subject) {
        case 'Mathematics':
            return 'fa-calculator';
        case 'English':
            return 'fa-book';
        case 'Science':
            return 'fa-flask';
        default:
            return 'fa-check';
    }
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeProgress);