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

function flipCard() {
  document.getElementById('flipCard').classList.toggle('flipped')
}
window.flipCard = flipCard // explicitly attach to window

// Mobile nav toggle
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden')
  navLinks.classList.toggle('animate-slide-down')
})
