export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.querySelector('.popup__button').textContent = 'Сохранить';
  document.addEventListener('keydown', handleEscape);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
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
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }
}

export function toggleLoadingPhrase(form, validationConfig) {
  const formButton = form.querySelector(validationConfig.submitButtonSelector);
  formButton.textContent = formButton.textContent === 'Сохранить' ? 'Сохранение...' : 'Сохранить';
}
