// Event data
const eventData = {
    'coding-championship': {
        title: 'Coding Championship',
        icon: '💻',
        description: 'Join us for an exciting coding championship where participants will face algorithm challenges, data structure problems, and real-world programming scenarios. Test your skills against the best coders and win amazing prizes.',
        schedule: '10:00 AM - 4:00 PM',
        venue: 'Computer Lab A'
    },
    'innovation-workshop': {
        title: 'Innovation Workshop',
        icon: '🚀',
        description: 'Hands-on workshop covering the latest trends in technology including AI, machine learning, blockchain, and emerging frameworks. Industry experts will guide you through practical sessions.',
        schedule: '9:00 AM - 12:00 PM',
        venue: 'Workshop Hall'
    },
    'tech-talks': {
        title: 'Tech Talks',
        icon: '🎤',
        description: 'Keynote presentations from leading technology professionals sharing insights about industry trends, career guidance, and breakthrough innovations shaping the future.',
        schedule: '2:00 PM - 5:00 PM',
        venue: 'Main Auditorium'
    },
    'project-showcase': {
        title: 'Project Showcase',
        icon: '🏆',
        description: 'Showcase your innovative projects to a panel of judges and peers. Categories include web development, mobile apps, AI/ML projects, and hardware innovations. Winners receive cash prizes and internship opportunities.',
        schedule: '11:00 AM - 3:00 PM',
        venue: 'Exhibition Hall'
    }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCountdown();
    initScrollAnimations();
    initLoadingAnimations();
    initEventModals();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 12, 16, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 117, 24, 0.3)';
        } else {
            navbar.style.background = 'rgba(11, 12, 16, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Countdown Timer functionality
function initCountdown() {
    // Set target date to Halloween 2025
    const targetDate = new Date('October 31, 2025 00:00:00').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM elements with zero padding
        if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

        // Add glow effect on second change
        if (secondsElement) {
            secondsElement.style.textShadow = '0 0 30px #FF7518';
            setTimeout(() => {
                if (secondsElement) {
                    secondsElement.style.textShadow = '0 0 20px rgba(255, 117, 24, 0.6)';
                }
            }, 100);
        }

        // If countdown reaches zero
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.textContent = '000';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            // Show event started message
            const countdownText = document.querySelector('.countdown-text');
            if (countdownText) {
                countdownText.textContent = '🎃 The dark magic has begun! Welcome to Nexora 2025! 🦇';
                countdownText.style.color = '#FF7518';
                countdownText.style.textShadow = '0 0 20px rgba(255, 117, 24, 0.6)';
            }
        }
    }, 1000);

    // Initial call to avoid delay
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElement) daysElement.textContent = String(days).padStart(3, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
}

// Event Modal functionality
function initEventModals() {
    // Close modal when clicking outside
    const modal = document.getElementById('eventModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeEventModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEventModal();
        }
    });
}

// Open event detail modal
function openEventDetail(eventSlug) {
    const event = eventData[eventSlug];
    if (!event) return;

    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalEventTitle');
    const modalIcon = document.getElementById('modalEventIcon');
    const modalDescription = document.getElementById('modalEventDescription');
    const modalSchedule = document.getElementById('modalEventSchedule');
    const modalVenue = document.getElementById('modalEventVenue');

    // Populate modal content
    if (modalTitle) modalTitle.textContent = event.title;
    if (modalIcon) modalIcon.textContent = event.icon;
    if (modalDescription) modalDescription.textContent = event.description;
    if (modalSchedule) modalSchedule.textContent = event.schedule;
    if (modalVenue) modalVenue.textContent = event.venue;

    // Show modal
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8) translateY(-50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease-out';
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
            }, 10);
        }
    }
}

// Close event detail modal
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Add exit animation
        if (modalContent) {
            modalContent.style.transition = 'all 0.2s ease-in';
            modalContent.style.transform = 'scale(0.8) translateY(50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
                modalContent.style.transition = '';
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
            }, 200);
        } else {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
}

// Scroll animations
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add staggered animation for event cards
                if (entry.target.classList.contains('events-grid')) {
                    const cards = entry.target.querySelectorAll('.event-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.about-content, .events-grid, .registration-container, .hero-countdown, .footer-content');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for floating bats
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const bats = document.querySelectorAll('.bat');
        
        bats.forEach((bat, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            bat.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after a short delay
    setTimeout(() => {
        document.body.classList.remove('loading');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-countdown, .hero-graphics, .cta-button');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200);
        });
    }, 500);
}

