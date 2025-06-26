const navLinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('section, aside')

navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const targetId = this.getAttribute('href').substring(1)

    sections.forEach((section) => {
      section.style.display = section.id === targetId ? 'block' : 'none'
    })

    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

// Show the first section by default
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, index) => {
    section.style.display = index === 0 ? 'block' : 'none'
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a')
  const sections = document.querySelectorAll('section, aside')

  function showSection(id) {
    sections.forEach((section) => {
      section.style.display = section.id === id ? 'block' : 'none'
    })
  }

  // Show first section by default
  showSection('card')

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href').substring(1)
      showSection(targetId)
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' })
    })
  })
})
