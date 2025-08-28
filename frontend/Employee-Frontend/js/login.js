const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible', 'shake');
    
    // Remove shake animation after it completes
    setTimeout(() => {
        errorMsg.classList.remove('shake');
    }, 500);

    // Add error highlight to inputs
    usernameInput.classList.add('input-error');
    passwordInput.classList.add('input-error');
}

function clearError() {
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible', 'shake');
    usernameInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Clear any existing error
    clearError();

    // Validate inputs
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }

    // Simple hardcoded admin login (for now)
    if (username === 'admin' && password === 'admin@123') {
        // Add success animation
        loginForm.classList.add('success');
        
        // Store admin status and redirect
        localStorage.setItem('admin', 'true');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        showError('Invalid credentials. Please try again.');
        passwordInput.value = ''; // Clear password field
        passwordInput.focus(); // Focus on password field
    }
});

// Clear error when user starts typing
usernameInput.addEventListener('input', clearError);
passwordInput.addEventListener('input', clearError);
