// Utility debounce function
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Cached selectors
const navbar = document.getElementById('navbar')
const sections = document.querySelectorAll('section, aside')
const navItems = document.querySelectorAll('nav a')

const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')

const loginPassword = document.getElementById('loginPassword')
const loginError = document.getElementById('loginError')

const registerForm = document.getElementById('registerForm')
const usernameInput = document.getElementById('registerUsername')
const emailInput = document.getElementById('registerEmail')
const passwordInput = document.getElementById('registerPassword')
const confirmPasswordInput = document.getElementById('confirmPassword')

const usernameError = document.getElementById('usernameError')
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('registerError')
const confirmPasswordError = document.getElementById('confirmPasswordError')

// Scroll handler with debounce for performance
const handleScroll = debounce(() => {
  if (window.scrollY > 10) {
    navbar.classList.add('shadow-lg')
  } else {
    navbar.classList.remove('shadow-lg')
  }

  let current = ''
  sections.forEach((section) => {
    const top = section.offsetTop - 80
    if (window.scrollY >= top) current = section.getAttribute('id')
  })

  navItems.forEach((link) => {
    link.classList.remove('text-blue-600', 'font-semibold')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-blue-600', 'font-semibold')
    }
  })
}, 100)

window.addEventListener('scroll', handleScroll)

// Smooth scroll on nav click
navItems.forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden')
  navLinks.classList.toggle('animate-slide-down')
})

// Live validation: Login password length
loginPassword.addEventListener('input', () => {
  if (loginPassword.value.length < 6) {
    loginError.classList.remove('hidden')
  } else {
    loginError.classList.add('hidden')
  }
})

// Live validation: Register password length & match
passwordInput.addEventListener('input', () => {
  togglePasswordError()
  updateMatchValidation()
})
confirmPasswordInput.addEventListener('input', updateMatchValidation)

function togglePasswordError() {
  if (passwordInput.value.length < 6) {
    passwordError.classList.remove('hidden')
    passwordInput.classList.add('border-red-600')
    passwordInput.classList.remove('border-gray-300')
  } else {
    passwordError.classList.add('hidden')
    passwordInput.classList.remove('border-red-600')
    passwordInput.classList.add('border-gray-300')
  }
}

function updateMatchValidation() {
  confirmPasswordInput.classList.remove('border-green-500', 'border-red-500')
  if (!passwordInput.value || !confirmPasswordInput.value) {
    confirmPasswordError.classList.add('hidden')
    return
  }

  if (passwordInput.value === confirmPasswordInput.value) {
    confirmPasswordError.classList.add('hidden')
    confirmPasswordInput.classList.add('border-green-500')
    confirmPasswordInput.classList.remove('border-red-500')
  } else {
    confirmPasswordError.classList.remove('hidden')
    confirmPasswordInput.classList.add('border-red-600')
    confirmPasswordInput.classList.remove('border-green-500')
  }
}

// Validation helpers
function validateUsername(username) {
  return /^[A-Za-z]{3,8}$/.test(username)
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Register form submission validation
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

  // Password validation (length)
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

  // Confirm password match
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
    // Optionally, show success message or redirect here
  }
})