// Additional interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover sound effect simulation (visual feedback)
    const buttons = document.querySelectorAll('.glow-button, .cta-button, .demo-register-btn, .learn-more-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced card hover effects
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add random floating animation to event icon
            const icon = this.querySelector('.event-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.5s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
            
            // Add glow effect to border
            this.style.boxShadow = '0 20px 40px rgba(255, 117, 24, 0.3), 0 0 30px rgba(255, 117, 24, 0.2)';
            this.style.borderColor = '#FF7518';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '#FF7518';
        });
    });

    // Spooky text glow effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const glowIntensity = Math.sin(scrollPercent * Math.PI * 4) * 0.5 + 0.5;
        
        const glowTexts = document.querySelectorAll('.glow-text');
        glowTexts.forEach(text => {
            const baseGlow = 'rgba(255, 117, 24, 0.6)';
            const intensifiedGlow = `rgba(255, 117, 24, ${0.6 + glowIntensity * 0.4})`;
            text.style.textShadow = `
                0 0 5px ${intensifiedGlow},
                0 0 10px ${intensifiedGlow},
                0 0 20px ${intensifiedGlow},
                0 0 40px ${intensifiedGlow}
            `;
        });
    });

    // Dynamic bat animation on user interaction
    document.addEventListener('click', function(e) {
        // Don't create click effects on modal interactions
        if (e.target.closest('.modal')) return;
        
        createClickEffect(e.clientX, e.clientY);
    });

    function createClickEffect(x, y) {
        const bat = document.createElement('div');
        bat.innerHTML = '🦇';
        bat.style.position = 'fixed';
        bat.style.left = x + 'px';
        bat.style.top = y + 'px';
        bat.style.fontSize = '24px';
        bat.style.pointerEvents = 'none';
        bat.style.zIndex = '9999';
        bat.style.animation = 'clickBat 2s ease-out forwards';
        
        document.body.appendChild(bat);
        
        setTimeout(() => {
            bat.remove();
        }, 2000);
    }

    // Add CSS for click bat animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickBat {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-100px, -100px) rotate(360deg) scale(0.5);
            }
        }
        
        .loading .hero-title,
        .loading .hero-subtitle,
        .loading .hero-tagline,
        .loading .hero-countdown,
        .loading .hero-graphics,
        .loading .cta-button {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);

    // Random spooky quotes that appear on scroll
    const spookyQuotes = [
        "Innovation lurks in the shadows... 🌙",
        "Code with the spirits of the night... 👻",
        "Technology born from dark magic... 🔮",
        "Where algorithms meet the supernatural... ⚡",
        "Debugging demons since 2025... 🕷️"
    ];

    let lastQuoteScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Show random quote every 500px of scrolling
        if (currentScroll - lastQuoteScroll > 500) {
            showSpookyQuote();
            lastQuoteScroll = currentScroll;
        }
    });

    function showSpookyQuote() {
        const quote = spookyQuotes[Math.floor(Math.random() * spookyQuotes.length)];
        const quoteElement = document.createElement('div');
        
        quoteElement.innerHTML = quote;
        quoteElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(11, 12, 16, 0.95);
            color: #FF7518;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FF7518;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            z-index: 10000;
            animation: spookyQuoteAnim 3s ease-in-out forwards;
            pointer-events: none;
            text-shadow: 0 0 20px rgba(255, 117, 24, 0.6);
            box-shadow: 0 0 30px rgba(255, 117, 24, 0.3);
        `;
        
        document.body.appendChild(quoteElement);
        
        setTimeout(() => {
            quoteElement.remove();
        }, 3000);
    }

    // Add spooky quote animation CSS
    const quoteStyle = document.createElement('style');
    quoteStyle.textContent = `
        @keyframes spookyQuoteAnim {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8) rotate(10deg);
            }
        }
    `;
    document.head.appendChild(quoteStyle);

    // Logo placeholder error handling
    const logos = document.querySelectorAll('.nav-logo');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Create placeholder for missing logo
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                height: 40px;
                width: 80px;
                background: var(--color-surface);
                border: 2px solid var(--halloween-orange);
                border-radius: var(--radius-sm);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: var(--halloween-orange);
                text-align: center;
                padding: 4px;
            `;
            placeholder.textContent = this.alt || 'Logo';
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
});

// Error handling for countdown
window.addEventListener('error', function(e) {
    console.warn('Non-critical error caught:', e.message);
    // Continue execution for non-critical errors
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Existing scroll handlers here
}, 16); // ~60fps

// Console easter egg
console.log(`
🎃 Welcome to Nexora 2025! 🦇
    
    ██╗  ██╗██████╗ ██████╗ ██████╗ ██╗   ██╗    ██╗  ██╗ █████╗ ██╗     ██╗      ██████╗ ██╗    ██╗███████╗███████╗███╗   ██╗
    ██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██║  ██║██╔══██╗██║     ██║     ██╔═══██╗██║    ██║██╔════╝██╔════╝████╗  ██║
    ███████║██████╔╝██████╔╝██████╔╝ ╚████╔╝     ███████║███████║██║     ██║     ██║   ██║██║ █╗ ██║█████╗  █████╗  ██╔██╗ ██║
    ██╔══██║██╔═══╝ ██╔═══╝ ██╔══██╗  ╚██╔╝      ██╔══██║██╔══██║██║     ██║     ██║   ██║██║███╗██║██╔══╝  ██╔══╝  ██║╚██╗██║
    ██║  ██║██║     ██║     ██║  ██║   ██║       ██║  ██║██║  ██║███████╗███████╗╚██████╔╝╚███╔███╔╝███████╗███████╗██║ ╚████║
    ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═══╝
    
🕸️ Thanks for inspecting the code! May your debugging be spook-free! 👻
Updated for Nexora 2025 with enhanced event modals and integrated countdown! 🎃
`);

// Make functions globally available
window.openEventDetail = openEventDetail;
window.closeEventModal = closeEventModal;