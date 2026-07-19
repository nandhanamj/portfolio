// Select the main UI elements used throughout the page.
const loadingScreen = document.querySelector('.loading-screen');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const backToTop = document.getElementById('backToTop');
const typedText = document.getElementById('typedText');
const navLinks = document.querySelectorAll('.nav-link');

// Hide the loading overlay once the page resources have finished loading.
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 800);
});

// Toggle between light and dark themes and persist the preference.
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};

const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
applyTheme(savedTheme);

// Handle the theme toggle button interaction.
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

const textOptions = [
  'Aspiring Software Engineer | AI & Machine Learning Enthusiast',
  'Building Intelligent Applications With Modern Software Engineering',
  'Exploring Agentic AI, Computer Vision, and Cloud-Native Products'
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

// Animate the hero tagline with a typing effect.
function typeLoop() {
  const fullText = textOptions[index];
  typedText.textContent = fullText.slice(0, charIndex);

  if (!isDeleting && charIndex < fullText.length) {
    charIndex += 1;
  } else if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else {
    isDeleting = false;
    index = (index + 1) % textOptions.length;
  }

  setTimeout(typeLoop, isDeleting ? 60 : 90);
}

typeLoop();

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

// Animate skill cards when they become visible.
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.skill-card').forEach((card) => skillObserver.observe(card));

// Update the active nav state and show or hide the back-to-top button on scroll.
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// Smoothly return the user to the top of the page.
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('year').textContent = new Date().getFullYear();
