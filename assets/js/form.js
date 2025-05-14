document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const timeCounter = document.getElementById('timeCounter');
    const confirmation = document.getElementById('confirmation');
    
    let startTime;
    let timerInterval;
    let isFormStarted = false;

    // Initialize confirmation message styling
    confirmation.style.position = 'fixed';
    confirmation.style.top = '50%';
    confirmation.style.left = '50%';
    confirmation.style.transform = 'translate(-50%, -50%)';
    confirmation.style.zIndex = '1000';
    confirmation.style.padding = '2rem';
    confirmation.style.backgroundColor = '#d4edda';
    confirmation.style.color = '#155724';
    confirmation.style.borderRadius = '8px';
    confirmation.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    confirmation.style.textAlign = 'center';
    confirmation.style.display = 'none'; // Start hidden

    // Track form interaction time
    form.addEventListener('focusin', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if (!isFormStarted) {
                startTime = new Date();
                timerInterval = setInterval(updateTimer, 1000);
                isFormStarted = true;
            }
        }
    });

    function updateTimer() {
        const currentTime = new Date();
        const seconds = Math.floor((currentTime - startTime) / 1000);
        timeCounter.textContent = seconds;
    }

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any previous errors
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Stop the timer
            clearInterval(timerInterval);
            
            // Show confirmation
            confirmation.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Reset timer display
            timeCounter.textContent = '0';
            isFormStarted = false;
            
            // Hide confirmation after 5 seconds
            setTimeout(() => {
                confirmation.style.display = 'none';
            }, 5000);
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
            showError(nameInput, 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
            showError(messageInput, 'Please enter a message with at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        input.classList.add('error');
        errorMessage.textContent = message;
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
});