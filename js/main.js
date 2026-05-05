// === FORMULAIRE DE CONTACT ===
const form = document.getElementById('contactForm');

if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Validation en temps réel
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

  // Soumission
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

// Mémoriser le choix de l'utilisateur
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