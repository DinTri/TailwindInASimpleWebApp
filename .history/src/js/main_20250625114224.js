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
const registerForm = document.getElementById('registerForm')
const usernameInput = document.getElementById('registerUsername')
const emailInput = document.getElementById('registerEmail')
const passwordInput = document.getElementById('registerPassword')
const confirmPasswordInput = document.getElementById('confirmPassword')

const usernameError = document.getElementById('usernameError')
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('registerError')
const confirmPasswordError = document.getElementById('confirmPasswordError')

function validateUsername(username) {
  return /^[A-Za-z]{3,8}$/.test(username)
}

function validateEmail(email) {
  // simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let isValid = true

  // Username validation
  if (!validateUsername(usernameInput.value)) {
    usernameError.classList.remove('hidden')
    usernameInput.classList.add('border-red-600')
    usernameInput.classList.remove('border-gray-300')
    isValid = false
  } else {
    usernameError.classList.add('hidden')
    usernameInput.classList.remove('border-red-600')
    usernameInput.classList.add('border-gray-300')
  }

  // Email validation
  if (!validateEmail(emailInput.value)) {
    emailError.classList.remove('hidden')
    emailInput.classList.add('border-red-600')
    emailInput.classList.remove('border-gray-300')
    isValid = false
  } else {
    emailError.classList.add('hidden')
    emailInput.classList.remove('border-red-600')
    emailInput.classList.add('border-gray-300')
  }

  // Password validation
  if (passwordInput.value.length < 6) {
    passwordError.classList.remove('hidden')
    passwordInput.classList.add('border-red-600')
    passwordInput.classList.remove('border-gray-300')
    isValid = false
  } else {
    passwordError.classList.add('hidden')
    passwordInput.classList.remove('border-red-600')
    passwordInput.classList.add('border-gray-300')
  }

  // Confirm password validation
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.classList.remove('hidden')
    confirmPasswordInput.classList.add('border-red-600')
    confirmPasswordInput.classList.remove('border-gray-300')
    isValid = false
  } else {
    confirmPasswordError.classList.add('hidden')
    confirmPasswordInput.classList.remove('border-red-600')
    confirmPasswordInput.classList.add('border-gray-300')
  }

  if (isValid) {
    registerForm.reset()
  }
})
