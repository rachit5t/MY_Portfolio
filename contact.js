// Contact Form Handling with WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Format message for WhatsApp
            const whatsappMessage = formatWhatsAppMessage(name, email, subject, message);
            
            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/9779704080664?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show confirmation before opening WhatsApp
            if (confirm('Ready to send message via WhatsApp? Click OK to open WhatsApp.')) {
                window.open(whatsappUrl, '_blank');
                
                // Show success notification
                showNotification('WhatsApp opened! Your message is ready to send.', 'success');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Format message for WhatsApp
    function formatWhatsAppMessage(name, email, subject, message) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const formattedMessage = `*New Project Inquiry* 📧

*From:* ${name}
*Email:* ${email}
*Date:* ${currentDate}

*Subject:* ${subject}

*Message:*
${message}

---
*Sent from Rachit Dhakal's Portfolio Website*
*Web Developer & Digital Marketer*
*Pokhara, Nepal* 🇳🇵`;

        return formattedMessage;
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accentColor)' : 'var(--nepaliRed)'};
            color: var(--tertiaryColor);
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
    
    // Social media links
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the link work normally since we have real URLs now
            // Just add a small delay for better UX
            setTimeout(() => {
                // Link will open in new tab as specified in HTML
            }, 100);
        });
    });
    
    // Add WhatsApp quick contact button
    const quickWhatsAppBtn = document.createElement('div');
    quickWhatsAppBtn.className = 'quick-whatsapp-btn';
    quickWhatsAppBtn.innerHTML = `
        <a href="https://wa.me/9779704080664?text=Hi%20Rachit!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank">
            <span class="whatsapp-icon">💬</span>
            <span class="whatsapp-text">Quick Chat</span>
        </a>
    `;
    document.body.appendChild(quickWhatsAppBtn);
});

// Focus on name field if consultation anchor is present
document.addEventListener('DOMContentLoaded', function() {
    // Check if URL has consultation anchor
    if (window.location.hash === '#consultation') {
        // Focus on name field after a short delay
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) {
                nameField.focus();
            }
        }, 500);
        
        // Scroll to consultation section
        const consultationSection = document.getElementById('consultation');
        if (consultationSection) {
            consultationSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Show consultation info if coming from magical button
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('consultation') === 'true') {
        const consultationInfo = document.querySelector('.consultation-info');
        if (consultationInfo) {
            consultationInfo.style.display = 'block';
        }
    }
});

// Add some CSS for form animations and WhatsApp button
const style = document.createElement('style');
style.textContent = `
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        color: var(--nepaliRed);
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
    
    .form-subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        color: var(--textSecondary);
        margin-bottom: 25px;
        text-align: center;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .notification-message {
        flex: 1;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--tertiaryColor);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .quick-whatsapp-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    }
    
    .quick-whatsapp-btn a {
        display: flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        padding: 15px 20px;
        border-radius: 50px;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.3);
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    }
    
    .quick-whatsapp-btn a:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(37, 211, 102, 0.4);
        animation: none;
    }
    
    .whatsapp-icon {
        font-size: 1.5rem;
    }
    
    .whatsapp-text {
        display: none;
    }
    
    .quick-whatsapp-btn:hover .whatsapp-text {
        display: inline;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @media (max-width: 480px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .quick-whatsapp-btn {
            bottom: 20px;
            right: 20px;
        }
        
        .quick-whatsapp-btn a {
            padding: 12px 16px;
            font-size: 0.9rem;
        }
        
        .whatsapp-text {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
