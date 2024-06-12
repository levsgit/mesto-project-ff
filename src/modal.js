const allModals = document.querySelectorAll('.popup');

export function openModal(e) {
  e.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

export function closeModal(e) {
  e.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

export function handleOverlayClick(e) {
  const currentModal = e.target.closest('.popup');
  if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
    closeModal(currentModal);
  }
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    allModals.forEach(item => item.classList.remove('popup_is-opened'))
  }
}