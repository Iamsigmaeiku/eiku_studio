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

// Form Handler with Firebase Integration
class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.submitButton = this.form?.querySelector('.form-submit');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // 防止重複提交
    if (this.submitButton.disabled) return;
    
    const originalButtonText = this.submitButton.textContent;
    this.submitButton.disabled = true;
    this.submitButton.textContent = '送出中...';

    const formData = {
      name: this.form.name.value,
      email: this.form.email.value,
      service: this.form.service.value,
      message: this.form.message.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'new'
    };

    try {
      // 檢查 Firebase 是否已初始化
      if (typeof firebase === 'undefined' || !firebase.apps.length) {
        throw new Error('Firebase 尚未初始化，請檢查 firebase-config.js');
      }

      // 存到 Firestore
      await db.collection('contacts').add(formData);
      console.log('資料已儲存到 Firestore');
      
      // 同時送到 Formspree（作為 email 通知備份）
      if (this.form.action && !this.form.action.includes('YOUR_FORM_ID')) {
        try {
          await fetch(this.form.action, {
            method: 'POST',
            body: new FormData(this.form),
            headers: { 'Accept': 'application/json' }
          });
          console.log('Email 通知已發送');
        } catch (emailError) {
          console.warn('Email 通知發送失敗（不影響資料儲存）:', emailError);
        }
      }
      
      // 成功訊息
      this.showMessage('訊息已送出！我們會盡快回覆您。', 'success');
      this.form.reset();
      
    } catch (error) {
      console.error('提交錯誤:', error);
      
      // 錯誤訊息
      let errorMsg = '送出失敗，請稍後再試';
      if (error.message.includes('Firebase')) {
        errorMsg += '（Firebase 配置問題）';
      }
      errorMsg += '，或直接 email 聯絡我們：eikustudio@gmail.com';
      
      this.showMessage(errorMsg, 'error');
    } finally {
      // 恢復按鈕
      this.submitButton.disabled = false;
      this.submitButton.textContent = originalButtonText;
    }
  }

  showMessage(message, type = 'info') {
    // 建立訊息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: ${type === 'success' ? 'var(--accent)' : '#ff6b6b'};
      color: white;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    `;
    
    // 移除舊訊息
    const oldMessage = this.form.querySelector('.form-message');
    if (oldMessage) {
      oldMessage.remove();
    }
    
    // 加入新訊息
    this.form.appendChild(messageDiv);
    
    // 3 秒後自動移除
    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
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
  
  // Form handling with Firebase
  new FormHandler();
  
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
