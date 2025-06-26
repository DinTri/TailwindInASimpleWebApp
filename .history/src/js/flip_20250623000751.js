document.addEventListener('DOMContentLoaded', () => {
  const flipCard = document.getElementById('flipCard')
  if (!flipCard) return

  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-toggle-flip]')
    if (target) {
      flipCard.classList.toggle('flipped')
    }
  })
})
