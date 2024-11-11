// Video course data
const coursesData = {
    maths: [
        {
            title: "Algebra Basics",
            thumbnail: "demo\src\main\resources\static\algebra.jpeg",
            url: "https://youtu.be/IVoe5iPKBFM?si=WeZKvYtS3WbRVv1b"
        },
    
        {
            title: "Geometry Fundamentals",
            thumbnail: "https://via.placeholder.com/300x200?text=Geometry+Fundamentals",
            url: "https://youtu.be/302eJ3TzJQU?si=8TlDQ0JkznUcZsEK"
        },
        {
            title: "Trigonometry Explained",
            thumbnail: "https://via.placeholder.com/300x200?text=Trigonometry+Explained",
            url: "https://youtu.be/PUB0TaZ7bhA?si=wzeK5nBdhUzsy6Jr"
        }
    ],
    science: [
        {
            title: "Biology Basics",
            thumbnail: "https://via.placeholder.com/300x200?text=Biology+Basics",
            url: "https://youtu.be/3tisOnOkwzo?si=kIpPlLoFiXKHt2a1"
        },
        {
            title: "Chemistry Introduction",
            thumbnail: "https://via.placeholder.com/300x200?text=Chemistry+Introduction",
            url: "https://youtu.be/Rd4a1X3B61w?si=nm6oZmAM47hmBKmw"
        },
        {
            title: "Physics Fundamentals",
            thumbnail: "https://via.placeholder.com/300x200?text=Physics+Fundamentals",
            url: "https://youtu.be/kx5919OW2jc?si=sfYKJuWay96TcOLo"
        }
    ],
    english: [
        {
            title: "Grammar Basics",
            thumbnail: "https://via.placeholder.com/300x200?text=Grammar+Basics",
            url: "https://youtu.be/QXVzmzhxWWc?si=qYbwh67eqau4vtMG"
        },
        {
            title: "Vocabulary Mastery",
            thumbnail: "https://via.placeholder.com/300x200?text=Vocabulary+Mastery",
            url: "https://youtu.be/DfWkxpdOEP8?si=Le47P9j_NTYqoQjt"
        },
        {
            title: "Writing Skills",
            thumbnail: "https://via.placeholder.com/300x200?text=Writing+Skills",
            url: "https://youtu.be/MehHHlTnUPs?si=SmRIn6n_1cudMQuj"
        }
    ]
};

// Function to show courses for a selected subject
function showCourses(subject) {
    // Hide subject selection page
    document.getElementById('subjectSelectionPage').style.display = 'none';
    
    // Show courses page
    document.getElementById('coursesPage').style.display = 'block';
    
    // Set subject title - Fixed the template literal syntax
    document.getElementById('subjectTitle').textContent = `${subject.toUpperCase()} Courses`;
    
    // Get video container
    const videoContainer = document.getElementById('videoContainer');
    
    // Clear previous videos
    videoContainer.innerHTML = '';
    
    // Create video cards
    coursesData[subject].forEach(course => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <a href="${course.url}" target="_blank">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="video-card-content">
                    <h3>${course.title}</h3>
                </div>
            </a>
        `;
        videoContainer.appendChild(videoCard);
    });
}

// Function to go back to subject selection
function goBack() {
    // Hide courses page
    document.getElementById('coursesPage').style.display = 'none';
    
    // Show subject selection page
    document.getElementById('subjectSelectionPage').style.display = 'block';
}

// Optional: Add event listeners for subject cards
document.addEventListener('DOMContentLoaded', () => {
    // Get all subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    
    // Add click event listeners
    subjectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Get the subject from data attribute or text
            const subject = e.currentTarget.getAttribute('data-subject') || 
                           e.currentTarget.querySelector('h3').textContent.toLowerCase();
            
            // Show courses for the selected subject
            showCourses(subject);
        });
    });

    // Optional: Add hover effects
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.style.transform = 'scale(1)';
        });
    });
});

// Optional: Search functionality
function searchCourses() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const allSubjects = Object.keys(coursesData);

    // Search across all subjects
    const results = [];
    allSubjects.forEach(subject => {
        const matchedCourses = coursesData[subject].filter(course => 
            course.title.toLowerCase().includes(searchInput)
        );
        results.push(...matchedCourses);
    });

    // Display search results
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        videoContainer.innerHTML = '<p>No courses found</p>';
        return;
    }

    results.forEach(course => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <a href="${course.url}" target="_blank">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="video-card-content">
                    <h3>${course.title}</h3>
                </div>
            </a>
        `;
        videoContainer.appendChild(videoCard);
    });
}

// Optional: Add a method to filter by difficulty or type
function filterCourses(difficulty) {
    // This would require adding difficulty to the course objects
    const allSubjects = Object.keys(coursesData);
    const filteredCourses = [];

    allSubjects.forEach(subject => {
        const matchedCourses = coursesData[subject].filter(course => 
            course.difficulty === difficulty
        );
        filteredCourses.push(...matchedCourses);
    });

    displaySearchResults(filteredCourses);
}