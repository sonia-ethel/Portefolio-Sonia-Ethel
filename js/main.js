// === FORMULAIRE DE CONTACT ===
const form = document.getElementById('contactForm');

if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  nameInput.addEventListener('input', () => validateField(
    nameInput, 'nameError', nameInput.value.trim() !== ''
  ));

  emailInput.addEventListener('input', () => validateField(
    emailInput, 'emailError', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
  ));

  messageInput.addEventListener('input', () => validateField(
    messageInput, 'messageError', messageInput.value.trim() !== ''
  ));

  function validateField(input, errorId, isValid) {
    const error = document.getElementById(errorId);
    if (isValid) {
      input.classList.remove('invalid');
      error.classList.remove('visible');
    } else {
      input.classList.add('invalid');
      error.classList.add('visible');
    }
    return isValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'nameError', nameInput.value.trim() !== '');
    const isEmailValid = validateField(emailInput, 'emailError', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value));
    const isMessageValid = validateField(messageInput, 'messageError', messageInput.value.trim() !== '');

    if (isNameValid && isEmailValid && isMessageValid) {
      document.getElementById('successMsg').classList.add('visible');
      form.reset();
      setTimeout(() => {
        document.getElementById('successMsg').classList.remove('visible');
      }, 4000);
    }
  });
}

// === PROGRESS BARS ===
const fills = document.querySelectorAll('.progress-fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
    }
  });
}, { threshold: 0.3 });

fills.forEach(fill => observer.observe(fill));

// === DARK MODE ===
const themeBtn = document.getElementById('theme-toggle');

if (themeBtn) {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// === CITATIONS ===
const citations = [
  { text: "Le code est comme l'humour. Quand on doit l'expliquer, c'est qu'il est mauvais.", author: "Cory House" },
  { text: "La simplicité est la sophistication suprême.", author: "Léonard de Vinci" },
  { text: "Tout le monde devrait apprendre à programmer un ordinateur, car cela vous apprend à penser.", author: "Steve Jobs" },
  { text: "Le meilleur moyen de prédire l'avenir est de le créer.", author: "Alan Kay" },
  { text: "D'abord, résolvez le problème. Ensuite, écrivez le code.", author: "John Johnson" },
  { text: "L'expérience est le nom que chacun donne à ses erreurs.", author: "Oscar Wilde" },
  { text: "Le succès c'est tomber sept fois et se relever huit.", author: "Proverbe japonais" },
  { text: "Les données sont le pétrole du XXIe siècle.", author: "Clive Humby" },
  { text: "L'intelligence artificielle est la nouvelle électricité.", author: "Andrew Ng" },
  { text: "Construis quelque chose dont tu es fier.", author: "Anonyme" },
  { text: "Un programme qui produit des résultats incorrects deux fois plus vite n'est pas deux fois meilleur, il est pire.", author: "Tom Cargill" },
  { text: "La créativité, c'est l'intelligence qui s'amuse.", author: "Albert Einstein" },
  { text: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.", author: "Sénèque" },
  { text: "Le voyage de mille lieues commence par un seul pas.", author: "Lao Tseu" },
  { text: "Peu importe combien vous êtes lent, vous êtes encore devant tous ceux qui n'ont pas commencé.", author: "Confucius" },
  { text: "Les bugs sont juste des fonctionnalités non documentées.", author: "Anonyme" },
  { text: "Apprendre sans réfléchir est vain. Réfléchir sans apprendre est dangereux.", author: "Confucius" },
  { text: "La technologie est mieux quand elle rapproche les gens.", author: "Matt Mullenweg" },
  { text: "Une interface bien conçue se fait oublier.", author: "Anonyme" },
  { text: "Le design n'est pas juste ce à quoi ça ressemble. Le design c'est comment ça fonctionne.", author: "Steve Jobs" },
  { text: "Il n'y a pas d'échec, seulement des retours d'expérience.", author: "Anonyme" },
  { text: "Sois le changement que tu veux voir dans le monde.", author: "Mahatma Gandhi" },
  { text: "La meilleure façon d'apprendre est de faire.", author: "Richard Branson" },
  { text: "Chaque expert a un jour été un débutant.", author: "Helen Hayes" },
  { text: "Le secret pour avancer est de commencer.", author: "Mark Twain" },
];

let lastIndex = -1;

function fetchQuote() {
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');

  if (!quoteText) return;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * citations.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;

  const citation = citations[randomIndex];

  quoteText.style.opacity = '0';
  setTimeout(() => {
    quoteText.textContent = citation.text;
    quoteAuthor.textContent = '— ' + citation.author;
    quoteText.style.opacity = '1';
  }, 400);
}

fetchQuote();

const refreshBtn = document.getElementById('quoteRefresh');
if (refreshBtn) {
  refreshBtn.addEventListener('click', fetchQuote);
}

// === ANIMATIONS AU SCROLL ===
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => scrollObserver.observe(el));

// === CAROUSEL ===
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (track && slides.length > 0) {
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  });

  nextBtn.addEventListener('click', () => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  });
}

// === MENU BURGER ===
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// === MORPHING TEXTE ===
const morphText = document.getElementById('morphText');

if (morphText) {
  const words = [
    'Sonia-Ethel',
    'Développeuse',
    'Créative',
    'Data Analyst',
    'Curieuse',
    'Sonia-Ethel'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    const partial = currentWord.substring(0, charIndex);

    if (currentWord === 'Sonia-Ethel') {
      morphText.innerHTML = partial.replace('-', '<em>-</em>');
    } else {
      morphText.textContent = partial;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = wordIndex === words.length - 1 ? 99999 : 1500;
      isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1000);
}

// === COMPTEURS ANIMÉS ===
const counters = document.querySelectorAll('.counter-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);

      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// === CURSEUR PERSONNALISÉ ===
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';

    // Légère latence sur le cercle pour effet traînée
    setTimeout(() => {
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    }, 80);
  });

  // Agrandir sur les éléments cliquables
  const clickables = document.querySelectorAll('a, button');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('cursor-grow');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('cursor-grow');
    });
  });

  // Cacher le curseur quand il quitte la fenêtre
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '0.6';
  });
}
// === API UNSPLASH ===
const UNSPLASH_KEY = 'Qeg7hzYtJdN9akgYxRYtkLwXJWpvPAbxHHtdJOiK6zA';

const projectImages = [
  { id: 'img-python', query: 'python programming' },
  { id: 'img-biblio', query: 'library books' },
  { id: 'img-vue', query: 'dashboard interface' },
  { id: 'img-react', query: 'web application' },
  { id: 'img-angular', query: 'software architecture' },
  { id: 'img-docker', query: 'server container' },
];

const fallbacks = {
  'img-python': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
  'img-biblio': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
  'img-vue': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
  'img-react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
  'img-angular': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400',
  'img-docker': 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400',
};

async function loadUnsplashImages() {
  for (const project of projectImages) {
    const img = document.getElementById(project.id);
    if (!img) continue;

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${project.query}&orientation=landscape&client_id=${UNSPLASH_KEY}`
      );
      const data = await response.json();
      if (data.urls) {
        img.src = data.urls.small;
        img.alt = data.alt_description || project.query;
      } else {
        img.src = fallbacks[project.id];
      }
    } catch (error) {
      img.src = fallbacks[project.id];
    }
  }
}

loadUnsplashImages();