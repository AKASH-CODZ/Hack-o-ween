// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCountdown();
    initScrollAnimations();
    initLoadingAnimations();
    initEventDetails();
    initInteractiveEffects();
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

// Event details functionality
function initEventDetails() {
    const eventDetails = {
        'coding-championship': {
            title: 'Coding Championship',
            icon: '💻',
            description: 'Compete in thrilling coding challenges and showcase your programming prowess in this spine-chilling competition.',
            details: [
                '🕐 Duration: 4 hours of intense coding',
                '🏆 Prizes: Cash rewards and exclusive swag',
                '📝 Languages: Python, Java, C++, JavaScript',
                '🎯 Difficulty: Beginner to Advanced levels'
            ],
            requirements: 'Bring your laptop and coding skills. All skill levels welcome!'
        },
        'innovation-workshop': {
            title: 'Innovation Workshop',
            icon: '🚀',
            description: 'Learn cutting-edge technologies and innovative development practices from industry experts.',
            details: [
                '🕑 Duration: 2-day intensive workshop',
                '🔧 Topics: AI/ML, Web3, Cloud Computing',
                '👨‍💻 Mentors: Industry professionals',
                '📜 Certificate: Completion certificate provided'
            ],
            requirements: 'Basic programming knowledge recommended.'
        },
        'tech-talks': {
            title: 'Tech Talks',
            icon: '🎤',
            description: 'Inspiring presentations from industry experts and thought leaders.',
            details: [
                '🕒 Duration: Full day keynote sessions',
                '🎙️ Speakers: Tech industry leaders',
                '📊 Topics: Future of tech, startup insights',
                '🤝 Networking: Meet industry professionals'
            ],
            requirements: 'Open to all attendees.'
        },
        'project-showcase': {
            title: 'Project Showcase',
            icon: '🏆',
            description: 'Present your innovative projects and compete for exciting prizes.',
            details: [
                '🕓 Duration: 3 hours presentation time',
                '🏅 Categories: Web, Mobile, AI/ML, Hardware',
                '💰 Prizes: Up to $5000 in total prizes',
                '👥 Team size: 1-4 members per team'
            ],
            requirements: 'Original project required. All technologies welcome.'
        }
    };

    window.showEventDetails = function(eventSlug) {
        const event = eventDetails[eventSlug];
        if (!event) return;

        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeEventModal()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"><span class="modal-icon">${event.icon}</span> ${event.title}</h2>
                    <button class="modal-close" onclick="closeEventModal()">✕</button>
                </div>
                <div class="modal-body">
                    <p class="modal-description">${event.description}</p>
                    <div class="modal-details">
                        <h3>Event Details:</h3>
                        <ul class="details-list">${event.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
                        <div class="requirements">
                            <h4>Requirements:</h4>
                            <p>${event.requirements}</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-register" onclick="document.getElementById('registration').scrollIntoView({behavior: 'smooth'}); closeEventModal();">Register Now 🎃</button>
                        <button class="btn-close" onclick="closeEventModal()">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalStyles = `
            .event-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center; animation: modalFadeIn 0.3s ease-out; }
            .modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); }
            .modal-content { background: var(--halloween-black); border: 2px solid var(--halloween-orange); border-radius: var(--radius-lg); max-width: 600px; max-height: 80vh; overflow-y: auto; position: relative; margin: 16px; box-shadow: 0 20px 60px rgba(255, 117, 24, 0.3); }
            .modal-header { padding: 24px; border-bottom: 2px solid var(--halloween-orange); display: flex; justify-content: space-between; align-items: center; }
            .modal-title { color: var(--halloween-orange); font-family: 'Creepster', cursive; font-size: 32px; margin: 0; display: flex; align-items: center; gap: 12px; }
            .modal-icon { font-size: 48px; }
            .modal-close { background: none; border: none; color: var(--halloween-orange); font-size: 32px; cursor: pointer; transition: all 0.2s; }
            .modal-close:hover { transform: scale(1.1); }
            .modal-body { padding: 24px; }
            .modal-description { font-size: 18px; margin-bottom: 24px; }
            .modal-details h3 { color: var(--halloween-orange); margin-bottom: 16px; }
            .details-list { list-style: none; padding: 0; margin-bottom: 24px; }
            .details-list li { padding: 8px 0; border-bottom: 1px solid var(--color-border); }
            .requirements h4 { color: var(--halloween-purple); margin-bottom: 8px; }
            .requirements p { background: var(--color-bg-3); padding: 16px; border-radius: 8px; border-left: 4px solid var(--halloween-purple); }
            .modal-actions { display: flex; gap: 16px; justify-content: center; margin-top: 32px; }
            .btn-register, .btn-close { border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
            .btn-register { background: linear-gradient(45deg, var(--halloween-orange), var(--halloween-purple)); color: white; }
            .btn-register:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 117, 24, 0.3); }
            .btn-close { background: var(--color-secondary); color: var(--color-text); }
            .btn-close:hover { background: var(--color-secondary-hover); }
            @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        `;
        if (!document.getElementById('modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }
        document.body.style.overflow = 'hidden';
    };

    window.closeEventModal = function() {
        const modal = document.querySelector('.event-modal');
        if (modal) {
            modal.style.animation = 'modalFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    };

    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `@keyframes modalFadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9); } }`;
    document.head.appendChild(fadeOutStyle);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEventModal();
        }
    });
}


// Countdown Timer functionality
function initCountdown() {
    const targetDate = new Date('October 31, 2025 23:59:59').getTime();
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const countdownInterval = setInterval(function() {
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

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownText = document.querySelector('.countdown-text');
            if (countdownText) {
                countdownText.textContent = '🎃 The dark magic has begun! Welcome to Hack-o-ween \'25! 🦇';
            }
        }
    }, 1000);
}

// Scroll and Loading Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-content, .events-grid, .registration-container, .footer-content').forEach(el => observer.observe(el));
}

