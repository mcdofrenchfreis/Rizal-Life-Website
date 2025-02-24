document.addEventListener('DOMContentLoaded', function() {
    // Load the navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').insertAdjacentHTML('afterend', data);
            setTimeout(initializeNavbar, 100); // Add small delay to ensure DOM is updated
        })
        .catch(error => console.error('Error loading navbar:', error));
});

function initializeNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinksElement = document.getElementById('navLinks');
    let isMenuOpen = false;

    if (!hamburger || !navLinksElement) {
        console.error('Navbar elements not found');
        return;
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('open');
        navLinksElement.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Hamburger click event
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinksElement.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !hamburger.contains(e.target) && !navLinksElement.contains(e.target)) {
            toggleMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

let lastScrollTop = 0;
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const scrollThreshold = 3; // Minimum scroll amount before hiding header

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        // Scrolling down
        header.classList.add('scroll-hidden');
        hamburger.classList.add('scroll-visible');
    } else {
        // Scrolling up
        header.classList.remove('scroll-hidden');
        hamburger.classList.remove('scroll-visible');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);