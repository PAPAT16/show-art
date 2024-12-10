// Menu functionality
const menuBtn = document.querySelector('.menu-btn');
const closeNav = document.querySelector('.close-nav');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.nav-links a');

function toggleMenu() {
    navigation.classList.toggle('active');
    document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : 'auto';
}

menuBtn.addEventListener('click', toggleMenu);
closeNav.addEventListener('click', toggleMenu);

// Close menu when clicking navigation links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navigation.classList.contains('active') && 
        !navigation.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Escape key closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navigation.classList.contains('active')) {
        toggleMenu();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery image loading and filtering
const gallery = document.querySelector('.gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal functionality
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');

function openModal(imageSrc, title, description) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    // Simulate form submission
    newsletterForm.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
});