function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

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

const welcomeMessage = document.getElementById('welcomeMessage')
const logoutBtn = document.getElementById('logoutBtn')
const loginLink = document.getElementById('loginLink')
const authSection = document.getElementById('authSection')

// Show auth section on load (needed if hidden initially)
authSection.classList.remove('hidden')

// Simulate successful login (for demo)
// Call this function in your actual login handler
function handleLogin(email) {
  const username = email.split('@')[0]
  welcomeMessage.textContent = `Welcome, ${capitalize(username)}!`

  welcomeMessage.classList.remove('hidden')
  logoutBtn.classList.remove('hidden')
  loginLink.classList.add('hidden')
}

logoutBtn.addEventListener('click', () => {
  welcomeMessage.classList.add('hidden')
  logoutBtn.classList.add('hidden')
  loginLink.classList.remove('hidden')
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const handleScroll = debounce(() => {
  if (window.scrollY > 10) {
    navbar.classList.add('shadow-lg')
  } else {
    navbar.classList.remove('shadow-lg')
  }

  let current = ''
  const offset = 80 // adjust for your navbar height

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    // Section top relative to viewport + offset
    if (rect.top <= offset && rect.bottom > offset) {
      current = section.getAttribute('id')
    }
  })

  navItems.forEach((link) => {
    link.classList.remove('text-blue-600', 'font-semibold')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-blue-600', 'font-semibold')
    }
  })
}, 100)

window.addEventListener('scroll', handleScroll)

navItems.forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  })
})

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden')
  navLinks.classList.toggle('animate-slide-down')
})

loginPassword.addEventListener('input', () => {
  if (loginPassword.value.length < 6) {
    loginError.classList.remove('hidden')
  } else {
    loginError.classList.add('hidden')
  }
})

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

function validateUsername(username) {
  return /^[A-Za-z]{3,8}$/.test(username)
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let isValid = true

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
    // You can add success message or redirect here
    window.location.assign('http://127.0.0.1:5500/src/index.html')
  }
})

function highlightEqualCells(tableId) {
  const table = document.getElementById(tableId)
  if (!table) return

  const rows = table.tBodies[0].rows

  for (let row of rows) {
    const textMap = {}

    for (let i = 1; i < row.cells.length; i++) {
      const cell = row.cells[i]
      const text = cell.textContent.trim()

      // Skip empty cells, cells with '✘', or cells containing buttons
      if (!text || text === '✘' || cell.querySelector('button')) continue

      if (!textMap[text]) textMap[text] = []
      textMap[text].push(cell)
    }

    Object.values(textMap).forEach((cells) => {
      if (cells.length > 1) {
        cells.forEach((cell) => {
          cell.classList.add('bg-green-200')
        })
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  highlightEqualCells('featureComparisonTable')
})

const loginForm = document.getElementById('loginForm')
const loginEmailInput = document.getElementById('loginEmail')

function scrollToWithOffset(id, offset = 80) {
  const element = document.getElementById(id)
  if (!element) return
  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginEmailInput.value.trim()
  const password = loginPassword.value.trim()

  if (email && password.length >= 6) {
    handleLogin(email)
    loginForm.reset()

    scrollToWithOffset('card', 80)
  }
})
