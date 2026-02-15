// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }
}

// Smooth Scroll for Navigation
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const elements = document.querySelectorAll('.work-card, .about-content, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    elements.forEach(element => observer.observe(element));
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      this.header.style.padding = '1rem 0';
      this.header.style.boxShadow = '0 2px 10px var(--shadow)';
    } else {
      this.header.style.padding = '1.5rem 0';
      this.header.style.boxShadow = 'none';
    }

    this.lastScroll = currentScroll;
  }
}

// Parallax Effect for Hero
class ParallaxEffect {
  constructor() {
    this.heroContent = document.querySelector('.hero-content');
    this.init();
  }

  init() {
    if (!this.heroContent) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        this.heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        this.heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }
    });
  }
}

// Cursor Follow Effect (optional - adds modern feel)
class CursorEffect {
  constructor() {
    this.cursor = this.createCursor();
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.init();
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease;
      display: none;
    `;
    document.body.appendChild(cursor);
    return cursor;
  }

  init() {
    // Only enable on desktop
    if (window.innerWidth < 768) return;

    this.cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(1.5)';
        this.cursor.style.borderColor = 'var(--accent-hover)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursor.style.borderColor = 'var(--accent)';
      });
    });

    this.animateCursor();
  }

  animateCursor() {
    const ease = 0.15;
    this.cursorX += (this.mouseX - this.cursorX) * ease;
    this.cursorY += (this.mouseY - this.cursorY) * ease;
    
    this.cursor.style.left = `${this.cursorX}px`;
    this.cursor.style.top = `${this.cursorY}px`;
    
    requestAnimationFrame(() => this.animateCursor());
  }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Core features
  new ThemeManager();
  new SmoothScroll();
  new ScrollAnimations();
  new HeaderScroll();
  
  // Enhanced features
  new ParallaxEffect();
  new CursorEffect();
  
  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reload certain features on significant resize
    if (window.innerWidth < 768) {
      const customCursor = document.querySelector('.custom-cursor');
      if (customCursor) {
        customCursor.style.display = 'none';
      }
    }
  }, 250);
});
