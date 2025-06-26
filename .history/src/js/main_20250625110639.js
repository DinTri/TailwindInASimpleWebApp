const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('shadow-lg')
  } else {
    navbar.classList.remove('shadow-lg')
  }

  // Highlight active section
  const sections = document.querySelectorAll('section, aside')
  const navItems = document.querySelectorAll('nav a')
  let current = ''
  sections.forEach((section) => {
    const top = section.offsetTop - 80
    if (scrollY >= top) current = section.getAttribute('id')
  })
  navItems.forEach((link) => {
    link.classList.remove('text-blue-600', 'font-semibold')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-blue-600', 'font-semibold')
    }
  })
})

// Smooth scroll on anchor click
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    target.scrollIntoView({ behavior: 'smooth' })
  })
})

// Mobile nav toggle
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden')
  navLinks.classList.toggle('animate-slide-down')
})

document.getElementById('loginPassword').addEventListener('input', function () {
  const error = document.getElementById('loginError')
  if (this.value.length < 6) {
    error.classList.remove('hidden')
  } else {
    error.classList.add('hidden')
  }
})
document
  .getElementById('registerPassword')
  .addEventListener('input', function () {
    const error = document.getElementById('registerError')
    if (this.value.length < 6) {
      error.classList.remove('hidden')
    } else {
      error.classList.add('hidden')
    }
  })

const passwordInput = document.getElementById('registerPassword')
const confirmInput = document.getElementById('confirmPassword')
const iconSuccess = document.getElementById('iconSuccess')
const iconError = document.getElementById('iconError')
const errorMsg = document.getElementById('registerError')

function updateMatchIcons() {
  const pw = passwordInput.value
  const confirm = confirmInput.value

  confirmInput.classList.remove('border-green-500', 'border-red-500')

  if (!pw || !confirm) {
    iconSuccess.classList.add('hidden')
    iconError.classList.add('hidden')
    return
  }

  if (pw === confirm) {
    iconSuccess.classList.remove('hidden')
    iconError.classList.add('hidden')
    errorMsg.classList.add('hidden')
    confirmInput.classList.add('border-green-500') // ✅ Green border
  } else {
    iconSuccess.classList.add('hidden')
    iconError.classList.remove('hidden')
    confirmInput.classList.add('border-red-500') // ❌ Red border
  }
}

confirmInput.addEventListener('input', updateMatchIcons)
passwordInput.addEventListener('input', updateMatchIcons)

document
  .getElementById('registerForm')
  .addEventListener('submit', function (e) {
    if (
      passwordInput.value.length < 6 ||
      passwordInput.value !== confirmInput.value
    ) {
      e.preventDefault()
      errorMsg.textContent =
        'Passwords must match and be at least 6 characters.'
      errorMsg.classList.remove('hidden')
    } else {
      errorMsg.classList.add('hidden')
    }
  })
