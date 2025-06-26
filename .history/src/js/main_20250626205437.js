import { createIcons } from 'lucide'
createIcons()

function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// DOM elements
const navbar = document.getElementById('navbar')
const sections = document.querySelectorAll('section, aside')
const navItems = document.querySelectorAll('nav a')

const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')

const loginForm = document.getElementById('loginForm')
const loginEmailInput = document.getElementById('loginEmail')
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

// Helper: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Show/hide auth-only menu links
function showAuthOnlyLinks() {
  document
    .querySelectorAll('.auth-only')
    .forEach((el) => el.classList.remove('hidden'))
}
function hideAuthOnlyLinks() {
  document
    .querySelectorAll('.auth-only')
    .forEach((el) => el.classList.add('hidden'))
}

// Show/hide protected page sections except home
function showProtectedSections() {
  sections.forEach((section) => {
    if (section.id !== 'home') section.classList.remove('hidden')
  })
}
function hideProtectedSections() {
  sections.forEach((section) => {
    if (section.id !== 'home') section.classList.add('hidden')
  })
}

// Handle user login UI updates and state save
function handleLogin(email) {
  localStorage.setItem('userEmail', email)
  const username = email.split('@')[0]
  welcomeMessage.textContent = `Welcome, ${capitalize(username)}!`
  welcomeMessage.classList.remove('hidden')
  logoutBtn.classList.remove('hidden')
  loginLink.classList.add('hidden')
  showAuthOnlyLinks()
  showProtectedSections()
  // Redirect or reload page to Home
  window.location.assign('index.html')
}

// Handle logout UI updates and state clear
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userEmail')
  welcomeMessage.classList.add('hidden')
  logoutBtn.classList.add('hidden')
  loginLink.classList.remove('hidden')
  hideAuthOnlyLinks()
  hideProtectedSections()
  window.location.assign('index.html')
})

// On page load, show or hide UI based on login state
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('invisible')

  const email = localStorage.getItem('userEmail')
  if (email) {
    const username = email.split('@')[0]
    welcomeMessage.textContent = `Welcome, ${capitalize(username)}!`
    welcomeMessage.classList.remove('hidden')
    logoutBtn.classList.remove('hidden')
    loginLink.classList.add('hidden')
    showAuthOnlyLinks()
    showProtectedSections()
  } else {
    welcomeMessage.classList.add('hidden')
    logoutBtn.classList.add('hidden')
    loginLink.classList.remove('hidden')
    hideAuthOnlyLinks()
    hideProtectedSections()
  }
})

// Optional: Toggle nav menu on small screens
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden')
  navLinks.classList.toggle('animate-slide-down')
})

// Add your form validation and other code below (unchanged from your original, adjust as needed)...

// Example simple login form submit handler (replace with your real auth logic)
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginEmailInput.value.trim()
  const password = loginPassword.value.trim()

  // Simple validation example
  if (!email || !password) {
    loginError.textContent = 'Please enter email and password.'
    loginError.classList.remove('hidden')
    return
  }
  loginError.classList.add('hidden')

  // Simulate successful login
  handleLogin(email)
})

loginPassword.addEventListener('input', () => {
  if (loginPassword.value.length < 6) {
    loginError.classList.remove('hidden')
  } else {
    loginError.classList.add('hidden')
  }
})

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.length < 6) {
    passwordError.classList.remove('hidden')
  } else {
    passwordError.classList.add('hidden')
  }
  checkPasswordsMatch()
})

confirmPasswordInput.addEventListener('input', checkPasswordsMatch)

function checkPasswordsMatch() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.classList.remove('hidden')
  } else {
    confirmPasswordError.classList.add('hidden')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons()
})
