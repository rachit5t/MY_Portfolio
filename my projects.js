// Project link handling
function openLink(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

// Add modern interactions to project cards
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project card interactions
    projectCards.forEach(card => {
        // Add click handler for project cards
        card.addEventListener('click', function() {
            const link = this.querySelector('a[href]');
            if (link) {
                openLink(link.href);
            }
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Featured project interactions
    const featuredImage = document.querySelector('.featured-image');
    if (featuredImage) {
        featuredImage.addEventListener('click', function() {
            const link = document.querySelector('.btn-primary');
            if (link) {
                openLink(link.href);
            }
        });
    }
    
    // Overlay button interactions
    const overlayButtons = document.querySelectorAll('.overlay-btn');
    overlayButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.project-card');
            const projectTitle = card.querySelector('h3').textContent;
            
            // Show project details modal or navigate
            showProjectDetails(projectTitle);
        });
    });
    
    // Add smooth scrolling for navigation
    const navLinks = document.querySelectorAll('#navBar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Close navigation if open
                const nav = document.getElementById('nav');
                const mainContent = document.getElementById('mainContent');
                const navBar = document.getElementById('navBar');
                const borderBright = document.getElementById('borderBright');
                
                if (nav.classList.contains('activee')) {
                    nav.classList.remove('activee');
                    mainContent.classList.remove('mainRotate');
                    document.querySelector("html").style.overflow = "visible";
                    navBar.classList.add("navOff");
                    borderBright.classList.remove("activeBorder");
                }
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards and sections
    const animatedElements = document.querySelectorAll('.project-card, .featured-project, .cta-section');
    animatedElements.forEach((element, i) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px) scale(0.85) rotate(-6deg)';
        element.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        element.style.willChange = 'opacity, transform';
        observer.observe(element);
        // Add staggered delay
        element.dataset.stagger = i * 120;
    });

    // Enhanced observer for fancy animation
    const fancyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                }, Number(el.dataset.stagger) || 0);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => fancyObserver.observe(el));
    
    // Add loading animation for project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Simulate image loading
        setTimeout(() => {
            img.style.opacity = '1';
        }, Math.random() * 1000);
    });
    
    // Project status styling
    const projectStatuses = document.querySelectorAll('.project-status');
    projectStatuses.forEach(status => {
        const text = status.textContent.toLowerCase();
        if (text.includes('completed')) {
            status.style.background = 'rgba(16, 185, 129, 0.1)';
            status.style.color = '#10b981';
            status.style.border = '1px solid rgba(16, 185, 129, 0.2)';
        } else if (text.includes('ongoing')) {
            status.style.background = 'rgba(245, 158, 11, 0.1)';
            status.style.color = '#f59e0b';
            status.style.border = '1px solid rgba(245, 158, 11, 0.2)';
        }
    });
});

// Show project details (placeholder function)
function showProjectDetails(projectTitle) {
    // Create a simple modal or alert for now
    // You can enhance this with a proper modal system
    alert(`Project Details: ${projectTitle}\n\nThis is a placeholder for project details. You can implement a proper modal system here.`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card {
        animation: fadeIn 0.5s ease;
    }
    
    .tab-btn {
        position: relative;
        overflow: hidden;
    }
    
    .tab-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .tab-btn:hover::before {
        left: 100%;
    }
    
    .featured-project {
        position: relative;
        overflow: hidden;
    }
    
    .featured-project::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(220, 20, 60, 0.05), transparent);
        transform: rotate(45deg);
        animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
        0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
        }
    }
    
    .project-image {
        position: relative;
    }
    
    .project-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent, rgba(0, 0, 0, 0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .project-card:hover .project-image::after {
        opacity: 1;
    }
    
    .tech-tag {
        position: relative;
        overflow: hidden;
    }
    
    .tech-tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .tech-tag:hover::before {
        left: 100%;
    }

    @keyframes fancyFadeIn {
        0% {
            opacity: 0;
            transform: translateY(60px) scale(0.85) rotate(-6deg);
        }
        40% {
            opacity: 0.7;
            transform: translateY(-10px) scale(1.05) rotate(2deg);
        }
        70% {
            opacity: 1;
            transform: translateY(5px) scale(0.98) rotate(-2deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
    }
    .project-card, .featured-project, .cta-section {
        animation: fancyFadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);