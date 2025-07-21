document.addEventListener('DOMContentLoaded', function() {
    // Set CSS variable for better mobile height handling
    function setVhProperty() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Call on initial load and resize
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    
    // Mobile menu toggle functionality
    const mobileMenuToggleButtons = document.querySelectorAll('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mobileMenuToggleButtons.forEach(btn => {
                btn.classList.toggle('active');
            });
            document.body.classList.toggle('nav-open');
            
            // Prevent body scrolling when menu is open
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking a nav link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                mobileMenuToggleButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                document.body.style.overflow = '';
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Add gallery items dynamically
    const galleryGrid = document.querySelector('.gallery-grid');
    // Add additional gallery items programmatically
    const galleryItems = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Girl with a Pearl Earring',
            artist: 'Johannes Vermeer',
            category: 'classical'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Starry Night',
            artist: 'Vincent van Gogh',
            category: 'classical'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1615639164213-aec83a265dd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Birth of Venus',
            artist: 'Sandro Botticelli',
            category: 'classical'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Modern Composition',
            artist: 'Contemporary Artist',
            category: 'contemporary'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Abstract Harmony',
            artist: 'Modern Artist',
            category: 'abstract'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'The Last Supper',
            artist: 'Leonardo da Vinci',
            category: 'classical'
        }
    ];
    
    if (galleryGrid) {
        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            
            galleryItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.artist}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Handle section visibility and navigation active states for both desktop and mobile
    function handleNavigation() {
        const sections = document.querySelectorAll('.slide, .section');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        function setActiveLink() {
            let fromTop = window.scrollY + 100;
            
            // Get all section positions
            sections.forEach((section, i) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                // Calculate proper offset considering fixed elements
                let offset = 0;
                
                if (window.innerWidth <= 992) {
                    // For mobile, consider the height of the fixed header
                    offset = 60; // mobile header height
                }
                
                // Adjust the scroll position with the offset
                const scrollPosition = fromTop - offset;
                
                // If the section is currently in view
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const id = section.getAttribute('id');
                    
                    // Update desktop nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Update mobile nav links
                    mobileNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // Throttle scroll events for better performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    setActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Set active link on initial load
        setActiveLink();
        
        // Handle clicks on desktop nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and add to clicked link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Get target section
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    // Calculate position
                    const targetPosition = target.offsetTop;
                    let offset = 0;
                    
                    if (window.innerWidth <= 992) {
                        offset = 60; // mobile header height
                    }
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetPosition - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle clicks on mobile nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and add to clicked link
                mobileNavLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Get target section
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    // Calculate position
                    const targetPosition = target.offsetTop;
                    let offset = 60; // mobile header height
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetPosition - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Initialize navigation
    handleNavigation();

    // Filter gallery items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems2 = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery
            galleryItems2.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

    // Navigation arrows functionality
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // For demonstration, we'll just toggle back to main from sections
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Previous exhibition would be shown here');
        });
        
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Next exhibition would be shown here');
});
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
            alert('Your message has been sent! (This is a simulation)');
            this.reset();
        });
    }
});

// Handle resize for mobile navigation
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.style.height = 'auto';
    } else {
        sidebar.style.height = '100vh';
    }
});

// Update gallery filtering for new gallery structure
document.addEventListener('DOMContentLoaded', function() {
    // Add "sculpture" category to gallery items
    const additionalSculptureItems = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Abstract Form',
            artist: 'Contemporary Sculptor',
            category: 'sculpture'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1610824224972-db9878a2fe2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Marble Elegance',
            artist: 'Classical Sculptor',
            category: 'sculpture'
        }
    ];
    
    // Add sculpture items to gallery if gallery grid exists
    if (galleryGrid) {
        additionalSculptureItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            
            galleryItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.artist}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Pagination for gallery
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    if (paginationButtons.length) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // In a real implementation, this would load different gallery items
                alert(`Page ${this.textContent} would be loaded here`);
            });
        });
    }
    
    // Update timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        timelineItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }
});

// Mobile navigation functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.nav-links a');
if (mobileNavLinks.length) {
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
}

// Handle viewport height issues on mobile
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Update viewport height on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Animate sections on scroll - improved version
function animateSections() {
    const sections = document.querySelectorAll('.section');
    
    // Add animate class to all sections first
    sections.forEach(section => {
        section.classList.add('animate');
    });
    
    // Create the intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Add 'visible' class when section is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        // Options
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Slightly adjust when the animation triggers
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize section animations with a slight delay
    setTimeout(() => {
        animateSections();
    }, 100);
    
    // Make the home section visible immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.opacity = 1;
    }
    
    // Add click handler to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Scroll to the about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                // Calculate proper offset
                let offset = 0;
                const sidebar = document.querySelector('.sidebar');
                
                if (window.innerWidth <= 992) {
                    offset = sidebar.offsetHeight;
                }
                
                // Scroll to the section with proper offset
                const sectionTop = aboutSection.getBoundingClientRect().top;
                const offsetPosition = sectionTop + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

    // Close navigation when clicking outside of it on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('active') && 
            !e.target.closest('.sidebar') && 
            !e.target.closest('.mobile-menu-toggle')) {
            sidebar.classList.remove('active');
            mobileMenuToggleButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            document.body.style.overflow = '';
            document.body.classList.remove('nav-open');
        }
    });

    // Add swipe detection for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 100; // Minimum distance required for a swipe
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right, open menu if closed
            if (window.innerWidth <= 992 && !sidebar.classList.contains('active')) {
                sidebar.classList.add('active');
                mobileMenuToggleButtons.forEach(btn => {
                    btn.classList.add('active');
                });
                document.body.style.overflow = 'hidden';
                document.body.classList.add('nav-open');
            }
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left, close menu if open
            if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mobileMenuToggleButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                document.body.style.overflow = '';
                document.body.classList.remove('nav-open');
            }
        }
    }
    
    // Lazy load images for better mobile performance
    function lazyLoadImages() {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('fade-in');
                        observer.unobserve(img);
                    }
                }
            });
        }, { rootMargin: "50px 0px", threshold: 0.1 });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    // Convert normal images to lazy loaded
    function setupLazyImages() {
        const images = document.querySelectorAll('img:not([data-src])');
        images.forEach(img => {
            // Skip images that are already set up
            if (img.classList.contains('fade-in') || !img.src) return;
            
            // Set data-src attribute and placeholder
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            img.classList.add('lazy');
        });
        lazyLoadImages();
    }
    
    // Initialize lazy loading
    setupLazyImages();