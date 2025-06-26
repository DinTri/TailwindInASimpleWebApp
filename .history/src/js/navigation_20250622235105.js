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
