document.addEventListener('DOMContentLoaded', () => {
  const flipCard = document.getElementById('flipCard')
  document.querySelectorAll('[data-toggle-flip]').forEach((el) => {
    el.addEventListener('click', () => {
      flipCard.classList.toggle('flipped')
    })
  })
})
