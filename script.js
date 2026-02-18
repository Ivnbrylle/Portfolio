// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Form submission
    const contactForm = document.getElementById('contact-form');
    const responseMsg = document.getElementById('response-msg');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Gather the data from the inputs
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Change button state to show it's working
        const btn = document.getElementById('submit-btn');
        btn.innerText = "SENDING...";
        btn.disabled = true;

        try {
            // Send the data to AWS API Gateway
            const response = await fetch('https://y18blsqg1d.execute-api.ap-southeast-1.amazonaws.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Handle the response
            if (response.ok) {
                responseMsg.innerHTML = "Message sent successfully! I'll get back to you soon.";
                responseMsg.style.color = '#4CAF50';
                contactForm.reset();
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            console.error('Error:', error);
            responseMsg.innerHTML = "Oops! Something went wrong. Please try again.";
            responseMsg.style.color = '#f44336';
        } finally {
            btn.innerText = "SUBMIT";
            btn.disabled = false;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Reset animation when element leaves viewport
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-item, .portfolio-item, .service-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Start typing animation when page loads
    const heroName = document.querySelector('.hero-name');
    const originalText = heroName.textContent;
    setTimeout(() => {
        typeWriter(heroName, originalText, 150);
    }, 1000);

    // Parallax effect for hero section - DISABLED to fix movement issue
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const heroImage = document.querySelector('.hero-image img');
    //     if (heroImage) {
    //         heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    //     }
    // });

    // Skills animation counter (optional enhancement)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerHTML = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // AWS Projects Modal Functionality
    const projectModal = document.getElementById('project-modal');
    const deepDiveButtons = document.querySelectorAll('.btn-deep-dive');
    const modalClose = document.querySelector('.modal-close');
    const resilienceContent = document.getElementById('resilience-content');
    const janitorContent = document.getElementById('janitor-content');

    // Open modal with corresponding project content
    deepDiveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            
            // Hide all project contents
            if (resilienceContent) resilienceContent.style.display = 'none';
            if (janitorContent) janitorContent.style.display = 'none';
            
            // Show selected project content
            if (project === 'resilience' && resilienceContent) {
                resilienceContent.style.display = 'block';
            } else if (project === 'janitor' && janitorContent) {
                janitorContent.style.display = 'block';
            }
            
            // Show modal
            if (projectModal) {
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal on outside click
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Image Lightbox Functionality
    const imageLightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const architectureDiagrams = document.querySelectorAll('.architecture-diagram, .modal-diagram');

    // Open lightbox when clicking on architecture diagrams
    architectureDiagrams.forEach(diagram => {
        diagram.addEventListener('click', function(e) {
            e.stopPropagation();
            if (imageLightbox && lightboxImage) {
                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                imageLightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            imageLightbox.classList.remove('active');
            document.body.style.overflow = projectModal && projectModal.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close lightbox on outside click
    if (imageLightbox) {
        imageLightbox.addEventListener('click', function(e) {
            if (e.target === imageLightbox || e.target === lightboxImage) {
                imageLightbox.classList.remove('active');
                document.body.style.overflow = projectModal && projectModal.classList.contains('active') ? 'hidden' : '';
            }
        });
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageLightbox && imageLightbox.classList.contains('active')) {
            imageLightbox.classList.remove('active');
            document.body.style.overflow = projectModal && projectModal.classList.contains('active') ? 'hidden' : '';
        }
    });

    // Diagram overlay click handler for project cards
    const diagramOverlays = document.querySelectorAll('.diagram-overlay');
    diagramOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const diagram = this.previousElementSibling;
            if (diagram && imageLightbox && lightboxImage) {
                lightboxImage.src = diagram.src;
                lightboxImage.alt = diagram.alt;
                imageLightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// Hamburger menu animation
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    body.loaded * {
        transition: all 0.3s ease;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Certification Carousel
(function() {
    // Certifications data - Add your certifications here
    const certifications = [
        {
            certificate: 'Downloads/awssimulearn.jpg',
            name: 'AWS Simulearn: Cloud Practitioner'
        },
        {
            certificate: 'Downloads/introcyber.jpg',
            name: 'Introduction to Cybersecurity'
        },
        {
            certificate: 'Downloads/networking.jpg',
            name: 'Networking Basics'
        }
    ];
    

    // Badges data - Add your badges here (displayed in grid below certifications)
    const badges = [
        { image: 'Downloads/networkbadge.png', name: 'Network Basics' },
        { image: 'Downloads/introcyberbadge.png', name: 'Introduction to Cybersecurity' },
    ];

    const slider = document.querySelector('.cert-slider');
    const dotsContainer = document.querySelector('.cert-dots');
    const badgesGrid = document.querySelector('.badges-grid');
    const prevBtn = document.querySelector('.cert-prev');
    const nextBtn = document.querySelector('.cert-next');
    
    if (!slider || !dotsContainer || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    // Generate slides from data
    function generateSlides() {
        slider.innerHTML = certifications.map((cert, index) => `
            <div class="cert-slide ${index === 0 ? 'active' : ''}">
                <div class="cert-landscape-container">
                    <img src="${cert.certificate}" alt="${cert.name}" class="cert-landscape-image">
                    <div class="cert-glow"></div>
                </div>
                <h4 class="cert-name">${cert.name}</h4>
            </div>
        `).join('');
    }

    // Generate badges grid
    function generateBadges() {
        if (!badgesGrid) return;
        badgesGrid.innerHTML = badges.map(badge => `
            <div class="badge-item">
                <img src="${badge.image}" alt="${badge.name}" class="badge-image">
            </div>
        `).join('');
    }

    // Generate dots
    function generateDots() {
        dotsContainer.innerHTML = certifications.map((_, index) => `
            <button class="cert-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to certification ${index + 1}"></button>
        `).join('');

        // Add click listeners to dots
        dotsContainer.querySelectorAll('.cert-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
            });
        });
    }

    // Update active slide
    function updateSlide(direction) {
        const slides = slider.querySelectorAll('.cert-slide');
        const dots = dotsContainer.querySelectorAll('.cert-dot');
        
        // Remove active class and add prev class for exit animation
        slides[currentIndex].classList.remove('active');
        if (direction === 'next') {
            slides[currentIndex].classList.add('prev');
        }
        dots[currentIndex].classList.remove('active');

        // Update index
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % certifications.length;
        } else {
            currentIndex = (currentIndex - 1 + certifications.length) % certifications.length;
        }

        // Clean up prev class from all slides
        setTimeout(() => {
            slides.forEach(slide => slide.classList.remove('prev'));
        }, 500);

        // Add active class to new slide
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index === currentIndex) return;
        
        const slides = slider.querySelectorAll('.cert-slide');
        const dots = dotsContainer.querySelectorAll('.cert-dot');
        
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Event listeners
    prevBtn.addEventListener('click', () => updateSlide('prev'));
    nextBtn.addEventListener('click', () => updateSlide('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const certSection = document.querySelector('.certifications-section');
        if (!certSection) return;
        
        const rect = certSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                updateSlide('prev');
            } else if (e.key === 'ArrowRight') {
                updateSlide('next');
            }
        }
    });

    // Initialize
    generateSlides();
    generateDots();
    generateBadges();
})();