function initLoadingAnimations() {
    setTimeout(() => {
        // Only target elements within hero-content for animation, excluding the new top-left logos
        document.querySelectorAll('.hero-title, .hero-tagline, .hero-countdown, .hero-graphics, .cta-button').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 200);
        });
        // Separately animate the top-left logos if desired, or let them appear instantly
        document.querySelectorAll('.hero-logos-top-left .bordered-logo').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, (index + 2) * 200); // Start animating after main hero content
        });
    }, 300);
}

// Interactive Effects and Spooky Quotes
function initInteractiveEffects() {
    // Spooky Quotes Logic
    const spookyQuotes = [
        "Innovation lurks in the shadows... 🌙",
        "Code with the spirits of the night... 👻",
        "Technology born from dark magic... 🔮",
        "Where algorithms meet the supernatural... ⚡",
        "Debugging demons since 2025... 🕷️"
    ];
    let isQuoteVisible = false;
    let lastQuoteScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        // Adjusted scroll distance for quote to be less frequent if preferred, can be changed
        if (currentScroll - lastQuoteScroll > 800 && !isQuoteVisible) { 
            showSpookyQuote();
            lastQuoteScroll = currentScroll;
        }
    });

    function showSpookyQuote() {
        isQuoteVisible = true;
        const quote = spookyQuotes[Math.floor(Math.random() * spookyQuotes.length)];
        const quoteElement = document.createElement('div');
        quoteElement.className = 'spooky-quote';
        quoteElement.innerHTML = quote;
        document.body.appendChild(quoteElement);

        const quoteStyles = `
            .spooky-quote { 
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: rgba(11, 12, 16, 0.95); color: #FF7518; padding: 20px; 
                border-radius: 10px; border: 2px solid #FF7518; font-size: 18px; 
                font-weight: bold; text-align: center; z-index: 10000; 
                animation: spookyQuoteAnim 3s ease-in-out forwards;
                text-shadow: 0 0 20px rgba(255, 117, 24, 0.6);
                box-shadow: 0 0 30px rgba(255, 117, 24, 0.3);
            }
            @keyframes spookyQuoteAnim {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        // Only add styles once
        if (!document.getElementById('spooky-quote-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'spooky-quote-styles';
            styleEl.textContent = quoteStyles;
            document.head.appendChild(styleEl);
        }

        setTimeout(() => {
            quoteElement.remove();
            isQuoteVisible = false;
        }, 3000); // Quote remains visible for 3 seconds
    }
}