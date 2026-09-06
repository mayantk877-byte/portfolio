/**
 * T. Mayan Portfolio - Main JavaScript Application
 * Features:
 * - Theme Switcher (Persistent Light/Dark Mode)
 * - Dynamic Typing Engine for Java Developer Profile
 * - Scroll Progress & Header Shrink
 * - IntersectionObserver Scroll Reveal
 * - Active ScrollSpy Nav Highlighting
 * - Responsive Mobile Drawer Menu
 * - Project Category Filtering (Java & SQL, ML, Web)
 * - Interactive Project Preview Modal
 * - Interactive Contact Form & Toast Notification System
 * - Click-To-Copy for Contact Details
 * - 3D Card Tilt Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Toast Notification Utility
    // ---------------------------------------------------------
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, iconClass = 'fa-solid fa-circle-check') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // ---------------------------------------------------------
    // 2. Dark / Light Theme Toggle with LocalStorage
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : (prefersDarkScheme.matches ? 'dark' : 'dark');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (theme === 'light') {
                    icon.className = 'fa-solid fa-moon';
                    themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
                } else {
                    icon.className = 'fa-solid fa-sun';
                    themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
                }
            }
        }
    }

    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const nextTheme = current === 'light' ? 'dark' : 'light';
            
            themeToggleBtn.classList.add('rotate-click');
            setTimeout(() => themeToggleBtn.classList.remove('rotate-click'), 400);

            applyTheme(nextTheme);
            showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'fa-solid fa-circle-half-stroke');
        });
    }

    // ---------------------------------------------------------
    // 3. Dynamic Typing Effect for Hero Section
    // ---------------------------------------------------------
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = [
            'Java Developer Fresher',
            'Core Java & JDBC Specialist',
            'Oracle SQL & MySQL Developer',
            'Frontend Web Developer (HTML, CSS, JS)',
            'B.E. Computer Science Graduate'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 110;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000; // Pause when word is finished
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 450; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 600);
    }

    // ---------------------------------------------------------
    // 4. Scroll Progress Bar & Header Shrink
    // ---------------------------------------------------------
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);

    const siteHeader = document.querySelector('.site-header');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';

        // Header scroll effect
        if (siteHeader) {
            if (window.scrollY > 40) {
                siteHeader.classList.add('header-scrolled');
            } else {
                siteHeader.classList.remove('header-scrolled');
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // ---------------------------------------------------------
    // 5. Scroll Reveal Animations (Intersection Observer)
    // ---------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------------------------------------------------------
    // 6. ScrollSpy Active Nav Link Indicator
    // ---------------------------------------------------------
    const sections = document.querySelectorAll('main, section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ---------------------------------------------------------
    // 7. Mobile Navigation Menu Toggle
    // ---------------------------------------------------------
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('navLinks');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('show');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('show');
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('show')) {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('show');
            }
        });
    }

    // ---------------------------------------------------------
    // 8. Project Category Filter
    // ---------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projectCard');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---------------------------------------------------------
    // 9. Project Preview Modal (Resume & Web Projects)
    // ---------------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const previewButtons = document.querySelectorAll('.preview-modal-btn');

    const projectData = {
        banking: {
            title: 'Banking Management System',
            icon: 'fa-solid fa-building-columns',
            isMockupIcon: true,
            tags: ['Core Java', 'JDBC', 'SQL', 'MySQL', 'Oracle SQL'],
            description: 'Developed a comprehensive Banking Management System using Core Java and SQL to manage customer accounts and financial transactions. Implemented key features such as account creation, deposit, withdrawal, and balance inquiry. Designed and optimized SQL queries for efficient data storage, table indexing, and fast retrieval.'
        },
        phishing: {
            title: 'Phishing Detection System',
            icon: 'fa-solid fa-shield-virus',
            isMockupIcon: true,
            tags: ['Machine Learning', 'Random Forest', 'Federated Learning', 'Cybersecurity'],
            description: 'Developed an intelligent phishing detection system using Machine Learning techniques. Implemented Random Forest classification algorithms for highly accurate URL categorization, integrated federated learning to enhance user data privacy and security, and engineered real-time alert mechanisms to detect malicious URLs.'
        },
        password: {
            title: 'Secure Password Generator Application',
            image: './Photos/Password.jpg',
            isMockupIcon: false,
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Security Algorithms', 'Clipboard API'],
            description: 'A responsive security tool that generates mathematically secure, cryptographically randomized passwords. Includes options for uppercase, lowercase, numbers, and symbols, alongside dynamic strength gauges and instant clipboard copying.'
        },
        todo: {
            title: 'Productivity ToDo & Task Manager',
            image: './Photos/Todo.jpg',
            isMockupIcon: false,
            tags: ['JavaScript', 'LocalStorage', 'DOM Manipulation', 'CSS3 UI'],
            description: 'A clean and efficient task manager application built with vanilla JavaScript. Supports full CRUD operations (create, read, update, delete), task status filtering, local storage persistence, and sleek check-off transitions.'
        },
        ecommerce: {
            title: 'Modern E-Commerce Web Storefront',
            image: './Photos/E Commerce.jpg',
            isMockupIcon: false,
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI', 'Shopping Cart'],
            description: 'A full-featured responsive online shopping platform featuring category filtering, dynamic product grids, modal quick-view, stateful shopping cart calculations, and responsive mobile-first navigation.'
        },
        weather: {
            title: 'Real-Time Meteorological Forecast App',
            image: './Photos/Weather.jpg',
            isMockupIcon: false,
            tags: ['JavaScript', 'REST Weather API', 'Async/Await', 'CSS Grid'],
            description: 'Fetches real-time worldwide weather metrics and multi-day forecasts using asynchronous API calls. Features search by city name, temperature scale conversion, wind velocity, humidity gauges, and weather condition badges.'
        }
    };

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data || !projectModal || !modalBody) return;

        let mediaHtml = '';
        if (data.isMockupIcon) {
            mediaHtml = `
                <div class="modal-preview-img banking-bg" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: #38bdf8; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
                    <i class="${data.icon}" style="font-size: 3.8rem; filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.5));"></i>
                    <span style="font-weight: 700; color: #ffffff; font-size: 1.05rem;">${data.title}</span>
                </div>
            `;
        } else {
            mediaHtml = `
                <div class="modal-preview-img">
                    <img src="${data.image}" alt="${data.title}">
                </div>
            `;
        }

        const tagsHtml = data.tags.map(t => `<span>${t}</span>`).join('');

        modalBody.innerHTML = `
            ${mediaHtml}
            <div class="modal-header">
                <h2>${data.title}</h2>
            </div>
            <div class="modal-tags">
                ${tagsHtml}
            </div>
            <p class="modal-desc">${data.description}</p>
            <div class="modal-actions">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <i class="fa-brands fa-github"></i> <span>View Code on GitHub</span>
                </a>
                <button class="btn btn-secondary btn-sm" id="modalDismissBtn">
                    <span>Close Details</span>
                </button>
            </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const dismiss = document.getElementById('modalDismissBtn');
        if (dismiss) {
            dismiss.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    previewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            if (projectId) openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ---------------------------------------------------------
    // 10. Click-To-Copy Contact Info
    // ---------------------------------------------------------
    const copyableElements = document.querySelectorAll('.copyable');
    copyableElements.forEach(el => {
        el.addEventListener('click', (e) => {
            const textToCopy = el.getAttribute('data-copy');
            if (textToCopy && navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`, 'fa-solid fa-copy');
                }).catch(() => {});
            }
        });
    });

    // ---------------------------------------------------------
    // 11. Interactive 3D Tilt Effect on Cards
    // ---------------------------------------------------------
    const tiltCards = document.querySelectorAll('.tilt-effect');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ---------------------------------------------------------
    // 12. Interactive Contact Form Submission (100% Free Lifetime Delivery)
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) {
                showToast('Please fill in all fields before sending.', 'fa-solid fa-triangle-exclamation');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHtml = submitBtn.innerHTML;

            // When opened locally via file://, open Gmail/Mail Client directly to avoid FormSubmit web server error
            if (window.location.protocol === 'file:') {
                submitBtn.innerHTML = '<i class="fa-solid fa-envelope-circle-check"></i> <span>Opening Gmail...</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                showToast('Opening Gmail directly to send message to mayan843853@gmail.com...', 'fa-solid fa-envelope');

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mayan843853@gmail.com&su=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Hi Mayan,\n\n' + message + '\n\n---\nSender Name: ' + name + '\nSender Email: ' + email)}`;
                const mailtoUrl = `mailto:mayan843853@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Hi Mayan,\n\n' + message + '\n\n---\nSender Name: ' + name + '\nSender Email: ' + email)}`;

                const win = window.open(gmailUrl, '_blank');
                if (!win || win.closed || typeof win.closed === 'undefined') {
                    window.location.href = mailtoUrl;
                }

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.style.background = '';
                }, 3000);
                return;
            }

            // When hosted on a Web Server (GitHub Pages, Vercel, Netlify, localhost)
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://formsubmit.co/ajax/mayan843853@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `New Portfolio Message from ${name} (${email})`,
                        _template: 'table',
                        _captcha: 'false'
                    })
                });

                const result = await response.json();

                if (response.ok && (result.success === 'true' || result.success === true)) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Message Sent!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    showToast('Thank you! Message sent directly to mayan843853@gmail.com', 'fa-solid fa-paper-plane');
                    contactForm.reset();
                } else {
                    throw new Error((result && result.message) || 'Delivery failed');
                }
            } catch (err) {
                console.warn('Network delivery fallback to Gmail compose:', err);
                submitBtn.innerHTML = '<i class="fa-solid fa-envelope"></i> <span>Opening Gmail...</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #0284c7, #0369a1)';
                showToast('Opening Gmail to deliver your message...', 'fa-solid fa-envelope');
                
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mayan843853@gmail.com&su=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Hi Mayan,\n\n' + message + '\n\n---\nSender Name: ' + name + '\nSender Email: ' + email)}`;
                window.open(gmailUrl, '_blank');
            } finally {
                setTimeout(() => {
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 4000);
            }
        });
    }
});
