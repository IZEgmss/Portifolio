// Variáveis globais
let isMenuOpen = false;

// Inicialização quando o DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    setupEventListeners();
    startCounterAnimation();
});

// Inicializar componentes
function initializeComponents() {
    // Adicionar classe para animações
    document.body.classList.add('loaded');
    
    // Configurar scroll suave para navegação
    setupSmoothScrolling();
    
    // Configurar header scroll effect
    setupHeaderScrollEffect();
}

// Configurar event listeners
function setupEventListeners() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Project cards hover effects
    setupProjectCards();
    
    // Scroll animations
    setupScrollAnimations();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    isMenuOpen = !isMenuOpen;
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    animateHamburger(hamburger, isMenuOpen);
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        animateHamburger(hamburger, false);
    }
}

// Animate hamburger icon
function animateHamburger(hamburger, isOpen) {
    const spans = hamburger.querySelectorAll('span');
    
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Setup project cards
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            const projectType = this.dataset.project;
            showProjectModal(projectType);
        });
    });
}

// Show project modal
function showProjectModal(projectType) {
    const projectDetails = {
        cafe: {
            title: 'Café Animado',
            description: 'Sistema completo para gerenciar lista de animes assistidos com interface nostálgica e funcionalidades de tracking.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage'],
            features: ['Lista de animes', 'Contador de episódios', 'Horas assistidas', 'Interface responsiva']
        },
        burger: {
            title: 'BurgerHub',
            description: 'Website moderno para hamburgueria artesanal com sistema de pedidos online e interface atrativa.',
            technologies: ['React', 'CSS3', 'Node.js', 'MongoDB'],
            features: ['Catálogo de produtos', 'Sistema de pedidos', 'Interface responsiva', 'Integração com pagamento']
        },
        gaming: {
            title: 'Gaming Platform',
            description: 'Plataforma interativa de jogos online com sistema de autenticação e interface gamificada.',
            technologies: ['Vue.js', 'WebGL', 'Socket.io', 'Express'],
            features: ['Jogos multiplayer', 'Sistema de login', 'Chat em tempo real', 'Ranking de jogadores']
        }
    };
    
    const project = projectDetails[projectType];
    if (project) {
        alert(`${project.title}\n\n${project.description}\n\nTecnologias: ${project.technologies.join(', ')}\n\nRecursos: ${project.features.join(', ')}`);
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function startCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000; // 2 seconds
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const increment = target / (2000 / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const subject = e.target.querySelectorAll('input[type="text"]')[1].value;
    const message = e.target.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    
    // Reset form
    e.target.reset();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#6366f1',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Scroll to section helper
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .project-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .contact-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }
        
        .contact-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize parallax and dynamic styles
document.addEventListener('DOMContentLoaded', function() {
    setupParallaxEffect();
    addDynamicStyles();
});

// Typing effect for hero title
function startTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = 'Desenvolvedor Full Stack';
    let index = 0;
    
    heroTitle.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 100);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    
    Object.assign(themeToggle.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: '#6366f1',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)'
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    const isDark = document.body.classList.contains('dark-theme');
    
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
}

// Mouse follower effect
function createMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    
    Object.assign(follower.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        background: 'rgba(99, 102, 241, 0.3)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease',
        transform: 'translate(-50%, -50%)'
    });
    
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        startTypingEffect();
        setupThemeToggle();
        createMouseFollower();
    }, 500);
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);