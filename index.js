// Form animations and transitions
const animateForm = {
    shake: (element) => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'shake 0.5s ease';
    },
    
    highlight: (element) => {
        element.style.animation = 'highlight 1s ease';
    }
};

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    @keyframes highlight {
        0% { background-color: rgba(221, 36, 118, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);

// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active classes
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.form-container').forEach(f => f.classList.remove('active'));
        
        // Add active classes to clicked tab and corresponding form
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}Form`).classList.add('active');
        
        // Reset forms and hide messages
        document.querySelectorAll('form').forEach(form => {
            form.reset();
            form.querySelectorAll('.error, .success-message').forEach(el => el.style.display = 'none');
            form.querySelector('.button-loader').style.display = 'none';
        });
    });
});

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Input focus effects
document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Helper functions
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const showError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'flex';
    animateForm.shake(errorElement.parentElement);
};

const hideError = (elementId) => {
    document.getElementById(elementId).style.display = 'none';
};

const showSuccess = (elementId) => {
    const successElement = document.getElementById(elementId);
    successElement.style.display = 'flex';
    animateForm.highlight(successElement);
};

const simulateBackendDelay = () => new Promise(resolve => setTimeout(resolve, 1500));

// Form validation functions
const validatePassword = (password) => {
    return password.length >= 6;
};

const validateName = (name) => {
    return name.trim().length >= 3;
};

// Login handling
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loader = form.querySelector('.button-loader');
    const button = form.querySelector('button');
    let isValid = true;

    // Reset previous errors
    hideError('loginEmailError');
    hideError('loginPasswordError');

    // Validation
    if (!isValidEmail(email)) {
        showError('loginEmailError');
        isValid = false;
    }

    if (!validatePassword(password)) {
        showError('loginPasswordError');
        isValid = false;
    }

    if (isValid) {
        // Show loader and disable button
        loader.style.display = 'block';
        button.disabled = true;

        try {
            // Simulate API call
            await simulateBackendDelay();

            // Store user data (replace with actual authentication in production)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Show success message
            showSuccess('loginSuccess');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            // Handle error appropriately
        } finally {
            loader.style.display = 'none';
            button.disabled = false;
        }
    }

    return false;
}

// Registration handling
async function handleRegistration(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const subject = document.getElementById('subject').value;
    const loader = form.querySelector('.button-loader');
    const button = form.querySelector('button');
    let isValid = true;

    // Reset previous errors
    hideError('nameError');
    hideError('emailError');
    hideError('passwordError');
    hideError('subjectError');

    // Validation
    if (!validateName(name)) {
        showError('nameError');
        isValid = false;
    }

    if (!isValidEmail(email)) {
        showError('emailError');
        isValid = false;
    }

    if (!validatePassword(password)) {
        showError('passwordError');
        isValid = false;
    }

    if (!subject) {
        showError('subjectError');
        isValid = false;
    }

    if (isValid) {
        // Show loader and disable button
        loader.style.display = 'block';
        button.disabled = true;

        try {
            // Simulate API call
            await simulateBackendDelay();

            // Store user data (replace with actual backend registration)
            const userData = {
                name,
                email,
                subject,
                registrationDate: new Date().toISOString()
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            showSuccess('registerSuccess');

            // Switch to login tab after delay
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            // Handle error appropriately
        } finally {
            loader.style.display = 'none';
            button.disabled = false;
        }
    }

    return false;
}

// Form auto-completion handling
window.addEventListener('load', () => {
    // Check if user was previously logged in
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// Remember me functionality
document.getElementById('rememberMe').addEventListener('change', function() {
    const email = document.getElementById('loginEmail').value;
    if (this.checked && email) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

// Prevent form submission on enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
    }
});

// Add input validation on blur
document.getElementById('loginEmail').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        showError('loginEmailError');
    } else {
        hideError('loginEmailError');
    }
});

document.getElementById('loginPassword').addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        showError('loginPasswordError');
    } else {
        hideError('loginPasswordError');
    }
});

document.getElementById('name').addEventListener('blur', function() {
    if (this.value && !validateName(this.value)) {
        showError('nameError');
    } else {
        hideError('nameError');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        showError('emailError');
    } else {
        hideError('emailError');
    }
});

document.getElementById('password').addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        showError('passwordError');
    } else {
        hideError('passwordError');
    }
});