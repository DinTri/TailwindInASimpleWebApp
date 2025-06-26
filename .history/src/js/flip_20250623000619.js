document.addEventListener('DOMContentLoaded', () => {
  const flipCard = document.getElementById('flipCard')
  console.log(flipCard)
  if (!flipCard) return

  // Listen for clicks on any element with data-toggle-flip
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-toggle-flip]')
    if (target) {
      flipCard.classList.toggle('flipped')
    }
  })
})
