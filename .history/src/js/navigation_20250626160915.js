document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a')
  const sections = document.querySelectorAll('section, aside')

  function showSection(id) {
    sections.forEach((section) => {
      section.style.display = section.id === id ? 'block' : 'none'
    })

    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href').substring(1)
      if (targetId === id) {
        link.classList.add('text-blue-600', 'font-semibold')
      } else {
        link.classList.remove('text-blue-600', 'font-semibold')
      }
    })
  }

  // Show the first section by default
  showSection('home')

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href').substring(1)
      showSection(targetId)
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' })
    })
  })
})
