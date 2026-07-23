// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (in production, send to backend)
        showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', { name, email, phone, subject, service, message });
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

console.log('Contact form loaded');
